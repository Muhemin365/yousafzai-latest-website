import PageBanner from '../components/PageBanner';
import ProductsSection from '../components/ProductsSection';
import { useCMSStore } from '../store/useCMSStore';

export default function ProductsPage() {
  const banner = useCMSStore((s) => s.banners?.main?.products);

  return (
    <>
      <PageBanner title={banner?.title || 'Products & Process'} subtitle={banner?.subtitle || ''} slideshowImages={banner?.images || null} />
      <ProductsSection />
    </>
  );
}
