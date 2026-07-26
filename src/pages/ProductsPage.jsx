import PageBanner from '../components/PageBanner';
import ProductsSection from '../components/ProductsSection';

export default function ProductsPage() {
  return (
    <>
      <PageBanner title="Products & Process" subtitle="Explore our full range of commercial-grade eggs and the robust supply chain that guarantees their quality." />
      <ProductsSection />
    </>
  );
}
