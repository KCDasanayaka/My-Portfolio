import "./globals.css";
import { Urbanist } from "next/font/google";
const urbanist = Urbanist({ subsets: ["latin"] });
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/section/HeroSection";
import About from "@/components/section/AboutSection";
import Projects from "@/components/section/ProjectSection";
import Services from "@/components/section/ServicesSection";
import Contact from "@/components/section/ContactSection";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Kavindu Chathuranga - UI/UX Engineer, Frontend Developer, and Brand Designer",
  description: "I turn design and code into digital experiences that help businesses grow. Explore my portfolio to see how I create intuitive interfaces and impactful brands.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <Hero/>
        <About/>
        <Projects/>
        <Services/>
        <Contact/>
        <Footer/>
      </body>
    </html>
  );
}