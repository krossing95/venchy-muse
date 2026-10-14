"use client";

import { categories } from "@/constants/categories.constants";
import { currentYear } from "@/constants/numbers.contants";
import { websiteName } from "@/constants/strings.contants";
import Link from "next/link";
import * as React from "react";

const Footer = () => {
  const extra = ["About", "Contact", "Privacy"];
  return (
    <footer className="bg-primary text-primary-foreground mt-6">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-10">
        <p className="font-editorial text-5xl font-light! tracking-[0.12em] md:text-8xl">
          {websiteName}
        </p>
        <p className="mt-4 font-editorial font-extralight! text-xl italic opacity-80">
          Find Your Style. Follow Your Muse.
        </p>
        <div className="mt-16 grid gap-10 border-t border-primary-foreground/20 pt-10 md:grid-cols-3">
          <ul className="space-y-3">
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  key={c.id}
                  href={`/categories/${c.id}`}
                  className="eyebrow link-underline"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-3">
            {extra.map((x) => (
              <li key={x}>
                <span className="eyebrow opacity-80">{x}</span>
              </li>
            ))}
          </ul>
          <ul className="space-y-3">
            {["Instagram", "Pinterest", "Facebook"].map((x) => (
              <li key={x}>
                <a href="#" className="eyebrow link-underline">
                  {x}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-16 text-xs opacity-60">
          © {currentYear}{" "}
          <span className="capitalize">{websiteName.toLowerCase()}</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
