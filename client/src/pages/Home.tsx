import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { Menu, X, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Language } from "@/contexts/LanguageContext";



const translations: Record<Language, any> = {
  en: {
    title: "CarthagIA",
    subtitle: "Sovereign Intelligence Platform for Human Dignity",
    tagline: "A 6-Phase Roadmap for Tunisia's Future",
    nav: {
      phases: "Phases",
      kpis: "Metrics",
      ideas: "Ideas",
      admin: "Admin",
    },
    phases: [
      {
        number: 1,
        title: "Basics",
        description: "Ensure fundamental rights: food, health, education, housing, energy",
      },
      {
        number: 2,
        title: "Service Economy",
        description: "Transition to cooperative economy with fair profit distribution",
      },
      {
        number: 3,
        title: "AI State",
        description: "Implement intelligent systems for resource distribution and planning",
      },
      {
        number: 4,
        title: "Creative Competition",
        description: "Competition in innovation and culture, not survival",
      },
      {
        number: 5,
        title: "Population",
        description: "Manage demographic growth with education and support",
      },
      {
        number: 6,
        title: "Sustainable Economy",
        description: "Renewable energy, circular economy, environmental stewardship",
      },
    ],
    buttons: {
      login: "Login",
      logout: "Logout",
      submitIdea: "Submit Idea",
      viewAdmin: "Admin Panel",
    },
  },
  ar: {
    title: "قرطاجنة",
    subtitle: "منصة الذكاء السيادي لكرامة الإنسان",
    tagline: "خارطة طريق من 6 مراحل لمستقبل تونس",
    nav: {
      phases: "المراحل",
      kpis: "المقاييس",
      ideas: "الأفكار",
      admin: "الإدارة",
    },
    phases: [
      {
        number: 1,
        title: "الأساسيات",
        description: "ضمان الحقوق الأساسية: الغذاء والصحة والتعليم والسكن والطاقة",
      },
      {
        number: 2,
        title: "اقتصاد الخدمة",
        description: "الانتقال إلى اقتصاد تعاوني مع توزيع عادل للأرباح",
      },
      {
        number: 3,
        title: "الدولة الذكية",
        description: "تنفيذ أنظمة ذكية لتوزيع الموارد والتخطيط",
      },
      {
        number: 4,
        title: "المنافسة الإبداعية",
        description: "المنافسة في الابتكار والثقافة وليس البقاء",
      },
      {
        number: 5,
        title: "السكان",
        description: "إدارة النمو السكاني مع التعليم والدعم",
      },
      {
        number: 6,
        title: "الاقتصاد المستدام",
        description: "الطاقة المتجددة والاقتصاد الدائري والحفاظ على البيئة",
      },
    ],
    buttons: {
      login: "تسجيل الدخول",
      logout: "تسجيل الخروج",
      submitIdea: "إرسال فكرة",
      viewAdmin: "لوحة التحكم",
    },
  },
  de: {
    title: "CarthagIA",
    subtitle: "Souveräne Intelligenzplattform für Menschenwürde",
    tagline: "Eine 6-Phasen-Roadmap für Tunesiens Zukunft",
    nav: {
      phases: "Phasen",
      kpis: "Metriken",
      ideas: "Ideen",
      admin: "Admin",
    },
    phases: [
      { number: 1, title: "Grundlagen", description: "Sicherung grundlegender Rechte" },
      { number: 2, title: "Serviceökonomie", description: "Übergang zu kooperativer Wirtschaft" },
      { number: 3, title: "KI-Staat", description: "Intelligente Systeme implementieren" },
      { number: 4, title: "Kreative Konkurrenz", description: "Wettbewerb in Innovation und Kultur" },
      { number: 5, title: "Bevölkerung", description: "Demografisches Wachstum verwalten" },
      { number: 6, title: "Nachhaltige Wirtschaft", description: "Erneuerbare Energien und Kreislaufwirtschaft" },
    ],
    buttons: { login: "Anmelden", logout: "Abmelden", submitIdea: "Idee einreichen", viewAdmin: "Admin-Panel" },
  },
  it: {
    title: "CarthagIA",
    subtitle: "Piattaforma di Intelligenza Sovrana per la Dignità Umana",
    tagline: "Una Roadmap a 6 Fasi per il Futuro della Tunisia",
    nav: { phases: "Fasi", kpis: "Metriche", ideas: "Idee", admin: "Admin" },
    phases: [
      { number: 1, title: "Fondamenti", description: "Garantire diritti fondamentali" },
      { number: 2, title: "Economia di Servizio", description: "Transizione a economia cooperativa" },
      { number: 3, title: "Stato IA", description: "Implementare sistemi intelligenti" },
      { number: 4, title: "Competizione Creativa", description: "Competizione in innovazione e cultura" },
      { number: 5, title: "Popolazione", description: "Gestire la crescita demografica" },
      { number: 6, title: "Economia Sostenibile", description: "Energie rinnovabili ed economia circolare" },
    ],
    buttons: { login: "Accedi", logout: "Esci", submitIdea: "Invia Idea", viewAdmin: "Pannello Admin" },
  },
  es: {
    title: "CarthagIA",
    subtitle: "Plataforma de Inteligencia Soberana para la Dignidad Humana",
    tagline: "Una Hoja de Ruta de 6 Fases para el Futuro de Túnez",
    nav: { phases: "Fases", kpis: "Métricas", ideas: "Ideas", admin: "Admin" },
    phases: [
      { number: 1, title: "Fundamentos", description: "Garantizar derechos fundamentales" },
      { number: 2, title: "Economía de Servicios", description: "Transición a economía cooperativa" },
      { number: 3, title: "Estado IA", description: "Implementar sistemas inteligentes" },
      { number: 4, title: "Competencia Creativa", description: "Competencia en innovación y cultura" },
      { number: 5, title: "Población", description: "Gestionar el crecimiento demográfico" },
      { number: 6, title: "Economía Sostenible", description: "Energías renovables y economía circular" },
    ],
    buttons: { login: "Iniciar Sesión", logout: "Cerrar Sesión", submitIdea: "Enviar Idea", viewAdmin: "Panel Admin" },
  },
  pt: {
    title: "CarthagIA",
    subtitle: "Plataforma de Inteligência Soberana para a Dignidade Humana",
    tagline: "Um Roteiro de 6 Fases para o Futuro da Tunísia",
    nav: { phases: "Fases", kpis: "Métricas", ideas: "Ideias", admin: "Admin" },
    phases: [
      { number: 1, title: "Fundamentos", description: "Garantir direitos fundamentais" },
      { number: 2, title: "Economia de Serviços", description: "Transição para economia cooperativa" },
      { number: 3, title: "Estado IA", description: "Implementar sistemas inteligentes" },
      { number: 4, title: "Competição Criativa", description: "Competição em inovação e cultura" },
      { number: 5, title: "População", description: "Gerenciar crescimento demográfico" },
      { number: 6, title: "Economia Sustentável", description: "Energias renováveis e economia circular" },
    ],
    buttons: { login: "Entrar", logout: "Sair", submitIdea: "Enviar Ideia", viewAdmin: "Painel Admin" },
  },
  ko: {
    title: "CarthagIA",
    subtitle: "인간 존엄성을 위한 주권 지능 플랫폼",
    tagline: "튀니지의 미래를 위한 6단계 로드맵",
    nav: { phases: "단계", kpis: "지표", ideas: "아이디어", admin: "관리" },
    phases: [
      { number: 1, title: "기초", description: "기본 권리 보장" },
      { number: 2, title: "서비스 경제", description: "협력 경제로의 전환" },
      { number: 3, title: "AI 국가", description: "지능형 시스템 구현" },
      { number: 4, title: "창의적 경쟁", description: "혁신과 문화의 경쟁" },
      { number: 5, title: "인구", description: "인구 증가 관리" },
      { number: 6, title: "지속 가능한 경제", description: "재생 에너지 및 순환 경제" },
    ],
    buttons: { login: "로그인", logout: "로그아웃", submitIdea: "아이디어 제출", viewAdmin: "관리 패널" },
  },
  ja: {
    title: "CarthagIA",
    subtitle: "人間の尊厳のための主権知能プラットフォーム",
    tagline: "チュニジアの未来のための6段階ロードマップ",
    nav: { phases: "フェーズ", kpis: "指標", ideas: "アイデア", admin: "管理" },
    phases: [
      { number: 1, title: "基礎", description: "基本的権利の確保" },
      { number: 2, title: "サービス経済", description: "協力経済への移行" },
      { number: 3, title: "AI国家", description: "インテリジェントシステムの実装" },
      { number: 4, title: "創造的競争", description: "イノベーションと文化の競争" },
      { number: 5, title: "人口", description: "人口増加の管理" },
      { number: 6, title: "持続可能な経済", description: "再生可能エネルギーと循環経済" },
    ],
    buttons: { login: "ログイン", logout: "ログアウト", submitIdea: "アイデアを提出", viewAdmin: "管理パネル" },
  },
  zh: {
    title: "CarthagIA",
    subtitle: "人类尊严主权智能平台",
    tagline: "突尼斯未来的6阶段路线图",
    nav: { phases: "阶段", kpis: "指标", ideas: "想法", admin: "管理" },
    phases: [
      { number: 1, title: "基础", description: "保障基本权利" },
      { number: 2, title: "服务经济", description: "向合作经济过渡" },
      { number: 3, title: "AI国家", description: "实施智能系统" },
      { number: 4, title: "创意竞争", description: "创新和文化竞争" },
      { number: 5, title: "人口", description: "管理人口增长" },
      { number: 6, title: "可持续经济", description: "可再生能源和循环经济" },
    ],
    buttons: { login: "登录", logout: "登出", submitIdea: "提交想法", viewAdmin: "管理面板" },
  },
  fr: {
    title: "CarthagIA",
    subtitle: "Plateforme d'Intelligence Souveraine pour la Dignité Humaine",
    tagline: "Une Feuille de Route en 6 Phases pour l'Avenir de la Tunisie",
    nav: {
      phases: "Phases",
      kpis: "Métriques",
      ideas: "Idées",
      admin: "Admin",
    },
    phases: [
      {
        number: 1,
        title: "Bases",
        description: "Assurer les droits fondamentaux: nourriture, santé, éducation, logement, énergie",
      },
      {
        number: 2,
        title: "Économie de Service",
        description: "Transition vers une économie coopérative avec distribution équitable des profits",
      },
      {
        number: 3,
        title: "État Intelligent",
        description: "Mettre en œuvre des systèmes intelligents pour la distribution des ressources",
      },
      {
        number: 4,
        title: "Compétition Créative",
        description: "Compétition en innovation et culture, pas en survie",
      },
      {
        number: 5,
        title: "Population",
        description: "Gérer la croissance démographique avec éducation et soutien",
      },
      {
        number: 6,
        title: "Économie Durable",
        description: "Énergie renouvelable, économie circulaire, préservation environnementale",
      },
    ],
    buttons: {
      login: "Connexion",
      logout: "Déconnexion",
      submitIdea: "Soumettre une Idée",
      viewAdmin: "Panneau Admin",
    },
  },
};

