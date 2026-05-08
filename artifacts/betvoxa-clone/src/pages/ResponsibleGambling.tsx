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

  const warningSigns = [
    "Spending more money or time than planned",
    "Chasing losses with bigger bets",
    "Hiding gambling activity from family or friends",
    "Borrowing money to gamble",
    "Feeling anxious, stressed, or guilty after betting",
    "Neglecting work, study, or relationships",
  ];

  const practicalSteps = [
    {
      title: "Create a monthly gambling budget",
      text: "Set a fixed amount for entertainment and never exceed it. Keep gambling separate from rent, bills, and savings.",
    },
    {
      title: "Use deposit and loss limits",
      text: "Most licensed operators offer daily, weekly, and monthly caps. Activate them before placing bets.",
    },
    {
      title: "Set a timer before every session",
      text: "Take breaks every 30 to 45 minutes and end your session when the timer runs out.",
    },
    {
      title: "Never gamble while emotional",
      text: "Avoid betting when stressed, upset, intoxicated, or sleep-deprived. Emotional betting leads to poor decisions.",
    },
    {
      title: "Keep gambling as entertainment",
      text: "Treat wins as luck, not income. Betting should not be used to solve financial problems.",
    },
  ];

  const faq = [
    {
      q: "What is responsible gambling?",
      a: "Responsible gambling means betting within your limits, understanding the risks, and using safety tools to stay in control.",
    },
    {
      q: "How do I know if I need a break?",
      a: "If betting causes stress, affects your finances, or starts impacting work and relationships, it is a good time to pause and seek support.",
    },
    {
      q: "Can I block access to gambling sites?",
      a: "Yes. You can use self-exclusion tools from operators and device-level website blockers for additional protection.",
    },
    {
      q: "Where can I get confidential help?",
      a: "Support services like BeGambleAware, GamCare, and national helplines provide confidential guidance and recovery resources.",
    },
  ];

  const impactStats = [
    { label: "Primary Goal", value: "Play Safely" },
    { label: "Minimum Age", value: "18+" },
    { label: "Helpline", value: "1-800-GAMBLER" },
  ];

  const recoveryPlan = [
    {
      phase: "Week 1",
      title: "Stabilize",
      detail: "Pause gambling activity, activate self-exclusion where needed, and inform a trusted contact.",
    },
    {
      phase: "Week 2-4",
      title: "Rebuild Routine",
      detail: "Replace gambling time with structured routines: exercise, social contact, and financial planning.",
    },
    {
      phase: "Month 2",
      title: "Track Triggers",
      detail: "Identify emotional and situational triggers. Use a short journal to map urges and recovery actions.",
    },
    {
      phase: "Month 3",
      title: "Long-Term Maintenance",
      detail: "Keep active limits, periodic check-ins, and support contact points to reduce relapse risk.",
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
          <div className="inline-flex items-center gap-2 text-[#2563EB] text-xs tracking-wider uppercase font-semibold bg-[#2563EB]/10 px-3 py-1 rounded-full mb-4">
            <AlertTriangle size={14} />
            Player Protection
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#1F1A17] mb-4">Responsible Gambling</h1>
          <p className="text-[#5F554C] text-lg max-w-3xl">
            Gambling should be entertaining, not a source of stress. BetVoxa encourages safe play,
            informed decisions, and timely support when needed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {impactStats.map((item) => (
            <div key={item.label} className="bg-white border border-[#ECE6DB] rounded-xl px-5 py-4">
              <div className="text-[#2563EB] text-xs font-semibold uppercase tracking-wider mb-1">{item.label}</div>
              <div className="text-[#1F1A17] font-semibold">{item.value}</div>
            </div>
          ))}
        </div>

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
                <div className="w-11 h-11 rounded-xl bg-[#2563EB]/10 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-[#2563EB]" />
                </div>
                <h2 className="font-semibold text-[#1F1A17] mb-2">{card.title}</h2>
                <p className="text-[#5F554C] text-sm leading-relaxed">{card.text}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-[#ECE6DB] rounded-2xl p-6 md:p-8 mb-8"
        >
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1F1A17] mb-4">Warning Signs to Watch For</h2>
          <p className="text-[#5F554C] mb-5">
            Problem gambling often develops gradually. Recognizing early signs helps you take action before it affects your finances and wellbeing.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {warningSigns.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[#3F3832] text-sm bg-[#FCFBF8] border border-[#EFE8DB] rounded-xl px-4 py-3">
                <span className="mt-0.5 text-[#2563EB]">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-[#ECE6DB] rounded-2xl p-6 md:p-8 mb-8"
        >
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1F1A17] mb-4">90-Day Recovery Plan</h2>
          <div className="space-y-4">
            {recoveryPlan.map((step) => (
              <div key={step.phase} className="border border-[#EFE8DB] rounded-xl p-4 bg-[#FCFBF8]">
                <div className="text-[#2563EB] text-xs font-semibold uppercase tracking-wider mb-1">{step.phase}</div>
                <h3 className="font-semibold text-[#1F1A17] mb-2">{step.title}</h3>
                <p className="text-[#5F554C] text-sm leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1F1A17] mb-4">Practical Safer Gambling Steps</h2>
          <div className="space-y-4">
            {practicalSteps.map((step, idx) => (
              <div key={step.title} className="bg-white border border-[#ECE6DB] rounded-2xl p-5 md:p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#2563EB]/12 text-[#2563EB] text-sm font-semibold flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <h3 className="font-semibold text-[#1F1A17]">{step.title}</h3>
                </div>
                <p className="text-[#5F554C] text-sm leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-[#ECE6DB] rounded-2xl p-6 md:p-8 mb-8"
        >
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1F1A17] mb-4">Support and Self-Exclusion</h2>
          <p className="text-[#5F554C] text-sm leading-relaxed mb-4">
            If gambling is becoming difficult to manage, consider self-exclusion. This feature blocks your account access for a selected period and helps reduce impulsive play.
            Combine self-exclusion with spending controls and support services for better long-term results.
          </p>
          <p className="text-[#5F554C] text-sm leading-relaxed">
            If you feel overwhelmed, speak to someone you trust and contact a professional support service. Early support can significantly improve recovery outcomes.
          </p>
        </motion.section>

        <div className="bg-[#1F1A17] text-[#F2EFE8] rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-3">Support Resources</h3>
          <p className="text-[#D9D1C4] mb-2">If gambling is affecting your wellbeing, contact one of these organizations:</p>
          <ul className="space-y-1 text-[#E7E0D4]">
            <li><a href="https://www.begambleaware.org" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-white">BeGambleAware.org</a></li>
            <li><a href="https://www.gamcare.org.uk" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-white">GamCare.org.uk</a></li>
            <li>National Problem Gambling Helpline: 1-800-GAMBLER</li>
          </ul>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-white border border-[#ECE6DB] rounded-2xl p-6 md:p-8"
        >
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1F1A17] mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faq.map((item) => (
              <div key={item.q} className="border border-[#EFE8DB] rounded-xl p-4 bg-[#FCFBF8]">
                <h3 className="font-semibold text-[#1F1A17] mb-2">{item.q}</h3>
                <p className="text-[#5F554C] text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </section>
    </div>
  );
}

