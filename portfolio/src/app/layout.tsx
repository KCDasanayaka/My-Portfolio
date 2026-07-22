import "./globals.css";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title:
    "Kavindu Chathuranga — UI/UX Designer, Frontend Developer & Brand Designer",
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
        {children}
      </body>
    </html>
  );
}