export default function Home() {
  const { language, setLanguage, dir } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");
  const { user, loading, isAuthenticated, logout } = useAuth();
  const { data: phases } = trpc.phases.getAll.useQuery();

  const t = translations[language];

  // Update live clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString(language === "ar" ? "ar-TN" : language === "fr" ? "fr-FR" : "en-US"));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [language]);

  return (
    <div className="min-h-screen bg-[#04080F] text-[#E8EDFF]" dir={dir}>
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-[#04080F] border-b border-[rgba(201,168,76,0.2)] backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#00D4A7] flex items-center justify-center font-bold text-[#04080F]">
              C
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#C9A84C]">{t.title}</h1>
              <p className="text-xs text-[#96A4B4]">Sovereignty</p>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#phases" className="text-[#96A4B4] hover:text-[#C9A84C] transition">
              {t.nav.phases}
            </a>
            <a href="/metrics" className="text-[#96A4B4] hover:text-[#C9A84C] transition">
              {t.nav.kpis}
            </a>
            <a href="/ideas" className="text-[#96A4B4] hover:text-[#C9A84C] transition">
              {t.nav.ideas}
            </a>
            <a href="/transparency" className="text-[#96A4B4] hover:text-[#C9A84C] transition">
              Transparency
            </a>
            <a href="/governance" className="text-[#96A4B4] hover:text-[#C9A84C] transition">
              Governance
            </a>
            <a href="/founder" className="text-[#96A4B4] hover:text-[#C9A84C] transition">
              Founder
            </a>
            {user?.role === "admin" && (
              <a href="/admin" className="text-[#96A4B4] hover:text-[#C9A84C] transition">
                {t.nav.admin}
              </a>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Live Clock */}
            <div className="hidden sm:flex items-center gap-2 text-[#96A4B4]">
              <Clock size={16} />
              <span className="text-sm font-mono">{currentTime}</span>
            </div>

            {/* Language Switcher */}
            <div className="flex gap-2 border border-[rgba(201,168,76,0.3)] rounded-lg p-1">
              {(["en", "ar", "fr"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 rounded text-sm font-semibold transition ${
                    language === lang
                      ? "bg-[#C9A84C] text-[#04080F]"
                      : "text-[#96A4B4] hover:text-[#C9A84C]"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Auth Button */}
            {loading ? (
              <div className="w-8 h-8 bg-[#C9A84C] rounded-full animate-pulse" />
            ) : isAuthenticated ? (
              <button
                onClick={() => logout()}
                className="btn-secondary text-sm"
              >
                {t.buttons.logout}
              </button>
            ) : (
              <a href={getLoginUrl()} className="btn-primary text-sm">
                {t.buttons.login}
              </a>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#C9A84C]"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-[#070C18] border-t border-[rgba(201,168,76,0.2)] p-4 space-y-3"
          >
            <a href="#phases" className="block text-[#96A4B4] hover:text-[#C9A84C]">
              {t.nav.phases}
            </a>
            <a href="/metrics" className="block text-[#96A4B4] hover:text-[#C9A84C]">
              {t.nav.kpis}
            </a>
            <a href="/ideas" className="block text-[#96A4B4] hover:text-[#C9A84C]">
              {t.nav.ideas}
            </a>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(201,168,76,0.1)] to-transparent pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto text-center relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] to-[#00D4A7]">
            {t.title}
          </h1>
          <p className="text-2xl md:text-3xl text-[#96A4B4] mb-4">{t.subtitle}</p>
          <p className="text-lg text-[#646C8B] mb-8">{t.tagline}</p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            {isAuthenticated && (
              <a href="/ideas" className="btn-primary">
                {t.buttons.submitIdea}
              </a>
            )}
            {user?.role === "admin" && (
              <a href="/admin" className="btn-secondary">
                {t.buttons.viewAdmin}
              </a>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Phases Section */}
      <section id="phases" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 text-[#C9A84C]"
          >
            {t.nav.phases}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {phases?.map((phase: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setExpandedPhase(expandedPhase === phase.number ? null : phase.number)}
                className="phase-card cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-4xl font-bold text-[#00D4A7] mb-2">
                      {phase.number}
                    </div>
                    <h3 className="text-xl font-semibold text-[#E8EDFF] group-hover:text-[#C9A84C] transition">
                      {phase.title}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-[rgba(201,168,76,0.1)] flex items-center justify-center group-hover:bg-[rgba(201,168,76,0.2)] transition">
                    <span className="text-[#C9A84C] text-xl">→</span>
                  </div>
                </div>

                <p className="text-[#96A4B4] mb-4">{phase.description}</p>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-[rgba(201,168,76,0.1)] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${20 + idx * 15}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="h-full bg-gradient-to-r from-[#C9A84C] to-[#00D4A7]"
                  />
                </div>

                {/* Expanded Content */}
                {expandedPhase === phase.number && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-[rgba(201,168,76,0.2)]"
                  >
                    <p className="text-sm text-[#646C8B] mb-3">
                      This phase focuses on implementing key initiatives to achieve the roadmap goals.
                    </p>
                    <Button className="btn-secondary text-sm w-full">
                      Learn More
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[rgba(201,168,76,0.2)] py-8 px-4 text-center text-[#646C8B]">
        <p>© 2026 CarthagIA - Sovereign Intelligence Platform for Tunisia</p>
      </footer>
    </div>
  );
}
