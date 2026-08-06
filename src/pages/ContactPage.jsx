import PageBanner from '../components/PageBanner';
import ContactSection from '../components/ContactSection';
import CTASection from '../components/CTASection';
import { useCMSStore } from '../store/useCMSStore';

export default function ContactPage() {
  const banner = useCMSStore((s) => s.banners?.main?.contact);

  return (
    <>
      <PageBanner title={banner?.title || 'Contact Us'} subtitle={banner?.subtitle || ''} slideshowImages={banner?.images || null} />
      <CTASection />
      <ContactSection />
    </>
  );
}
