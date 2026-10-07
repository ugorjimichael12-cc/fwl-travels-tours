import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Minus,
  Navigation,
  Plane,
  Plus,
  Send,
  Sparkles,
  Star,
  Ticket,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { supabase } from "./lib/supabase";
import type { User } from "@supabase/supabase-js";
import PlanTripForm from "./PlanTripForm";

type Destination = {
  name: string;
  descriptor: string;
  image: string;
  size: string;
};

const images = {
  hero:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=85",
  dubai:
    "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1400&q=85",
  paris:
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=85",
  cape:
    "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1400&q=85",
  london:
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1400&q=85",
  zanzibar:
    "https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=1400&q=85",
  lagos:
    "https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?auto=format&fit=crop&w=1400&q=85",
  experience:
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2200&q=85",
  about:
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=85",
  cta:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=85",
  business:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
  holiday:
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85",
  international:
    "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=85",
  leisure:
    "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?auto=format&fit=crop&w=1200&q=85",
  adventure:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
  romantic:
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85",
};

const destinations: Destination[] = [
  {
    name: "Dubai",
    descriptor: "Future • Luxury • Adventure",
    image: images.dubai,
    size: "md:col-span-7 md:row-span-2",
  },
  {
    name: "Paris",
    descriptor: "Art • Romance • Culture",
    image: images.paris,
    size: "md:col-span-5",
  },
  {
    name: "Cape Town",
    descriptor: "Coast • Nature • Energy",
    image: images.cape,
    size: "md:col-span-5",
  },
  {
    name: "London",
    descriptor: "History • Style • Discovery",
    image: images.london,
    size: "md:col-span-4",
  },
  {
    name: "Zanzibar",
    descriptor: "Island • Escape • Ocean",
    image: images.zanzibar,
    size: "md:col-span-4",
  },
  {
    name: "Lagos",
    descriptor: "Culture • City • Pulse",
    image: images.lagos,
    size: "md:col-span-4",
  },
];

const categories = [
  ["Business Travel", "For journeys where every minute matters.", images.business],
  ["Holiday Escapes", "Slow down. Go further. Feel more.", images.holiday],
  ["International Travel", "Cross borders. Expand your world.", images.international],
  ["Leisure & Tourism", "Make room for unforgettable moments.", images.leisure],
  ["Adventure", "Follow the route less travelled.", images.adventure],
  ["Romantic Getaways", "Some memories deserve two passports.", images.romantic],
] as const;

const testimonials = [
  {
    quote:
      "Sample testimonial content — replace this with a verified customer story.",
    name: "CUSTOMER NAME",
    meta: "SAMPLE TESTIMONIAL",
  },
  {
    quote:
      "Sample testimonial content — this area is structured for an authentic review once supplied.",
    name: "CUSTOMER NAME",
    meta: "SAMPLE TESTIMONIAL",
  },
  {
    quote:
      "Sample testimonial content — designed to be replaced without changing the component.",
    name: "CUSTOMER NAME",
    meta: "SAMPLE TESTIMONIAL",
  },
];

