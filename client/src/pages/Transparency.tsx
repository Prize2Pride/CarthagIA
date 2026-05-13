import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { AlertTriangle, TrendingDown, Lock, Eye } from "lucide-react";
import type { Language } from "@/contexts/LanguageContext";

const translations: Record<Language, any> = {
  en: {
    title: "Transparency Dashboard",
    subtitle: "Real-time blockchain monitoring and corruption detection",
    sections: {
      blockchain: "Blockchain Records",
      corruption: "Corruption Alerts",
      budget: "Budget Tracking",
      audit: "Audit Trail",
    },
    stats: {
      transactions: "Total Transactions",
      alerts: "Active Alerts",
      allocated: "Allocated Budget",
      verified: "Verified Records",
    },
    severity: {
      low: "Low",
      medium: "Medium",
      high: "High",
      critical: "Critical",
    },
  },
  ar: {
    title: "لوحة الشفافية",
    subtitle: "مراقبة البلوكتشين الفورية وكشف الفساد",
    sections: {
      blockchain: "سجلات البلوكتشين",
      corruption: "تنبيهات الفساد",
      budget: "تتبع الميزانية",
      audit: "سجل التدقيق",
    },
    stats: {
      transactions: "إجمالي المعاملات",
      alerts: "التنبيهات النشطة",
      allocated: "الميزانية المخصصة",
      verified: "السجلات المحققة",
    },
    severity: {
      low: "منخفض",
      medium: "متوسط",
      high: "مرتفع",
      critical: "حرج",
    },
  },
  fr: {
    title: "Tableau de Bord Transparence",
    subtitle: "Surveillance en temps réel de la blockchain et détection de corruption",
    sections: {
      blockchain: "Enregistrements Blockchain",
      corruption: "Alertes Corruption",
      budget: "Suivi Budgétaire",
      audit: "Piste d'Audit",
    },
    stats: {
      transactions: "Transactions Totales",
      alerts: "Alertes Actives",
      allocated: "Budget Alloué",
      verified: "Enregistrements Vérifiés",
    },
    severity: {
      low: "Bas",
      medium: "Moyen",
      high: "Élevé",
      critical: "Critique",
    },
  },
  de: {
    title: "Transparenz-Dashboard",
    subtitle: "Echtzeitüberwachung der Blockchain und Korruptionserkennung",
    sections: {
      blockchain: "Blockchain-Aufzeichnungen",
      corruption: "Korruptionswarnungen",
      budget: "Budgetverfolgung",
      audit: "Audit-Spur",
    },
    stats: {
      transactions: "Gesamttransaktionen",
      alerts: "Aktive Warnungen",
      allocated: "Zugewiesenes Budget",
      verified: "Verifizierte Aufzeichnungen",
    },
    severity: {
      low: "Niedrig",
      medium: "Mittel",
      high: "Hoch",
      critical: "Kritisch",
    },
  },
  it: {
    title: "Pannello di Trasparenza",
    subtitle: "Monitoraggio blockchain in tempo reale e rilevamento corruzione",
    sections: {
      blockchain: "Registri Blockchain",
      corruption: "Avvisi Corruzione",
      budget: "Tracciamento Budget",
      audit: "Traccia di Audit",
    },
    stats: {
      transactions: "Transazioni Totali",
      alerts: "Avvisi Attivi",
      allocated: "Budget Allocato",
      verified: "Registri Verificati",
    },
    severity: {
      low: "Basso",
      medium: "Medio",
      high: "Alto",
      critical: "Critico",
    },
  },
  es: {
    title: "Panel de Transparencia",
    subtitle: "Monitoreo en tiempo real de blockchain y detección de corrupción",
    sections: {
      blockchain: "Registros Blockchain",
      corruption: "Alertas de Corrupción",
      budget: "Seguimiento Presupuestario",
      audit: "Rastro de Auditoría",
    },
    stats: {
      transactions: "Transacciones Totales",
      alerts: "Alertas Activas",
      allocated: "Presupuesto Asignado",
      verified: "Registros Verificados",
    },
    severity: {
      low: "Bajo",
      medium: "Medio",
      high: "Alto",
      critical: "Crítico",
    },
  },
  pt: {
    title: "Painel de Transparência",
    subtitle: "Monitoramento blockchain em tempo real e detecção de corrupção",
    sections: {
      blockchain: "Registros Blockchain",
      corruption: "Alertas de Corrupção",
      budget: "Rastreamento Orçamentário",
      audit: "Trilha de Auditoria",
    },
    stats: {
      transactions: "Transações Totais",
      alerts: "Alertas Ativos",
      allocated: "Orçamento Alocado",
      verified: "Registros Verificados",
    },
    severity: {
      low: "Baixo",
      medium: "Médio",
      high: "Alto",
      critical: "Crítico",
    },
  },
  ko: {
    title: "투명성 대시보드",
    subtitle: "실시간 블록체인 모니터링 및 부패 감지",
    sections: {
      blockchain: "블록체인 기록",
      corruption: "부패 경고",
      budget: "예산 추적",
      audit: "감사 추적",
    },
    stats: {
      transactions: "총 거래",
      alerts: "활성 경고",
      allocated: "할당된 예산",
      verified: "검증된 기록",
    },
    severity: {
      low: "낮음",
      medium: "중간",
      high: "높음",
      critical: "심각",
    },
  },
  ja: {
    title: "透明性ダッシュボード",
    subtitle: "リアルタイムブロックチェーン監視と腐敗検出",
    sections: {
      blockchain: "ブロックチェーン記録",
      corruption: "腐敗警告",
      budget: "予算追跡",
      audit: "監査証跡",
    },
    stats: {
      transactions: "総取引",
      alerts: "アクティブな警告",
      allocated: "割り当てられた予算",
      verified: "検証済みレコード",
    },
    severity: {
      low: "低",
      medium: "中",
      high: "高",
      critical: "重大",
    },
  },
  zh: {
    title: "透明度仪表板",
    subtitle: "实时区块链监控和腐败检测",
    sections: {
      blockchain: "区块链记录",
      corruption: "腐败警告",
      budget: "预算跟踪",
      audit: "审计跟踪",
    },
    stats: {
      transactions: "总交易",
      alerts: "活跃警告",
      allocated: "分配预算",
      verified: "验证记录",
    },
    severity: {
      low: "低",
      medium: "中",
      high: "高",
      critical: "严重",
    },
  },
};

