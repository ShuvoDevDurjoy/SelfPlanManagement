import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Sidebar from "./Sidebar";

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
    <html lang="en w-full border-box bg-blue-500">
      <body
        className={`w-full h-screen bg-black ${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <div className="grid grid-cols-12 grid-rows-6 w-full h-full overflow-hidden">
          <div className="h-full col-start-1 col-end-3 row-start-1 row-end-7 after:absolute relative after:h-full after:w-0.5 after:content-[''] after:bg-gray-300 after:block after:right-0 after:top-0">
            <Sidebar />
          </div>
          <div className="dashboard_container col-start-3 col-end-13 row-start-1 row-end-7 bg-primary overflow-hidden">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
