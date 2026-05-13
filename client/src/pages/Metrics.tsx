import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import type { Language } from "@/contexts/LanguageContext";

const translations: Record<Language, any> = {
  en: {
    title: "Key Performance Indicators",
    description: "Track progress across all 6 phases",
    metrics: {
      literacy: "Literacy Rate",
      healthcare: "Healthcare Coverage",
      renewable: "Renewable Energy %",
      employment: "Employment Rate",
      education: "Education Quality",
      poverty: "Poverty Reduction",
    },
  },
  ar: {
    title: "مؤشرات الأداء الرئيسية",
    description: "تتبع التقدم عبر جميع المراحل الـ 6",
    metrics: {
      literacy: "معدل محو الأمية",
      healthcare: "تغطية الرعاية الصحية",
      renewable: "نسبة الطاقة المتجددة",
      employment: "معدل التوظيف",
      education: "جودة التعليم",
      poverty: "تقليل الفقر",
    },
  },
  fr: {
    title: "Indicateurs Clés de Performance",
    description: "Suivre les progrès dans les 6 phases",
    metrics: {
      literacy: "Taux d'Alphabétisation",
      healthcare: "Couverture Santé",
      renewable: "Pourcentage Énergie Renouvelable",
      employment: "Taux d'Emploi",
      education: "Qualité de l'Éducation",
      poverty: "Réduction de la Pauvreté",
    },
  },
  de: {
    title: "Leistungskennzahlen",
    description: "Verfolgen Sie den Fortschritt über alle 6 Phasen",
    metrics: {
      literacy: "Alphabetisierungsquote",
      healthcare: "Gesundheitsversorgung",
      renewable: "Erneuerbare Energie %",
      employment: "Beschäftigungsquote",
      education: "Bildungsqualität",
      poverty: "Armutsbekämpfung",
    },
  },
  it: {
    title: "Indicatori Chiave di Performance",
    description: "Traccia i progressi in tutte le 6 fasi",
    metrics: {
      literacy: "Tasso di Alfabetizzazione",
      healthcare: "Copertura Sanitaria",
      renewable: "Percentuale Energia Rinnovabile",
      employment: "Tasso di Occupazione",
      education: "Qualità dell'Educazione",
      poverty: "Riduzione della Povertà",
    },
  },
  es: {
    title: "Indicadores Clave de Desempeño",
    description: "Seguimiento del progreso en las 6 fases",
    metrics: {
      literacy: "Tasa de Alfabetización",
      healthcare: "Cobertura de Salud",
      renewable: "Porcentaje de Energía Renovable",
      employment: "Tasa de Empleo",
      education: "Calidad de la Educación",
      poverty: "Reducción de la Povertà",
    },
  },
  pt: {
    title: "Indicadores Chave de Desempenho",
    description: "Acompanhe o progresso em todas as 6 fases",
    metrics: {
      literacy: "Taxa de Alfabetização",
      healthcare: "Cobertura de Saúde",
      renewable: "Percentual de Energia Renovável",
      employment: "Taxa de Emprego",
      education: "Qualidade da Educação",
      poverty: "Redução da Pobreza",
    },
  },
  ko: {
    title: "핵심 성과 지표",
    description: "모든 6단계의 진행 상황 추적",
    metrics: {
      literacy: "문해율",
      healthcare: "의료 보장",
      renewable: "재생 에너지 %",
      employment: "고용률",
      education: "교육 품질",
      poverty: "빈곤 감소",
    },
  },
  ja: {
    title: "主要業績評価指標",
    description: "6つのフェーズ全体の進捗を追跡",
    metrics: {
      literacy: "識字率",
      healthcare: "医療保障",
      renewable: "再生可能エネルギー %",
      employment: "雇用率",
      education: "教育の質",
      poverty: "貧困削減",
    },
  },
  zh: {
    title: "关键绩效指标",
    description: "跟踪所有6个阶段的进展",
    metrics: {
      literacy: "识字率",
      healthcare: "医疗保障",
      renewable: "可再生能源百分比",
      employment: "就业率",
      education: "教育质量",
      poverty: "贫困减少",
    },
  },
};

const mockKPIs = [
  { phaseId: 1, metric: "literacy", current: 78, target: 95, unit: "%" },
  { phaseId: 1, metric: "healthcare", current: 82, target: 100, unit: "%" },
  { phaseId: 2, metric: "employment", current: 65, target: 90, unit: "%" },
  { phaseId: 3, metric: "renewable", current: 35, target: 80, unit: "%" },
  { phaseId: 4, metric: "education", current: 72, target: 98, unit: "%" },
  { phaseId: 6, metric: "poverty", current: 28, target: 5, unit: "%" },
];

export default function Metrics() {
  const { language, dir } = useLanguage();
  const { data: phases } = trpc.phases.getAll.useQuery();

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 px-4" dir={dir}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gold mb-4">{t.title}</h1>
          <p className="text-gray-300 text-lg">{t.description}</p>
        </motion.div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockKPIs.map((kpi, idx) => {
            const phase = phases?.find((p) => p.id === kpi.phaseId);
            const progress = (kpi.current / kpi.target) * 100;
            const metricKey = kpi.metric as keyof typeof translations.en.metrics;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="backdrop-blur-md bg-white/5 border border-gold/30 rounded-lg p-6 hover:border-gold/50 transition"
              >
                {/* Phase Badge */}
                <div className="inline-block bg-teal/10 text-teal px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  {phase ? (language === "ar" ? phase.titleAr : language === "fr" ? phase.titleFr : phase.titleEn) : "Phase"}
                </div>

                {/* Metric Name */}
                <h3 className="text-lg font-semibold text-white mb-4">
                  {t.metrics[metricKey]}
                </h3>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">{kpi.current}{kpi.unit}</span>
                    <span className="text-teal font-semibold">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-gold to-teal"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(progress, 100)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                    />
                  </div>
                </div>

                {/* Target */}
                <p className="text-sm text-gray-400">
                  Target: {kpi.target}{kpi.unit}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