const mockTransactions = [
  { id: 1, type: "spending", amount: 50000, status: "confirmed", date: "2026-05-10" },
  { id: 2, type: "approval", amount: 100000, status: "confirmed", date: "2026-05-09" },
  { id: 3, type: "vote", amount: 0, status: "confirmed", date: "2026-05-08" },
];

const mockAlerts = [
  { id: 1, type: "unusual_spending", severity: "high", description: "Unusual spending pattern detected", riskScore: 78 },
  { id: 2, type: "conflict_of_interest", severity: "medium", description: "Potential conflict of interest", riskScore: 45 },
  { id: 3, type: "anomaly", severity: "low", description: "Minor anomaly detected", riskScore: 22 },
];

const mockBudget = [
  { department: "Education", allocated: 500000, spent: 350000 },
  { department: "Healthcare", allocated: 800000, spent: 620000 },
  { department: "Infrastructure", allocated: 1200000, spent: 900000 },
];

export default function Transparency() {
  const { language, dir } = useLanguage();
  const [activeTab, setActiveTab] = useState("blockchain");
  const t = translations[language];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "from-teal";
      case "medium":
        return "from-yellow-500";
      case "high":
        return "from-red-500";
      case "critical":
        return "from-red-700";
      default:
        return "from-gold";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 px-4" dir={dir}>
      {/* Header */}
      <motion.div
        className="max-w-6xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-5xl font-bold text-gold mb-4">{t.title}</h1>
        <p className="text-gray-300 text-lg">{t.subtitle}</p>
      </motion.div>

      {/* Stats */}
      <motion.div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: t.stats.transactions, value: "1,247" },
          { label: t.stats.alerts, value: "23" },
          { label: t.stats.allocated, value: "$2.5M" },
          { label: t.stats.verified, value: "98.5%" },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            className="backdrop-blur-md bg-white/5 border border-gold/30 rounded-lg p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="text-2xl font-bold text-gold">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Tabs */}
      <motion.div className="max-w-6xl mx-auto flex gap-4 mb-8 overflow-x-auto">
        {Object.entries(t.sections).map(([key, label]) => (
          <motion.button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              activeTab === key
                ? "bg-gradient-to-r from-gold to-teal text-slate-950"
                : "bg-white/5 border border-gold/30 text-gray-300 hover:border-gold/50"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {label}
          </motion.button>
        ))}
      </motion.div>

      {/* Content */}
      <motion.div className="max-w-6xl mx-auto">
        {activeTab === "blockchain" && (
          <motion.div className="space-y-4">
            {mockTransactions.map((tx, idx) => (
              <motion.div
                key={idx}
                className="backdrop-blur-md bg-white/5 border border-teal/30 rounded-lg p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-gold capitalize">{tx.type}</div>
                    <div className="text-sm text-gray-400">{tx.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-teal">${tx.amount.toLocaleString()}</div>
                    <div className="text-sm text-green-400">{tx.status}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "corruption" && (
          <motion.div className="space-y-4">
            {mockAlerts.map((alert, idx) => (
              <motion.div
                key={idx}
                className={`backdrop-blur-md bg-gradient-to-r ${getSeverityColor(alert.severity)}/10 border border-${getSeverityColor(alert.severity)}/30 rounded-lg p-6`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-semibold text-gold capitalize">{alert.type.replace(/_/g, " ")}</div>
                      <div className={`text-sm font-bold text-${getSeverityColor(alert.severity)}`}>
                        {t.severity[alert.severity as keyof typeof t.severity]}
                      </div>
                    </div>
                    <p className="text-gray-300 mb-2">{alert.description}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-white/10 rounded-full h-2">
                        <div className={`h-full bg-gradient-to-r ${getSeverityColor(alert.severity)} rounded-full`} style={{ width: `${alert.riskScore}%` }} />
                      </div>
                      <span className="text-sm text-gray-400">Risk: {alert.riskScore}%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "budget" && (
          <motion.div className="space-y-4">
            {mockBudget.map((budget, idx) => {
              const percentage = (budget.spent / budget.allocated) * 100;
              return (
                <motion.div
                  key={idx}
                  className="backdrop-blur-md bg-white/5 border border-gold/30 rounded-lg p-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-semibold text-gold">{budget.department}</div>
                    <div className="text-sm text-gray-400">{Math.round(percentage)}% spent</div>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-gold to-teal"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>${budget.spent.toLocaleString()}</span>
                    <span>${budget.allocated.toLocaleString()}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {activeTab === "audit" && (
          <motion.div className="backdrop-blur-md bg-white/5 border border-teal/30 rounded-lg p-6">
            <div className="space-y-4">
              <div className="text-gray-300">
                <p className="mb-4">Complete audit trail showing all governance actions and decisions.</p>
                <ul className="space-y-2 text-sm">
                  <li>✓ All transactions are immutable and timestamped</li>
                  <li>✓ Multi-signature approvals are recorded</li>
                  <li>✓ Citizen votes are tracked transparently</li>
                  <li>✓ Budget allocations are verified on-chain</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
