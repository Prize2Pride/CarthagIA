import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Star, Award, Target } from "lucide-react";

type Language = "en" | "ar" | "fr";

const translations = {
  en: {
    title: "Founder & Vision",
    subtitle: "Leading the fight against corruption through technology and transparency",
    sections: {
      vision: "Vision",
      mission: "Mission",
      values: "Core Values",
    },
    content: {
      vision: "To create a transparent, decentralized governance system that empowers citizens and eliminates corruption through blockchain technology and AI-driven oversight.",
      mission: "Building CarthagIA as a platform where every citizen has a voice, every transaction is recorded on an immutable ledger, and every decision is made with complete transparency.",
      values: [
        "Transparency: Complete visibility into all government actions",
        "Accountability: Every decision is traceable and verifiable",
        "Empowerment: Citizens have real power in governance",
        "Innovation: Using cutting-edge technology for social good",
      ],
    },
  },
  ar: {
    title: "المؤسس والرؤية",
    subtitle: "قيادة الحرب ضد الفساد من خلال التكنولوجيا والشفافية",
    sections: {
      vision: "الرؤية",
      mission: "المهمة",
      values: "القيم الأساسية",
    },
    content: {
      vision: "إنشاء نظام حكم شفاف لامركزي يمكّن المواطنين ويقضي على الفساد من خلال تقنية البلوكتشين والإشراف المدعوم بالذكاء الاصطناعي.",
      mission: "بناء قرطاجنة كمنصة حيث يكون لكل مواطن صوت، وكل معاملة مسجلة على دفتر أستاذ غير قابل للتغيير، وكل قرار يتم اتخاذه بشفافية كاملة.",
      values: [
        "الشفافية: رؤية كاملة لجميع الإجراءات الحكومية",
        "المساءلة: كل قرار قابل للتتبع والتحقق",
        "التمكين: للمواطنين سلطة حقيقية في الحكم",
        "الابتكار: استخدام التكنولوجيا المتقدمة للصالح الاجتماعي",
      ],
    },
  },
  fr: {
    title: "Fondateur et Vision",
    subtitle: "Mener la lutte contre la corruption par la technologie et la transparence",
    sections: {
      vision: "Vision",
      mission: "Mission",
      values: "Valeurs Fondamentales",
    },
    content: {
      vision: "Créer un système de gouvernance transparent et décentralisé qui autonomise les citoyens et élimine la corruption grâce à la technologie blockchain et à la surveillance alimentée par l'IA.",
      mission: "Construire CarthagIA comme une plateforme où chaque citoyen a une voix, chaque transaction est enregistrée sur un registre immuable, et chaque décision est prise en toute transparence.",
      values: [
        "Transparence: Visibilité complète de toutes les actions gouvernementales",
        "Responsabilité: Chaque décision est traçable et vérifiable",
        "Autonomisation: Les citoyens ont un vrai pouvoir dans la gouvernance",
        "Innovation: Utiliser la technologie de pointe pour le bien social",
      ],
    },
  },
};

export default function FounderProfile() {
  const { language, dir } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-[#04080F] text-[#E8EDFF] py-12 px-4" dir={dir}>
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#C9A84C] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#00D4A7] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] to-[#00D4A7] mb-4">
            {t.title}
          </h1>
          <p className="text-[#96A4B4]">{t.subtitle}</p>
        </motion.div>

        {/* Founder Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="backdrop-blur-md bg-[rgba(201,168,76,0.05)] border border-[rgba(201,168,76,0.2)] rounded-lg p-12 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative w-64 h-64 rounded-lg overflow-hidden border-2 border-[#C9A84C] shadow-2xl">
                {/* Placeholder for founder photo */}
                <div className="w-full h-full bg-gradient-to-br from-[#C9A84C] to-[#00D4A7] flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">👤</div>
                    <p className="text-[#04080F] font-semibold">Founder Profile</p>
                    <p className="text-sm text-[#04080F]">Photo will appear here</p>
                  </div>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#C9A84C] to-transparent opacity-20" />
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-bold text-[#C9A84C] mb-2">CarthagIA Founder</h2>
                <p className="text-[#96A4B4]">Visionary Leader | Corruption Fighter | Technology Pioneer</p>
              </div>

              <p className="text-[#E8EDFF] leading-relaxed">
                Leading the transformation of Tunisia's governance through innovative technology and unwavering commitment to transparency. 
                With a passion for eliminating corruption and empowering citizens, I've dedicated my efforts to building CarthagIA—a platform 
                where blockchain technology and AI work together to create a truly democratic and accountable government.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Star className="text-[#C9A84C]" size={20} />
                  <span className="text-[#E8EDFF]">Blockchain & Governance Expert</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="text-[#00D4A7]" size={20} />
                  <span className="text-[#E8EDFF]">Anti-Corruption Advocate</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="text-[#8B5CF6]" size={20} />
                  <span className="text-[#E8EDFF]">Digital Transformation Leader</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Vision, Mission, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="backdrop-blur-md bg-[rgba(0,212,167,0.05)] border border-[rgba(0,212,167,0.2)] rounded-lg p-6"
          >
            <h3 className="text-xl font-bold text-[#00D4A7] mb-4">{t.sections.vision}</h3>
            <p className="text-[#96A4B4] leading-relaxed">{t.content.vision}</p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="backdrop-blur-md bg-[rgba(201,168,76,0.05)] border border-[rgba(201,168,76,0.2)] rounded-lg p-6"
          >
            <h3 className="text-xl font-bold text-[#C9A84C] mb-4">{t.sections.mission}</h3>
            <p className="text-[#96A4B4] leading-relaxed">{t.content.mission}</p>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="backdrop-blur-md bg-[rgba(139,92,246,0.05)] border border-[rgba(139,92,246,0.2)] rounded-lg p-6"
          >
            <h3 className="text-xl font-bold text-[#8B5CF6] mb-4">{t.sections.values}</h3>
            <ul className="space-y-2">
              {t.content.values.map((value: string, idx: number) => (
                <li key={idx} className="text-sm text-[#96A4B4] flex gap-2">
                  <span className="text-[#8B5CF6]">✓</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="backdrop-blur-md bg-[#070C18] border border-[rgba(201,168,76,0.2)] rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold text-[#C9A84C] mb-8 text-center">Impact & Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Citizens Engaged", value: "125K+", icon: "👥" },
              { label: "Transactions Tracked", value: "2.5M", icon: "🔗" },
              { label: "Alerts Generated", value: "847", icon: "🚨" },
              { label: "Proposals Passed", value: "32", icon: "✅" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <p className="text-3xl font-bold text-[#C9A84C] mb-1">{stat.value}</p>
                <p className="text-[#96A4B4]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
