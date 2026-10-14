"use client";

import { websiteName } from "@/constants/strings.contants";
import { getCategory } from "@/helpers/index.helpers";
import { ICoverSectionPost, IHeroSection } from "@/types/types";
import { ArrowRight } from "lucide-react";
import * as React from "react";

const ArticleCoverSection: React.FC<{
  article: IHeroSection;
  coverPosts: ICoverSectionPost[];
}> = ({ article, coverPosts }) => {
  const railRef = React.useRef<HTMLDivElement>(null);
  const [atEnd, setAtEnd] = React.useState(false);
  React.useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const update = () =>
      setAtEnd(rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4);
    update();
    rail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      rail.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <section className="article-cover page-width">
      <div className="eyebrow">
        <span>{getCategory(article.category)}</span>
      </div>
      <h1>
        {article.postTitle.title}
        <span className="text-zinc-500! pl-1.5">
          {article.postTitle.decoratedTitle}
        </span>
      </h1>
      <p className="cover-deck">
        {article.postTitle.subTitle}
        <br className="desktop-break" />
        {article.postTitle.brokenSubTitle}
      </p>
      <div className="article-meta">
        <span>
          <span className="capitalize">{websiteName.toLowerCase()}</span>{" "}
          <span className="meta-divider">/</span> {article.readTime} min read
        </span>
        <button className="share-btn" data-share>
          <svg
            className="icon-share"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
          </svg>
          <svg
            className="icon-check text-muted-foreground"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            style={{ display: "none" }}
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <a
            href="https://auctionr.org/4/58e64d295b532bd5d6b1513fa9d3866a"
            className="share-label text-xs text-muted-foreground"
          >
            Share article
          </a>
        </button>
      </div>

      <div className="cover-rail" data-at-end={atEnd ? "true" : "false"}>
        <div
          className="cover-photos"
          ref={railRef}
          role="group"
          tabIndex={0}
          aria-label="Cover outfit photos"
        >
          {coverPosts.map((coverPost) => (
            <a
              href={`#look-${coverPost.tocId}`}
              className="cover-photo"
              key={coverPost._id}
            >
              <img
                src={coverPost.imageUrl}
                alt={coverPost.coverText}
                fetchPriority="high"
                // className="img-zoom!"
              />
              <div className="absolute inset-0 bg-black/15 pointer-events-none" />
              {/* Text */}
              <span className="absolute z-10 text-white!">
                {coverPost.coverText}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </span>
            </a>
          ))}
        </div>
        <span
          className="flex justify-start items-center gap-1 cover-rail-hint text-[8px]! text-muted-foreground md:hidden"
          aria-hidden="true"
        >
          Swipe for more <ArrowRight size={8} />
        </span>
      </div>

      <div className="cover-caption">
        <span>{article.coverCaption}</span>
        <a href="#article">
          Explore the edit
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
};
export default ArticleCoverSection;
