import { Link } from "wouter";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="text-[#60a5fa] font-serif text-9xl font-bold mb-4 text-glow drop-shadow-[0_8px_24px_rgba(8,17,34,0.34)]">404</div>
        <h1 className="font-serif text-3xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-[#c5cce2] mb-8">
          The page you're looking for doesn't exist. The odds were against you finding it.
        </p>
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white rounded-lg font-bold hover:bg-[#1D4ED8] transition-colors shadow-[0_10px_26px_rgba(37,99,235,0.22)]"
            data-testid="button-back-home"
          >
            <Home size={16} />
            Back to Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}

