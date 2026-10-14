"use client";

import { categories } from "@/constants/categories.constants";
import { websiteName } from "@/constants/strings.contants";
import { HeaderStates } from "@/types/states";
import { cn } from "cn";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

const Header = () => {
  const [states, setStates] = React.useState<HeaderStates>({
    open: false,
    isSearching: false,
    mounted: false,
    q: "",
  });
  const router = useRouter();
  const pathname = usePathname();

  const submit = React.useCallback(() => {
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      setStates((prev) => ({ ...prev, isSearching: false, open: false }));
      router.push(`/search?q=${states.q}`);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto h-16 max-w-7xl flex justify-between items-center gap-4 px-5 md:h-20 md:px-10">
        <Link
          href="/"
          className="font-editorial text-2xl tracking-[0.18em] md:text-3xl justify-self-center lg:justify-self-start"
        >
          {websiteName}
        </Link>
        <nav
          className="hidden items-center justify-center gap-8 lg:flex"
          aria-label="Main"
        >
          {categories.map((c) => {
            const href = `/articles/c/${c.id}`;
            const isActive = pathname === href;
            return (
              <Link
                key={c.id}
                href={`/articles/c/${c.id}`}
                className={cn("eyebrow link-underline", {
                  "text-zinc-500! font-bold!": isActive,
                })}
              >
                <div className="flex justify-center items-center gap-3">
                  <div
                    className={cn(
                      "w-1.5 h-1.5 rounded-full hidden bg-zinc-500 animate-pulse",
                      { block: isActive },
                    )}
                  />
                  {c.name}
                </div>
              </Link>
            );
          })}
        </nav>
        <button
          className="lg:hidden"
          aria-label="Open menu"
          onClick={() => setStates((prev) => ({ ...prev, open: !prev.open }))}
        >
          {states.open ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>
      {states.open && (
        <nav className="border-t border-border lg:hidden" aria-label="Mobile">
          <ul className="flex justify-center items-center flex-col px-5 py-6">
            {categories.map((c) => {
              const href = `/articles/c/${c.id}`;
              const isActive = pathname === href;
              return (
                <Link
                  key={c.id}
                  href={`/articles/c/${c.id}`}
                  className={cn("block py-3 text-xl", {
                    "text-zinc-500 font-bold": isActive,
                  })}
                >
                  <div className="flex justify-center items-center gap-3">
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full hidden bg-zinc-500 animate-pulse",
                        { block: isActive },
                      )}
                    />
                    {c.name}
                  </div>
                </Link>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
};
export default Header;
