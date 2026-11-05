"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Database,
  FileCheck2,
  Headphones,
  Laptop2,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Wrench,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/FirstNotchFooter";
import FallingDots from "@/components/FallingDots";
import { FormEvent, useEffect, useMemo, useState } from "react";

const RED = "#B12025";
const CHARCOAL = "#17191C";

const services = [
  { value: "customer-support", label: "Customer support", Icon: Headphones },
  { value: "bpo-back-office", label: "BPO & back office", Icon: FileCheck2 },
  { value: "it-services", label: "IT services", Icon: Laptop2 },
  { value: "not-sure", label: "I'm not sure yet", Icon: Sparkles },
];

const timeline = [
  {
    number: "01",
    title: "You send the form",
    time: "About 2 minutes",
    body: "Tell us what you need, even if the details are still rough.",
  },
  {
    number: "02",
    title: "A time is agreed",
    time: "Within 1 working day",
    body: "Our team gets back to you and agrees on a suitable time.",
  },
  {
    number: "03",
    title: "The call",
    time: "Around 30 minutes",
    body: "We discuss your work, volumes, tools, hours and expectations.",
  },
  {
    number: "04",
    title: "Your quotation",
    time: "After requirements are clear",
    body: "You receive a written proposal. Work begins only after you accept it.",
  },
];

const prep = [
  {
    title: "Volumes",
    body: "An estimate of calls, tickets, records, orders or tasks.",
    Icon: Database,
  },
  {
    title: "Your tools",
    body: "CRM, helpdesk, internal software or other systems you already use.",
    Icon: Wrench,
  },
  {
    title: "Hours to cover",
    body: "Your preferred working hours, time zone and any weekend requirements.",
    Icon: Clock3,
  },
  {
    title: "Rules on data",
    body: "Any confidentiality, access, compliance or handling requirements.",
    Icon: ShieldCheck,
  },
];

const faqs = [
  {
    q: "Is the discovery call free?",
    a: "Yes. The first discovery call is free and there is no obligation to proceed.",
  },
  {
    q: "What if I'm not sure which service I need?",
    a: "Choose “I'm not sure yet”. The call can help you work out which tasks are worth handing over.",
  },
  {
    q: "Can an NDA be arranged?",
    a: "If your discussion involves sensitive information, tell us before the call so the appropriate confidentiality arrangements can be discussed.",
  },
  {
    q: "Can I visit the FirstNotch office?",
    a: "Office visits can be arranged with the team after initial contact.",
  },
  {
    q: "I'm looking for a job. Is this the right form?",
    a: "No. This form is for businesses looking for FirstNotch services. Please use the Work With Us page for career opportunities.",
  },
];

type FormData = {
  name: string;
  company: string;
  email: string;
  country: string;
  service: string;
  startDate: string;
  hours: string;
  notes: string;
};

const emptyForm: FormData = {
  name: "",
  company: "",
  email: "",
  country: "",
  service: "",
  startDate: "",
  hours: "",
  notes: "",
};

