import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Self Plan Management",
  description: "An App to manage daily educational",
};

export default function RootLayout({ children }) {
  return (
    <div
        className={`w-full h-screen  bg-gray-200 ${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden flex items-center justify-center`}
      >
            {children}
    </div>
  );
}
