import { ReactNode } from "react";
import { useLocation } from "wouter";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const isHomePage = location === "/";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.28),transparent_34%),radial-gradient(circle_at_50%_18%,rgba(59,130,246,0.16),transparent_22%),linear-gradient(#70b9ff,#58aaff)]">
      <div className={isHomePage ? "mx-auto flex min-h-screen w-full max-w-107.5 flex-col overflow-hidden bg-transparent shadow-[0_0_0_1px_rgba(255,255,255,0.08)] sm:rounded-b-3xl" : "flex min-h-screen w-full flex-col bg-transparent"}>
        <Navbar />
        <main className={isHomePage ? "flex-1 bg-transparent" : "flex-1 bg-transparent w-full"}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}

