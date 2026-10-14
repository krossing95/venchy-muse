"use cache";

import {
  IArticleIntroduction,
  ICoverSectionPost,
  IFinalThought,
  IFinishingTouch,
  IHeroSection,
  IPostPiece,
  IRelatedArticle,
  ITableOfContent,
} from "@/types/types";
import { Info } from "lucide-react";
import { cacheLife } from "next/cache";
import Link from "next/link";
import * as React from "react";
import ArticleCoverSection from "./_components/cover-section";
import TableOfContentAside from "./_components/toc-aside";
import ArticleIntroduction from "./_components/article-introduction";
import ArticlePosts from "./_components/post";
import FinishingTouch from "./_components/finishing-touch";
import RelatedArticleSection from "./_components/related-article";
import FinalTouchSection from "./_components/final-thought";
import { Metadata, ResolvingMetadata } from "next";

export const instant = false;

type ArticleDetailPageParams = {
  params: Promise<{ articleId: string }>;
};

// export async function generateStaticParams() {
//   const res = await fetch(process.env.NEXT_PUBLIC_HTTP + "fetch-slugs/", {
//     headers: {
//       "api-key": process.env.NEXT_PUBLIC_API_KEY ?? "",
//     },
//   });

//   if (!res.ok) {
//     throw new Error("Something went wrong");
//   }

//   const response = await res.json();

//   const slugs: string[] = response?.data?.slugs;

//   return slugs.map((s) => ({
//     articleId: s,
//   }));
// }

export async function generateMetadata(
  { params }: ArticleDetailPageParams,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const { articleId } = await params;
  // fetch data
  const articleRes = await fetch(
    process.env.NEXT_PUBLIC_HTTP + "fetch-article/" + articleId,
    {
      headers: {
        "api-key": process.env.NEXT_PUBLIC_API_KEY ?? "",
      },
    },
  ).then((res) => res.json());

  const {
    articleData,
    coverSectionPosts,
    articleIntroduction,
  }: {
    articleData: IHeroSection;
    coverSectionPosts: ICoverSectionPost[];
    articleIntroduction: IArticleIntroduction;
  } = articleRes?.data;

  const coverPhoto = coverSectionPosts?.[0]?.imageUrl;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: `${articleData.postTitle.title} ${articleData.postTitle.decoratedTitle}`,
    description: `${articleIntroduction.introLead} ${articleIntroduction.subTexts.join(" ")}`,
    openGraph: {
      images: [coverPhoto, ...previousImages],
    },
  };
}

const ArticleDetailPage = async ({ params }: ArticleDetailPageParams) => {
  cacheLife({
    stale: 600,
    revalidate: 600,
    expire: 3600,
  });

  const { articleId } = await params;

  const res = await fetch(
    process.env.NEXT_PUBLIC_HTTP + "fetch-article/" + articleId,
    {
      headers: {
        "api-key": process.env.NEXT_PUBLIC_API_KEY ?? "",
      },
    },
  );

  const isErrored = !res.ok;

  const articleRes = (await res?.json())?.data;

  const article: {
    articleData: IHeroSection;
    coverSectionPosts: ICoverSectionPost[];
    articleIntroduction: IArticleIntroduction | null;
    finalThought: IFinalThought | null;
    finishingTouch: IFinishingTouch | null;
    postPieces: IPostPiece[];
    relatedArticle: IRelatedArticle | null;
    toc: ITableOfContent | null;
  } = articleRes;

  return (
    <React.Suspense fallback={<p>loading</p>}>
      {isErrored ? (
        <div className="flex gap-2 flex-col justify-center items-center py-10 mb-8 mt-4">
          <div className="flex gap-2 justify-center items-center">
            <Info className="w-8 h-8" strokeWidth={1} />
            <p className="text-xl font-extralight eyebrow">No record found</p>
          </div>
          <Link className="underline underline-offset-4" href="/articles/c/all">
            Go back to articles
          </Link>
        </div>
      ) : (
        <>
          <ArticleCoverSection
            article={article.articleData}
            coverPosts={article.coverSectionPosts}
          />
          <div className="article-layout page-width" id="article">
            <TableOfContentAside toc={article.toc!} />
            <article className="article-content">
              <ArticleIntroduction
                articleIntroduction={article.articleIntroduction!}
                tocIds={article.toc!.tocs?.map((t) => t.tocId)}
              />
              <ArticlePosts posts={article.postPieces} />
              <FinishingTouch finishingTouch={article.finishingTouch!} />
              {article.relatedArticle ? (
                <RelatedArticleSection
                  relatedArticle={article.relatedArticle}
                />
              ) : null}
              <FinalTouchSection finalThought={article?.finalThought!} />
            </article>
          </div>
        </>
      )}
    </React.Suspense>
  );
};
export default ArticleDetailPage;
