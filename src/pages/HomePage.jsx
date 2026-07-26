import HeroSection from '../components/HeroSection';
import SupplyChainSection from '../components/SupplyChainJourney/SupplyChainSection';
import SupplyChainControlCenter from '../components/SupplyChainControlCenter';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SupplyChainSection />
      <SupplyChainControlCenter />
      <FAQSection />
      <CTASection />
    </>
  );
}
