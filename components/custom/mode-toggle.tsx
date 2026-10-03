"use client"

import * as React from "react"
import { flushSync } from "react-dom"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { EASE_OUT_CSS } from "@/lib/motion"

// Flips between light and dark. Where the View Transitions API is available,
// the new theme is revealed as a circle growing out of the button.
export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const next = resolvedTheme === "dark" ? "light" : "dark"
    const apply = () => {
      // next-themes sets the class in an effect; set it here as well so the
      // view transition captures the new theme on its very first frame.
      document.documentElement.classList.toggle("dark", next === "dark")
      document.documentElement.classList.toggle("light", next === "light")
      flushSync(() => setTheme(next))
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!document.startViewTransition || reduceMotion) {
      apply()
      return
    }

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )

    document.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 650,
          easing: EASE_OUT_CSS,
          pseudoElement: "::view-transition-new(root)",
        },
      )
    })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="relative flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 outline-none transition-[color,background-color,transform] [transition-duration:160ms] ease-out active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-red-500/60 hover:bg-black/5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
    >
      <SunIcon className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 opacity-100 transition-[transform,opacity] duration-200 ease-out dark:-rotate-90 dark:scale-50 dark:opacity-0" />
      <MoonIcon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-50 opacity-0 transition-[transform,opacity] duration-200 ease-out dark:rotate-0 dark:scale-100 dark:opacity-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
