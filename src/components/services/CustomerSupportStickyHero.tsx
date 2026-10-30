
'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  CheckCheck,
  Headphones,
  PhoneIncoming,
  PhoneOutgoing,
  Mail,
  MessageCircle,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  Users,
  Clock3,
} from 'lucide-react';

const services = [
  {
    number: '01',
    title: 'Inbound Call Support',
    description:
      'Calls answered in your company name by a trained support team.',
    icon: PhoneIncoming,
    href: '/services/customer-support-outsourcing/inbound-call-support',
  },
  {
    number: '02',
    title: 'Outbound Call Support',
    description:
      'Customer follow-ups and approved outbound campaigns.',
    icon: PhoneOutgoing,
    href: '/services/customer-support-outsourcing/outbound-call-support',
  },
  {
    number: '03',
    title: 'Customer Service',
    description:
      'Consistent assistance across calls, emails and chats.',
    icon: Headphones,
    href: '/services/customer-support-outsourcing/customer-service',
  },
  {
    number: '04',
    title: 'Customer Retention',
    description:
      'Customer check-ins, win-back calls and cancellation support.',
    icon: HeartHandshake,
    href: '/services/customer-support-outsourcing/customer-retention',
  },
  {
    number: '05',
    title: 'Complaint & Query Handling',
    description:
      'Customer enquiries and complaints tracked through resolution.',
    icon: MessageCircle,
    href: '/services/customer-support-outsourcing/complaint-query-handling',
  },
];

const workflow = [
  {
    title: 'Incoming call',
    subtitle: 'Customer identified',
    status: 'Answered',
    icon: PhoneIncoming,
  },
  {
    title: 'Email enquiry',
    subtitle: 'Assigned to support',
    status: 'In progress',
    icon: Mail,
  },
  {
    title: 'Live chat',
    subtitle: 'Resolved by one team',
    status: 'Resolved',
    icon: MessageCircle,
  },
];

