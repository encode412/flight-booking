import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  AboutSection,
  HeroSection,
  PopularRoutesCarouselSection,
  ServicesCarouselSection,
  TrendingCarouselSection,
  WhyEzzifly,
} from "./components";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ServicesCarouselSection />
      <PopularRoutesCarouselSection />
      <TrendingCarouselSection />
      <WhyEzzifly />
      <AboutSection />
      <Footer />
    </>
  );
}
