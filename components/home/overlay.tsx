import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  Handshake,
  MapPin,
  Phone,
  ReceiptIndianRupee,
  Wallet,
} from "lucide-react";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { useIntroReady } from "@/lib/intro";
import { SECTIONS } from "./choreography";

const ADDRESS =
  "Kamala Complex, Tharethota, Solapur - Mangalore Highway, near Pumpwell, Mallikatte, Kadri, Mangaluru, Karnataka 575005";
const DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Friends Auto Cars, ${ADDRESS}`
)}`;

const CONTACTS = [
  { name: "Raghava", number: "7829314381" },
  { name: "Padmanabha", number: "9880717324" },
  { name: "Deepak", number: "9886670718" },
  { name: "Charan", number: "9964071065" },
];

const formatNumber = (n: string) => `+91 ${n.slice(0, 5)} ${n.slice(5)}`;

// Items fade in the edge bands of the screen (as fractions of its height):
// the top band sits under the navbar, so text clears before sliding under it.
const TOP_FADE: [number, number] = [0.03, 0.12];
const BOTTOM_FADE: [number, number] = [0.8, 0.98];
// Parallax drift in px across a fade band: text rises into place a little
// slower than the page on the way in and lingers on the way out.
const DRIFT = 60;
// One-off hero entrance after the loading splash.
const INTRO_SECONDS = 0.8;
const INTRO_STAGGER = 0.08;
const INTRO_RISE = 28;

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);
const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
// Strong ease-out (quartic), matching the --ease-out feel.
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

const SectionIndex = createContext(0);

const Section = ({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) => <SectionIndex.Provider value={index}>{children}</SectionIndex.Provider>;

// Element's top within the overlay, unaffected by any transforms (ours or
// drei's). Stops at the overlay root so the sticky scroll container's shifting
// offset is never included.
function overlayTop(el: HTMLElement) {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node && !node.hasAttribute("data-overlay-root")) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

// Ties an item's opacity and drift to where it sits on screen, so text glides
// in and out in both scroll directions and later items naturally trail earlier
// ones. Writes styles directly each frame instead of re-rendering. Opacity and
// transform only: a filter here would break the glass cards' backdrop blur.
const Reveal = ({
  children,
  index = 0,
  className,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) => {
  const section = useContext(SectionIndex);
  const scroll = useScroll();
  const reduced = useReducedMotion() ?? false;
  const introReady = useIntroReady();
  const ref = useRef<HTMLDivElement>(null);
  const introStartedAt = useRef<number | null>(null);
  const centre = useRef<number | null>(null);
  const frames = useRef(0);

  // The overlay renders in its own React root, so the first frames can run
  // before it has been laid out; measure after mount and on every resize.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      if (el.offsetHeight > 0) centre.current = overlayTop(el) + el.offsetHeight / 2;
    };
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    measure();
    return () => observer.disconnect();
  }, []);

  useFrame((state) => {
    const el = ref.current;
    if (!el) return;
    const height = state.size.height;

    // Until laid out, stay hidden rather than guess a position. Re-measure
    // now and then too, in case content above shifted without a resize.
    if (centre.current === null || frames.current++ % 120 === 0) {
      if (el.offsetHeight > 0) centre.current = overlayTop(el) + el.offsetHeight / 2;
    }
    if (centre.current === null) {
      el.style.opacity = "0";
      return;
    }
    const scrolled = scroll.offset * (SECTIONS - 1) * height;
    const onScreen = (centre.current - scrolled) / height;

    const fadeIn = smoothstep(TOP_FADE[0], TOP_FADE[1], onScreen);
    const fadeOut = 1 - smoothstep(BOTTOM_FADE[0], BOTTOM_FADE[1], onScreen);
    let opacity = fadeIn * fadeOut;
    // Near the top it lingers (pushed down); near the bottom it's pulled up.
    let y = (1 - fadeIn) * DRIFT - (1 - fadeOut) * DRIFT;

    if (section === 0) {
      if (!introReady) {
        opacity = 0;
      } else {
        introStartedAt.current ??= state.clock.elapsedTime;
        const elapsed =
          state.clock.elapsedTime -
          introStartedAt.current -
          index * INTRO_STAGGER;
        const t = easeOut(clamp(elapsed / INTRO_SECONDS, 0, 1));
        opacity *= t;
        y += (1 - t) * INTRO_RISE;
      }
    }

    el.style.opacity = opacity.toFixed(3);
    el.style.transform = reduced
      ? "none"
      : `translate3d(0, ${y.toFixed(1)}px, 0)`;
    // Faded-out items shouldn't catch taps meant for whatever is visible.
    el.style.pointerEvents = opacity < 0.05 ? "none" : "";
  });

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, willChange: "opacity, transform" }}
    >
      {children}
    </div>
  );
};