const articles = [
  [
    "5 DESTINATIONS TO ADD TO YOUR TRAVEL LIST",
    "A visual starting point for your next escape.",
    images.paris,
  ],
  [
    "HOW TO PLAN YOUR FIRST INTERNATIONAL TRIP",
    "A practical guide for a smoother first journey.",
    images.international,
  ],
  [
    "WHAT TO KNOW BEFORE YOUR NEXT JOURNEY",
    "Simple considerations before you leave home.",
    images.london,
  ],
  [
    "TRAVEL SMARTER. TRAVEL BETTER.",
    "Ideas for building better travel habits.",
    images.adventure,
  ],
] as const;

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function FlightPath({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-1/2 hidden h-28 -translate-y-1/2 md:block ${
        dark ? "opacity-30" : "opacity-20"
      }`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 140"
        className={`h-full w-full ${
          dark ? "text-champagne" : "text-ocean"
        }`}
        fill="none"
      >
        <path
          d="M-40 100 C180 10 280 130 470 68 S790 5 1240 85"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeDasharray="5 8"
        />
        <circle cx="235" cy="76" r="3" fill="currentColor" />
        <circle cx="715" cy="42" r="3" fill="currentColor" />
        <circle cx="1030" cy="66" r="3" fill="currentColor" />
      </svg>
    </div>
  );
}

function AuthModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) {
      setMessage("");
      setLoading(false);
    }
  }, [open]);

  if (!open) return null;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        });

        if (error) throw error;

        setMessage(
          "Account created successfully. Check your email if confirmation is required."
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        onClose();
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight/80 px-5 py-8 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="relative w-full max-w-md overflow-hidden bg-white shadow-2xl"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close authentication window"
          >
            <X size={20} />
          </button>

          <div className="bg-midnight px-7 pb-8 pt-9 text-white">
            <div className="text-[11px] font-extrabold tracking-[0.2em] text-champagne">
              FWL TRAVELS & TOURS
            </div>

            <h2 className="display-title mt-3 text-4xl">
              {mode === "signin" ? "WELCOME BACK." : "START YOUR JOURNEY."}
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/65">
              {mode === "signin"
                ? "Sign in to manage your journeys, bookings and travel requests."
                : "Create your FWL account and keep your travel plans together."}
            </p>
          </div>

          <form onSubmit={submit} className="space-y-5 p-7">
            {mode === "signup" && (
              <label className="block">
                <span className="mb-2 block text-[9px] font-extrabold tracking-[.18em] text-slate-400">
                  FULL NAME
                </span>

                <input
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full border border-slate-200 px-4 py-3 text-sm outline-none focus:border-ocean"
                  placeholder="Your full name"
                />
              </label>
            )}

            <label className="block">
              <span className="mb-2 block text-[9px] font-extrabold tracking-[.18em] text-slate-400">
                EMAIL ADDRESS
              </span>

              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full border border-slate-200 px-4 py-3 text-sm outline-none focus:border-ocean"
                placeholder="you@example.com"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[9px] font-extrabold tracking-[.18em] text-slate-400">
                PASSWORD
              </span>

              <input
                required
                minLength={6}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full border border-slate-200 px-4 py-3 text-sm outline-none focus:border-ocean"
                placeholder="Minimum 6 characters"
              />
            </label>

            {message && (
              <div className="border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-600">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 bg-midnight px-5 py-4 text-[10px] font-extrabold tracking-[.17em] text-white transition hover:bg-ocean disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "PLEASE WAIT..."
                : mode === "signin"
                  ? "SIGN IN"
                  : "CREATE ACCOUNT"}

              <ArrowRight size={15} />
            </button>

            <div className="text-center text-xs text-slate-500">
              {mode === "signin"
                ? "New to FWL?"
                : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "signin" ? "signup" : "signin");
                  setMessage("");
                }}
                className="font-bold text-ocean hover:text-midnight"
              >
                {mode === "signin" ? "Create an account" : "Sign in"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [travellers, setTravellers] = useState(1);
  const [searchMessage, setSearchMessage] = useState("");
  const [testimonial, setTestimonial] = useState(0);
  const [contactSent, setContactSent] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const { scrollY } = useScroll();

  const heroY = useTransform(scrollY, [0, 700], [0, 120]);
  const experienceY = useTransform(scrollY, [1300, 2600], [0, 90]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setUser(data.session?.user ?? null);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const go = (id: string) => {
    setMenu(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSearchMessage(
      "Your journey request has been received. Live FWL flight search will connect here."
    );
  };

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactSent(true);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const nextTestimonial = () => {
    setTestimonial((current) => (current + 1) % testimonials.length);
  };

  const previousTestimonial = () => {
    setTestimonial(
      (current) =>
        (current - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="overflow-hidden bg-ivory text-midnight">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-midnight/95 shadow-xl backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-5 md:px-10">
          <button
            type="button"
            onClick={() => go("home")}
            className="group text-left"
            aria-label="FWL Travels & Tours home"
          >
            <div className="font-sans text-[15px] font-extrabold tracking-[0.16em] text-white">
              FWL
            </div>

            <div className="text-[8px] font-bold tracking-[0.28em] text-champagne">
              TRAVELS & TOURS
            </div>
          </button>

          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label="Main navigation"
          >
            {[
              ["Home", "home"],
              ["Flights", "search"],
              ["Tours & Experiences", "categories"],
              ["Destinations", "destinations"],
              ["About", "about"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <button
                type="button"
                key={id}
                onClick={() => go(id)}
                className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/85 transition hover:text-champagne"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {!user ? (
              <button
                type="button"
                onClick={() => setAuthOpen(true)}
                className="border border-white/30 bg-white/5 px-5 py-3 text-[10px] font-extrabold tracking-[0.16em] text-white backdrop-blur-sm transition hover:border-champagne hover:bg-champagne hover:text-midnight"
              >
                SIGN IN
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSignOut}
                className="border border-white/30 bg-white/5 px-5 py-3 text-[10px] font-extrabold tracking-[0.16em] text-white backdrop-blur-sm transition hover:border-champagne hover:bg-champagne hover:text-midnight"
              >
                ACCOUNT / SIGN OUT
              </button>
            )}

            <button
              type="button"
              onClick={() => go("contact")}
              className="border border-champagne bg-champagne px-5 py-3 text-[10px] font-extrabold tracking-[0.16em] text-midnight transition hover:bg-white"
            >
              PLAN YOUR JOURNEY
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMenu((current) => !current)}
            className="rounded-full p-2 text-white lg:hidden"
            aria-label={menu ? "Close menu" : "Open menu"}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {menu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-white/10 bg-midnight px-5 py-6 lg:hidden"
            >
              {[
                ["Home", "home"],
                ["Flights", "search"],
                ["Tours & Experiences", "categories"],
                ["Destinations", "destinations"],
                ["About", "about"],
                ["Contact", "contact"],
              ].map(([label, id]) => (
                <button
                  type="button"
                  key={id}
                  onClick={() => go(id)}
                  className="block w-full border-b border-white/10 py-4 text-left text-xs font-bold uppercase tracking-[0.16em] text-white"
                >
                  {label}
                </button>
              ))}

              <div className="pt-5">
                {!user ? (
                  <button
                    type="button"
                    onClick={() => {
                      setMenu(false);
                      setAuthOpen(true);
                    }}
                    className="w-full border border-champagne bg-champagne px-5 py-4 text-[10px] font-extrabold tracking-[0.16em] text-midnight"
                  >
                    SIGN IN / CREATE ACCOUNT
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full border border-white/25 px-5 py-4 text-[10px] font-extrabold tracking-[0.16em] text-white"
                  >
                    SIGN OUT
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* HERO */}
        <section
          id="home"
          className="relative flex min-h-[850px] items-end overflow-hidden bg-midnight pb-36 pt-32 md:min-h-screen md:pb-40"
        >
          <motion.img
            style={{ y: heroY }}
            src={images.hero}
            alt="Cinematic tropical coastline viewed from above"
            className="absolute inset-0 h-[115%] w-full object-cover opacity-90"
          />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,26,43,.88)_0%,rgba(7,26,43,.42)_45%,rgba(7,26,43,.08)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,26,43,.88)_0%,transparent_50%)]" />

          <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-10">
            <div className="max-w-4xl">
              <Reveal>
                <div className="mb-5 flex items-center gap-3 text-[10px] font-extrabold tracking-[0.28em] text-champagne">
                  <span className="h-px w-10 bg-champagne" />
                  YOUR JOURNEY STARTS HERE
                </div>

                <h1 className="display-title text-6xl leading-[.9] text-white sm:text-7xl md:text-8xl lg:text-[112px]">
                  THE WORLD IS
                  <br />
                  <span className="text-champagne">WAITING</span> FOR YOU.
                </h1>

                <p className="mt-7 max-w-xl text-sm leading-7 text-white/80 md:text-base">
                  From spontaneous escapes to carefully planned journeys, FWL
                  Travels & Tours connects you to experiences worth
                  remembering.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => go("destinations")}
                    className="group flex items-center gap-3 bg-champagne px-6 py-4 text-[10px] font-extrabold tracking-[0.17em] text-midnight transition hover:bg-white"
                  >
                    EXPLORE DESTINATIONS
                    <ArrowRight
                      size={15}
                      className="transition group-hover:translate-x-1"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => go("contact")}
                    className="border border-white/35 bg-white/10 px-6 py-4 text-[10px] font-extrabold tracking-[0.17em] text-white backdrop-blur-sm transition hover:bg-white hover:text-midnight"
                  >
                    PLAN A TRIP
                  </button>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 z-20 w-[calc(100%-32px)] max-w-[1200px] -translate-x-1/2 translate-y-1/2">
            <form
              onSubmit={submitSearch}
              id="search"
              className="grid overflow-hidden border border-white/15 bg-white shadow-2xl md:grid-cols-[1fr_1fr_1fr_1fr_auto]"
            >
              <label className="border-b border-slate-200 p-4 md:border-b-0 md:border-r">
                <span className="block text-[9px] font-extrabold tracking-[.2em] text-slate-400">
                  FROM
                </span>

                <input
                  required
                  defaultValue="Lagos"
                  className="mt-1 w-full bg-transparent text-sm font-bold outline-none"
                />
              </label>

              <label className="border-b border-slate-200 p-4 md:border-b-0 md:border-r">
                <span className="block text-[9px] font-extrabold tracking-[.2em] text-slate-400">
                  TO
                </span>

                <input
                  required
                  placeholder="Dubai"
                  className="mt-1 w-full bg-transparent text-sm font-bold outline-none"
                />
              </label>

              <label className="border-b border-slate-200 p-4 md:border-b-0 md:border-r">
                <span className="block text-[9px] font-extrabold tracking-[.2em] text-slate-400">
                  TRAVEL DATE
                </span>

                <span className="mt-1 flex items-center gap-2">
                  <CalendarDays size={15} className="text-ocean" />

                  <input
                    required
                    type="date"
                    className="w-full bg-transparent text-sm font-bold outline-none"
                  />
                </span>
              </label>

              <div className="p-4 md:border-r">
                <span className="block text-[9px] font-extrabold tracking-[.2em] text-slate-400">
                  TRAVELLERS
                </span>

                <div className="mt-1 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setTravellers((current) => Math.max(1, current - 1))
                    }
                    className="rounded-full border border-slate-200 p-1.5 hover:border-ocean"
                    aria-label="Decrease travellers"
                  >
                    <Minus size={13} />
                  </button>

                  <span className="min-w-16 text-center text-sm font-bold">
                    {travellers} {travellers === 1 ? "Adult" : "Adults"}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setTravellers((current) => Math.min(12, current + 1))
                    }
                    className="rounded-full border border-slate-200 p-1.5 hover:border-ocean"
                    aria-label="Increase travellers"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-midnight px-6 py-5 text-[10px] font-extrabold tracking-[.15em] text-white transition hover:bg-ocean"
              >
                SEARCH JOURNEY
                <ArrowRight size={14} />
              </button>
            </form>
          </div>

          {searchMessage && (
            <div className="absolute bottom-2 left-1/2 z-30 w-[calc(100%-32px)] max-w-xl -translate-x-1/2 rounded-full bg-midnight px-5 py-3 text-center text-xs text-white shadow-xl md:bottom-4">
              {searchMessage}
            </div>
          )}
        </section>

        {/* WHY FWL */}
        <section className="relative bg-ivory px-5 pb-24 pt-40 md:px-10 md:pt-48">
          <FlightPath />

          <div className="mx-auto grid max-w-[1200px] gap-14 md:grid-cols-[1.2fr_.8fr]">
            <Reveal>
              <span className="text-[10px] font-extrabold tracking-[.2em] text-ocean">
                WHY FWL
              </span>

              <h2 className="display-title mt-4 max-w-3xl text-5xl leading-none md:text-7xl">
                MORE THAN A JOURNEY.{" "}
                <span className="text-ocean">IT&apos;S THE EXPERIENCE.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="max-w-lg text-sm leading-7 text-slate-600">
                At FWL Travels & Tours, we believe travel is more than getting
                from one place to another. It is about the people you meet, the
                places you discover, the memories you create, and the stories
                you bring home.
              </p>
            </Reveal>
          </div>

          <div className="mx-auto mt-16 grid max-w-[1200px] border-t border-midnight/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Ticket, label: "Flight Bookings" },
              { icon: Compass, label: "Tour Experiences" },
              { icon: Navigation, label: "Travel Planning" },
              { icon: Sparkles, label: "Destination Discovery" },
            ].map(({ icon: IconComponent, label }, index) => (
              <Reveal key={label} delay={index * 0.06}>
                <div className="group border-b border-midnight/10 p-7 transition hover:bg-white sm:border-r lg:min-h-48">
                  <IconComponent
                    className="mb-12 text-ocean transition group-hover:-translate-y-1 group-hover:text-champagne"
                    size={28}
                  />

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-extrabold">{label}</span>

                    <ArrowDownRight
                      size={17}
                      className="text-slate-400 transition group-hover:translate-x-1 group-hover:translate-y-1"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* DESTINATIONS */}
        <section
          id="destinations"
          className="bg-white px-5 py-24 md:px-10 md:py-32"
        >
          <div className="mx-auto max-w-[1200px]">
            <Reveal>
              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
                <div>
                  <span className="text-[10px] font-extrabold tracking-[.2em] text-ocean">
                    DESTINATIONS
                  </span>

                  <h2 className="display-title mt-4 text-5xl md:text-7xl">
                    WHERE WILL YOU
                    <br />
                    <span className="text-ocean">GO NEXT?</span>
                  </h2>
                </div>

                <p className="max-w-sm text-sm leading-7 text-slate-500">
                  From iconic cities to unforgettable escapes, discover a world
                  of possibilities.
                </p>
              </div>
            </Reveal>

            <div className="mt-14 grid auto-rows-[230px] gap-4 md:grid-cols-12 md:auto-rows-[210px]">
              {destinations.map((destination, index) => (
                <Reveal
                  key={destination.name}
                  delay={index * 0.04}
                  className={destination.size}
                >
                  <article className="group relative h-full overflow-hidden bg-midnight">
                    <img
                      loading="lazy"
                      src={destination.image}
                      alt={`${destination.name} travel destination`}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/10 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                      <div className="flex items-end justify-between gap-5">
                        <div>
                          <h3 className="display-title text-3xl text-white md:text-4xl">
                            {destination.name}
                          </h3>

                          <p className="mt-1 text-[9px] font-extrabold tracking-[.17em] text-champagne">
                            {destination.descriptor.toUpperCase()}
                          </p>
                        </div>

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition group-hover:border-champagne group-hover:bg-champagne group-hover:text-midnight">
                          <ArrowUpRight size={18} />
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <button
              type="button"
              onClick={() => go("contact")}
              className="mt-8 flex items-center gap-3 text-[10px] font-extrabold tracking-[.18em] text-ocean transition hover:text-midnight"
            >
              EXPLORE ALL DESTINATIONS
              <ArrowRight size={15} />
            </button>
          </div>
        </section>

        {/* CATEGORIES */}
        <section
          id="categories"
          className="bg-midnight px-5 py-24 text-white md:px-10 md:py-32"
        >
          <div className="mx-auto max-w-[1200px]">
            <Reveal>
              <span className="text-[10px] font-extrabold tracking-[.25em] text-champagne">
                TRAVEL CATEGORIES
              </span>

              <h2 className="display-title mt-4 max-w-4xl text-5xl leading-none md:text-7xl">
                WHATEVER YOUR REASON TO GO,{" "}
                <span className="text-champagne">
                  WE&apos;LL HELP YOU GET THERE.
                </span>
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map(([name, description, image], index) => (
                <Reveal key={name} delay={index * 0.04}>
                  <article className="group relative min-h-[300px] overflow-hidden bg-midnight p-6">
                    <img
                      loading="lazy"
                      src={image}
                      alt={`${name} travel`}
                      className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-700 group-hover:scale-105 group-hover:opacity-75"
                    />

                    <div className="absolute inset-0 bg-midnight/55" />

                    <div className="relative flex min-h-[250px] h-full flex-col justify-end">
                      <span className="mb-auto text-[10px] font-extrabold tracking-[.2em] text-champagne">
                        0{index + 1}
                      </span>

                      <h3 className="display-title text-3xl">{name}</h3>

                      <p className="mt-2 max-w-xs text-xs leading-5 text-white/70">
                        {description}
                      </p>

                      <ArrowRight
                        size={18}
                        className="mt-5 transition group-hover:translate-x-2 group-hover:text-champagne"
                      />
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="relative min-h-[650px] overflow-hidden bg-midnight">
          <motion.img
            style={{ y: experienceY }}
            src={images.experience}
            alt="Mountain landscape representing travel and discovery"
            className="absolute inset-0 h-[120%] w-full object-cover"
          />

          <div className="absolute inset-0 bg-midnight/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight/85 via-midnight/35 to-transparent" />

          <div className="relative mx-auto flex min-h-[650px] max-w-[1200px] items-center px-5 py-24 md:px-10">
            <Reveal>
              <div className="max-w-3xl">
                <span className="text-[10px] font-extrabold tracking-[.25em] text-champagne">
                  THE FWL EXPERIENCE
                </span>

                <h2 className="display-title mt-5 text-5xl leading-none text-white md:text-8xl">
                  GO FURTHER.
                  <br />
                  <span className="text-champagne">FEEL MORE.</span>
                </h2>

                <p className="mt-7 max-w-xl text-sm leading-7 text-white/75 md:text-base">
                  Your destination is only the beginning. FWL brings together
                  travel planning, flights, experiences and personalized
                  support to help make every journey feel considered.
                </p>

                <button
                  type="button"
                  onClick={() => go("contact")}
                  className="mt-8 flex items-center gap-3 bg-champagne px-6 py-4 text-[10px] font-extrabold tracking-[.17em] text-midnight transition hover:bg-white"
                >
                  START PLANNING
                  <ArrowRight size={15} />
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* JOURNEY PROCESS */}
        <section className="bg-ivory px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1200px]">
            <Reveal>
              <div className="max-w-3xl">
                <span className="text-[10px] font-extrabold tracking-[.25em] text-ocean">
                  HOW IT WORKS
                </span>

                <h2 className="display-title mt-4 text-5xl leading-none md:text-7xl">
                  FROM IDEA
                  <br />
                  <span className="text-ocean">TO TAKEOFF.</span>
                </h2>
              </div>
            </Reveal>

            <div className="mt-16 grid border-t border-midnight/10 md:grid-cols-4">
              {[
                {
                  number: "01",
                  title: "DISCOVER",
                  description:
                    "Tell us where you want to go or let FWL help you discover what comes next.",
                  icon: Compass,
                },
                {
                  number: "02",
                  title: "PLAN",
                  description:
                    "Shape your journey around your dates, preferences, travellers and priorities.",
                  icon: Navigation,
                },
                {
                  number: "03",
                  title: "BOOK",
                  description:
                    "Choose the travel option or experience that works for you.",
                  icon: Ticket,
                },
                {
                  number: "04",
                  title: "GO",
                  description:
                    "Travel with the confidence that your journey has been carefully considered.",
                  icon: Plane,
                },
              ].map(({ number, title, description, icon: JourneyIcon }, index) => (
                <Reveal key={number} delay={index * 0.06}>
                  <article className="border-b border-midnight/10 p-7 md:border-r md:py-10">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold tracking-[.2em] text-ocean">
                        {number}
                      </span>

                      <JourneyIcon size={22} className="text-ocean" />
                    </div>

                    <h3 className="mt-16 text-lg font-extrabold">
                      {title}
                    </h3>

                    <p className="mt-4 text-sm leading-6 text-slate-500">
                      {description}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="bg-white px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-14 md:grid-cols-[.7fr_1.3fr] md:items-end">
              <Reveal>
                <span className="text-[10px] font-extrabold tracking-[.25em] text-ocean">
                  THE COMMUNITY
                </span>

                <h2 className="display-title mt-4 text-5xl md:text-7xl">
                  STORIES
                  <br />
                  <span className="text-ocean">FROM THE ROAD.</span>
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="border-t border-midnight/10 pt-8">
                  <div className="mb-7 flex gap-1 text-champagne">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={15} fill="currentColor" />
                    ))}
                  </div>

                  <blockquote className="max-w-3xl text-2xl font-medium leading-10 text-midnight md:text-4xl">
                    “{testimonials[testimonial].quote}”
                  </blockquote>

                  <div className="mt-8 flex items-end justify-between gap-6">
                    <div>
                      <div className="text-[10px] font-extrabold tracking-[.18em]">
                        {testimonials[testimonial].name}
                      </div>

                      <div className="mt-1 text-[9px] tracking-[.18em] text-slate-400">
                        {testimonials[testimonial].meta}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={previousTestimonial}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-midnight/15 transition hover:border-ocean hover:text-ocean"
                        aria-label="Previous testimonial"
                      >
                        <ChevronLeft size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={nextTestimonial}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-midnight/15 transition hover:border-ocean hover:text-ocean"
                        aria-label="Next testimonial"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          className="bg-ivory px-5 py-24 md:px-10 md:py-32"
        >
          <div className="mx-auto grid max-w-[1200px] gap-14 md:grid-cols-2 md:items-center">
            <Reveal>
              <div className="relative min-h-[500px] overflow-hidden bg-midnight">
                <img
                  src={images.about}
                  alt="Traveller preparing for a journey"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-midnight/75 to-transparent" />

                <div className="absolute bottom-7 left-7 right-7">
                  <div className="flex items-center gap-3 text-[10px] font-extrabold tracking-[.2em] text-champagne">
                    <span className="h-px w-8 bg-champagne" />
                    FWL TRAVELS & TOURS
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <span className="text-[10px] font-extrabold tracking-[.25em] text-ocean">
                ABOUT FWL
              </span>

              <h2 className="display-title mt-4 text-5xl leading-none md:text-7xl">
                TRAVEL WITH
                <br />
                <span className="text-ocean">PURPOSE.</span>
              </h2>

              <p className="mt-7 text-sm leading-7 text-slate-600">
                FWL Travels & Tours exists to make travel feel less
                complicated and more meaningful. Whether you are travelling
                for business, leisure, adventure, family or discovery, we
                believe the planning should be as intentional as the journey.
              </p>

              <p className="mt-5 text-sm leading-7 text-slate-600">
                Our platform is being built to bring flights, accommodation,
                tours, travel planning and other travel services into one
                connected experience.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-midnight/10 pt-6">
                <div>
                  <div className="text-2xl font-extrabold text-ocean">01</div>
                  <div className="mt-2 text-[10px] font-extrabold tracking-[.15em]">
                    DISCOVER
                  </div>
                </div>

                <div>
                  <div className="text-2xl font-extrabold text-ocean">02</div>
                  <div className="mt-2 text-[10px] font-extrabold tracking-[.15em]">
                    EXPERIENCE
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* INSPIRATION */}
        <section className="bg-white px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1200px]">
            <Reveal>
              <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
                <div>
                  <span className="text-[10px] font-extrabold tracking-[.25em] text-ocean">
                    TRAVEL INSPIRATION
                  </span>

                  <h2 className="display-title mt-4 text-5xl md:text-7xl">
                    IDEAS FOR
                    <br />
                    <span className="text-ocean">YOUR NEXT TRIP.</span>
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => go("contact")}
                  className="flex items-center gap-3 text-[10px] font-extrabold tracking-[.18em] text-ocean"
                >
                  TALK TO FWL
                  <ArrowRight size={15} />
                </button>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {articles.map(([title, description, image], index) => (
                <Reveal key={title} delay={index * 0.05}>
                  <article className="group grid overflow-hidden border border-midnight/10 bg-ivory md:grid-cols-2">
                    <div className="relative min-h-[230px] overflow-hidden">
                      <img
                        loading="lazy"
                        src={image}
                        alt={title}
                        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-col justify-between p-6 md:p-7">
                      <div>
                        <span className="text-[9px] font-extrabold tracking-[.18em] text-ocean">
                          ARTICLE 0{index + 1}
                        </span>

                        <h3 className="mt-5 text-lg font-extrabold leading-6">
                          {title}
                        </h3>

                        <p className="mt-4 text-xs leading-5 text-slate-500">
                          {description}
                        </p>
                      </div>

                      <ArrowUpRight
                        size={20}
                        className="mt-8 text-ocean transition group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="relative overflow-hidden bg-midnight px-5 py-24 text-white md:px-10 md:py-32"
        >
          <img
            src={images.cta}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />

          <div className="absolute inset-0 bg-midnight/80" />

          <div className="relative mx-auto grid max-w-[1200px] gap-14 md:grid-cols-[.9fr_1.1fr]">
            <Reveal>
              <span className="text-[10px] font-extrabold tracking-[.25em] text-champagne">
                PLAN YOUR NEXT JOURNEY
              </span>

              <h2 className="display-title mt-4 text-5xl leading-none md:text-7xl">
                WHERE DO
                <br />
                YOU WANT
                <br />
                TO <span className="text-champagne">GO?</span>
              </h2>

              <p className="mt-7 max-w-md text-sm leading-7 text-white/65">
                Tell FWL what you have in mind. Our travel team can help you
                turn an idea into a journey.
              </p>

              <div className="mt-8 space-y-4 text-xs text-white/70">
                <div className="flex items-center gap-3">
                  <MapPin size={17} className="text-champagne" />
                  Worldwide travel planning
                </div>

                <div className="flex items-center gap-3">
                  <Ticket size={17} className="text-champagne" />
                  Flights, tours and travel services
                </div>

                <div className="flex items-center gap-3">
                  <Users size={17} className="text-champagne" />
                  Personalized travel support
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <PlanTripForm user={user} />
            </Reveal>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-midnight px-5 pb-8 pt-16 text-white md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-[1.4fr_.6fr_.6fr_.8fr]">
            <div>
              <div className="text-xl font-extrabold tracking-[.15em]">
                FWL
              </div>

              <div className="mt-1 text-[8px] font-bold tracking-[.28em] text-champagne">
                TRAVELS & TOURS
              </div>

              <p className="mt-6 max-w-sm text-sm leading-6 text-white/55">
                TRAVEL • DISCOVER • EXPERIENCE
              </p>
            </div>

            <div>
              <div className="text-[9px] font-extrabold tracking-[.2em] text-champagne">
                EXPLORE
              </div>

              <div className="mt-5 space-y-3 text-xs text-white/60">
                <button
                  type="button"
                  onClick={() => go("home")}
                  className="block hover:text-white"
                >
                  Home
                </button>

                <button
                  type="button"
                  onClick={() => go("search")}
                  className="block hover:text-white"
                >
                  Flights
                </button>

                <button
                  type="button"
                  onClick={() => go("destinations")}
                  className="block hover:text-white"
                >
                  Destinations
                </button>

                <button
                  type="button"
                  onClick={() => go("categories")}
                  className="block hover:text-white"
                >
                  Experiences
                </button>
              </div>
            </div>

            <div>
              <div className="text-[9px] font-extrabold tracking-[.2em] text-champagne">
                FWL
              </div>

              <div className="mt-5 space-y-3 text-xs text-white/60">
                <button
                  type="button"
                  onClick={() => go("about")}
                  className="block hover:text-white"
                >
                  About
                </button>

                <button
                  type="button"
                  onClick={() => go("contact")}
                  className="block hover:text-white"
                >
                  Plan a Trip
                </button>

                <button
                  type="button"
                  onClick={() => go("contact")}
                  className="block hover:text-white"
                >
                  Contact
                </button>
              </div>
            </div>

            <div>
              <div className="text-[9px] font-extrabold tracking-[.2em] text-champagne">
                CONNECT
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-champagne"
                >
                  <Facebook size={16} />
                </button>

                <button
                  type="button"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-champagne"
                >
                  <Instagram size={16} />
                </button>

                <button
                  type="button"
                  aria-label="Email"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-champagne"
                >
                  <Mail size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 pt-7 text-[9px] font-bold tracking-[.15em] text-white/35 md:flex-row">
            <span>© {new Date().getFullYear()} FWL TRAVELS & TOURS</span>
            <span>TRAVEL • DISCOVER • EXPERIENCE</span>
          </div>
        </div>
      </footer>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
      />
    </div>
  );
}

export default App;
