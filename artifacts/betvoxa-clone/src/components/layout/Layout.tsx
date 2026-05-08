import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_30%,rgba(37,99,235,0.12),transparent_20%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.08),transparent_10%),linear-gradient(#eaf6ff,#eef6ff)] flex items-start justify-center">
      <div className="w-full max-w-120 min-h-screen flex flex-col bg-transparent">
        <Navbar />
        <main className="flex-1 px-4 pt-20 pb-8">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

