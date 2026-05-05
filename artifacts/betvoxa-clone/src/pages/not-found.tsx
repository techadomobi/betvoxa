import { Link } from "wouter";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0A09] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="text-[#E0AE2E] font-serif text-9xl font-bold mb-4 text-glow">404</div>
        <h1 className="font-serif text-3xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-white/50 mb-8">
          The page you're looking for doesn't exist. The odds were against you finding it.
        </p>
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#E0AE2E] text-[#0B0A09] rounded-lg font-bold hover:bg-[#f0c040] transition-colors"
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
