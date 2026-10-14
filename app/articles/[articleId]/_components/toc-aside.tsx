"use client";

import { ITableOfContent } from "@/types/types";
import * as React from "react";

const TableOfContentAside: React.FC<{ toc: ITableOfContent }> = ({ toc }) => {
  const arrangedTocs = toc.tocs.sort((a, b) => {
    return parseInt(a.tocId) - parseInt(b.tocId);
  });
  return (
    <aside className="article-sidebar">
      <div className="sidebar-inner">
        <span className="eyebrow">IN THIS EDIT</span>
        <nav aria-label="Article contents">
          {arrangedTocs.map((tocItem) => (
            <a
              href={`#look-${tocItem.tocId}`}
              data-link={(Number(tocItem.tocId) - 1).toString()}
              key={tocItem.tocId}
            >
              <span>{tocItem.tocId}</span>
              {tocItem.toc}
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
          ))}
        </nav>
        <a className="sidebar-note" href="#modern">
          A note on modern proportions
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M7 17L17 7M7 7h10v10" />
          </svg>
        </a>
      </div>
    </aside>
  );
};
export default TableOfContentAside;
