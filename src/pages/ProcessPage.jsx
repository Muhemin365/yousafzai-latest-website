import PageBanner from '../components/PageBanner';
import ProcessSection from '../components/ProcessSection';
import { useCMSStore } from '../store/useCMSStore';

export default function ProcessPage() {
  const banner = useCMSStore((s) => s.banners?.main?.process);

  return (
    <>
      <PageBanner title={banner?.title || 'Process'} subtitle={banner?.subtitle || ''} slideshowImages={banner?.images || null} />
      <ProcessSection />
    </>
  );
}
