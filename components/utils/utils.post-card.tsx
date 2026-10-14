"use client";

import { getCategory } from "@/helpers/index.helpers";
import { PostCardProps } from "@/types/types";
import { format } from "date-fns";
import Link from "next/link";

const PostCard = ({ post, size = "md", eager }: PostCardProps) => {
  const postTitle = `${post.postTitle.title} ${post.postTitle.decoratedTitle}`;
  const aspect =
    size === "lg" ? "aspect-[4/5] md:aspect-[16/11]" : "aspect-[4/5]";
  const title =
    size === "lg"
      ? "text-3xl md:text-5xl"
      : size === "sm"
        ? "text-xl md:text-2xl"
        : "text-2xl md:text-3xl";
  return (
    <article className="group">
      <Link href={`/articles/${post.slug}`} className="block">
        <div className={`img-zoom ${aspect} bg-muted`}>
          <img
            src={post.imageUrl}
            alt={postTitle}
            width={1024}
            height={1280}
            loading={eager ? "eager" : "lazy"}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="eyebrow mt-5">{getCategory(post.category)}</p>
        <h3 className={`mt-2 line-clamp-2! leading-tight ${title}`}>
          {postTitle}
        </h3>
        {size !== "sm" && (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {post.postTitle.subTitle} {post.postTitle.brokenSubTitle}
          </p>
        )}
        <p className="eyebrow mt-3 text-muted-foreground">
          {format(post.createdAt, "MMM dd, yyy")}
        </p>
      </Link>
    </article>
  );
};
export default PostCard;
