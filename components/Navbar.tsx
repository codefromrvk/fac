"use client";
import { MotionConfig, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SPRING } from "@/lib/motion";
import { ModeToggle } from "./custom/mode-toggle";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

const focusRing = "outline-none focus-visible:ring-2 focus-visible:ring-red-500/60";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <MotionConfig reducedMotion="user">
      <header className="fixed inset-x-0 top-5 z-40 flex justify-center px-4">
        <nav className="flex items-center gap-1 rounded-full border border-black/5 bg-white/60 p-1.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.3)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/60">
          {LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative flex h-9 items-center rounded-full px-4 text-sm font-medium transition-[color,transform] [transition-duration:160ms] ease-out active:scale-[0.97] ${focusRing} ${
                  active
                    ? "text-white dark:text-zinc-900"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                {/* The navbar persists across routes, so the pill slides
                    from the old link to the new one. */}
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={SPRING}
                    className="absolute inset-0 rounded-full bg-zinc-900 dark:bg-white"
                  />
                )}
                <span className="relative">{label}</span>
              </Link>
            );
          })}
          <span className="mx-1 h-5 w-px bg-black/10 dark:bg-white/10" />
          <ModeToggle />
        </nav>
      </header>
    </MotionConfig>
  );
}
