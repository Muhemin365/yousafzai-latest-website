import PageBanner from '../components/PageBanner';
import QualitySection from '../components/QualitySection';
import { useCMSStore } from '../store/useCMSStore';

export default function QualityPage() {
  const banner = useCMSStore((s) => s.banners?.main?.quality);

  return (
    <>
      <PageBanner title={banner?.title || 'Quality'} subtitle={banner?.subtitle || ''} slideshowImages={banner?.images || null} />
      <QualitySection />
    </>
  );
}
