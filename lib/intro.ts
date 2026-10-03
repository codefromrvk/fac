import { useSyncExternalStore } from "react";

// Flips once the loading splash starts to leave, so the hero entrance and the
// intro camera move play in view instead of behind the splash. A module-level
// store (not context) because the 3D overlay renders in its own React root.
let ready = false;
const listeners = new Set<() => void>();

export function markIntroReady() {
  if (ready) return;
  ready = true;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useIntroReady() {
  return useSyncExternalStore(
    subscribe,
    () => ready,
    () => false,
  );
}

// The crane-in camera move only plays on the first home visit per page load.
// Client-side navigations back to home can't hide its start behind the splash
// (the model is cached, so the splash is gone instantly), so they open on the
// hero shot instead.
let introPlayed = false;

export function claimIntro() {
  const play = !introPlayed;
  introPlayed = true;
  return play;
}
