import ProgressiveArticles from "@/app/articles/_components/progessive-load";
import SectionTitle from "@/components/utils/utils.section-title";
import { getCategory } from "@/helpers/index.helpers";
import { ArticlesResponse, CategoryId } from "@/types/types";

const AsyncWrapper = async ({ categoryId }: { categoryId: CategoryId }) => {
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
  );
};
export default AsyncWrapper;
