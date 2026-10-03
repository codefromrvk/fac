// Shared motion tokens. CSS uses the matching custom properties in
// globals.css (--ease-out, --ease-in-out) via Tailwind's ease-out/ease-in-out.

// Strong ease-out for anything entering or exiting.
export const EASE_OUT_CSS = "cubic-bezier(0.23, 1, 0.32, 1)";

// Apple-style spring for things that move between positions on screen.
export const SPRING = { type: "spring", duration: 0.5, bounce: 0.2 } as const;
