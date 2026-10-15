import ProgressiveArticles from "@/app/articles/_components/progessive-load";
import AdsterraBanner468x60 from "@/components/ads/asterra/468x60-banner";
import AdsterraBanner728x90 from "@/components/ads/asterra/728x90-banner";
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
    <>
      <div className="flex justify-center pt-3">
        <AdsterraBanner468x60 />
      </div>
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
      <div className="flex justify-center mt-4">
        <AdsterraBanner728x90 />
      </div>
    </>
  );
};
export default AsyncWrapper;
