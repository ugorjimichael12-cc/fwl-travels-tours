import { useState } from "react";
import type { FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import { Check, Send } from "lucide-react";
import { supabase } from "./lib/supabase";

type PlanTripFormProps = {
  user?: User | null;
};

const createRequestReference = () => {
  const date = new Date();

  const datePart = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("");

  const randomPart = Math.random().toString(36).slice(2, 7).toUpperCase();

  return `FWL-TR-${datePart}-${randomPart}`;
};

const inputClass =
  "w-full border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-ocean";

const labelClass =
  "mb-2 block text-[9px] font-extrabold tracking-[.18em] text-slate-400";

export default function PlanTripForm({ user }: PlanTripFormProps) {
  const [name, setName] = useState(user?.user_metadata?.full_name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState("");
  const [origin, setOrigin] = useState("Lagos");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [tripType, setTripType] = useState("Holiday");
  const [budget, setBudget] = useState("");
  const [cabinClass, setCabinClass] = useState("Economy");
  const [accommodation, setAccommodation] = useState("Hotel");
  const [services, setServices] = useState<string[]>([]);
  const [additionalRequests, setAdditionalRequests] = useState("");

  const [loading, setLoading] = useState(false);
  const [submittedReference, setSubmittedReference] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const toggleService = (service: string) => {
    setServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service]
    );
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");
    setSubmittedReference("");

    if (returnDate && departureDate && returnDate < departureDate) {
      setErrorMessage(
        "Your return date cannot be earlier than your departure date."
      );
      return;
    }

    const numericBudget = budget ? Number(budget) : null;

    if (
      numericBudget !== null &&
      (!Number.isFinite(numericBudget) || numericBudget < 0)
    ) {
      setErrorMessage("Please enter a valid budget.");
      return;
    }

    setLoading(true);

    try {
      const requestReference = createRequestReference();

      const notes = [
        `CUSTOMER NAME: ${name.trim()}`,
        `CUSTOMER EMAIL: ${email.trim()}`,
        `CUSTOMER PHONE: ${phone.trim()}`,
        `TRIP TYPE: ${tripType}`,
        `ACCOMMODATION PREFERENCE: ${accommodation}`,
        `SERVICES NEEDED: ${
          services.length > 0 ? services.join(", ") : "Not specified"
        }`,
        `ADDITIONAL REQUESTS: ${
          additionalRequests.trim() || "None provided"
        }`,
      ].join("\n");

      const { error } = await supabase.from("travel_requests").insert({
        request_reference: requestReference,
        request_type: tripType,
        origin: origin.trim() || "Lagos",
        destination: destination.trim(),
        departure_date: departureDate || null,
        return_date: returnDate || null,
        travellers,
        cabin_class: cabinClass,
        budget: numericBudget,
        currency: "NGN",
        notes,
        status: "new",
        assigned_to: null,
        customer_id: null,
      });

      if (error) {
        throw error;
      }

      setSubmittedReference(requestReference);

      setPhone("");
      setOrigin("Lagos");
      setDestination("");
      setDepartureDate("");
      setReturnDate("");
      setTravellers(1);
      setTripType("Holiday");
      setBudget("");
      setCabinClass("Economy");
      setAccommodation("Hotel");
      setServices([]);
      setAdditionalRequests("");
    } catch (error: any) {
      console.error("FWL travel request error:", error);

      const message =
        error?.message ||
        error?.details ||
        error?.hint ||
        "We could not submit your travel request. Please try again.";

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  if (submittedReference) {
    return (
      <div className="bg-white p-7 text-midnight md:p-9">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <Check size={27} />
        </div>

        <div className="mt-7">
          <span className="text-[9px] font-extrabold tracking-[.2em] text-ocean">
            REQUEST RECEIVED
          </span>

          <h3 className="display-title mt-3 text-4xl md:text-5xl">
            YOUR JOURNEY
            <br />
            <span className="text-ocean">STARTS HERE.</span>
          </h3>

          <p className="mt-5 text-sm leading-7 text-slate-600">
            Thank you for choosing FWL Travels & Tours. Your travel request
            has been successfully submitted and our team can now review it.
          </p>

          <div className="mt-7 border border-slate-200 bg-slate-50 p-5">
            <div className="text-[9px] font-extrabold tracking-[.18em] text-slate-400">
              YOUR FWL REQUEST REFERENCE
            </div>

            <div className="mt-2 text-lg font-extrabold tracking-[.08em] text-ocean">
              {submittedReference}
            </div>
          </div>

          <p className="mt-5 text-xs leading-5 text-slate-500">
            Keep this reference for your records. FWL can use it to identify
            your travel request when communicating with you.
          </p>

          <button
            type="button"
            onClick={() => setSubmittedReference("")}
            className="mt-7 flex items-center gap-3 bg-midnight px-6 py-4 text-[10px] font-extrabold tracking-[.17em] text-white transition hover:bg-ocean"
          >
            PLAN ANOTHER JOURNEY
            <Send size={15} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submitForm}
      className="bg-white p-6 text-midnight md:p-8"
    >
      <div className="mb-8 border-b border-slate-200 pb-6">
        <div className="text-[9px] font-extrabold tracking-[.18em] text-ocean">
          FWL ASSISTED TRAVEL
        </div>

        <h3 className="mt-2 text-xl font-extrabold">
          Tell us what you have in mind.
        </h3>

        <p className="mt-2 text-xs leading-5 text-slate-500">
          Give us the details of your journey and our travel team can review
          your request.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label>
          <span className={labelClass}>FULL NAME</span>
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputClass}
            placeholder="Your full name"
          />
        </label>

        <label>
          <span className={labelClass}>EMAIL ADDRESS</span>
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClass}
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label className="mt-5 block">
        <span className={labelClass}>PHONE / WHATSAPP NUMBER</span>
        <input
          required
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className={inputClass}
          placeholder="+234..."
        />
      </label>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label>
          <span className={labelClass}>FROM</span>
          <input
            required
            value={origin}
            onChange={(event) => setOrigin(event.target.value)}
            className={inputClass}
            placeholder="Lagos"
          />
        </label>

        <label>
          <span className={labelClass}>DESTINATION</span>
          <input
            required
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            className={inputClass}
            placeholder="Dubai, UAE"
          />
        </label>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label>
          <span className={labelClass}>DEPARTURE DATE</span>
          <input
            required
            type="date"
            min={today}
            value={departureDate}
            onChange={(event) => {
              setDepartureDate(event.target.value);

              if (returnDate && event.target.value > returnDate) {
                setReturnDate("");
              }
            }}
            className={inputClass}
          />
        </label>

        <label>
          <span className={labelClass}>RETURN DATE</span>
          <input
            type="date"
            min={departureDate || today}
            value={returnDate}
            onChange={(event) => setReturnDate(event.target.value)}
            className={inputClass}
          />
        </label>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label>
          <span className={labelClass}>TRIP TYPE</span>
          <select
            value={tripType}
            onChange={(event) => setTripType(event.target.value)}
            className={inputClass}
          >
            <option>Holiday</option>
            <option>Business</option>
            <option>Family</option>
            <option>Honeymoon</option>
            <option>Adventure</option>
            <option>Leisure</option>
            <option>Other</option>
          </select>
        </label>

        <label>
          <span className={labelClass}>NUMBER OF TRAVELLERS</span>
          <input
            required
            type="number"
            min={1}
            max={50}
            value={travellers}
            onChange={(event) =>
              setTravellers(
                Math.min(50, Math.max(1, Number(event.target.value) || 1))
              )
            }
            className={inputClass}
          />
        </label>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label>
          <span className={labelClass}>TRAVEL BUDGET — NGN</span>
          <input
            type="number"
            min="0"
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            className={inputClass}
            placeholder="e.g. 1500000"
          />
        </label>

        <label>
          <span className={labelClass}>FLIGHT CABIN</span>
          <select
            value={cabinClass}
            onChange={(event) => setCabinClass(event.target.value)}
            className={inputClass}
          >
            <option>Economy</option>
            <option>Premium Economy</option>
            <option>Business</option>
            <option>First Class</option>
          </select>
        </label>
      </div>

      <label className="mt-5 block">
        <span className={labelClass}>ACCOMMODATION PREFERENCE</span>
        <select
          value={accommodation}
          onChange={(event) => setAccommodation(event.target.value)}
          className={inputClass}
        >
          <option>Hotel</option>
          <option>Luxury Hotel</option>
          <option>Resort</option>
          <option>Apartment</option>
          <option>Villa</option>
          <option>Not sure — help me choose</option>
          <option>No accommodation needed</option>
        </select>
      </label>

      <div className="mt-5">
        <span className={labelClass}>SERVICES NEEDED</span>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "Flight",
            "Accommodation",
            "Tours & Experiences",
            "Airport Transfer",
            "Visa Assistance",
            "Travel Planning",
          ].map((service) => (
            <label
              key={service}
              className="flex cursor-pointer items-center gap-3 border border-slate-200 px-4 py-3 text-xs transition hover:border-ocean"
            >
              <input
                type="checkbox"
                checked={services.includes(service)}
                onChange={() => toggleService(service)}
                className="h-4 w-4 accent-ocean"
              />
              <span>{service}</span>
            </label>
          ))}
        </div>
      </div>

      <label className="mt-5 block">
        <span className={labelClass}>ADDITIONAL REQUESTS</span>
        <textarea
          rows={5}
          value={additionalRequests}
          onChange={(event) => setAdditionalRequests(event.target.value)}
          className={`${inputClass} resize-none`}
          placeholder="Tell us anything else we should know about your journey..."
        />
      </label>

      {errorMessage && (
        <div className="mt-5 border border-red-200 bg-red-50 p-4 text-xs leading-5 text-red-700">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 flex w-full items-center justify-center gap-3 bg-midnight px-6 py-4 text-[10px] font-extrabold tracking-[.17em] text-white transition hover:bg-ocean disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "SUBMITTING REQUEST..." : "SUBMIT TRAVEL REQUEST"}
        <Send size={15} />
      </button>

      <p className="mt-4 text-center text-[10px] leading-5 text-slate-400">
        Your request will be reviewed by the FWL travel team.
      </p>
    </form>
  );
}
