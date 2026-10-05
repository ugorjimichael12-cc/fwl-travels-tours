import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDownRight, ArrowRight, CalendarDays, Check, ChevronLeft, ChevronRight,
  Compass, Facebook, Instagram, Mail, MapPin, Menu, Minus, Navigation,
  Plane, Plus, Send, Sparkles, Star, Ticket, Users, X
} from "lucide-react";
import { supabase } from "./lib/supabase";
import AuthModal from "./components/AuthModal";

type Destination = {
  name: string;
  descriptor: string;
  image: string;
  size: string;
};

const images = {
  hero: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=85",
  dubai: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1400&q=85",
  paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=85",
  cape: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1400&q=85",
  london: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1400&q=85",
  zanzibar: "https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=1400&q=85",
  lagos: "https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?auto=format&fit=crop&w=1400&q=85",
  experience: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2200&q=85",
  about: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=85",
  cta: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=85",
  business: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
  holiday: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85",
  international: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=85",
  leisure: "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?auto=format&fit=crop&w=1200&q=85",
  adventure: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
  romantic: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85",
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
];

const testimonials = [
  {
    quote: "Sample testimonial content — replace this with a verified customer story.",
    name: "CUSTOMER NAME",
    meta: "SAMPLE TESTIMONIAL",
  },
  {
    quote: "Sample testimonial content — this area is structured for an authentic review once supplied.",
    name: "CUSTOMER NAME",
    meta: "SAMPLE TESTIMONIAL",
  },
  {
    quote: "Sample testimonial content — designed to be replaced without changing the component.",
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
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
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

function App() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [travellers, setTravellers] = useState(1);
  const [searchMessage, setSearchMessage] = useState("");
  const [testimonial, setTestimonial] = useState(0);
  const [contactSent, setContactSent] = useState(false);

  // FWL authentication state
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 120]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep FWL authentication state synchronized with Supabase
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

  const submitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSearchMessage(
      "Your journey search is ready. Connect your booking service to continue."
    );
  };

  const submitContact = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactSent(true);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
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
            onClick={() => go("home")}
            className="group text-left"
            aria-label="FWL Travels & Tours home"
          >
            <div
              className={`font-sans text-[15px] font-extrabold tracking-[0.16em] ${
                scrolled ? "text-white" : "text-white"
              }`}
            >
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
                onClick={() => setAuthOpen(true)}
                className="border border-white/30 bg-white/5 px-5 py-3 text-[10px] font-extrabold tracking-[0.16em] text-white backdrop-blur-sm transition hover:border-champagne hover:bg-champagne hover:text-midnight"
              >
                SIGN IN
              </button>
            ) : (
              <button
                onClick={handleSignOut}
                className="border border-white/30 bg-white/5 px-5 py-3 text-[10px] font-extrabold tracking-[0.16em] text-white backdrop-blur-sm transition hover:border-champagne hover:bg-champagne hover:text-midnight"
              >
                ACCOUNT / SIGN OUT
              </button>
            )}

            <button
              onClick={() => go("contact")}
              className="border border-champagne bg-champagne px-5 py-3 text-[10px] font-extrabold tracking-[0.16em] text-midnight transition hover:bg-white"
            >
              PLAN YOUR JOURNEY
            </button>
          </div>

          <button
            onClick={() => setMenu(!menu)}
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
                "home",
                "search",
                "categories",
                "destinations",
                "about",
                "contact",
              ].map((id, i) => {
                const labels = [
                  "Home",
                  "Flights",
                  "Tours & Experiences",
                  "Destinations",
                  "About",
                  "Contact",
                ];

                return (
                  <button
                    key={id}
                    onClick={() => go(id)}
                    className="block w-full border-b border-white/10 py-4 text-left text-xs font-bold uppercase tracking-[0.16em] text-white"
                  >
                    {labels[i]}
                  </button>
                );
              })}

              <div className="pt-5">
                {!user ? (
                  <button
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
                      setTravellers(Math.max(1, travellers - 1))
                    }
                    className="rounded-full border border-slate-200 p-1.5 hover:border-ocean"
                    aria-label="Decrease travellers"
                  >
                    <Minus size={13} />
                  </button>

                  <span className="min-w-16 text-center text-sm font-bold">
                    {travellers}{" "}
                    {travellers === 1 ? "Adult" : "Adults"}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setTravellers(Math.min(12, travellers + 1))
                    }
                    className="rounded-full border border-slate-200 p-1.5 hover:border-ocean"
                    aria-label="Increase travellers"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              <button className="flex items-center justify-center gap-2 bg-midnight px-6 py-5 text-[10px] font-extrabold tracking-[.15em] text-white transition hover:bg-ocean">
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

        <section className="relative bg-ivory px-5 pb-24 pt-40 md:px-10 md:pt-48">
          <FlightPath />

          <div className="mx-auto grid max-w-[1200px] gap-14 md:grid-cols-[1.2fr_.8fr]">
            <Reveal>
              <span className="eyebrow text-[10px] font-extrabold text-ocean">
                WHY FWL
              </span>

              <h2 className="display-title mt-4 max-w-3xl text-5xl leading-none md:text-7xl">
                MORE THAN A JOURNEY.{" "}
                <span className="text-ocean">IT'S THE EXPERIENCE.</span>
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
              [Ticket, "Flight Bookings"],
              [Compass, "Tour Experiences"],
              [Navigation, "Travel Planning"],
              [Sparkles, "Destination Discovery"],
            ].map(([Icon, label], i) => (
              <Reveal
                key={label as string}
                delay={i * 0.06}
              >
                <div className="group border-b border-midnight/10 p-7 transition hover:bg-white sm:border-r lg:min-h-48">
                  <Icon
                    className="mb-12 text-ocean transition group-hover:-translate-y-1 group-hover:text-champagne"
                    size={28}
                  />

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-extrabold">
                      {label as string}
                    </span>

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

        <section
          id="destinations"
          className="bg-white px-5 py-24 md:px-10 md:py-32"
        >
          <div className="mx-auto max-w-[1200px]">
            <Reveal>
              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
                <div>
                  <span className="eyebrow text-[10px] font-extrabold text-ocean">
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
              {destinations.map((d, i) => (
                <Reveal
                  key={d.name}
                  delay={i * 0.04}
                  className={d.size}
                >
                  <article className="group relative h-full overflow-hidden bg-midnight">
                    <img
                      loading="lazy"
                      src={d.image}
                      alt={`${d.name} travel destination`}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/10 to-transparent transition group-hover:from-midnight/80" />

                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                      <div className="flex items-end justify-between gap-5">
                        <div>
                          <h3 className="display-title text-3xl text-white md:text-4xl">
                            {d.name}
                          </h3>

                          <p className="mt-1 text-[9px] font-extrabold tracking-[.17em] text-champagne">
                            {d.descriptor.toUpperCase()}
                          </p>
                        </div>

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition group-hover:border-champagne group-hover:bg-champagne group-hover:text-midnight">
                          <ArrowUpRightIcon />
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <button
              onClick={() => go("contact")}
              className="mt-8 flex items-center gap-3 text-[10px] font-extrabold tracking-[.18em] text-ocean transition hover:text-midnight"
            >
              EXPLORE ALL DESTINATIONS
              <ArrowRight size={15} />
            </button>
          </div>
        </section>

        <section
          id="categories"
          className="bg-midnight px-5 py-24 text-white md:px-10 md:py-32"
        >
          <div className="mx-auto max-w-[1200px]">
            <Reveal>
              <span className="eyebrow text-[10px] font-extrabold text-champagne">
                TRAVEL CATEGORIES
              </span>

              <h2 className="display-title mt-4 max-w-4xl text-5xl leading-none md:text-7xl">
                WHATEVER YOUR REASON TO GO,{" "}
                <span className="text-champagne">
                  WE'LL HELP YOU GET THERE.
                </span>
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map(([name, desc, image], i) => (
                <Reveal key={name} delay={i * 0.04}>
                  <article className="group relative min-h-[300px] overflow-hidden bg-midnight p-6">
                    <img
                      loading="lazy"
                      src={image}
                      alt={`${name} travel`}
                      className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-700 group-hover:scale-105 group-hover:opacity-75"
                    />

                    <div className="absolute inset-0 bg-midnight/55" />

                    <div className="relative flex h-full min-h-[250px] flex-col justify-end">
                      <span className="mb-auto text-[10px] font-extrabold tracking-[.2em] text-champagne">
                        0{i + 1}
                      </span>

                      <h3 className="display-title text-3xl">
                        {name}
                      </h3>

                      <p className="mt-2 max-w-xs text-xs leading-5 text-white/70">
                        {desc}
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

        <section className="relative min-h-[650px] overflow-hidden bg-midnight">
          <motion.img
            style={{
              y: useTransform(scrollY, [1300, 2600], [0, 90]),
            }}
            src={images.experience}
            alt="Mountain landscape representing travel and discovery"
            className="absolute inset-0 h-[120%] w-full object-cover"
          />

          <div className="absolute inset-0 bg-midnight/50" />
          <
