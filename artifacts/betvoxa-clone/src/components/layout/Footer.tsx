import { useState } from "react";
import { Link } from "wouter";
import { AlertTriangle, Send } from "lucide-react";

export default function Footer() {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="bg-[#081428] text-[#F4F8FC] border-t border-white/10">
      <div className="px-4 py-5 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" data-testid="link-logo">
            <div className="flex items-center gap-3 group cursor-pointer">
              {!logoError ? (
                <img
                  src="/logo.png"
                  alt="BetVoxa"
                  onError={() => setLogoError(true)}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <div className="w-9 h-9 bg-[#F1C40F] rounded flex items-center justify-center text-black font-bold">B</div>
              )}
            </div>
          </Link>
          <a
            href="https://t.me/gamezhunt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 bg-[#2563EB] text-white rounded-lg text-xs font-semibold"
            title="Join our Telegram channel"
          >
            <Send size={14} />
            Telegram
          </a>
        </div>

        <div className="text-[#C7D5E6] text-[11px] leading-relaxed">
          Disclaimer:-This page is published in good faith for entertainment and general information purposes only. The points won in the quizzes have no real money value. It can’t be converted into money.
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[#9DB3C9]">
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link href="/terms-and-conditions" className="hover:text-white">Terms & Conditions</Link>
          <Link href="/responsible-gambling" className="hover:text-white">Disclaimer</Link>
        </div>

        <div className="text-[#9DB3C9] text-[11px]">Copyright © {new Date().getFullYear()} BetVoxa. All rights reserved.</div>
      </div>
    </footer>
  );
}

