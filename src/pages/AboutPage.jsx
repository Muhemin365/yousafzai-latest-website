import PageBanner from '../components/PageBanner';
import AboutSection from '../components/AboutSection';
import OurCompaniesSection from '../components/OurCompaniesSection';

export default function AboutPage() {
  return (
    <>
      <PageBanner title="About Us" subtitle="Discover the story behind Yousafzai EGRO — our values, our team, and our commitment to quality egg supply." />
      <AboutSection />
      <OurCompaniesSection />
    </>
  );
}
