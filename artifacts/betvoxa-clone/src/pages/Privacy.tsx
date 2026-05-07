import { motion } from "framer-motion";
import { Shield, Mail, Globe, Lock, Eye, Zap, AlertCircle, CheckCircle2, Cookie, FileText } from "lucide-react";

export default function Privacy() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const sections = [
    {
      title: "1. Introduction",
      icon: FileText,
      color: "#F97316",
      content: [
        "BetVoxa is an informational platform that provides reviews, promotional offers, bonuses, and deals related to third-party online gaming platforms.",
        "We do not own, operate, or control any casino or gaming services.",
      ],
    },
    {
      title: "2. Information We Collect",
      icon: Eye,
      color: "#F97316",
      content: [
        "a) Personal Information: Name and email address (only when voluntarily submitted through forms or contact)",
        "b) Non-Personal Information: IP address, browser type and device information, pages visited and time spent on the website",
        "c) Cookies & Tracking Technologies: We use cookies and similar technologies to enhance user experience and analyze website performance.",
      ],
    },
    {
      title: "3. How We Use Your Information",
      icon: Zap,
      color: "#F97316",
      content: [
        "• Improve website functionality and user experience",
        "• Respond to user queries or support requests",
        "• Monitor and analyze traffic trends",
        "• Provide relevant content and promotional information",
      ],
    },
    {
      title: "4. Third-Party Links",
      icon: Globe,
      color: "#F97316",
      content: [
        "BetVoxa acts solely as a marketing and informational platform.",
        "We provide links to third-party websites for promotional purposes",
        "We do not control or manage these external platforms",
        "Once you leave our website, their privacy policies apply",
        "We strongly recommend reviewing the privacy policies of any third-party website before engaging with their services.",
      ],
    },
    {
      title: "5. Nature of Services",
      icon: Shield,
      color: "#F97316",
      content: [
        "BetVoxa does not provide betting services, does not accept deposits or process payments, and does not operate any casino platform.",
        "We only present informational content and promotional offers from third-party providers.",
      ],
    },
    {
      title: "6. Data Security",
      icon: Lock,
      color: "#F97316",
      content: [
        "We implement reasonable technical and organizational measures to protect your data. However, no digital platform can guarantee absolute security.",
      ],
    },
    {
      title: "7. User Responsibility",
      icon: AlertCircle,
      color: "#F97316",
      content: [
        "By using this website, you confirm that: You are of legal age according to your jurisdiction, you understand the risks associated with online gaming, and you access third-party services at your own discretion.",
      ],
    },
    {
      title: "8. Cookies Policy",
      icon: Cookie,
      color: "#F97316",
      content: [
        "Cookies are used to improve site performance, store user preferences, and analyze visitor behavior. You may disable cookies via your browser settings if preferred.",
      ],
    },
    {
      title: "9. Updates to This Policy",
      icon: CheckCircle2,
      color: "#F97316",
      content: [
        "We reserve the right to update this Privacy Policy at any time. Changes will be reflected on this page with an updated effective date.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F7F2] to-[#F3F1EA]">
      {/* ─── ANIMATED BACKGROUND ─── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-[#F97316]/5 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-[#F97316]/3 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-4">
            <motion.div className="flex items-center gap-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                <Shield size={40} className="text-[#F97316]" />
              </motion.div>
              <div className="text-[#F97316] text-sm font-semibold uppercase tracking-widest">Privacy Protected</div>
            </motion.div>
            <motion.h1 className="font-serif text-6xl md:text-7xl font-bold text-[#1F1A17] mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              Privacy Policy
            </motion.h1>
            <motion.p className="text-[#5F554C] text-lg max-w-2xl leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              Effective Date: <span className="font-semibold text-[#F97316]">05 May 2026</span>
            </motion.p>
            <motion.p className="text-[#5F554C] text-lg max-w-3xl leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              At BetVoxa.com, we are committed to protecting your privacy and ensuring transparency in how your information is collected, used, and safeguarded. This Privacy Policy outlines our practices when you access or interact with our website.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── KEY HIGHLIGHTS ─── */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {[
            { icon: Lock, label: "Data Protected", desc: "Your information is secured with industry-standard measures" },
            { icon: Eye, label: "Transparency", desc: "Clear policies on how we collect and use your data" },
            { icon: Shield, label: "Privacy First", desc: "Your privacy rights are our top priority" },
          ].map((item, i) => (
            <motion.div key={i} variants={itemVariants} className="bg-white/60 backdrop-blur-md border border-[#F97316]/20 rounded-2xl p-6 hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:shadow-[#F97316]/10">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }} className="mb-4">
                <item.icon size={32} className="text-[#F97316]" />
              </motion.div>
              <h3 className="font-semibold text-[#1F1A17] mb-2 text-lg">{item.label}</h3>
              <p className="text-[#5F554C] text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── CONTENT SECTIONS ─── */}
      <section className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div className="space-y-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {sections.map((section, i) => {
            const IconComponent = section.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group"
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div className="bg-white border border-[#ECE6DB] rounded-2xl p-8 shadow-md hover:shadow-lg hover:shadow-[#F97316]/10 transition-all duration-300 overflow-hidden relative">
                  {/* Background gradient effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#F97316]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: -400 }}
                    whileHover={{ x: 400 }}
                    transition={{ duration: 0.6 }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <motion.div
                        className="w-14 h-14 rounded-xl bg-[#F97316]/10 flex items-center justify-center flex-shrink-0"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <IconComponent size={24} className="text-[#F97316]" />
                      </motion.div>
                      <h2 className="font-serif text-2xl font-bold text-[#1F1A17] pt-2">{section.title}</h2>
                    </div>

                    <div className="space-y-3 ml-0">
                      {section.content.map((paragraph, j) => (
                        <motion.p
                          key={j}
                          className="text-[#5F554C] leading-relaxed text-base"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: j * 0.1 }}
                          viewport={{ once: true }}
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ─── CONTACT SECTION ─── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-20">
          <motion.div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-bold text-[#1F1A17] mb-3">10. Contact Information</h2>
            <p className="text-[#5F554C] text-lg">Have questions? We're here to help</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Mail, title: "Email", value: "support@betvoxa.com", href: "mailto:support@betvoxa.com" },
              { icon: Globe, title: "Website", value: "https://www.betvoxa.com", href: "https://www.betvoxa.com" },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                variants={itemVariants}
                className="bg-gradient-to-br from-white to-[#F97316]/5 border border-[#F97316]/20 rounded-2xl p-6 hover:shadow-lg hover:shadow-[#F97316]/15 transition-all duration-300 group cursor-pointer"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-16 h-16 rounded-xl bg-[#F97316]/15 flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <item.icon size={28} className="text-[#F97316]" />
                  </motion.div>
                  <div>
                    <div className="text-sm font-semibold text-[#1F1A17]">{item.title}</div>
                    <div className="text-[#5F554C] text-base group-hover:text-[#F97316] transition-colors">{item.value}</div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* ─── DISCLAIMER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <motion.div
            className="relative bg-gradient-to-br from-[#FEF2E8] to-[#FEF9F3] border-2 border-[#F97316]/30 rounded-2xl p-8 overflow-hidden"
            whileHover={{ borderColor: "#F97316" }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-[#F97316]/5"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <div className="relative z-10 flex gap-4">
              <motion.div animate={{ rotate: [0, -5, 5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                <AlertCircle size={28} className="text-[#F97316] flex-shrink-0 mt-1" />
              </motion.div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1F1A17] mb-2">Important Disclaimer</h3>
                <p className="text-[#5F554C] leading-relaxed">
                  BetVoxa is a third-party promotional platform. We do not own or operate any casino or gaming service. All offers, bonuses, and services are provided by external platforms. Your use of our site indicates your acceptance of this privacy policy.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FOOTER CTA ─── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative py-16 bg-gradient-to-r from-[#F97316]/10 to-[#F97316]/5 border-t border-[#F97316]/20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p className="text-[#5F554C] text-base leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            By using BetVoxa, you acknowledge that you have read and understood this Privacy Policy. We encourage you to review this policy regularly for any updates.
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
}
