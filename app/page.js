import CustomCursor from "@/components/CustomCursor";
import HamburgerMenu from "@/components/HamburgerMenu";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ResumeSection from "@/components/ResumeSection";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <HamburgerMenu />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ResumeSection />
    </>
  );
}
