import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { HeartPulse, Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign in — Meridian Clinic OS" },
      {
        name: "description",
        content:
          "Sign in to Meridian Clinic OS to manage patients, appointments, billing, prescriptions and inventory in one place.",
      },
      { property: "og:title", content: "Sign in — Meridian Clinic OS" },
      {
        property: "og:description",
        content: "The clinic operating system for patients, scheduling, billing and pharmacy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("nikhil@meridianhealth.in");
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || password.length < 6) {
      setError("Enter a valid email and a password of at least 6 characters.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => navigate({ to: "/dashboard" }), 800);
  };

  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-[1.05fr_1fr]">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-sidebar p-12 lg:flex">
        <div className="absolute -right-24 -top-24 size-[420px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 size-[380px] rounded-full bg-primary/10 blur-3xl" />
        <div className="relative flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
            <HeartPulse className="size-5" />
          </span>
          <p className="text-sm font-semibold">Meridian Clinic OS</p>
        </div>

        <div className="relative max-w-lg">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-semibold leading-tight tracking-tight"
          >
            Every patient, appointment and rupee — in one calm workspace.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-sm leading-relaxed text-muted-foreground"
          >
            Multi-clinic scheduling, e-prescriptions, lab orders, IPD beds, pharmacy stock and GST
            invoicing — built for teams that see 200+ patients a day.
          </motion.p>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {[
              { k: "1.2M", v: "visits recorded" },
              { k: "340+", v: "clinics onboard" },
              { k: "99.98%", v: "uptime" },
            ].map((s) => (
              <div key={s.k}>
                <p className="text-2xl font-semibold tracking-tight">{s.k}</p>
                <p className="text-xs text-muted-foreground">{s.v}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5" /> HIPAA-aligned · ABDM ready · encrypted backups
        </p>
      </div>

      <div className="flex items-center justify-center px-5 py-14 sm:px-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
              <HeartPulse className="size-5" />
            </span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Sign in to your clinic workspace. Demo credentials are pre-filled.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 pl-9"
                  autoComplete="username"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button type="button" className="text-xs font-medium text-primary hover:underline">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 pl-9"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error ? (
              <p className="rounded-lg border border-destructive/25 bg-danger-soft px-3 py-2 text-xs text-destructive">
                {error}
              </p>
            ) : null}

            <label className="flex items-center gap-2 pt-1 text-sm text-muted-foreground">
              <Checkbox defaultChecked /> Keep me signed in for 30 days
            </label>

            <Button type="submit" className="h-11 w-full" disabled={loading}>
              {loading ? <Loader2 className="size-4 animate-spin" /> : null}
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            New clinic?{" "}
            <Link to="/dashboard" className="font-medium text-primary hover:underline">
              Explore the demo workspace
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
