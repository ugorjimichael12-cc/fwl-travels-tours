import { useState, type FormEvent } from "react";
import { X, Mail, Lock, User as UserIcon, Phone, Loader2 } from "lucide-react";
import { supabase } from "./lib/supabase";

type AuthMode = "signin" | "signup";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

export default function AuthModal({
  open,
  onClose,
  onAuthenticated,
}: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!open) return null;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    if (mode === "signup") {
      if (!fullName.trim()) {
        setMessage("Please enter your full name.");
        return;
      }

      if (password.length < 8) {
        setMessage("Password must be at least 8 characters.");
        return;
      }
    }

    setLoading(true);

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: fullName.trim(),
              phone: phone.trim(),
            },
          },
        });

        if (error) throw error;

        if (data.session) {
          onAuthenticated();
          onClose();
        } else {
          setMessage(
            "Account created successfully. Please check your email to confirm your account."
          );
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) throw error;

        onAuthenticated();
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          aria-label="Close authentication dialog"
        >
          <X size={20} />
        </button>

        <div className="mb-7 pr-8">
          <p className="text-[10px] font-extrabold tracking-[.25em] text-ocean">
            FWL TRAVELS & TOURS
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-midnight">
            {mode === "signin" ? "Welcome back." : "Create your account."}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {mode === "signin"
              ? "Sign in to continue planning your journeys."
              : "Create an account to manage your FWL travel experience."}
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {mode === "signup" && (
            <>
              <label className="block">
                <span className="mb-2 block text-xs font-bold text-slate-700">
                  Full name
                </span>
                <div className="relative">
                  <UserIcon
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-ocean"
                    placeholder="Your full name"
                    autoComplete="name"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold text-slate-700">
                  Phone
                </span>
                <div className="relative">
                  <Phone
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-ocean"
                    placeholder="Phone number"
                    autoComplete="tel"
                  />
                </div>
              </label>
            </>
          )}

          <label className="block">
            <span className="mb-2 block text-xs font-bold text-slate-700">
              Email
            </span>
            <div className="relative">
              <Mail
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-ocean"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-bold text-slate-700">
              Password
            </span>
            <div className="relative">
              <Lock
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-ocean"
                placeholder="Your password"
                autoComplete={
                  mode === "signup" ? "new-password" : "current-password"
                }
                required
              />
            </div>
          </label>

          {message && (
            <p
              className="rounded-2xl bg-slate-50 p-3 text-sm leading-6 text-slate-600"
              role="status"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-midnight px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-ocean disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && <Loader2 size={17} className="animate-spin" />}
            {loading
              ? "Please wait..."
              : mode === "signin"
                ? "Sign in"
                : "Create account"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setMessage("");
          }}
          className="mt-5 w-full text-center text-sm font-bold text-ocean"
        >
          {mode === "signin"
            ? "Don't have an account? Create one"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
