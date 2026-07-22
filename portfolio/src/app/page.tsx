import PortfolioEntrance from "@/components/animation/PortfolioEntrance";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/section/HeroSection";
import About from "@/components/section/AboutSection";
import Projects from "@/components/section/ProjectSection";
import Services from "@/components/section/ServicesSection";
import Contact from "@/components/section/ContactSection";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <PortfolioEntrance>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Projects />
        <Services />
        <Contact />
      </main>

      <Footer />
    </PortfolioEntrance>
  );
}