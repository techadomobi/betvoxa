import { ReactNode } from "react";
import { useLocation } from "wouter";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const isHomePage = location === "/";
  const isGameDetail = location.includes("/game/");

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.20),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.12),transparent_24%),radial-gradient(circle_at_20%_15%,rgba(59,130,246,0.10),transparent_26%),linear-gradient(180deg,#071122,#0b1630 52%,#08111f)]">
      <div className={isGameDetail ? "w-full h-screen flex flex-col overflow-hidden bg-linear-to-b from-[#1a1a3e] to-[#0f0f2e]" : isHomePage ? "mx-auto flex min-h-screen w-full max-w-107.5 flex-col overflow-hidden bg-transparent shadow-[0_24px_80px_rgba(8,17,34,0.24)] sm:rounded-b-4xl" : "flex min-h-screen w-full flex-col bg-transparent"}>
        {!isGameDetail && <Navbar />}
        <main className={isGameDetail ? "flex-1 overflow-y-auto bg-linear-to-b from-[#1a1a3e] to-[#0f0f2e]" : isHomePage ? "flex-1 bg-transparent" : "flex-1 bg-transparent w-full"}>{children}</main>
        {!isGameDetail && <Footer />}
      </div>
    </div>
  );
}