export default function BookAFreeCallPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [officeOpen, setOfficeOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const incoming = params.get("service");
    if (incoming && services.some((item) => item.value === incoming)) {
      setForm((prev) => ({ ...prev, service: incoming }));
    }

    const updateOffice = () => {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Colombo",
        weekday: "short",
        hour: "2-digit",
        hour12: false,
      }).formatToParts(new Date());

      const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
      const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
      setOfficeOpen(["Mon", "Tue", "Wed", "Thu", "Fri"].includes(weekday) && hour >= 10 && hour < 19);
    };

    updateOffice();
    const timer = window.setInterval(updateOffice, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const selectedService = useMemo(
    () => services.find((item) => item.value === form.service)?.label ?? "Not selected yet",
    [form.service]
  );

  const update = (key: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const stepOneValid =
    form.name.trim() && form.company.trim() && /\S+@\S+\.\S+/.test(form.email) && form.country.trim();

  const stepTwoValid = form.service && form.startDate && form.hours;

  const next = () => {
    if (step === 1 && !stepOneValid) return;
    if (step === 2 && !stepTwoValid) return;
    setStep((value) => Math.min(3, value + 1));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stepOneValid || !stepTwoValid) return;
    // Connect this to your API / CRM / email endpoint.
    setSubmitted(true);
  };


  return (
    <main className="min-h-screen bg-white text-[#17191C]">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#050505] px-5 pb-[46px] pt-[128px] text-white sm:px-8 sm:pb-[90px] sm:pt-[165px] lg:px-14 lg:pb-[110px]">
        {/* Falling space dots — decorative hero background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-80"
        >
          <FallingDots />
        </div>

        {/* Soft FirstNotch red atmosphere behind the content */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[20%] top-[15%] z-0 h-[520px] w-[520px] rounded-full bg-[#B12025]/20 blur-[140px]"
        />

        {/* Keeps the lower hero readable while the dots remain visible */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-black/5 via-transparent to-black/35"
        />
        <div className="relative z-10 mx-auto grid max-w-[1440px] gap-9 lg:grid-cols-[.88fr_1.12fr] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-[130px]">
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/55 sm:text-[11px]">
              FREE DISCOVERY CALL
            </p>

            <h1 className="mt-4 max-w-[720px] text-[clamp(2.25rem,10vw,4rem)] font-semibold leading-[.98] tracking-[-0.065em] sm:mt-7 sm:text-[clamp(4rem,6vw,7rem)]">
              Talk to FirstNotch about the work you want to{" "}
              <span className="text-[#E45B60]">outsource.</span>
            </h1>

            <p className="mt-5 max-w-[600px] text-[13px] leading-[1.75] text-white/65 sm:mt-7 sm:text-[16px] sm:leading-8">
              Tell us what your business needs. We&apos;ll use the call to understand the work,
              answer your questions and work towards a clear quotation.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
              {["Free", "About 30 minutes", "No obligation"].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3 py-2 text-[10px] font-medium text-white/80 sm:px-4 sm:text-[12px]"
                >
                  <Check className="h-3.5 w-3.5 text-[#E45B60]" />
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6 sm:mt-10">
              <ShieldCheck className="h-5 w-5 text-[#E45B60]" />
              <div>
                <p className="text-[11px] font-semibold sm:text-[13px]">Sensitive project?</p>
                <p className="mt-0.5 text-[10px] text-white/50 sm:text-[12px]">
                  Ask us about confidentiality before sharing details.
                </p>
              </div>
            </div>
          </div>

          {/* FORM CARD */}
          <div id="booking-form" className="relative rounded-[24px] bg-white p-5 text-[#17191C] shadow-[0_28px_90px_rgba(0,0,0,.28)] sm:rounded-[34px] sm:p-9 lg:p-10">
            {!submitted ? (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#B12025] sm:text-[11px]">
                      ABOUT TWO MINUTES
                    </p>
                    <h2 className="mt-2 text-[25px] font-semibold tracking-[-0.045em] sm:text-[34px]">
                      Book your free call
                    </h2>
                  </div>
                  <span className="rounded-full bg-[#F4F4F5] px-3 py-2 text-[10px] font-semibold sm:text-[11px]">
                    Step {step} / 3
                  </span>
                </div>

                <div className="mt-5 h-[3px] overflow-hidden rounded-full bg-[#E6E7E9] sm:mt-7">
                  <div
                    className="h-full rounded-full bg-[#B12025] transition-[width] duration-500"
                    style={{ width: `${(step / 3) * 100}%` }}
                  />
                </div>

                <form onSubmit={submit} className="mt-6 sm:mt-8">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />
                  <input type="hidden" name="source" value="book-a-free-call" />

                  {step === 1 && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Your name" required>
                        <input
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          autoComplete="name"
                          required
                          placeholder="Your name"
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Company" required>
                        <input
                          value={form.company}
                          onChange={(e) => update("company", e.target.value)}
                          autoComplete="organization"
                          required
                          placeholder="Company name"
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Work email" required>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          autoComplete="email"
                          required
                          placeholder="you@company.com"
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Country" required>
                        <input
                          value={form.country}
                          onChange={(e) => update("country", e.target.value)}
                          autoComplete="country-name"
                          required
                          placeholder="Your country"
                          className={inputClass}
                        />
                      </Field>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <fieldset>
                        <legend className="text-[12px] font-semibold sm:text-[13px]">
                          What do you need help with? <span className="text-[#B12025]">*</span>
                        </legend>
                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                          {services.map(({ value, label, Icon }) => {
                            const active = form.service === value;
                            return (
                              <button
                                key={value}
                                type="button"
                                onClick={() => update("service", value)}
                                className={`flex min-h-[54px] items-center gap-3 rounded-[14px] border px-3.5 text-left text-[11px] font-semibold transition sm:min-h-[62px] sm:px-4 sm:text-[12px] ${
                                  active
                                    ? "border-[#B12025] bg-[#fff7f7] text-[#B12025]"
                                    : "border-[#17191C]/12 bg-white hover:border-[#B12025]/40"
                                }`}
                              >
                                <Icon className="h-4 w-4 shrink-0" />
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      </fieldset>

                      {form.service === "not-sure" && (
                        <p className="mt-3 rounded-[12px] bg-[#F4F4F5] px-4 py-3 text-[10px] leading-5 text-[#17191C]/65 sm:text-[12px]">
                          That&apos;s completely fine. The call can help you work out which tasks are worth handing over.
                        </p>
                      )}

                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <Field label="When would you like to start?" required>
                          <select
                            value={form.startDate}
                            onChange={(e) => update("startDate", e.target.value)}
                            required
                            className={inputClass}
                          >
                            <option value="">Select timing</option>
                            <option>As soon as possible</option>
                            <option>Within 1 month</option>
                            <option>1–3 months</option>
                            <option>3+ months</option>
                            <option>Just exploring</option>
                          </select>
                        </Field>
                        <Field label="Hours to cover" required>
                          <select
                            value={form.hours}
                            onChange={(e) => update("hours", e.target.value)}
                            required
                            className={inputClass}
                          >
                            <option value="">Select coverage</option>
                            <option>Business hours</option>
                            <option>Extended hours</option>
                            <option>24/7</option>
                            <option>Weekends included</option>
                            <option>Not sure yet</option>
                          </select>
                        </Field>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <Field label="Anything else we should know?">
                        <textarea
                          value={form.notes}
                          onChange={(e) => update("notes", e.target.value)}
                          rows={5}
                          placeholder="Volumes, tools, current challenges, time zones or anything useful..."
                          className={`${inputClass} resize-none py-3`}
                        />
                      </Field>

                      <div className="mt-5 rounded-[16px] border border-[#17191C]/10 bg-[#F7F7F8] p-4 sm:p-5">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#17191C]/45">
                            Booking draft
                          </span>
                          <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-semibold text-[#B12025]">
                            Draft
                          </span>
                        </div>
                        <div className="mt-4 grid gap-3 text-[11px] sm:grid-cols-3 sm:text-[12px]">
                          <Summary label="Company" value={form.company || "—"} />
                          <Summary label="Service" value={selectedService} />
                          <Summary label="Start" value={form.startDate || "—"} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#17191C]/10 pt-5 sm:mt-8 sm:pt-6">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={() => setStep((s) => s - 1)}
                        className="inline-flex min-h-[42px] items-center gap-2 rounded-full px-2 text-[11px] font-semibold text-[#17191C]/60 hover:text-[#17191C]"
                      >
                        <ArrowLeft className="h-4 w-4" /> Back
                      </button>
                    ) : (
                      <p className="text-[9px] leading-4 text-[#17191C]/45 sm:text-[10px]">
                        Your details are used to arrange your call.
                      </p>
                    )}

                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={next}
                        disabled={(step === 1 && !stepOneValid) || (step === 2 && !stepTwoValid)}
                        className={primaryButton}
                      >
                        Continue <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button type="submit" className={primaryButton}>
                        Send request <ArrowUpRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </form>
              </>
            ) : (
              <div aria-live="polite" className="flex min-h-[470px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#B12025] text-white">
                  <Check className="h-7 w-7" />
                </div>
                <span className="mt-6 rounded-full bg-[#fff1f1] px-3 py-1.5 text-[10px] font-semibold text-[#B12025]">
                  Sent
                </span>
                <h2 className="mt-4 text-[30px] font-semibold tracking-[-0.05em] sm:text-[42px]">
                  Thanks, {form.name.split(" ")[0]}.
                </h2>
                <p className="mt-3 max-w-[440px] text-[12px] leading-6 text-[#17191C]/60 sm:text-[14px] sm:leading-7">
                  Your request has been received. The team will get back to you to arrange a suitable time.
                </p>
                <Link href="/" className="mt-7 inline-flex items-center gap-2 text-[11px] font-semibold text-[#B12025]">
                  Return to FirstNotch <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[#17191C]/8 pt-4 text-[9px] text-[#17191C]/45 sm:mt-7 sm:text-[10px]">
              <span className="inline-flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${officeOpen ? "bg-emerald-500" : "bg-[#17191C]/25"}`} />
                {officeOpen === null ? "Checking office hours" : officeOpen ? "Colombo office is open" : "Colombo office is closed"}
              </span>
              <span>Mon–Fri · 10am–7pm Sri Lanka time</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS */}
      <section className="px-5 py-[58px] sm:px-8 sm:py-[110px] lg:px-14 lg:py-[140px]">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#B12025] sm:text-[11px]">
            WHAT HAPPENS NEXT
          </p>
          <div className="mt-3 grid gap-5 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
            <h2 className="max-w-[650px] text-[clamp(2rem,8vw,3rem)] font-semibold leading-[1.05] tracking-[-0.055em] sm:text-[clamp(3rem,5vw,5.7rem)]">
              From form to a clear next step.
            </h2>
            <p className="max-w-[620px] text-[11px] leading-[1.75] text-[#17191C]/60 sm:text-[14px] sm:leading-8 lg:pt-3">
              The process is deliberately simple. You tell us what you need, we agree on a time, discuss the work and then define the next step clearly.
            </p>
          </div>

          <div className="relative mt-9 sm:mt-16">
            <div className="absolute bottom-0 left-[17px] top-0 w-px bg-[#B12025]/20 sm:left-[23px] lg:left-0 lg:right-0 lg:top-[23px] lg:h-px lg:w-auto" />
            <div className="grid gap-5 lg:grid-cols-4 lg:gap-6">
              {timeline.map((item, index) => (
                <article key={item.number} className="relative pl-[52px] lg:pl-0 lg:pt-[62px]">
                  <div className="absolute left-0 top-0 z-10 flex h-[35px] w-[35px] items-center justify-center rounded-full border border-[#B12025] bg-white text-[9px] font-bold text-[#B12025] sm:h-[47px] sm:w-[47px] sm:text-[11px] lg:top-0">
                    {item.number}
                  </div>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#B12025] sm:text-[10px]">
                    {item.time}
                  </span>
                  <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.04em] sm:text-[26px]">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[290px] text-[10px] leading-[1.65] text-[#17191C]/60 sm:mt-3 sm:text-[13px] sm:leading-6">
                    {item.body}
                  </p>
                  {index === 3 && (
                    <p className="mt-3 border-l-2 border-[#B12025] pl-3 text-[10px] font-semibold text-[#B12025] sm:text-[12px]">
                      Work begins only after you accept it.
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PREP */}
      <section className="bg-[#F4F4F5] px-5 py-[58px] sm:px-8 sm:py-[110px] lg:px-14">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#B12025] sm:text-[11px]">
                USEFUL TO HAVE READY
              </p>
              <h2 className="mt-3 max-w-[800px] text-[clamp(2rem,8vw,3rem)] font-semibold leading-[1.06] tracking-[-0.055em] sm:text-[clamp(3rem,5vw,5.7rem)]">
                A little context helps. None of this is required.
              </h2>
            </div>
            <p className="max-w-[430px] text-[11px] leading-[1.7] text-[#17191C]/60 sm:text-[13px] sm:leading-7">
              Rough figures simply help the team understand your operation and prepare a more useful conversation.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {prep.map(({ title, body, Icon }, index) => (
              <article key={title} className="min-h-[185px] rounded-[20px] bg-white p-5 sm:min-h-[270px] sm:rounded-[28px] sm:p-7">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#fff1f1] text-[#B12025] sm:h-12 sm:w-12">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className="text-[9px] font-semibold text-[#17191C]/30 sm:text-[11px]">0{index + 1}</span>
                </div>
                <div className="mt-8 sm:mt-12">
                  <h3 className="text-[18px] font-semibold tracking-[-0.035em] sm:text-[23px]">{title}</h3>
                  <p className="mt-2 text-[10px] leading-[1.65] text-[#17191C]/55 sm:text-[12px] sm:leading-6">{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL / TRUST */}
      <section className="bg-[#17191C] px-5 py-[60px] text-white sm:px-8 sm:py-[120px] lg:px-14">
        <div className="mx-auto grid max-w-[1440px] gap-9 lg:grid-cols-[.35fr_1fr] lg:gap-20">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B12025] text-[30px] font-semibold sm:h-16 sm:w-16 sm:text-[42px]">
              &ldquo;
            </div>
          </div>
          <div>
            <p className="max-w-[980px] text-[clamp(1.65rem,7vw,2.3rem)] font-semibold leading-[1.2] tracking-[-0.045em] sm:text-[clamp(2.5rem,4vw,4.5rem)]">
              We came away from the call knowing how many people we would need for our busy season.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5 sm:mt-10 sm:pt-7">
              <span className="text-[11px] font-semibold sm:text-[13px]">Event organiser</span>
              <span className="rounded-full border border-white/15 px-3 py-1.5 text-[9px] text-white/55 sm:text-[10px]">
                Team size worked out on the call
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F4F4F5] px-5 py-[58px] sm:px-8 sm:py-[110px] lg:px-14">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#B12025] sm:text-[11px]">FAQ</p>
            <h2 className="mt-3 text-[clamp(2rem,8vw,3rem)] font-semibold leading-[1.06] tracking-[-0.055em] sm:text-[clamp(3rem,5vw,5.5rem)]">
              Before you book.
            </h2>
            <div className="mt-6 rounded-[18px] bg-white p-4 sm:mt-8 sm:p-5">
              <p className="text-[10px] text-[#17191C]/50 sm:text-[11px]">Looking for a job?</p>
              <Link href="/work-with-us" className="mt-1 inline-flex items-center gap-2 text-[12px] font-semibold text-[#B12025] sm:text-[14px]">
                Go to Work With Us <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="border-t border-[#17191C]/15">
            {faqs.map((faq, index) => {
              const open = faqOpen === index;
              return (
                <div key={faq.q} className="border-b border-[#17191C]/15">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setFaqOpen(open ? null : index)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left sm:py-6"
                  >
                    <span className="text-[12px] font-semibold leading-5 sm:text-[17px]">{faq.q}</span>
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border sm:h-9 sm:w-9 ${open ? "border-[#B12025] bg-[#B12025] text-white" : "border-[#17191C]/20"}`}>
                      <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
                    </span>
                  </button>
                  {open && (
                    <div className="pb-4 pr-10 sm:pb-6 sm:pr-16">
                      <p className="max-w-[720px] text-[10px] leading-[1.7] text-[#17191C]/60 sm:text-[13px] sm:leading-7">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      

      <Footer />

      {/* MOBILE STICKY CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#17191C]/10 bg-white/95 p-3 backdrop-blur-md sm:hidden">
        <button
          type="button"
          onClick={() => document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth", block: "start" })}
          className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#B12025] px-4 text-[11px] font-semibold text-white"
        >
          Fill in the form <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </main>
  );
}

const inputClass =
  "h-[48px] w-full rounded-[12px] border border-[#17191C]/12 bg-white px-3.5 text-[11px] text-[#17191C] outline-none transition placeholder:text-[#17191C]/30 focus:border-[#B12025] focus:ring-2 focus:ring-[#B12025]/10 sm:h-[52px] sm:text-[12px]";

const primaryButton =
  "inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full bg-[#B12025] px-5 text-[10px] font-semibold text-white transition hover:bg-[#941a1f] disabled:cursor-not-allowed disabled:bg-[#17191C]/15 disabled:text-[#17191C]/35 sm:min-h-[48px] sm:px-6 sm:text-[12px]";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-semibold text-[#17191C]/70 sm:text-[11px]">
        {label} {required && <span className="text-[#B12025]">*</span>}
      </span>
      {children}
    </label>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-[0.1em] text-[#17191C]/35">{label}</p>
      <p className="mt-1 font-semibold text-[#17191C]">{value}</p>
    </div>
  );
}
