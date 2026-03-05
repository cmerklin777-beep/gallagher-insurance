'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home Coverage', href: '/home-coverage' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-navy-900/90 backdrop-blur-sm border-b border-navy-800/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/assuredpartners-logo.svg"
              alt="AssuredPartners"
              width={200}
              height={60}
              className="h-15 w-auto brightness-0 invert"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium tracking-wide transition-colors ${
                  pathname === link.href
                    ? 'text-accent-light'
                    : 'text-navy-100/70 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right side: phone + CTA */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href="tel:+1-800-555-0199"
              className="hidden items-center gap-1.5 text-base font-medium text-navy-100/70 transition-colors hover:text-white sm:flex"
            >
              <Phone className="h-4 w-4" />
              <span>(800) 555-0199</span>
            </a>
            <Link
              href="/quote"
              className="rounded-lg bg-action px-5 py-2 text-base font-semibold text-navy-950 transition-colors hover:bg-action-hover"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-navy-100/70 transition-colors hover:text-white lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <div className="bg-navy-900 border-t border-navy-800 lg:hidden">
            <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium tracking-wide transition-colors hover:bg-navy-800 ${
                    pathname === link.href
                      ? 'text-accent-light'
                      : 'text-navy-100/70 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Separator before phone + CTA */}
              <div className="my-3 border-t border-navy-800" />

              <a
                href="tel:+1-800-555-0199"
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-navy-100/70 transition-colors hover:bg-navy-800 hover:text-white"
              >
                <Phone className="h-4 w-4" />
                <span>(800) 555-0199</span>
              </a>

              <Link
                href="/quote"
                onClick={() => setMobileOpen(false)}
                className="mt-2 block rounded-lg bg-action px-4 py-3 text-center text-sm font-semibold text-navy-950 transition-colors hover:bg-action-hover"
              >
                Get Quote
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
