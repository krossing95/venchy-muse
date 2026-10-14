"use client";

import { IRelatedArticle } from "@/types/types";
import Link from "next/link";
import * as React from "react";

const RelatedArticleSection: React.FC<{ relatedArticle: IRelatedArticle }> = ({
  relatedArticle,
}) => {
  return (
    <section className="related-section">
      <p className="styling-tip">
        <strong>More to explore:</strong>{" "}
        <Link
          href={relatedArticle.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {relatedArticle.name}
        </Link>
      </p>
    </section>
  );
};
export default RelatedArticleSection;
