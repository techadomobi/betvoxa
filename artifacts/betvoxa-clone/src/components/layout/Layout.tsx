import { ReactNode } from "react";
import { useLocation } from "wouter";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const isHomePage = location === "/";
  const isGameDetail = location.includes("/game/");

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.12),transparent_34%),radial-gradient(circle_at_50%_18%,rgba(96,165,250,0.10),transparent_22%),linear-gradient(180deg,#f7fbff,#eef6ff)]">
      <div className={isGameDetail ? "w-full h-screen flex flex-col overflow-hidden bg-gradient-to-b from-[#1a1a3e] to-[#0f0f2e]" : isHomePage ? "mx-auto flex min-h-screen w-full max-w-107.5 flex-col overflow-hidden bg-transparent shadow-[0_24px_80px_rgba(37,99,235,0.08)] sm:rounded-b-[2rem]" : "flex min-h-screen w-full flex-col bg-transparent"}>
        {!isGameDetail && <Navbar />}
        <main className={isGameDetail ? "flex-1 overflow-y-auto bg-gradient-to-b from-[#1a1a3e] to-[#0f0f2e]" : isHomePage ? "flex-1 bg-transparent" : "flex-1 bg-transparent w-full"}>{children}</main>
        {!isGameDetail && <Footer />}
      </div>
    </div>
  );
}

