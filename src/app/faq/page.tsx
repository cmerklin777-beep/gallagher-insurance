'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqItems = [
  {
    question: 'What types of coverage does eTags offer?',
    answer:
      'We offer four coverage tiers so you can pick the one that fits your needs and budget. Whether you just want to cover the big stuff (engine & transmission) or want near-complete coverage, we\'ve got you.',
  },
  {
    question: 'What is auto coverage and why do I need it?',
    answer:
      'Think of it as a safety net for your car. If something mechanical breaks down, your Vehicle Service Contract helps cover the repair costs so you\'re not stuck with a huge bill out of nowhere.',
  },
  {
    question: 'Can I transfer my coverage if I sell my vehicle?',
    answer:
      'Absolutely! Most of our plans are transferable, which is actually a great selling point when you go to sell your car. The new owner gets coverage, and your vehicle is worth more.',
  },
  {
    question: 'How does the purchasing process work at eTags?',
    answer:
      'It\'s really easy. Enter your VIN and mileage, compare plans, pick the one you like, and check out online. The whole thing takes a few minutes.',
  },
  {
    question: 'What is a Vehicle Service Contract?',
    answer:
      'It\'s a service agreement that covers specific repairs after your factory warranty expires. Think of it as extended protection for your car — when something breaks, we help pay for it.',
  },
  {
    question: 'How do I file a claim with eTags?',
    answer:
      'Just call the claims number on your fulfillment packet or use the claims portal. Give them the details, and we\'ll take it from there. We pay the shop directly, so you don\'t have to deal with reimbursements.',
  },
  {
    question: 'Are there any additional benefits with an eTags coverage?',
    answer:
      'Yes! Most of our plans include roadside assistance and rental car reimbursement, so you\'re covered even while your car is in the shop.',
  },
  {
    question: 'How long does coverage last?',
    answer:
      'That depends on the plan you choose. We offer flexible terms from short to long duration. Get a quote to see what\'s available for your specific vehicle.',
  },
  {
    question: 'What makes eTags different?',
    answer:
      'Honestly? We keep it simple. Transparent pricing, no sales pressure, real people you can talk to, and a fast online process. We think buying coverage should be as easy as everything else you do online.',
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-mesh relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent-light">
              FAQ
            </p>
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              Your Questions Answered
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-navy-100/80 sm:text-xl">
              Find answers to common questions about our coverage plans, claims process, and more.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="bg-white/90 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl border bg-white transition-all duration-300 ${
                  openIndex === index
                    ? 'border-accent/40 ring-1 ring-accent/30 shadow-lg'
                    : 'border-navy-100 shadow-sm hover:shadow-md'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  aria-expanded={openIndex === index}
                >
                  <span className="pr-4 text-lg font-medium text-navy-900">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-accent transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 text-base leading-relaxed text-navy-600">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy-900/80 relative py-24 text-center section-fade-top">
        <div className="relative z-10 mx-auto max-w-3xl px-4">
          <h2 className="font-display text-3xl text-white sm:text-4xl lg:text-5xl">
            Still Have Questions?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-navy-100/80">
            Our team is here to help. Reach out to us and we&apos;ll get you the answers you need.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-action px-10 py-4 text-lg font-bold text-navy-950 shadow-lg shadow-action/20 transition hover:bg-action-hover hover:scale-105"
            >
              Contact Us
            </a>
            <a
              href="/quote"
              className="rounded-xl border border-navy-600 px-10 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
