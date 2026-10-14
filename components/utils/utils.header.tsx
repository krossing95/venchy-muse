"use client";

import { categories } from "@/constants/categories.constants";
import { websiteName } from "@/constants/strings.contants";
import { HeaderStates } from "@/types/states";
import { cn } from "cn";
import { Menu, Search, SearchX, X } from "lucide-react";
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

  React.useEffect(() => {
    setStates((prev) => ({ ...prev, mounted: true }));
  }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-5 md:h-20 md:px-10">
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
            const isActive = states.mounted && pathname === href;
            return (
              <Link
                key={c.id}
                href={`/articles/c/${c.id}`}
                className={cn("eyebrow link-underline", {
                  "underline underline-offset-4": isActive,
                })}
              >
                {c.name}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            onClick={() =>
              setStates((prev) => ({ ...prev, isSearching: !prev.isSearching }))
            }
          >
            {states.isSearching ? (
              <SearchX className="h-4 w-4" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      {states.isSearching && (
        <form onSubmit={submit} className="border-t border-border">
          <div className="mx-auto flex max-w-3xl items-center gap-3 px-5 py-4">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={states.q}
              onChange={(e) =>
                setStates((prev) => ({ ...prev, q: e.target.value }))
              }
              placeholder="Search the edit…"
              className="w-full bg-transparent font-editorial text-2xl outline-none placeholder:text-muted-foreground"
            />
          </div>
        </form>
      )}
      {states.open && (
        <nav className="border-t border-border lg:hidden" aria-label="Mobile">
          <ul className="flex justify-center items-center flex-col px-5 py-6">
            {categories.map((c) => {
              const href = `/articles/c/${c.id}`;
              const isActive = states.mounted && pathname === href;
              return (
                <Link
                  key={c.id}
                  href={`/articles/c/${c.id}`}
                  className={cn("block py-3 font-editorial text-2xl", {
                    "text-accent": isActive,
                  })}
                >
                  {c.name}
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
