import AcademicPrograms from "@/components/Shared/AcademicPrograms ";
import AdmissionsAid from "@/components/Shared/AdmissionsAid";
import EventCarousel from "@/components/Shared/EventCarousel";
import FeatureCards from "@/components/Shared/FeatureCards";
import Footer from "@/components/Shared/Footer";
import Gallery from "@/components/Shared/Gallery";
import HeroSection from "@/components/Shared/HeroSection";
import NewsAnnouncements from "@/components/Shared/NewsAnnouncements";

export default function Home() {
  return (
    <div className="font-sans ">
      <HeroSection />
      <FeatureCards />
      <EventCarousel />
      <AcademicPrograms />
      <AdmissionsAid />
      <NewsAnnouncements />
      <Gallery />
      <Footer />
    </div>
  );
}
