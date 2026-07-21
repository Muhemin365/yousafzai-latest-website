import PageBanner from '../components/PageBanner';
import CTASection from '../components/CTASection';
import ContactSection from '../components/ContactSection';

export default function ContactPage() {
  return (
    <>
      <PageBanner title="Contact Us" subtitle="Ready to partner? Get a formal B2B quotation in 4 business hours or speak with our partnerships team." />
      <CTASection />
      <ContactSection />
    </>
  );
}