// The hint sits in the bottom fade band by design, so it gets its own rule:
// visible at rest, gone as soon as scrolling starts.
const ScrollHint = () => {
  const scroll = useScroll();
  const introReady = useIntroReady();
  const ref = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (!ref.current) return;
    const opacity = introReady ? 1 - smoothstep(0, 0.08, scroll.offset) : 0;
    ref.current.style.opacity = opacity.toFixed(3);
  });

  return (
    <div
      ref={ref}
      style={{ opacity: 0 }}
      className="absolute bottom-8 flex flex-col items-center gap-1 text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-400"
    >
      Scroll
      <ChevronDown className="h-4 w-4 motion-safe:animate-bounce" />
    </div>
  );
};

const glass =
  "rounded-2xl border border-black/5 bg-white/50 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]";

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-red-600 dark:text-red-400">
    {children}
  </p>
);

// The gradient is clipped to the glyphs, so it only paints inside the box:
// the bottom padding extends it under descenders ("y", "g"), and the negative
// margin keeps the layout where it was.
const Heading = ({ children }: { children: ReactNode }) => (
  <h2 className="-mb-[0.15em] text-balance bg-gradient-to-b from-zinc-900 to-zinc-600 bg-clip-text pb-[0.15em] text-4xl font-bold tracking-tight text-transparent dark:from-white dark:to-zinc-400 md:text-5xl">
    {children}
  </h2>
);

const Overlay = () => {
  return (
    <Scroll html style={{ width: "100%" }}>
      <div data-overlay-root className="relative">
        <Section index={0}>
          <Hero />
        </Section>
        <Section index={1}>
          <WhyUs />
        </Section>
        <Section index={2}>
          <SellWithUs />
        </Section>
        <Section index={3}>
          <Contact />
        </Section>
      </div>
    </Scroll>
  );
};

const Hero = () => {
  return (
    <section className="relative flex h-screen w-screen flex-col items-center px-6 pt-32 text-center md:pt-36">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/40 px-3 py-1 text-xs font-medium text-zinc-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 motion-safe:animate-pulse" />
          Mangalore · Udupi
        </span>
      </Reveal>
      <Reveal index={1}>
        <h1 className="gradient-text mt-5 text-5xl tracking-tight md:text-7xl">
          Friends Auto Cars
        </h1>
      </Reveal>
      <Reveal index={2}>
        <p className="mt-3 text-xs font-medium tracking-[0.5em] text-zinc-500">
          THINK · FEEL · DRIVE
        </p>
      </Reveal>
      <Reveal index={3}>
        <p className="mt-5 max-w-md text-lg text-zinc-600 dark:text-zinc-400">
          Quality second-hand cars, honestly priced. Buy or sell with a team you
          can trust.
        </p>
      </Reveal>
      <Reveal index={4} className="mt-7 flex flex-wrap justify-center gap-3">
        <a
          href={`tel:+91${CONTACTS[0].number}`}
          className="[transition-duration:160ms] group inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-red-500/10 transition ease-out hover:bg-red-600 active:scale-[0.97] dark:bg-white dark:text-zinc-900 dark:hover:bg-red-500 dark:hover:text-white"
        >
          <Phone className="h-4 w-4" />
          Call us
        </a>
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noreferrer"
          className="[transition-duration:160ms] dark:border-white/15 group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/40 px-5 py-2.5 text-sm font-medium text-zinc-900 backdrop-blur transition ease-out hover:bg-white/70 active:scale-[0.97] dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
        >
          Visit the showroom
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </Reveal>
      <ScrollHint />
    </section>
  );
};

