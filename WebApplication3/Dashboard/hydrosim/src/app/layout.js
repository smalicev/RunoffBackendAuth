import { Mulish } from "next/font/google";
import "./globals.css";

const mulish = Mulish({ subsets: ["latin"] });

export const metadata = {
  title: "Runoff Calculator",
  description: "Created by Srdjan Malicevic",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={mulish.className}>{children}</body>
    </html>
  );
}
