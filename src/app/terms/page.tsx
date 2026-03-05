import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | AssuredPartners',
    description:
        'Read the terms and conditions that govern your use of AssuredPartners services and website.',
};

export default function TermsPage() {
    return (
        <>

            {/* Hero */}
            <section className="hero-mesh relative overflow-hidden">
                <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                            Legal
                        </p>
                        <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
                            Terms of Service
                        </h1>
                        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-navy-100/80 sm:text-xl">
                            These Terms of Service explain how AssuredPartners provides its services and how you
                            may use this website and our coverage offerings.
                        </p>
                    </div>
                </div>
            </section>

            {/* Body */}
            <section className="bg-white py-24">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-10 text-sm leading-relaxed text-navy-700">
                    <section>
                        <h2 className="font-display text-2xl text-navy-900 mb-3">
                            1. Acceptance of These Terms
                        </h2>
                        <p>
                            By accessing or using the AssuredPartners website, requesting a quote, or purchasing
                            coverage through our platform, you agree to be bound by these Terms of Service and
                            any additional terms referenced here. If you do not agree, you must not use this
                            website or our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-navy-900 mb-3">
                            2. Nature of Our Services
                        </h2>
                        <p>
                            AssuredPartners sells Home Warranty plans and related protection products. We do
                            not provide manufacturer warranties, and coverage is administered by third‑party
                            administrators and backed by licensed insurers. The specific terms, conditions,
                            limitations, and exclusions governing your coverage are set out in the Home Warranty
                            Contract you receive at purchase.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-navy-900 mb-3">
                            3. No Legal or Financial Advice
                        </h2>
                        <p>
                            Information on this website is provided for general informational and marketing
                            purposes only and does not constitute legal, tax, or financial advice. You are
                            responsible for evaluating whether a particular coverage option is appropriate for
                            your needs and circumstances.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-navy-900 mb-3">
                            4. Accuracy of Information You Provide
                        </h2>
                        <p>
                            You agree that all information you submit when requesting a quote or purchasing
                            coverage is true, complete, and accurate to the best of your knowledge. Your
                            eligibility for certain products and pricing may depend on the accuracy of the
                            information you provide.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-navy-900 mb-3">
                            5. Website Use and Acceptable Conduct
                        </h2>
                        <p>
                            You agree not to misuse this website, interfere with its normal operation, attempt to
                            gain unauthorized access to our systems, or use automated tools to scrape, copy, or
                            reverse engineer the site. We may suspend or restrict access if we detect misuse or
                            suspicious activity.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-navy-900 mb-3">
                            6. Intellectual Property
                        </h2>
                        <p>
                            All trademarks, logos, designs, text, graphics, and other content on this website are
                            owned by or licensed to AssuredPartners and may not be reproduced, distributed, or
                            used without our prior written permission, except as necessary for your personal,
                            non‑commercial use of the site.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-navy-900 mb-3">
                            7. Third‑Party Links and Services
                        </h2>
                        <p>
                            Our website may link to third‑party websites or services. These are provided for
                            convenience only, and we do not control or endorse the content or practices of those
                            third parties. Your use of any third‑party site or service is at your own risk and
                            subject to their terms and policies.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-navy-900 mb-3">
                            8. Disclaimer of Warranties
                        </h2>
                        <p>
                            This website is provided on an “as is” and “as available” basis. To the fullest extent
                            permitted by law, we disclaim all warranties of any kind, whether express or implied,
                            including any implied warranties of merchantability, fitness for a particular purpose,
                            and non‑infringement.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-navy-900 mb-3">
                            9. Limitation of Liability
                        </h2>
                        <p>
                            To the extent permitted by law, AssuredPartners and its affiliates will not be liable
                            for indirect, incidental, special, consequential, or punitive damages arising out of
                            or related to your use of this website or our services. Our total liability in
                            connection with any claim will be limited to the amount you paid for the specific
                            coverage at issue, if any.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-navy-900 mb-3">
                            10. Changes to These Terms
                        </h2>
                        <p>
                            We may update these Terms of Service from time to time to reflect changes in our
                            practices, products, or applicable laws. When we do, we will revise the “Last updated”
                            date at the top of this page. Your continued use of the website after changes become
                            effective constitutes acceptance of the updated terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-display text-2xl text-navy-900 mb-3">
                            11. Contact Us
                        </h2>
                        <p>
                            If you have questions about these Terms of Service or about your coverage, you can
                            contact us through the Contact page on this site or by using the phone number provided
                            in your Service Contract documentation.
                        </p>
                    </section>
                </div>
            </section>
        </>
    )
}