'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Send, ArrowRight, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceInterest: '',
    note: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-mesh relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              We&apos;d love to hear from you
            </h1>
            <h3 className="mt-4 text-xl font-semibold text-accent sm:text-2xl">
              We&apos;re Here to Help You!
            </h3>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
              Have a question about coverage, need help with a claim, or just want to say hi?
              Our team is friendly, responsive, and always happy to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="bg-white/80 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative mx-auto h-72 w-full max-w-sm overflow-hidden rounded-2xl shadow-lg lg:mx-0">
              <Image
                src="/images/people/friendly-mechanic.jpg"
                alt="Friendly mechanic ready to help"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex shrink-0 items-center gap-4 rounded-2xl border-l-4 border-accent bg-white p-6 shadow-lg transition hover:shadow-xl">
                <div className="inline-flex shrink-0 rounded-full bg-accent-muted p-3">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-navy-500">Call Us</p>
                  <a
                    href="tel:+1-800-555-0199"
                    className="text-lg font-bold text-navy-900 transition hover:text-accent"
                  >
                    (800) 555-0199
                  </a>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-4 rounded-2xl border-l-4 border-accent bg-white p-6 shadow-lg transition hover:shadow-xl">
                <div className="inline-flex shrink-0 rounded-full bg-accent-muted p-3">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-navy-500">Email Us</p>
                  <a
                    href="mailto:support@etags.com"
                    className="whitespace-nowrap text-lg font-bold text-navy-900 transition hover:text-accent"
                  >
                    support@etags.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-white/50 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white p-8 shadow-xl sm:p-12">
            <div className="text-center">
              <h2 className="font-display text-3xl tracking-tight text-navy-900 sm:text-4xl">
                Send us a message
              </h2>
              <p className="mt-3 text-lg text-navy-600">
                Fill out the form below and we&apos;ll get back to you as soon as we can.
              </p>
            </div>

            {submitted ? (
              <div className="mt-12 rounded-2xl border-2 border-accent/30 bg-accent-muted p-8 text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-accent" />
                <h3 className="mt-4 font-display text-2xl text-navy-900">Thank You!</h3>
                <p className="mt-2 text-lg text-navy-600">
                  Your message has been received. Our team will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-navy-900">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="mt-2 w-full rounded-xl border border-navy-100 px-4 py-3 text-navy-900 shadow-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-navy-900">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-xl border border-navy-100 px-4 py-3 text-navy-900 shadow-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>

                {/* Service Interest Select */}
                <div>
                  <label
                    htmlFor="serviceInterest"
                    className="block text-sm font-semibold text-navy-900"
                  >
                    Service Interest
                  </label>
                  <select
                    id="serviceInterest"
                    name="serviceInterest"
                    required
                    value={formData.serviceInterest}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-navy-100 px-4 py-3 text-navy-900 shadow-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option value="auto">Auto Coverage</option>
                    <option value="home">Home Coverage</option>
                    <option value="both">Both</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Note Textarea */}
                <div>
                  <label htmlFor="note" className="block text-sm font-semibold text-navy-900">
                    Note
                  </label>
                  <textarea
                    id="note"
                    name="note"
                    rows={5}
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    className="mt-2 w-full resize-none rounded-xl border border-navy-100 px-4 py-3 text-navy-900 shadow-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-action px-8 py-4 text-lg font-bold text-navy-950 shadow-lg shadow-action/20 transition hover:bg-action-hover hover:scale-105 sm:w-auto"
                >
                  <Send className="h-5 w-5" />
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy-900/80 relative py-24 text-center">
        <div className="relative z-10 mx-auto max-w-3xl px-4">
          <h2 className="font-display text-3xl text-white sm:text-4xl lg:text-5xl">
            Ready to get covered?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/90">
            Our team is here whenever you need us. In the meantime, grab a free
            quote and see how affordable real protection can be.
          </p>
          <Link
            href="/quote"
            className="group mt-10 inline-flex items-center gap-2 rounded-xl bg-action px-10 py-4 text-lg font-bold text-navy-950 shadow-lg shadow-action/20 transition hover:bg-action-hover hover:scale-105"
          >
            Get a Quote
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
