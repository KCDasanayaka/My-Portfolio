import "./globals.css";
import { Urbanist } from "next/font/google";
import type { Metadata } from "next";
import CursorFollower from "@/components/projects/CursorFollower";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kavindu Chathuranga",
  description:
    "I turn design and code into digital experiences that help businesses grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
        <CursorFollower />
        {children}
      </body>
    </html>
  );
}