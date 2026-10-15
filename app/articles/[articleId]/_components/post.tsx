"use client";

import AdCashBanner728x90 from "@/components/ads/adcash/728x90-banner";
import AdsterraBanner300x250 from "@/components/ads/asterra/300x250-banner";
import AdsterraBanner728x90 from "@/components/ads/asterra/728x90-banner";
import AdsterraNativeBanner from "@/components/ads/asterra/native-banner";
import { IPostPiece } from "@/types/types";
import * as React from "react";

const ArticlePosts: React.FC<{ posts: IPostPiece[] }> = ({ posts }) => {
  return (
    <>
      <div className="flex justify-center my-3">
        <AdsterraBanner728x90 />
      </div>
      {posts.map((post, i) => (
        <section
          id={`look-${post.tocId}`}
          data-look={(Number(post.tocId) - 1).toString()}
          className="look-section"
          key={post._id}
        >
          <div className="look-heading">
            <span className="look-number text-zinc-500!">{post.tocId}</span>
            <h2>{post.title}</h2>
          </div>
          <div className="look-body">
            <figure className="group cover-photo h-auto!">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="h-full w-full object-cover object-[center_45%] transition-transform duration-[650ms] ease-[ease] group-hover:scale-[1.005] cursor-pointer"
                loading="lazy"
              />
              <figcaption>LOOK {post.tocId}</figcaption>
            </figure>
            <div className="look-copy">
              {post.contentTexts.map((t, i) => (
                <p key={i + 1}>{t}</p>
              ))}
              <p className="styling-tip">
                <strong>{post.decoratedContent.strongText}</strong>{" "}
                {post.decoratedContent.elaboratedText}
              </p>
            </div>
          </div>
          {i === 1 ? (
            <div className="flex justify-center mt-10">
              <AdsterraNativeBanner />
            </div>
          ) : null}
          {i === 3 ? (
            <div className="flex md:flex-row justify-center gap-1.5 mt-10">
              <AdsterraBanner300x250 />
              <div className="hidden md:block">
                <AdsterraBanner300x250 />
              </div>
            </div>
          ) : null}
          {i === 6 ? (
            <div className="flex justify-center gap-1.5 mt-10">
              <AdsterraBanner728x90 />
            </div>
          ) : null}
          {i === 8 ? (
            <div className="flex justify-center gap-1.5 mt-10">
              <AdCashBanner728x90 />
            </div>
          ) : null}
        </section>
      ))}
    </>
  );
};
export default ArticlePosts;
