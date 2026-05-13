import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Zap, Code2, Shield, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  en: {
    title: 'Roued El Fadhel',
    subtitle: 'Founder & Creator of CarthagIA',
    tagline: 'Architect of Blockchain Governance',
    description: 'Visionary leader pioneering transparent, decentralized governance through advanced technology and human-centered design.',
    contact: 'Get in Touch',
    phone: '+216 20579336',
    email: 'professor.raoued.fadhel@gmail.com',
    vision: 'Vision',
    visionText: 'Building a corruption-free world through blockchain transparency, AI augmentation, and citizen empowerment.',
    mission: 'Mission',
    missionText: 'Transform governance into a transparent, decentralized system where every citizen has a voice and every action is recorded immutably.',
    achievements: 'Achievements',
    achievement1: 'Creator of CarthagIA Platform',
    achievement2: 'Blockchain Governance Pioneer',
    achievement3: 'AI Augmentation Specialist',
    achievement4: 'Corruption Fighter',
    cta: 'Join the Movement',
    ctaDesc: 'Become a contributor to a corruption-free world',
  },
  ar: {
    title: 'رؤوف الفاضل',
    subtitle: 'مؤسس ومبتكر قرطاجنة الذكية',
    tagline: 'معماري الحكم اللامركزي بتقنية البلوكتشين',
    description: 'قائد رؤيوي يرسي أسس الحكم الشفاف واللامركزي من خلال التكنولوجيا المتقدمة والتصميم الموجه للإنسان.',
    contact: 'تواصل معنا',
    phone: '+216 20579336',
    email: 'professor.raoued.fadhel@gmail.com',
    vision: 'الرؤية',
    visionText: 'بناء عالم خالٍ من الفساد من خلال شفافية البلوكتشين وتعزيز الذكاء الاصطناعي وتمكين المواطنين.',
    mission: 'المهمة',
    missionText: 'تحويل الحكم إلى نظام شفاف لامركزي حيث يكون لكل مواطن صوت وكل إجراء مسجل بشكل دائم.',
    achievements: 'الإنجازات',
    achievement1: 'منشئ منصة قرطاجنة الذكية',
    achievement2: 'رائد الحكم اللامركزي بتقنية البلوكتشين',
    achievement3: 'متخصص في تعزيز الذكاء الاصطناعي',
    achievement4: 'محارب الفساد',
    cta: 'انضم إلى الحركة',
    ctaDesc: 'كن مساهماً في بناء عالم خالٍ من الفساد',
  },
  fr: {
    title: 'Roued El Fadhel',
    subtitle: 'Fondateur & Créateur de CarthagIA',
    tagline: 'Architecte de la Gouvernance Blockchain',
    description: 'Leader visionnaire pionnière de la gouvernance transparente et décentralisée grâce à la technologie avancée et la conception centrée sur l\'humain.',
    contact: 'Nous Contacter',
    phone: '+216 20579336',
    email: 'professor.raoued.fadhel@gmail.com',
    vision: 'Vision',
    visionText: 'Construire un monde sans corruption grâce à la transparence blockchain, l\'augmentation de l\'IA et l\'autonomisation des citoyens.',
    mission: 'Mission',
    missionText: 'Transformer la gouvernance en un système transparent et décentralisé où chaque citoyen a une voix et chaque action est enregistrée de manière immuable.',
    achievements: 'Réalisations',
    achievement1: 'Créateur de la Plateforme CarthagIA',
    achievement2: 'Pionnier de la Gouvernance Blockchain',
    achievement3: 'Spécialiste de l\'Augmentation IA',
    achievement4: 'Combattant de la Corruption',
    cta: 'Rejoignez le Mouvement',
    ctaDesc: 'Devenez contributeur à un monde sans corruption',
  },
};

export default function FounderHero() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Animated background with founder photo */}
      <div className="fixed inset-0 z-0">
        {/* Photo background with overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('/manus-storage/client_upload_media_e5a9e1af2b13f259529d50c38b875de2ead2cb67_media_01kezza4aqeg7skp9jfr1tfc3z_40aa7104.jpeg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)',
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-950/90" />

        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gold rounded-full"
              animate={{
                x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Glassmorphism glow */}
        <motion.div
          className="absolute w-96 h-96 bg-teal rounded-full blur-3xl opacity-10"
          animate={{
            x: [mousePosition.x - 192, mousePosition.x - 192],
            y: [mousePosition.y - 192, mousePosition.y - 192],
          }}
          transition={{ type: 'spring', damping: 30 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          className="max-w-4xl w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Hero Section */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <motion.h1
              className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-gold via-teal to-gold bg-clip-text text-transparent"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {t.title}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-2xl md:text-3xl text-teal font-light mb-2"
            >
              {t.subtitle}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gold mb-6 tracking-widest uppercase"
            >
              {t.tagline}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              {t.description}
            </motion.p>
          </motion.div>

          {/* Vision & Mission Cards */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-2 gap-6 mb-16"
          >
            {/* Vision Card */}
            <motion.div
              className="backdrop-blur-md bg-white/5 border border-gold/30 rounded-2xl p-8 hover:border-gold/60 transition-all"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(201, 168, 76, 0.3)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-gold" />
                <h3 className="text-xl font-bold text-gold">{t.vision}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">{t.visionText}</p>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              className="backdrop-blur-md bg-white/5 border border-teal/30 rounded-2xl p-8 hover:border-teal/60 transition-all"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 212, 167, 0.3)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-teal" />
                <h3 className="text-xl font-bold text-teal">{t.mission}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">{t.missionText}</p>
            </motion.div>
          </motion.div>

          {/* Achievements */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gold mb-8">{t.achievements}</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {[t.achievement1, t.achievement2, t.achievement3, t.achievement4].map((achievement, i) => (
                <motion.div
                  key={i}
                  className="backdrop-blur-md bg-white/5 border border-gold/20 rounded-xl p-4 text-center hover:border-gold/60 transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  <Code2 className="w-6 h-6 text-teal mx-auto mb-2" />
                  <p className="text-sm text-gray-300">{achievement}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants} className="backdrop-blur-md bg-gradient-to-r from-gold/10 to-teal/10 border border-gold/30 rounded-2xl p-12 text-center">
            <h3 className="text-2xl font-bold text-gold mb-6">{t.contact}</h3>

            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
              {/* Phone */}
              <motion.a
                href={`tel:${t.phone}`}
                className="flex items-center gap-3 text-teal hover:text-gold transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Phone className="w-6 h-6" />
                <span className="text-lg">{t.phone}</span>
              </motion.a>

              {/* Email */}
              <motion.a
                href={`mailto:${t.email}`}
                className="flex items-center gap-3 text-teal hover:text-gold transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Mail className="w-6 h-6" />
                <span className="text-lg">{t.email}</span>
              </motion.a>
            </div>

            {/* CTA Button */}
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-gold to-teal text-slate-950 font-bold rounded-full text-lg hover:shadow-lg hover:shadow-gold/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.cta}
            </motion.button>
            <p className="text-gray-400 text-sm mt-4">{t.ctaDesc}</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
