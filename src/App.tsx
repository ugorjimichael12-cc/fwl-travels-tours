import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDownRight, ArrowRight, CalendarDays, Check, ChevronLeft, ChevronRight,
  Compass, Facebook, Instagram, Mail, MapPin, Menu, Minus, Navigation,
  Plane, Plus, Send, Sparkles, Star, Ticket, Users, X
} from "lucide-react";

type Destination = {
  name: string; descriptor: string; image: string; size: string;
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
  { name: "Dubai", descriptor: "Future • Luxury • Adventure", image: images.dubai, size: "md:col-span-7 md:row-span-2" },
  { name: "Paris", descriptor: "Art • Romance • Culture", image: images.paris, size: "md:col-span-5" },
  { name: "Cape Town", descriptor: "Coast • Nature • Energy", image: images.cape, size: "md:col-span-5" },
  { name: "London", descriptor: "History • Style • Discovery", image: images.london, size: "md:col-span-4" },
  { name: "Zanzibar", descriptor: "Island • Escape • Ocean", image: images.zanzibar, size: "md:col-span-4" },
  { name: "Lagos", descriptor: "Culture • City • Pulse", image: images.lagos, size: "md:col-span-4" },
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
  { quote: "Sample testimonial content — replace this with a verified customer story.", name: "CUSTOMER NAME", meta: "SAMPLE TESTIMONIAL" },
  { quote: "Sample testimonial content — this area is structured for an authentic review once supplied.", name: "CUSTOMER NAME", meta: "SAMPLE TESTIMONIAL" },
  { quote: "Sample testimonial content — designed to be replaced without changing the component.", name: "CUSTOMER NAME", meta: "SAMPLE TESTIMONIAL" },
];

