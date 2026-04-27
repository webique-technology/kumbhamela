import "../../assets/scss/main.scss"
import { BathingDates } from "@/components/section/BathingDates";
import BlogSection from "@/components/section/blog";
// import HotelsBookSection from "@/components/section/HotelsBookSection";
// import RentalCar from "@/components/section/RentalCar";
import TouristVisitSection from "@/components/section/TouristVisitSection";
// import TourPackage from "@/components/section/TourPackage";
import PlanTabSec from "@/components/section/PlanTabSec";
import ServicesTabSec from "@/components/section/ServicesTabSec";
import WhyChooseUs from "@/components/section/WhyChooseUs";
import HeroHeader from "@/components/section/HeroHeader";
import VideoGallery from "@/components/section/VideoGallery";

// import Image from "next/image";

export default function Home() {
  return (
    <main className="homepage-demo-design">
      <HeroHeader />
      <WhyChooseUs />
      <PlanTabSec />
      <TouristVisitSection />
      <ServicesTabSec />
      <BathingDates />
      <BlogSection />
      <VideoGallery />
    </main>
  );
}
