"use client";

import RecentlyAddedPost from "@/components/utils/posts/recently-added.posts";
import { getCategory } from "@/helpers/index.helpers";
import { ProgressiveArticlesStates } from "@/types/states";
import { ArticlesResponse, ProgressiveArticlesProps } from "@/types/types";
import { Trash } from "lucide-react";
import * as React from "react";

const ProgressiveArticles: React.FC<ProgressiveArticlesProps> = ({
  initialArticles,
  initialHasMore,
  initialCursor,
  categoryId,
}) => {
  const [states, setStates] = React.useState<ProgressiveArticlesStates>({
    articles: initialArticles,
    cursor: initialCursor,
    loading: false,
    hasMore: initialHasMore,
    isErrored: false,
  });

  const observerTarget = React.useRef<HTMLDivElement>(null);

  const fetchArticles = React.useCallback(async () => {
    if (states.loading || !states.hasMore) return;

    try {
      setStates((prev) => ({ ...prev, loading: true, isErrored: false }));

      const url = new URL(
        process.env.NEXT_PUBLIC_HTTP + "progressive-fetch" + categoryId,
      );

      if (states.cursor) {
        url.searchParams.set("cursor", states.cursor);
      }

      const response = await fetch(url.toString(), {
        headers: {
          "api-key": process.env.NEXT_PUBLIC_NEXT_PUBLIC_API_KEY ?? "",
        },
      });

      if (!response.ok) {
        setStates((prev) => ({ ...prev, isErrored: true }));
      }

      const { data, pagination }: ArticlesResponse = await response.json();

      setStates((prev) => ({
        ...prev,
        articles: [...prev.articles, ...data],
        cursor: pagination.nextCursor,
        hasMore: pagination.hasMore,
        isErrored: false,
      }));
    } catch (error) {
      setStates((prev) => ({ ...prev, isErrored: true }));
      console.error("Unable to fetch articles:", error);
    } finally {
      setStates((prev) => ({ ...prev, loading: false }));
    }
  }, [states.cursor, states.hasMore, states.loading]);

  // Initial request
  React.useEffect(() => {
    fetchArticles();
  }, []);

  // Infinite scroll observer
  React.useEffect(() => {
    const target = observerTarget.current;

    if (!target || !states.hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !states.loading) {
          fetchArticles();
        }
      },
      {
        root: null,
        rootMargin: "300px",
        threshold: 0,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [fetchArticles, states.hasMore, states.loading]);

  return (
    <>
      {states.isErrored ? null : (
        <>
          {!states.articles?.length ? (
            <div className="flex gap-2 justify-center items-center py-10 mb-8">
              <Trash className="w-8 h-8" strokeWidth={1} />
              <p className="text-xl font-extralight eyebrow">
                No article found under {getCategory(categoryId)}
              </p>
            </div>
          ) : (
            <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              <>
                {states.articles?.map((p) => {
                  return (
                    <RecentlyAddedPost
                      key={p.article.slug}
                      recentlyAddedData={p}
                    />
                  );
                })}
              </>
            </div>
          )}
        </>
      )}

      {states.hasMore && (
        <div ref={observerTarget}>
          {states.loading && (
            <div className="flex justify-center items-center mt-4 py-6">
              <p>Loading more articles...</p>
            </div>
          )}
        </div>
      )}

      {!states.hasMore && states.articles?.length > 0 && (
        <div className="flex justify-center items-center mt-4 py-6">
          <p>You've reached the end.</p>
        </div>
      )}
    </>
  );
};
export default ProgressiveArticles;
