import { Bebas_Neue, Barlow } from "next/font/google";
import "./globals.css";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Barlow({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "Diet-IT | Smart Indian Diet Planner",
  description: "Your personal AI-powered Indian food nutritionist",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} bg-dark text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
