"use cache";

import RecentlyAddedPost from "@/components/utils/posts/recently-added.posts";
import SectionTitle from "@/components/utils/utils.section-title";
import { websiteName } from "@/constants/strings.contants";
import { ICoverSectionPost, IHeroSection } from "@/types/types";
import { cacheLife } from "next/cache";
import Link from "next/link";
import * as React from "react";

export const instant = false;

export default async function Home() {
  cacheLife({
    stale: 600,
    revalidate: 600,
    expire: 3600,
  });

  const [latestRes, recentlyAddedRes] = await Promise.all([
    fetch(process.env.NEXT_PUBLIC_HTTP + "fetch-latest", {
      headers: {
        "api-key": process.env.NEXT_PUBLIC_API_KEY ?? "",
      },
    }),
    fetch(process.env.NEXT_PUBLIC_HTTP + "fetch-recently-added", {
      headers: {
        "api-key": process.env.NEXT_PUBLIC_API_KEY ?? "",
      },
    }),
  ]);

  const latestResErrored = !latestRes.ok;
  const recentlyAddedResErrored = !recentlyAddedRes.ok;

  const latestResponse = await latestRes?.json();
  const latestData: {
    article: IHeroSection;
    coverSection: ICoverSectionPost[];
  } = latestResponse?.data;

  const recentlyAddedResponse = await recentlyAddedRes?.json();

  const recentlyAddedData: {
    article: IHeroSection;
    coverSections: ICoverSectionPost[];
  }[] = recentlyAddedResponse?.data;

  return (
    <React.Suspense fallback={<p>loading</p>}>
      <>
        <section className="mx-auto max-w-7xl px-5 pt-10 md:px-10 md:pt-16">
          <div className="text-center">
            <h1 className="text-[16vw] leading-none tracking-[0.08em] md:text-[9rem]">
              {websiteName}
            </h1>
            <p className="mt-4 font-editorial text-xl italic text-muted-foreground md:text-2xl">
              Find Your Style. Follow Your Muse.
            </p>
          </div>
          <div className="group mt-12 block">
            <div className="img-zoom aspect-[4/5] md:aspect-[16/9] cursor-pointer">
              <img
                src={
                  "https://res.cloudinary.com/lg4o2tj9/image/upload/f_auto,q_auto/v1791740593/Minimalist_Street_Style_in_Cream_and_Taupe.png"
                }
                alt="Woman wearing an ivory blazer and beige tailored trousers with a brown leather bag in an elegant neutral fashion look."
                width={1600}
                height={1008}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mx-auto max-w-3xl py-12 text-center">
              <p className="eyebrow">Style Journal</p>
              {latestResErrored ? null : (
                <Link href={`/articles/${latestData.article.slug}`}>
                  <h2 className="mt-4 text-4xl leading-[1.05] md:text-6xl">
                    {latestData.article.postTitle.title}{" "}
                    {latestData.article.postTitle.decoratedTitle}
                  </h2>
                  <p className="mt-5 font-editorial text-xl italic text-muted-foreground">
                    {latestData.article.postTitle.subTitle}{" "}
                    {latestData.article.postTitle.brokenSubTitle}
                  </p>
                  <span className="eyebrow mt-8 inline-block border-b border-foreground pb-1">
                    Discover the looks →
                  </span>
                </Link>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-24 md:px-10">
          <SectionTitle eyebrow="Recently published" title="The Latest Edit" />
          {recentlyAddedResErrored ? null : (
            <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {recentlyAddedData.map((p) => {
                return (
                  <RecentlyAddedPost
                    key={p.article.slug}
                    recentlyAddedData={p}
                  />
                );
              })}
            </div>
          )}
          <div className="mt-16 text-center">
            <Link
              href="/articles/c/all"
              className="eyebrow border-b border-foreground pb-1"
            >
              View all stories →
            </Link>
          </div>
        </section>
      </>
    </React.Suspense>
  );
}
