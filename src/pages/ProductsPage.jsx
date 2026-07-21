import PageBanner from '../components/PageBanner';
import ProductsSection from '../components/ProductsSection';

export default function ProductsPage() {
  return (
    <>
      <PageBanner title="Products" subtitle="Explore our full range of commercial-grade eggs — from farm-fresh whites to certified organic and free-range options." />
      <ProductsSection />
    </>
  );
}
