"use client";

import { IPostPiece } from "@/types/types";
import * as React from "react";

const ArticlePosts: React.FC<{ posts: IPostPiece[] }> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
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
        </section>
      ))}
    </>
  );
};
export default ArticlePosts;
