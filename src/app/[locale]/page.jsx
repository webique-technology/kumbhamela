import "../../assets/scss/main.scss"
import { BathingDates } from "@/components/section/BathingDates";
import BlogSection from "@/components/section/blog";
import TouristVisitSection from "@/components/section/TouristVisitSection";
import PlanTabSec from "@/components/section/PlanTabSec";
import ServicesTabSec from "@/components/section/ServicesTabSec";
import HeroHeader from "@/components/section/HeroHeader";
import VideoGallery from "@/components/section/VideoGallery";
import AboutSec from "@/components/section/About";

// import Image from "next/image";

export default function Home() {
  return (
    <main className="homepage-demo-design">
      <HeroHeader />
      <AboutSec />
      <PlanTabSec />
      <TouristVisitSection />
      <ServicesTabSec />
      <BathingDates />
      <BlogSection />
      <VideoGallery />
    </main>
  );
}