const FEATURES = [
  {
    icon: BadgeCheck,
    title: "Inspected & certified",
    body: "Every car is checked thoroughly before it reaches the lot.",
  },
  {
    icon: ReceiptIndianRupee,
    title: "Transparent pricing",
    body: "Unbeatable prices with no hidden fees.",
  },
  {
    icon: Wallet,
    title: "Easy financing",
    body: "Flexible options that fit your budget.",
  },
  {
    icon: Handshake,
    title: "Friendly team",
    body: "Professional people who make buying hassle-free.",
  },
];

const WhyUs = () => {
  return (
    <section className="flex h-screen w-screen items-start px-6 pt-28 md:items-center md:px-16 md:pt-0 lg:px-24">
      <div className="w-full max-w-lg">
        <Reveal>
          <Eyebrow>Why Friends Auto Cars</Eyebrow>
          <Heading>Find your dream car.</Heading>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-3">
          {FEATURES.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} index={i + 1} className={`${glass} p-4`}>
              <Icon className="h-5 w-5 text-red-500" />
              <h3 className="mt-3 text-sm font-semibold text-zinc-900 dark:text-white">
                {title}
              </h3>
              <p className="mt-1 hidden text-sm text-zinc-600 dark:text-zinc-400 sm:block">
                {body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const SellWithUs = () => {
  return (
    <section className="flex h-screen w-screen items-start justify-end px-6 pt-28 md:items-center md:px-16 md:pt-0 lg:px-24">
      <div className="w-full max-w-md md:text-right">
        <Reveal>
          <Eyebrow>Buy · Sell · Exchange</Eyebrow>
          <Heading>Selling your car? Get a fair price.</Heading>
        </Reveal>
        <Reveal index={1}>
          <p className="mt-5 text-lg text-zinc-600 dark:text-zinc-400">
            Bring your car in for a quick evaluation and an honest offer. No
            hidden fees, no runaround — the true OLX alternative in Mangalore.
          </p>
        </Reveal>
        <Reveal index={2} className="mt-7 flex md:justify-end">
          <ScrollToContact />
        </Reveal>
      </div>
    </section>
  );
};

// The overlay is moved by drei's scroll container rather than the document,
// so in-page anchors don't work; scroll that container instead.
const ScrollToContact = () => {
  const scroll = useScroll();
  return (
    <button
      type="button"
      onClick={() =>
        scroll.el.scrollTo({ top: scroll.el.scrollHeight, behavior: "smooth" })
      }
      className="[transition-duration:160ms] group inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 transition-transform ease-out active:scale-[0.97] dark:text-white"
    >
      Talk to our team
      <ArrowRight className="h-4 w-4 text-red-500 transition-transform group-hover:translate-x-1" />
    </button>
  );
};

const Contact = () => {
  const year = new Date().getFullYear();
  return (
    // Centred in the space between the navbar and the car, whose on-screen
    // position scales with the viewport height in the final camera pose.
    <section className="flex h-screen w-screen flex-col items-center justify-center px-6 pb-[14vh] pt-20 md:pb-[36vh] md:pt-24">
      <div className="w-full max-w-2xl">
        <Reveal className="text-center">
          <Eyebrow>Contact</Eyebrow>
          <Heading>Let&apos;s find your next car.</Heading>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {CONTACTS.map(({ name, number }, i) => (
            <Reveal key={number} index={i + 1}>
              <a
                href={`tel:+91${number}`}
                className={`${glass} [transition-duration:160ms] group flex flex-col gap-3 p-4 transition ease-out hover:-translate-y-0.5 hover:border-red-500/40 active:scale-[0.97]`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-500 transition group-hover:bg-red-500 group-hover:text-white">
                  <Phone className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-zinc-900 dark:text-white">
                    {name}
                  </span>
                  <span className="block text-xs tabular-nums text-zinc-600 dark:text-zinc-400">
                    {formatNumber(number)}
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal index={5}>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noreferrer"
            className={`${glass} [transition-duration:160ms] group mt-3 flex items-start gap-3 p-4 text-left transition ease-out hover:border-red-500/40 active:scale-[0.99]`}
          >
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
            <span className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              {ADDRESS}
            </span>
            <ArrowRight className="ml-auto mt-0.5 h-4 w-4 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5" />
          </a>
        </Reveal>
        <p className="mt-6 text-center text-[11px] text-zinc-500">
          &copy; {year} Friends Auto Cars. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Overlay;
