import FooterSection from "@/components/footer/FooterSection";
import DiscoverySection from "@/components/HomeComponents/DiscoverySection";
import FeaturesSection from "@/components/HomeComponents/FeaturesSection";
import FootBanner from "@/components/HomeComponents/FootBanner";
import HeroComponent from "@/components/HomeComponents/Hero";
import PositionStatesSection from "@/components/HomeComponents/PositionStatesSection";
import PricingSection from "@/components/HomeComponents/PricingSection";

export default function Home() {
  return (
    <>
    {/* <img src="../../../public" alt="" /> */}
      <div className="bg-cover bg-center h-[200vh]" style={{ backgroundImage: "url('/globe.png')" }}>
      <HeroComponent />
      <PositionStatesSection />
      </div>
      <DiscoverySection />
      <FeaturesSection />
      <PricingSection />
      <FootBanner />
      <FooterSection />
    </>
  );
}