const articles = [
  ["5 DESTINATIONS TO ADD TO YOUR TRAVEL LIST", "A visual starting point for your next escape.", images.paris],
  ["HOW TO PLAN YOUR FIRST INTERNATIONAL TRIP", "A practical guide for a smoother first journey.", images.international],
  ["WHAT TO KNOW BEFORE YOUR NEXT JOURNEY", "Simple considerations before you leave home.", images.london],
  ["TRAVEL SMARTER. TRAVEL BETTER.", "Ideas for building better travel habits.", images.adventure],
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function FlightPath({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 top-1/2 hidden h-28 -translate-y-1/2 md:block ${dark ? "opacity-30" : "opacity-20"}`} aria-hidden="true">
      <svg viewBox="0 0 1200 140" className={`h-full w-full ${dark ? "text-champagne" : "text-ocean"}`} fill="none">
        <path d="M-40 100 C180 10 280 130 470 68 S790 5 1240 85" stroke="currentColor" strokeWidth="1.4" strokeDasharray="5 8" />
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
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 120]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const submitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchMessage("Your journey search is ready. Connect your booking service to continue.");
  };

  const submitContact = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactSent(true);
  };

  return (
    <div className="overflow-hidden bg-ivory text-midnight">
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-midnight/95 shadow-xl backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-5 md:px-10">
          <button onClick={() => go("home")} className="group text-left" aria-label="FWL Travels & Tours home">
            <div className={`font-sans text-[15px] font-extrabold tracking-[0.16em] ${scrolled ? "text-white" : "text-white"}`}>FWL</div>
            <div className="text-[8px] font-bold tracking-[0.28em] text-champagne">TRAVELS & TOURS</div>
          </button>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {[
              ["Home", "home"], ["Flights", "search"], ["Tours & Experiences", "categories"],
              ["Destinations", "destinations"], ["About", "about"], ["Contact", "contact"]
            ].map(([label, id]) => (
              <button key={id} onClick={() => go(id)} className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/85 transition hover:text-champagne">
                {label}
              </button>
            ))}
          </nav>

          <button onClick={() => go("contact")} className="hidden border border-champagne bg-champagne px-5 py-3 text-[10px] font-extrabold tracking-[0.16em] text-midnight transition hover:bg-white lg:block">
            PLAN YOUR JOURNEY
          </button>

          <button onClick={() => setMenu(!menu)} className="rounded-full p-2 text-white lg:hidden" aria-label={menu ? "Close menu" : "Open menu"}>
            {menu ? <X /> : <Menu />}
          </button>
        </div>
        <AnimatePresence>
          {menu && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="border-t border-white/10 bg-midnight px-5 py-6 lg:hidden">
              {["home", "search", "categories", "destinations", "about", "contact"].map((id, i) => {
                const labels = ["Home", "Flights", "Tours & Experiences", "Destinations", "About", "Contact"];
                return <button key={id} onClick={() => go(id)} className="block w-full border-b border-white/10 py-4 text-left text-xs font-bold uppercase tracking-[0.16em] text-white">{labels[i]}</button>;
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section id="home" className="relative flex min-h-[850px] items-end overflow-hidden bg-midnight pb-36 pt-32 md:min-h-screen md:pb-40">
          <motion.img style={{ y: heroY }} src={images.hero} alt="Cinematic tropical coastline viewed from above" className="absolute inset-0 h-[115%] w-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,26,43,.88)_0%,rgba(7,26,43,.42)_45%,rgba(7,26,43,.08)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,26,43,.88)_0%,transparent_50%)]" />
          <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-10">
            <div className="max-w-4xl">
              <Reveal>
                <div className="mb-5 flex items-center gap-3 text-[10px] font-extrabold tracking-[0.28em] text-champagne">
                  <span className="h-px w-10 bg-champagne" /> YOUR JOURNEY STARTS HERE
                </div>
                <h1 className="display-title text-6xl leading-[.9] text-white sm:text-7xl md:text-8xl lg:text-[112px]">THE WORLD IS<br /><span className="text-champagne">WAITING</span> FOR YOU.</h1>
                <p className="mt-7 max-w-xl text-sm leading-7 text-white/80 md:text-base">From spontaneous escapes to carefully planned journeys, FWL Travels & Tours connects you to experiences worth remembering.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button onClick={() => go("destinations")} className="group flex items-center gap-3 bg-champagne px-6 py-4 text-[10px] font-extrabold tracking-[0.17em] text-midnight transition hover:bg-white">EXPLORE DESTINATIONS <ArrowRight size={15} className="transition group-hover:translate-x-1" /></button>
                  <button onClick={() => go("contact")} className="border border-white/35 bg-white/10 px-6 py-4 text-[10px] font-extrabold tracking-[0.17em] text-white backdrop-blur-sm transition hover:bg-white hover:text-midnight">PLAN A TRIP</button>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 z-20 w-[calc(100%-32px)] max-w-[1200px] -translate-x-1/2 translate-y-1/2">
            <form onSubmit={submitSearch} id="search" className="grid overflow-hidden border border-white/15 bg-white shadow-2xl md:grid-cols-[1fr_1fr_1fr_1fr_auto]">
              <label className="border-b border-slate-200 p-4 md:border-b-0 md:border-r"><span className="block text-[9px] font-extrabold tracking-[.2em] text-slate-400">FROM</span><input required defaultValue="Lagos" className="mt-1 w-full bg-transparent text-sm font-bold outline-none" /></label>
              <label className="border-b border-slate-200 p-4 md:border-b-0 md:border-r"><span className="block text-[9px] font-extrabold tracking-[.2em] text-slate-400">TO</span><input required placeholder="Dubai" className="mt-1 w-full bg-transparent text-sm font-bold outline-none" /></label>
              <label className="border-b border-slate-200 p-4 md:border-b-0 md:border-r"><span className="block text-[9px] font-extrabold tracking-[.2em] text-slate-400">TRAVEL DATE</span><span className="mt-1 flex items-center gap-2"><CalendarDays size={15} className="text-ocean" /><input required type="date" className="w-full bg-transparent text-sm font-bold outline-none" /></span></label>
              <div className="p-4 md:border-r">
                <span className="block text-[9px] font-extrabold tracking-[.2em] text-slate-400">TRAVELLERS</span>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <button type="button" onClick={() => setTravellers(Math.max(1, travellers - 1))} className="rounded-full border border-slate-200 p-1.5 hover:border-ocean" aria-label="Decrease travellers"><Minus size={13}/></button>
                  <span className="min-w-16 text-center text-sm font-bold">{travellers} {travellers === 1 ? "Adult" : "Adults"}</span>
                  <button type="button" onClick={() => setTravellers(Math.min(12, travellers + 1))} className="rounded-full border border-slate-200 p-1.5 hover:border-ocean" aria-label="Increase travellers"><Plus size={13}/></button>
                </div>
              </div>
              <button className="flex items-center justify-center gap-2 bg-midnight px-6 py-5 text-[10px] font-extrabold tracking-[.15em] text-white transition hover:bg-ocean">SEARCH JOURNEY <ArrowRight size={14}/></button>
            </form>
          </div>
          {searchMessage && <div className="absolute bottom-2 left-1/2 z-30 w-[calc(100%-32px)] max-w-xl -translate-x-1/2 rounded-full bg-midnight px-5 py-3 text-center text-xs text-white shadow-xl md:bottom-4">{searchMessage}</div>}
        </section>

        <section className="relative bg-ivory px-5 pb-24 pt-40 md:px-10 md:pt-48">
          <FlightPath />
          <div className="mx-auto grid max-w-[1200px] gap-14 md:grid-cols-[1.2fr_.8fr]">
            <Reveal>
              <span className="eyebrow text-[10px] font-extrabold text-ocean">WHY FWL</span>
              <h2 className="display-title mt-4 max-w-3xl text-5xl leading-none md:text-7xl">MORE THAN A JOURNEY. <span className="text-ocean">IT'S THE EXPERIENCE.</span></h2>
            </Reveal>
            <Reveal delay={.1}>
              <p className="max-w-lg text-sm leading-7 text-slate-600">At FWL Travels & Tours, we believe travel is more than getting from one place to another. It is about the people you meet, the places you discover, the memories you create, and the stories you bring home.</p>
            </Reveal>
          </div>
          <div className="mx-auto mt-16 grid max-w-[1200px] border-t border-midnight/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [Ticket, "Flight Bookings"], [Compass, "Tour Experiences"], [Navigation, "Travel Planning"], [Sparkles, "Destination Discovery"]
            ].map(([Icon, label], i) => (
              <Reveal key={label as string} delay={i * .06}>
                <div className="group border-b border-midnight/10 p-7 transition hover:bg-white sm:border-r lg:min-h-48">
                  <Icon className="mb-12 text-ocean transition group-hover:-translate-y-1 group-hover:text-champagne" size={28}/>
                  <div className="flex items-center justify-between gap-4"><span className="text-sm font-extrabold">{label as string}</span><ArrowDownRight size={17} className="text-slate-400 transition group-hover:translate-x-1 group-hover:translate-y-1"/></div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="destinations" className="bg-white px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1200px]">
            <Reveal>
              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
                <div><span className="eyebrow text-[10px] font-extrabold text-ocean">DESTINATIONS</span><h2 className="display-title mt-4 text-5xl md:text-7xl">WHERE WILL YOU<br /><span className="text-ocean">GO NEXT?</span></h2></div>
                <p className="max-w-sm text-sm leading-7 text-slate-500">From iconic cities to unforgettable escapes, discover a world of possibilities.</p>
              </div>
            </Reveal>
            <div className="mt-14 grid auto-rows-[230px] gap-4 md:grid-cols-12 md:auto-rows-[210px]">
              {destinations.map((d, i) => (
                <Reveal key={d.name} delay={i * .04} className={d.size}>
                  <article className="group relative h-full overflow-hidden bg-midnight">
                    <img loading="lazy" src={d.image} alt={`${d.name} travel destination`} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/10 to-transparent transition group-hover:from-midnight/80" />
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                      <div className="flex items-end justify-between gap-5">
                        <div><h3 className="display-title text-3xl text-white md:text-4xl">{d.name}</h3><p className="mt-1 text-[9px] font-extrabold tracking-[.17em] text-champagne">{d.descriptor.toUpperCase()}</p></div>
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition group-hover:border-champagne group-hover:bg-champagne group-hover:text-midnight"><ArrowUpRightIcon /></div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            <button onClick={() => go("contact")} className="mt-8 flex items-center gap-3 text-[10px] font-extrabold tracking-[.18em] text-ocean transition hover:text-midnight">EXPLORE ALL DESTINATIONS <ArrowRight size={15}/></button>
          </div>
        </section>

        <section id="categories" className="bg-midnight px-5 py-24 text-white md:px-10 md:py-32">
          <div className="mx-auto max-w-[1200px]">
            <Reveal><span className="eyebrow text-[10px] font-extrabold text-champagne">TRAVEL CATEGORIES</span><h2 className="display-title mt-4 max-w-4xl text-5xl leading-none md:text-7xl">WHATEVER YOUR REASON TO GO, <span className="text-champagne">WE'LL HELP YOU GET THERE.</span></h2></Reveal>
            <div className="mt-14 grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map(([name, desc, image], i) => (
                <Reveal key={name} delay={i * .04}>
                  <article className="group relative min-h-[300px] overflow-hidden bg-midnight p-6">
                    <img loading="lazy" src={image} alt={`${name} travel`} className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-700 group-hover:scale-105 group-hover:opacity-75"/>
                    <div className="absolute inset-0 bg-midnight/55"/>
                    <div className="relative flex h-full min-h-[250px] flex-col justify-end">
                      <span className="mb-auto text-[10px] font-extrabold tracking-[.2em] text-champagne">0{i + 1}</span>
                      <h3 className="display-title text-3xl">{name}</h3>
                      <p className="mt-2 max-w-xs text-xs leading-5 text-white/70">{desc}</p>
                      <ArrowRight size={18} className="mt-5 transition group-hover:translate-x-2 group-hover:text-champagne"/>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative min-h-[650px] overflow-hidden bg-midnight">
          <motion.img style={{ y: useTransform(scrollY, [1300, 2600], [0, 90]) }} src={images.experience} alt="Mountain landscape representing travel and discovery" className="absolute inset-0 h-[120%] w-full object-cover"/>
          <div className="absolute inset-0 bg-midnight/50"/>
          <div className="absolute inset-0 bg-gradient-to-r from-midnight/80 to-transparent"/>
          <div className="relative mx-auto flex min-h-[650px] max-w-[1200px] items-center px-5 py-24 md:px-10">
            <Reveal><span className="eyebrow text-[10px] font-extrabold text-champagne">FEATURED EXPERIENCE</span><h2 className="display-title mt-5 max-w-3xl text-6xl leading-[.9] text-white md:text-8xl">YOUR NEXT STORY <span className="text-champagne">STARTS HERE.</span></h2><p className="mt-6 text-sm text-white/75">Discover destinations. Experience cultures. Create memories.</p><button onClick={() => go("destinations")} className="mt-8 flex items-center gap-3 bg-white px-6 py-4 text-[10px] font-extrabold tracking-[.17em] text-midnight transition hover:bg-champagne">START EXPLORING <ArrowRight size={15}/></button></Reveal>
          </div>
        </section>

        <section className="relative overflow-hidden bg-ivory px-5 py-24 md:px-10 md:py-32">
          <FlightPath />
          <div className="relative mx-auto max-w-[1200px]">
            <Reveal><span className="eyebrow text-[10px] font-extrabold text-ocean">THE FWL JOURNEY</span><h2 className="display-title mt-4 text-5xl md:text-7xl">FROM <span className="text-ocean">IDEA</span> TO ITINERARY.</h2></Reveal>
            <div className="mt-16 grid gap-0 border-y border-midnight/10 md:grid-cols-5">
              {["TELL US WHERE YOU WANT TO GO", "WE HELP YOU PLAN", "WE ARRANGE YOUR JOURNEY", "YOU TRAVEL", "YOU CREATE THE MEMORY"].map((step, i) => (
                <Reveal key={step} delay={i * .06}><div className="relative border-b border-midnight/10 p-6 md:border-b-0 md:border-r md:last:border-r-0 md:min-h-64"><span className="font-mono text-xs text-champagne">0{i + 1}</span><Plane size={18} className="absolute right-6 top-6 rotate-12 text-ocean/60"/><h3 className="mt-24 max-w-[170px] text-xs font-extrabold leading-5 tracking-[.08em]">{step}</h3></div></Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto grid max-w-[1000px] gap-12 md:grid-cols-[.8fr_1.2fr] md:items-end">
            <Reveal><span className="eyebrow text-[10px] font-extrabold text-ocean">COMMUNITY</span><h2 className="display-title mt-4 text-5xl md:text-6xl">TRAVEL STORIES FROM <span className="text-ocean">OUR COMMUNITY.</span></h2><div className="mt-7 flex gap-2"><button onClick={() => setTestimonial((testimonial - 1 + testimonials.length) % testimonials.length)} className="rounded-full border border-midnight/15 p-3 hover:bg-ivory" aria-label="Previous testimonial"><ChevronLeft size={18}/></button><button onClick={() => setTestimonial((testimonial + 1) % testimonials.length)} className="rounded-full border border-midnight/15 p-3 hover:bg-ivory" aria-label="Next testimonial"><ChevronRight size={18}/></button></div></Reveal>
            <AnimatePresence mode="wait">
              <motion.div key={testimonial} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="border-l-2 border-champagne pl-7 md:pl-10">
                <div className="mb-5 flex gap-1 text-champagne">{[1,2,3,4,5].map(n => <Star key={n} size={14} fill="currentColor"/>)}</div>
                <blockquote className="display-title text-3xl leading-tight md:text-4xl">“{testimonials[testimonial].quote}”</blockquote>
                <div className="mt-7 text-[10px] font-extrabold tracking-[.18em] text-ocean">{testimonials[testimonial].name} <span className="ml-2 text-slate-400">/ {testimonials[testimonial].meta}</span></div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <section id="about" className="bg-midnight px-5 py-24 text-white md:px-10 md:py-32">
          <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-2 md:items-center">
            <Reveal><div className="relative aspect-[4/5] overflow-hidden"><img loading="lazy" src={images.about} alt="Traveller exploring a destination" className="h-full w-full object-cover"/><div className="absolute bottom-5 left-5 flex items-center gap-3 bg-white px-4 py-3 text-[9px] font-extrabold tracking-[.14em] text-midnight"><MapPin size={14} className="text-ocean"/> TRAVEL. DISCOVER. EXPERIENCE.</div></div></Reveal>
            <Reveal delay={.1}><span className="eyebrow text-[10px] font-extrabold text-champagne">ABOUT FWL</span><h2 className="display-title mt-4 text-5xl leading-none md:text-7xl">TRAVEL WITH PURPOSE. <span className="text-champagne">TRAVEL WITH CONFIDENCE.</span></h2><p className="mt-7 max-w-xl text-sm leading-7 text-white/65">FWL Travels & Tours is built around one simple idea: making travel easier, more exciting, and more memorable.</p><button onClick={() => go("contact")} className="mt-8 flex items-center gap-3 border border-white/25 px-6 py-4 text-[10px] font-extrabold tracking-[.17em] transition hover:bg-champagne hover:text-midnight">DISCOVER FWL <ArrowRight size={15}/></button></Reveal>
          </div>
        </section>

        <section className="bg-ivory px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1200px]">
            <Reveal><div className="flex items-end justify-between"><div><span className="eyebrow text-[10px] font-extrabold text-ocean">TRAVEL INSPIRATION</span><h2 className="display-title mt-4 text-5xl md:text-7xl">GO FURTHER. <span className="text-ocean">THINK BIGGER.</span></h2></div></div></Reveal>
            <div className="mt-14 grid gap-5 md:grid-cols-12">
              {articles.map(([title, desc, image], i) => (
                <Reveal key={title} delay={i * .04} className={i === 0 ? "md:col-span-7" : i === 1 ? "md:col-span-5" : "md:col-span-4"}>
                  <article className="group">
                    <div className={`overflow-hidden ${i === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}`}><img loading="lazy" src={image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105"/></div>
                    <div className="pt-5"><span className="text-[9px] font-extrabold tracking-[.18em] text-ocean">TRAVEL NOTE 0{i + 1}</span><h3 className="mt-2 max-w-lg text-lg font-extrabold leading-snug">{title}</h3><p className="mt-2 text-xs leading-5 text-slate-500">{desc}</p><ArrowRight size={17} className="mt-4 transition group-hover:translate-x-2"/></div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative min-h-[620px] overflow-hidden bg-midnight">
          <img src={images.cta} alt="Tropical beach destination" className="absolute inset-0 h-full w-full object-cover"/>
          <div className="absolute inset-0 bg-midnight/60"/>
          <div className="relative mx-auto flex min-h-[620px] max-w-[1200px] items-center justify-center px-5 text-center md:px-10">
            <Reveal><span className="eyebrow text-[10px] font-extrabold text-champagne">READY WHEN YOU ARE</span><h2 className="display-title mt-5 text-6xl leading-[.9] text-white md:text-8xl">YOUR NEXT ADVENTURE IS <span className="text-champagne">CLOSER</span> THAN YOU THINK.</h2><p className="mx-auto mt-6 max-w-xl text-sm text-white/75">Let's turn your travel plans into an experience worth remembering.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><button onClick={() => go("contact")} className="bg-champagne px-7 py-4 text-[10px] font-extrabold tracking-[.17em] text-midnight transition hover:bg-white">PLAN MY JOURNEY</button><button onClick={() => go("destinations")} className="border border-white/30 px-7 py-4 text-[10px] font-extrabold tracking-[.17em] text-white transition hover:bg-white hover:text-midnight">EXPLORE DESTINATIONS</button></div></Reveal>
          </div>
        </section>

        <section id="contact" className="bg-white px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto grid max-w-[1200px] gap-16 md:grid-cols-[.75fr_1.25fr]">
            <Reveal>
              <span className="eyebrow text-[10px] font-extrabold text-ocean">CONTACT FWL</span>
              <h2 className="display-title mt-4 text-5xl leading-none md:text-7xl">LET'S PLAN YOUR <span className="text-ocean">NEXT JOURNEY.</span></h2>
              <div className="mt-10 space-y-5 text-xs">
                {[
                  [Users, "Phone / WhatsApp", "[ CONTACT NUMBER TO BE ADDED ]"],
                  [Mail, "Email", "[ EMAIL ADDRESS TO BE ADDED ]"],
                  [MapPin, "Office Address", "[ OFFICE ADDRESS TO BE ADDED ]"],
                  [Instagram, "Instagram", "[ INSTAGRAM HANDLE TO BE ADDED ]"],
                  [Facebook, "Facebook", "[ FACEBOOK PAGE TO BE ADDED ]"],
                ].map(([Icon, label, value]) => <div key={label as string} className="flex gap-4"><Icon size={17} className="mt-0.5 shrink-0 text-champagne"/><div><div className="text-[9px] font-extrabold tracking-[.15em] text-slate-400">{label as string}</div><div className="mt-1 font-bold">{value as string}</div></div></div>)}
                <div className="flex gap-4"><span className="mt-0.5 text-[11px] font-extrabold text-champagne">TK</span><div><div className="text-[9px] font-extrabold tracking-[.15em] text-slate-400">TikTok</div><div className="mt-1 font-bold">[ TIKTOK HANDLE TO BE ADDED ]</div></div></div>
              </div>
            </Reveal>

            <Reveal delay={.1}>
              {contactSent ? (
                <div className="flex min-h-[500px] flex-col items-center justify-center border border-slate-200 bg-ivory p-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-champagne text-midnight"><Check/></div>
                  <h3 className="display-title mt-6 text-4xl">ENQUIRY READY.</h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">Your details have been captured in this frontend demo. Connect the form to your preferred backend or email service before going live.</p>
                  <button onClick={() => setContactSent(false)} className="mt-7 text-[10px] font-extrabold tracking-[.16em] text-ocean">SEND ANOTHER ENQUIRY</button>
                </div>
              ) : (
                <form onSubmit={submitContact} className="grid gap-5 border border-slate-200 bg-ivory p-6 md:p-8">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="FULL NAME" name="name" required />
                    <Field label="EMAIL ADDRESS" name="email" type="email" required />
                    <Field label="PHONE NUMBER" name="phone" required />
                    <Field label="DESTINATION" name="destination" required />
                    <Field label="TRAVEL DATE" name="travelDate" type="date" />
                  </div>
                  <label className="block"><span className="text-[9px] font-extrabold tracking-[.18em] text-slate-500">MESSAGE</span><textarea required name="message" rows={6} className="mt-2 w-full resize-none border-b border-slate-300 bg-transparent py-3 text-sm outline-none transition focus:border-ocean" placeholder="Tell us a little about your journey..." /></label>
                  <button className="flex items-center justify-center gap-3 bg-midnight px-6 py-4 text-[10px] font-extrabold tracking-[.18em] text-white transition hover:bg-ocean"><Send size={15}/> SEND ENQUIRY</button>
                  <p className="text-center text-[10px] leading-4 text-slate-400">Frontend demo only. No email is sent until a backend or form service is connected.</p>
                </form>
              )}
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-midnight px-5 pb-8 pt-20 text-white md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-[1.4fr_1fr_1fr]">
            <div><div className="text-lg font-extrabold tracking-[.16em]">FWL</div><div className="mt-1 text-[8px] font-bold tracking-[.28em] text-champagne">TRAVELS & TOURS</div><p className="mt-5 max-w-xs text-sm leading-6 text-white/50">Explore. Experience. Remember.</p></div>
            <div><div className="text-[9px] font-extrabold tracking-[.2em] text-champagne">NAVIGATE</div><div className="mt-5 grid grid-cols-2 gap-3 text-xs text-white/65">{["Home","Flights","Tours","Destinations","About","Contact"].map(x => <button key={x} onClick={() => go(x === "Flights" ? "search" : x.toLowerCase())} className="text-left transition hover:text-white">{x}</button>)}</div></div>
            <div><div className="text-[9px] font-extrabold tracking-[.2em] text-champagne">CONTACT</div><div className="mt-5 space-y-3 text-xs text-white/65"><div>[ PHONE / WHATSAPP ]</div><div>[ EMAIL ]</div><div>[ ADDRESS ]</div><div className="flex gap-4 pt-2"><Instagram size={16}/><Facebook size={16}/><span className="text-[10px] font-bold">TK</span><span className="text-[10px] font-bold">X</span></div></div></div>
          </div>
          <div className="flex flex-col justify-between gap-3 pt-7 text-[9px] font-bold tracking-[.12em] text-white/35 sm:flex-row"><span>© 2026 FWL TRAVELS & TOURS. ALL RIGHTS RESERVED.</span><span>TRAVEL • DISCOVER • EXPERIENCE</span></div>
        </div>
      </footer>
    </div>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return <label className="block"><span className="text-[9px] font-extrabold tracking-[.18em] text-slate-500">{label}</span><input required={required} name={name} type={type} className="mt-2 w-full border-b border-slate-300 bg-transparent py-3 text-sm outline-none transition focus:border-ocean" /></label>;
}

function ArrowUpRightIcon() {
  return <ArrowDownRight size={17} className="-rotate-90" />;
}

export default App;