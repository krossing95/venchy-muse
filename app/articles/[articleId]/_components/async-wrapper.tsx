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
import Link from "next/link";
import ArticleCoverSection from "./cover-section";
import TableOfContentAside from "./toc-aside";
import ArticleIntroduction from "./article-introduction";
import ArticlePosts from "./post";
import FinishingTouch from "./finishing-touch";
import RelatedArticleSection from "./related-article";
import FinalTouchSection from "./final-thought";

const AsyncWrapper = async ({ articleId }: { articleId: string }) => {
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
    <>
      {isErrored ? (
        <div className="flex gap-2 flex-col justify-center items-center py-10 mb-8 mt-4">
          <div className="flex gap-2 justify-center items-center">
            <Info className="w-7 h-7" strokeWidth={1} />
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
    </>
  );
};
export default AsyncWrapper;
