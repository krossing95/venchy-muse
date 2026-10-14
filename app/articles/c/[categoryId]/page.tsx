"use cache";

import SectionTitle from "@/components/utils/utils.section-title";
import { ArticlesResponse, CategoryId } from "@/types/types";
import { cacheLife } from "next/cache";
import * as React from "react";
import ProgressiveArticles from "../../_components/progessive-load";
import { getCategory } from "@/helpers/index.helpers";
import { categories } from "@/constants/categories.constants";

type ArticlePageParams = {
  params: Promise<{ categoryId: CategoryId }>;
};

export const instant = false;

export async function generateStaticParams() {
  return categories.map((category) => ({ categoryId: category.id }));
}

const ArticlesPage = async ({ params }: ArticlePageParams) => {
  cacheLife({
    stale: 600,
    revalidate: 600,
    expire: 3600,
  });

  const { categoryId } = await params;

  const res = await fetch(
    process.env.NEXT_PUBLIC_HTTP + "progressive-fetch/" + categoryId,
    {
      headers: {
        "api-key": process.env.NEXT_PUBLIC_API_KEY ?? "",
      },
    },
  );

  const isErrored = !res.ok;

  const articlesRes = await res?.json();

  const { data, pagination }: ArticlesResponse = articlesRes;

  return (
    <React.Suspense fallback={<p>loading</p>}>
      <section className="mx-auto max-w-7xl px-5 pt-10 md:px-10 md:pt-16">
        <SectionTitle
          eyebrow="Published Articles"
          title={getCategory(categoryId)}
        />
        {isErrored ? null : (
          <ProgressiveArticles
            initialArticles={data}
            initialCursor={pagination?.nextCursor}
            initialHasMore={pagination?.hasMore}
            categoryId={categoryId}
          />
        )}
      </section>
    </React.Suspense>
  );
};
export default ArticlesPage;
