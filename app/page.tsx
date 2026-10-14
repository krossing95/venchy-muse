"use cache";

import { PageLoader } from "@/components/utils/utils.loader";
import { cacheLife } from "next/cache";
import * as React from "react";
import AsyncWrapper from "./async-wrapper";
import { CACHE_CONFIG } from "@/constants/cache.contants";

export const instant = false;

export default async function Home() {
  cacheLife(CACHE_CONFIG);

  return (
    <React.Suspense fallback={<PageLoader splash />}>
      <AsyncWrapper />
    </React.Suspense>
  );
}