export default function CustomerSupportStickyHero() {
  return (
    <div
      id="customer-support-hero"
      className="relative isolate w-full"
    >
      {/* ==========================================
          PANEL 01 — ORIGINAL HERO, REDESIGNED
      ========================================== */}
      <section className="sticky top-0 z-10 flex min-h-[760px] h-[100svh] w-full items-center overflow-hidden bg-white text-[#17191C] max-lg:h-auto max-lg:min-h-[780px] max-lg:sticky max-lg:top-0 max-sm:relative max-sm:min-h-0 max-sm:py-[100px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_45%,rgba(177,32,37,0.055),transparent_38%)]" />

        <div className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-[55px] px-[48px] py-[100px] lg:grid-cols-[1.18fr_0.82fr] lg:px-[65px] xl:px-[90px] max-sm:px-[22px] max-sm:py-0">
          <div>
            <p className="mb-[32px] text-[10px] font-bold uppercase tracking-[0.23em] text-[#B12025] sm:text-[11px]">
              Customer Support Outsourcing in Sri Lanka
            </p>

            <h1 className="max-w-[810px] text-[clamp(42px,5.1vw,78px)] font-semibold leading-[1.055] tracking-[-0.065em]">
              Customer support{' '}
              <span className="text-[#B12025]">
                handled for you,
              </span>{' '}
              from the first call to the follow-up.
            </h1>

            <div className="mt-[32px] max-w-[590px] space-y-[14px] text-[14px] leading-[1.85] text-[#777777] sm:text-[15px]">
              <p>
                Support problems are easy to miss. A call or email
                goes unanswered for hours. A complaint passes from
                person to person. Follow-up calls never get made,
                and customers who stopped buying hear nothing
                from you.
              </p>

              <p>
                FirstNotch&apos;s trained team in Colombo can handle
                customer conversations in your company&apos;s name,
                from answering enquiries to reaching out to
                customers.
              </p>
            </div>

            <div className="mt-[32px] flex flex-wrap items-center gap-[12px]">
              <a
                href="#customer-support-services"
                className="inline-flex min-h-[48px] items-center justify-center gap-[12px] rounded-full bg-[#B12025] px-[23px] text-[12px] font-semibold text-white transition-all duration-300 hover:bg-[#8F171C]"
              >
                See the five services
                <ArrowDown size={16} />
              </a>

              <Link
                href="/book-a-free-call"
                className="inline-flex min-h-[48px] items-center justify-center gap-[12px] rounded-full border border-[#B12025]/20 bg-white px-[23px] text-[12px] font-semibold text-[#B12025] transition-all duration-300 hover:border-[#B12025] hover:bg-[#B12025]/5"
              >
                Book a free discovery call
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          {/* WORKFLOW CARD */}
          <div className="mx-auto w-full max-w-[480px] rounded-[28px] border border-[#B12025]/10 bg-[#FBF8F8] p-[22px] shadow-[0_35px_90px_rgba(0,0,0,0.065)] sm:p-[28px]">
            <div className="mb-[24px] flex items-center justify-between">
              <div className="flex items-center gap-[12px]">
                <div className="grid h-[40px] w-[40px] place-items-center rounded-[13px] bg-[#B12025] text-white">
                  <Headphones size={19} />
                </div>

                <div>
                  <p className="text-[12px] font-semibold text-[#17191C]">
                    Support overview
                  </p>
                  <p className="text-[10px] text-[#999999]">
                    Illustrative workflow
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-white px-[12px] py-[7px] text-[10px] font-semibold text-[#B12025]">
                One team
              </span>
            </div>

            <div className="space-y-[10px]">
              {workflow.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center justify-between gap-[10px] rounded-[17px] bg-white p-[13px] sm:p-[15px]"
                  >
                    <div className="flex items-center gap-[12px]">
                      <div className="grid h-[36px] w-[36px] flex-none place-items-center rounded-[11px] bg-[#F8E9EA] text-[#B12025]">
                        <Icon size={17} />
                      </div>

                      <div>
                        <p className="text-[11px] font-semibold text-[#17191C] sm:text-[12px]">
                          {item.title}
                        </p>
                        <p className="mt-[3px] text-[10px] text-[#A0A0A0]">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <span className="whitespace-nowrap rounded-full bg-[#FAEFEF] px-[9px] py-[5px] text-[9px] font-semibold text-[#B12025]">
                      {item.status}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-[18px] flex items-center justify-between rounded-[17px] bg-[#B12025] px-[17px] py-[18px] text-white">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/75">
                  One team
                </p>
                <p className="mt-[5px] text-[16px] font-semibold">
                  One clear experience
                </p>
              </div>
              <CheckCheck size={24} />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-[20px] left-1/2 hidden -translate-x-1/2 items-center gap-[8px] text-[10px] font-medium uppercase tracking-[0.18em] text-[#B12025] lg:flex">
          Scroll to explore
          <ArrowDown size={14} />
        </div>
      </section>

      {/* ==========================================
          PANEL 02 — FIVE CUSTOMER SUPPORT SERVICES
      ========================================== */}
      <section
        id="customer-support-services"
        className="sticky top-0 z-20 flex min-h-[760px] h-[100svh] w-full items-center overflow-hidden rounded-t-[30px] bg-[#F3F3F3] text-[#17191C] max-lg:h-auto max-lg:min-h-[900px] max-lg:py-[100px] max-sm:relative max-sm:min-h-0 max-sm:rounded-t-[22px] max-sm:py-[70px]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(177,32,37,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(177,32,37,0.035)_1px,transparent_1px)] bg-[size:55px_55px]" />

        <div className="relative z-10 mx-auto w-full max-w-[1380px] px-[48px] lg:px-[65px] xl:px-[90px] max-sm:px-[22px]">
          <div className="mb-[35px] flex flex-wrap items-end justify-between gap-[20px]">
            <div>
              <p className="mb-[16px] text-[11px] font-bold uppercase tracking-[0.22em] text-[#B12025]">
                What we do
              </p>
              <h2 className="max-w-[700px] text-[clamp(38px,4.5vw,68px)] font-semibold leading-[1.08] tracking-[-0.06em]">
                Five services.{' '}
                <span className="text-[#B12025]">
                  One support team.
                </span>
              </h2>
            </div>

            <p className="max-w-[320px] text-[14px] leading-[1.8] text-[#777777]">
              From the first conversation to the final follow-up,
              we help you keep every customer interaction organised.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-[12px] sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <Link
                  key={service.number}
                  href={service.href}
                  className="group relative flex min-h-[180px] flex-col justify-between overflow-hidden rounded-[22px] border border-[#E9E1E1] bg-white p-[24px] transition-all duration-300 hover:-translate-y-[4px] hover:border-[#B12025]/30 hover:shadow-[0_18px_50px_rgba(177,32,37,0.10)]"
                >
                  <div className="flex items-start justify-between">
                    <div className="grid h-[42px] w-[42px] place-items-center rounded-[13px] bg-[#F8E9EA] text-[#B12025] transition-colors duration-300 group-hover:bg-[#B12025] group-hover:text-white">
                      <Icon size={20} />
                    </div>
                    <span className="text-[11px] font-semibold tracking-[0.15em] text-[#AAAAAA]">
                      {service.number}
                    </span>
                  </div>

                  <div className="mt-[22px]">
                    <h3 className="flex items-center justify-between gap-[10px] text-[17px] font-semibold tracking-[-0.03em]">
                      {service.title}
                      <ArrowUpRight
                        size={18}
                        className="flex-none text-[#B12025] transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
                      />
                    </h3>

                    <p className="mt-[8px] text-[12px] leading-[1.7] text-[#888888]">
                      {service.description}
                    </p>
                  </div>
                </Link>
              );
            })}

            <div className="flex min-h-[180px] flex-col justify-between rounded-[22px] bg-[#B12025] p-[24px] text-white">
              <Users size={24} />

              <div>
                <h3 className="text-[22px] font-semibold tracking-[-0.04em]">
                  Built around your business.
                </h3>
                <p className="mt-[8px] text-[12px] leading-[1.7] text-white/75">
                  Choose the support services that fit your customers
                  and your workflow.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-[22px] flex items-center gap-[8px] text-[11px] text-[#777777]">
            <CheckCircle2 size={15} className="text-[#B12025]" />
            Explore each service to see how it works.
          </div>
        </div>
      </section>

      {/* ==========================================
          PANEL 03 — PREMIUM FIRSTNOTCH CTA
      ========================================== */}
      <section className="sticky top-0 z-30 flex min-h-[700px] h-[100svh] w-full items-center justify-center overflow-hidden rounded-t-[30px] bg-[#B12025] px-[24px] py-[100px] text-white max-sm:relative max-sm:min-h-[680px] max-sm:rounded-t-[22px]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_50%,#000_30%,transparent_100%)]" />

        <div className="pointer-events-none absolute -right-[130px] -top-[130px] h-[500px] w-[500px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-[230px] -left-[130px] h-[600px] w-[600px] rounded-full border border-white/10" />

        <div className="relative z-10 mx-auto max-w-[1050px] text-center">
          <div className="mb-[28px] flex justify-center">
            <div className="flex items-center gap-[9px] rounded-full border border-white/25 px-[17px] py-[10px]">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">
                FirstNotch Solutions
              </span>
            </div>
          </div>

          <p className="mb-[22px] text-[12px] font-semibold uppercase tracking-[0.23em] text-white/70">
            Customer support, made simpler
          </p>

          <h2 className="text-[clamp(44px,7.3vw,105px)] font-semibold leading-[1.02] tracking-[-0.075em]">
            Your customers
            <br />
            deserve better.
            <br />
            <span className="text-white/60">
              We&apos;re here to help.
            </span>
          </h2>

          <p className="mx-auto mt-[28px] max-w-[600px] text-[14px] leading-[1.9] text-white/80 sm:text-[16px]">
            Tell us about the conversations your team handles.
            We&apos;ll discuss a support setup that fits your
            business, your customers and your goals.
          </p>

          <div className="mt-[36px] flex flex-wrap items-center justify-center gap-[14px]">
            <Link
              href="/book-a-free-call"
              className="inline-flex min-h-[54px] items-center justify-center gap-[14px] rounded-full bg-white px-[28px] text-[13px] font-semibold text-[#B12025] transition-all duration-300 hover:scale-[1.035] hover:bg-[#F4F4F4]"
            >
              Book a free discovery call
              <ArrowUpRight size={17} />
            </Link>

            <Link
              href="/services"
              className="inline-flex min-h-[54px] items-center justify-center gap-[12px] rounded-full border border-white/35 px-[25px] text-[13px] font-semibold text-white transition-colors duration-300 hover:bg-white/10"
            >
              Explore our services
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-[65px] flex flex-wrap justify-center gap-x-[32px] gap-y-[14px] text-[11px] text-white/75">
            <span className="flex items-center gap-[8px]">
              <Headphones size={15} />
              Customer support
            </span>
            <span className="flex items-center gap-[8px]">
              <Clock3 size={15} />
              Planned workflows
            </span>
            <span className="flex items-center gap-[8px]">
              <CheckCheck size={15} />
              Quality checks
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
