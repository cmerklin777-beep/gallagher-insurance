import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative bg-navy-950 border-t border-navy-800">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Top section: Logo + Tagline + Accent Divider */}
        <div className="mb-12">
          <Link href="/" className="inline-block">
            <Image
              src="/images/etags-logo.png"
              alt="eTags"
              width={48}
              height={48}
              className="h-12 w-12 rounded-lg"
            />
          </Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-navy-500">
            Protecting your investment with trusted Vehicle Service Contracts.
            Nationwide coverage backed by ASE Certified mechanics.
          </p>
          <div className="mt-6 h-px w-24 bg-navy-800" />
        </div>

        {/* 4-Column Link Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — Company Information */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-5">
              Company Information
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-navy-500 hover:text-white transition-colors"
                >
                  About eTags
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-navy-500 hover:text-white transition-colors"
                >
                  Our Mission &amp; Values
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-navy-500 hover:text-white transition-colors"
                >
                  Customer Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 — Explore Our Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-5">
              Explore Our Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/auto-coverage"
                  className="text-sm text-navy-500 hover:text-white transition-colors"
                >
                  Auto Coverage
                </Link>
              </li>
              <li>
                <Link
                  href="/quote"
                  className="text-sm text-navy-500 hover:text-white transition-colors"
                >
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Legal & Privacy */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-5">
              Legal &amp; Privacy
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-navy-500 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-navy-500 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-navy-500 hover:text-white transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-navy-500 hover:text-white transition-colors"
                >
                  Legal Notices
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Support & Resources */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-5">
              Support &amp; Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-navy-500 hover:text-white transition-colors"
                >
                  Contact Support
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-navy-500 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-navy-800/60 pt-6 text-center">
          <p className="text-sm text-navy-500">
            &copy; {new Date().getFullYear()} eTags. All rights
            reserved.
          </p>
          <p className="mt-3 text-navy-600 text-xs max-w-2xl mx-auto leading-relaxed">
            eTags sells Vehicle Service Contracts, not manufacturer
            coverage. All plans are administered by Lot Solutions Inc. and backed by licensed
            insurers. See your Service Contract for complete terms, conditions,
            and exclusions.
          </p>
        </div>
      </div>
    </footer>
  );
}
