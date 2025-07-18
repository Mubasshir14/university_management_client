import AcademicPrograms from "@/components/Shared/AcademicPrograms ";
import AdmissionsAid from "@/components/Shared/AdmissionsAid";
import EventCarousel from "@/components/Shared/EventCarousel";
import FeatureCards from "@/components/Shared/FeatureCards";
import Gallery from "@/components/Shared/Gallery";
import HeroSection from "@/components/Shared/HeroSection";
import LoginRegister from "@/components/Shared/LoginRegister";

export default function Home() {
  return (
    <div className="font-sans ">
      <HeroSection />
      <FeatureCards />
      <EventCarousel />
      <AcademicPrograms />
      <AdmissionsAid />
      <Gallery />
      <LoginRegister />

    </div>
  );
}
