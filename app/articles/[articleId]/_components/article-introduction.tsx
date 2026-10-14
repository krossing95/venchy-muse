"use client";

import { IArticleIntroduction } from "@/types/types";
import * as React from "react";

const ArticleIntroduction: React.FC<{
  articleIntroduction: IArticleIntroduction;
  tocIds: string[];
}> = ({ articleIntroduction, tocIds }) => {
  const firstTocId = tocIds.sort((a, b) => {
    return parseInt(a) - parseInt(b);
  })[0];
  return (
    <div className="article-intro">
      <span className="eyebrow">{articleIntroduction.eyebrowText}</span>
      <p className="intro-lead">{articleIntroduction.introLead}</p>
      {articleIntroduction.subTexts.map((t, i) => (
        <p key={i + 1}>{t}</p>
      ))}
      <a href={`#look-${firstTocId}`} className="text-link">
        Find your next inspiration.
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </div>
  );
};
export default ArticleIntroduction;
