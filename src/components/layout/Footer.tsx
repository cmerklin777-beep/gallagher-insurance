import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative bg-navy-950 border-t border-navy-800/40" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Top section: Logo + Tagline + Accent Divider */}
        <div className="mb-12">
          <Link href="/" className="inline-block">
            <Image
              src="/images/assuredpartners-logo.svg"
              alt="AssuredPartners"
              width={140}
              height={40}
              className="h-10 w-auto brightness-0 invert"
            />
          </Link>
          <p className="mt-1 text-xs text-navy-100/60">A Gallagher Company</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-navy-100/70">
            Protecting your home with trusted Home Warranty plans.
            Nationwide coverage backed by licensed handymen.
          </p>
          <div className="mt-6 h-px w-24 bg-navy-800" />
        </div>

        {/* 4-Column Link Grid */}
        <nav aria-label="Footer navigation" className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — Company Information */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent-light mb-5">
              Company Information
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-navy-100/70 hover:text-white transition-colors"
                >
                  About AssuredPartners
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-navy-100/70 hover:text-white transition-colors"
                >
                  Our Mission &amp; Values
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-navy-100/70 hover:text-white transition-colors"
                >
                  Customer Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 — Explore Our Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent-light mb-5">
              Explore Our Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/home-coverage"
                  className="text-sm text-navy-100/70 hover:text-white transition-colors"
                >
                  Home Coverage
                </Link>
              </li>
              <li>
                <Link
                  href="/quote"
                  className="text-sm text-navy-100/70 hover:text-white transition-colors"
                >
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Legal & Privacy */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent-light mb-5">
              Legal &amp; Privacy
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-navy-100/70 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-navy-100/70 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-navy-100/70 hover:text-white transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-navy-100/70 hover:text-white transition-colors"
                >
                  Legal Notices
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Support & Resources */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent-light mb-5">
              Support &amp; Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-navy-100/70 hover:text-white transition-colors"
                >
                  Contact Support
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-navy-100/70 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility"
                  className="text-sm text-navy-100/70 hover:text-white transition-colors"
                >
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-navy-800/60 pt-6 text-center">
          <p className="text-sm text-navy-100/70">
            &copy; {new Date().getFullYear()} AssuredPartners. All rights
            reserved.
          </p>
          <p className="mt-3 text-navy-100/60 text-xs max-w-2xl mx-auto leading-relaxed">
            AssuredPartners sells Home Warranty plans, not manufacturer
            coverage. All plans are administered by Lot Solutions Inc. and backed by licensed
            insurers. See your Home Warranty Contract for complete terms, conditions,
            and exclusions.
          </p>
        </div>
      </div>
    </footer>
  );
}
