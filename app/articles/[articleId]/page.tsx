// "use cache";

import {
  IArticleIntroduction,
  ICoverSectionPost,
  IHeroSection,
} from "@/types/types";
import { cacheLife } from "next/cache";
import * as React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { CACHE_CONFIG } from "@/constants/cache.contants";
import { PageLoader } from "@/components/utils/utils.loader";
import AsyncWrapper from "./_components/async-wrapper";
import AdsterraBanner468x60 from "@/components/ads/asterra/468x60-banner";

export const instant = false;

type ArticleDetailPageParams = {
  params: Promise<{ articleId: string }>;
};

export async function generateMetadata(
  { params }: ArticleDetailPageParams,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { articleId } = await params;
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
  // cacheLife(CACHE_CONFIG);

  const { articleId } = await params;

  return (
    <React.Suspense fallback={<PageLoader splash />}>
      <AsyncWrapper articleId={articleId} />
    </React.Suspense>
  );
};
export default ArticleDetailPage;
