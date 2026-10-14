"use client";

import * as React from "react";

export function PageLoader({ splash }: { splash?: boolean }) {
  const [done, setDone] = React.useState(!splash);
  const [gone, setGone] = React.useState(!splash);
  React.useEffect(() => {
    if (!splash) return;
    const a = setTimeout(() => setDone(true), 1400);
    const b = setTimeout(() => setGone(true), 2100);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [splash]);
  if (gone) return null;
  return (
    <div
      className={`page-loader${done ? " page-loader--done" : ""}`}
      role="status"
      aria-label="Loading"
    >
      <div className="page-loader-inner">
        <img src="/vm-monogram.png" alt="" width={56} height={78} />
        <span className="page-loader-word">Venchy Muse</span>
        <span className="page-loader-line" />
      </div>
    </div>
  );
}
