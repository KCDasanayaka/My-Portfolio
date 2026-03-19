import { Urbanist } from "next/font/google";
const urbanist = Urbanist({ subsets: ["latin"] });
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/section/HeroSection";

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
        {children}
      </body>
    </html>
  );
}