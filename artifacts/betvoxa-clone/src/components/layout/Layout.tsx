import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.28),transparent_34%),radial-gradient(circle_at_50%_18%,rgba(59,130,246,0.16),transparent_22%),linear-gradient(#70b9ff,#58aaff)] flex items-start justify-center px-0 sm:px-4">
      <div className="w-full max-w-107.5 min-h-screen flex flex-col bg-transparent shadow-[0_0_0_1px_rgba(255,255,255,0.08)] sm:rounded-b-3xl overflow-hidden">
        <Navbar />
        <main className="flex-1 bg-transparent">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

