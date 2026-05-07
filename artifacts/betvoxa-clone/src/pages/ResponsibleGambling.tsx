import { motion } from "framer-motion";
import { AlertTriangle, ShieldCheck, HeartPulse, PhoneCall } from "lucide-react";

export default function ResponsibleGambling() {
  const cards = [
    {
      icon: ShieldCheck,
      title: "Set Limits",
      text: "Use deposit, loss, and time limits to stay in control.",
    },
    {
      icon: HeartPulse,
      title: "Take Breaks",
      text: "If gambling stops being fun, pause and step away.",
    },
    {
      icon: AlertTriangle,
      title: "Know the Risks",
      text: "Never gamble with money you cannot afford to lose.",
    },
    {
      icon: PhoneCall,
      title: "Get Support",
      text: "Talk to a support organization if you need help.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F7F2] to-[#F3F1EA]">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1F1A17] mb-4">Responsible Gambling</h1>
          <p className="text-[#5F554C] text-lg max-w-3xl">
            Gambling should be entertaining, not a source of stress. BetVoxa encourages safe play,
            informed decisions, and timely support when needed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white border border-[#ECE6DB] rounded-2xl p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F97316]/10 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-[#F97316]" />
                </div>
                <h2 className="font-semibold text-[#1F1A17] mb-2">{card.title}</h2>
                <p className="text-[#5F554C] text-sm leading-relaxed">{card.text}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="bg-[#1F1A17] text-[#F2EFE8] rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-3">Support Resources</h3>
          <p className="text-[#D9D1C4] mb-2">If gambling is affecting your wellbeing, contact one of these organizations:</p>
          <ul className="space-y-1 text-[#E7E0D4]">
            <li>BeGambleAware.org</li>
            <li>GamCare.org.uk</li>
            <li>National Problem Gambling Helpline: 1-800-GAMBLER</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
