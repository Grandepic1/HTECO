import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HTECO",
  description: "Track your carbon footprint",
};

import Navbar from "@/components/dashboard/Navbar";


export default function DashboardLayout({ children }) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-[#F7F7F5] text-slate-800 font-sans">
          {children}
        </div>
      </body>
    </html>
  );
}
