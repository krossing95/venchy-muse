"use cache";

import { CategoryId } from "@/types/types";
import { cacheLife } from "next/cache";
import * as React from "react";
import { CACHE_CONFIG } from "@/constants/cache.contants";
import { PageLoader } from "@/components/utils/utils.loader";
import AsyncWrapper from "./_components/async-wrapper";

type ArticlePageParams = {
  params: Promise<{ categoryId: CategoryId }>;
};

export const instant = false;

const ArticlesPage = async ({ params }: ArticlePageParams) => {
  cacheLife(CACHE_CONFIG);

  const { categoryId } = await params;

  return (
    <React.Suspense fallback={<PageLoader splash />}>
      <AsyncWrapper categoryId={categoryId} />
    </React.Suspense>
  );
};
export default ArticlesPage;
