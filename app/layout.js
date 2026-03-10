import { Cormorant_Garamond, Italiana, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--cormorant",
  display: "swap",
});

const italiana = Italiana({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--italiana",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["300", "400"],
  subsets: ["latin"],
  variable: "--dm",
  display: "swap",
});

export const metadata = {
  title: "THEOTHERSITE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${italiana.variable} ${dmSans.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
