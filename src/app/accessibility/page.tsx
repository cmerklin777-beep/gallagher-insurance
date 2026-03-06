import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Accessibility | AssuredPartners',
  description:
    'Learn about our commitment to digital accessibility and how we strive to make our website usable for everyone.',
};

export default function AccessibilityPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-mesh relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent-light">
              Accessibility
            </p>
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              Accessibility Statement
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-navy-100 sm:text-xl">
              AssuredPartners is committed to ensuring that our website is accessible to people
              with disabilities. We strive to provide an inclusive experience for all users.
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-10 text-sm leading-relaxed text-navy-700">
          <section>
            <h2 className="font-display text-2xl text-navy-900 mb-3">
              Our Commitment
            </h2>
            <p>
              AssuredPartners, a Gallagher company, is committed to ensuring digital accessibility
              for people with disabilities. We are continually improving the user experience for
              everyone and applying the relevant accessibility standards to ensure we provide equal
              access to all users.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 mb-3">
              Conformance Status
            </h2>
            <p>
              We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA.
              These guidelines explain how to make web content more accessible for people with
              disabilities and more user-friendly for everyone. The guidelines have three levels of
              accessibility (A, AA, and AAA). We have chosen Level AA as our target.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 mb-3">
              Measures We Take
            </h2>
            <p className="mb-4">
              AssuredPartners takes the following measures to ensure accessibility of our website:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Include accessibility as part of our internal development practices and design process.</li>
              <li>Provide skip navigation links to bypass repetitive content.</li>
              <li>Ensure all images include descriptive alternative text.</li>
              <li>Use semantic HTML elements and proper heading hierarchy throughout the site.</li>
              <li>Ensure all interactive elements are keyboard accessible.</li>
              <li>Maintain sufficient color contrast ratios that meet WCAG 2.1 AA standards.</li>
              <li>Provide ARIA labels and roles for custom interactive components.</li>
              <li>Support users who prefer reduced motion through the <code className="bg-navy-50 px-1 rounded">prefers-reduced-motion</code> media query.</li>
              <li>Ensure all form inputs have associated labels and provide clear error messages.</li>
              <li>Test with assistive technologies including screen readers.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 mb-3">
              Assistive Technology Compatibility
            </h2>
            <p>
              Our website is designed to be compatible with the following assistive technologies:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Screen readers (NVDA, JAWS, VoiceOver, TalkBack)</li>
              <li>Speech recognition software</li>
              <li>Screen magnification tools</li>
              <li>Keyboard-only navigation</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 mb-3">
              Known Limitations
            </h2>
            <p>
              While we strive to adhere to the accepted guidelines and standards for accessibility
              and usability, it is not always possible to do so in all areas of the website. We are
              continually seeking out solutions that will bring all areas of the site up to the same
              level of overall web accessibility. If you encounter an accessibility barrier on our
              site, please let us know.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 mb-3">
              Feedback and Contact Information
            </h2>
            <p>
              We welcome your feedback on the accessibility of our website. If you encounter
              accessibility barriers or have suggestions for improvement, please contact us:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                Phone:{' '}
                <a
                  href="tel:+1-800-555-0199"
                  className="text-accent underline underline-offset-2 hover:text-accent-hover"
                >
                  (800) 555-0199
                </a>
              </li>
              <li>
                Email:{' '}
                <a
                  href="mailto:accessibility@assuredpartners.com"
                  className="text-accent underline underline-offset-2 hover:text-accent-hover"
                >
                  accessibility@assuredpartners.com
                </a>
              </li>
              <li>
                Or visit our{' '}
                <Link
                  href="/contact"
                  className="text-accent underline underline-offset-2 hover:text-accent-hover"
                >
                  Contact page
                </Link>
              </li>
            </ul>
            <p className="mt-4">
              We try to respond to accessibility feedback within 2 business days.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 mb-3">
              Enforcement Procedure
            </h2>
            <p>
              If you are not satisfied with our response to your accessibility concern, you may
              escalate your complaint by contacting us directly. We take all accessibility concerns
              seriously and are committed to resolving issues promptly.
            </p>
          </section>

          <p className="text-navy-600 mt-8">
            This statement was last updated on March 6, 2026.
          </p>
        </div>
      </section>
    </>
  );
}
