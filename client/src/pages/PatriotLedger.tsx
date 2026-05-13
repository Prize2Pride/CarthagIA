import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/_core/hooks/useAuth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, TrendingUp, Award, Zap } from 'lucide-react';

interface PatriotAct {
  id: number;
  hash: string;
  name: string;
  city: string;
  action: string;
  reward: string;
  status: 'confirmed' | 'pending' | 'minted';
  blockNumber: string;
  timestamp: number;
}

const translations = {
  en: {
    title: 'Patriot Acts Ledger',
    subtitle: 'Blockchain-Verified Citizen Contributions',
    description: 'Every act of goodness is permanently sealed on the blockchain. Your contributions will be visible to future generations.',
    submitAct: 'Submit Patriot Act',
    viewDetails: 'View Details',
    confirmed: 'Confirmed',
    pending: 'Pending',
    minted: 'Minted',
    reward: 'Reward',
    block: 'Block',
    hash: 'Hash',
    city: 'City',
    action: 'Action',
    status: 'Status',
    totalRewards: 'Total Rewards',
    actCount: 'Acts Submitted',
    nextReward: 'Next Reward',
    permanentRecord: 'Permanently sealed on the blockchain. This act of goodness will be visible to your grandchildren.',
    bloodDonation: 'Blood donation verified',
    treePlanting: 'Tree planting · GPS-tagged',
    prayerStreak: 'Friday prayer streak complete',
    mentoring: 'Student mentoring session',
    zakatPayment: 'Zakat payment processed',
    coastalCleanup: 'Coastal cleanup verified',
    firstAidCert: 'First Aid certification completed',
    corruptionReport: 'Corruption report filed · AI evidence sealed',
    communityGarden: 'Community garden volunteer',
    tutoring: 'Free tutoring sessions',
  },
  ar: {
    title: 'دفتر أعمال الوطنيين',
    subtitle: 'مساهمات المواطنين المتحقق منها بالبلوكتشين',
    description: 'كل عمل خير مختوم بشكل دائم على البلوكتشين. ستكون مساهماتك مرئية للأجيال القادمة.',
    submitAct: 'تقديم عمل وطني',
    viewDetails: 'عرض التفاصيل',
    confirmed: 'مؤكد',
    pending: 'قيد الانتظار',
    minted: 'مسكوك',
    reward: 'المكافأة',
    block: 'البلوك',
    hash: 'الهاش',
    city: 'المدينة',
    action: 'العمل',
    status: 'الحالة',
    totalRewards: 'إجمالي المكافآت',
    actCount: 'الأعمال المقدمة',
    nextReward: 'المكافأة التالية',
    permanentRecord: 'مختوم بشكل دائم على البلوكتشين. سيكون هذا العمل الطيب مرئياً لأحفادك.',
    bloodDonation: 'التبرع بالدم المتحقق منه',
    treePlanting: 'زراعة الأشجار · موقع GPS',
    prayerStreak: 'سلسلة الصلاة المتواصلة',
    mentoring: 'جلسة الإرشاد الطلابي',
    zakatPayment: 'دفع الزكاة المعالج',
    coastalCleanup: 'تنظيف الساحل المتحقق منه',
    firstAidCert: 'شهادة الإسعافات الأولية',
    corruptionReport: 'تقرير الفساد المقدم',
    communityGarden: 'متطوع حديقة المجتمع',
    tutoring: 'جلسات التدريس المجاني',
  },
  fr: {
    title: 'Registre des Actes Patriotes',
    subtitle: 'Contributions Citoyennes Vérifiées par Blockchain',
    description: 'Chaque acte de bonté est scellé de manière permanente sur la blockchain. Vos contributions seront visibles pour les générations futures.',
    submitAct: 'Soumettre un Acte Patriote',
    viewDetails: 'Voir les Détails',
    confirmed: 'Confirmé',
    pending: 'En Attente',
    minted: 'Frappé',
    reward: 'Récompense',
    block: 'Bloc',
    hash: 'Hash',
    city: 'Ville',
    action: 'Action',
    status: 'Statut',
    totalRewards: 'Récompenses Totales',
    actCount: 'Actes Soumis',
    nextReward: 'Prochaine Récompense',
    permanentRecord: 'Scellé de manière permanente sur la blockchain. Cet acte de bonté sera visible pour vos petits-enfants.',
    bloodDonation: 'Don de sang vérifié',
    treePlanting: 'Plantation d\'arbres · GPS',
    prayerStreak: 'Série de prières complète',
    mentoring: 'Séance de mentorat étudiant',
    zakatPayment: 'Paiement de Zakat traité',
    coastalCleanup: 'Nettoyage côtier vérifié',
    firstAidCert: 'Certification de premiers secours',
    corruptionReport: 'Rapport de corruption déposé',
    communityGarden: 'Bénévole du jardin communautaire',
    tutoring: 'Séances de tutorat gratuit',
  },
};

const mockPatriotActs: PatriotAct[] = [
  {
    id: 1,
    hash: '0x4f2a1c8b',
    name: 'Fatima K.',
    city: 'Jendouba',
    action: 'bloodDonation',
    reward: '+60 TNC',
    status: 'confirmed',
    blockNumber: '#9,482,104',
    timestamp: Date.now() - 3600000,
  },
  {
    id: 2,
    hash: '0x7e3b9d2a',
    name: 'Youssef M.',
    city: 'Gabès',
    action: 'treePlanting',
    reward: '+112 TNC',
    status: 'minted',
    blockNumber: '#9,482,103',
    timestamp: Date.now() - 7200000,
  },
  {
    id: 3,
    hash: '0x1a8c4f7e',
    name: 'Sarra B.',
    city: 'Bizerte',
    action: 'prayerStreak',
    reward: '+80 TNC',
    status: 'confirmed',
    blockNumber: '#9,482,102',
    timestamp: Date.now() - 10800000,
  },
  {
    id: 4,
    hash: '0x9d2e6b1f',
    name: 'Amira B.',
    city: 'Sfax',
    action: 'firstAidCert',
    reward: '+80 TNC',
    status: 'minted',
    blockNumber: '#9,482,101',
    timestamp: Date.now() - 14400000,
  },
  {
    id: 5,
    hash: '0x3c7a9e4d',
    name: 'Karim T.',
    city: 'Tunis',
    action: 'corruptionReport',
    reward: '+150 TNC',
    status: 'confirmed',
    blockNumber: '#9,482,100',
    timestamp: Date.now() - 18000000,
  },
];

export default function PatriotLedger() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const t = translations[language as keyof typeof translations] || translations.en;
  const [acts, setActs] = useState<PatriotAct[]>(mockPatriotActs);
  const [selectedAct, setSelectedAct] = useState<PatriotAct | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'minted':
        return <Zap className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActionText = (action: string) => {
    return t[action as keyof typeof t] || action;
  };

  const isRTL = language === 'ar';

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-8 h-8 text-amber-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-teal-400 bg-clip-text text-transparent">
              {t.title}
            </h1>
          </div>
          <p className="text-slate-400 text-sm">{t.subtitle}</p>
          <p className="text-slate-500 text-xs mt-2">{t.description}</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-lg p-4"
          >
            <div className="text-slate-400 text-xs font-mono uppercase tracking-wider">{t.totalRewards}</div>
            <div className="text-2xl font-bold text-amber-400 mt-2">+2,847 TNC</div>
            <div className="text-slate-500 text-xs mt-2">Earned this month</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-lg p-4"
          >
            <div className="text-slate-400 text-xs font-mono uppercase tracking-wider">{t.actCount}</div>
            <div className="text-2xl font-bold text-teal-400 mt-2">847</div>
            <div className="text-slate-500 text-xs mt-2">Total contributions</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-lg p-4"
          >
            <div className="text-slate-400 text-xs font-mono uppercase tracking-wider">Rank</div>
            <div className="text-2xl font-bold text-violet-400 mt-2">#127</div>
            <div className="text-slate-500 text-xs mt-2">Top 1% contributors</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-lg p-4"
          >
            <div className="text-slate-400 text-xs font-mono uppercase tracking-wider">{t.nextReward}</div>
            <div className="text-2xl font-bold text-green-400 mt-2">+80 TNC</div>
            <div className="text-slate-500 text-xs mt-2">In 3 days</div>
          </motion.div>
        </div>

        {/* Submit Button */}
        <div className="mb-8">
          <Button
            className="bg-gradient-to-r from-amber-500 to-teal-500 hover:from-amber-600 hover:to-teal-600 text-white font-semibold"
            size="lg"
          >
            {t.submitAct}
          </Button>
        </div>

        {/* Ledger Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-800/50 border border-slate-700/50 rounded-lg overflow-hidden backdrop-blur-sm"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-900/50 border-b border-slate-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-slate-400 font-mono text-xs uppercase tracking-wider">{t.hash}</th>
                  <th className="px-4 py-3 text-left text-slate-400 font-mono text-xs uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-slate-400 font-mono text-xs uppercase tracking-wider">{t.city}</th>
                  <th className="px-4 py-3 text-left text-slate-400 font-mono text-xs uppercase tracking-wider">{t.action}</th>
                  <th className="px-4 py-3 text-left text-slate-400 font-mono text-xs uppercase tracking-wider">{t.reward}</th>
                  <th className="px-4 py-3 text-left text-slate-400 font-mono text-xs uppercase tracking-wider">{t.status}</th>
                  <th className="px-4 py-3 text-left text-slate-400 font-mono text-xs uppercase tracking-wider">{t.block}</th>
                </tr>
              </thead>
              <tbody>
                {acts.map((act, idx) => (
                  <motion.tr
                    key={act.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.05 }}
                    onClick={() => setSelectedAct(act)}
                    className="border-b border-slate-700/30 hover:bg-slate-700/20 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 text-slate-300 font-mono text-xs">{act.hash}</td>
                    <td className="px-4 py-3 text-slate-200 font-medium">{act.name}</td>
                    <td className="px-4 py-3 text-slate-400">{act.city}</td>
                    <td className="px-4 py-3 text-slate-300 text-xs">{getActionText(act.action)}</td>
                    <td className="px-4 py-3 text-amber-400 font-semibold">{act.reward}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(act.status)}
                        <Badge variant={act.status === 'confirmed' ? 'default' : act.status === 'minted' ? 'secondary' : 'outline'}>
                          {t[act.status as keyof typeof t]}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs">{act.blockNumber}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Modal for Act Details */}
        {selectedAct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedAct(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-amber-400 mb-4">Patriot Act: {selectedAct.name}</h2>
              <div className="space-y-3 text-sm text-slate-300">
                <div>
                  <span className="text-slate-400 font-mono text-xs">CITY</span>
                  <div>{selectedAct.city}</div>
                </div>
                <div>
                  <span className="text-slate-400 font-mono text-xs">ACTION</span>
                  <div>{getActionText(selectedAct.action)}</div>
                </div>
                <div>
                  <span className="text-slate-400 font-mono text-xs">BLOCK</span>
                  <div className="font-mono">{selectedAct.blockNumber}</div>
                </div>
                <div>
                  <span className="text-slate-400 font-mono text-xs">HASH</span>
                  <div className="font-mono text-xs break-all">{selectedAct.hash}</div>
                </div>
                <div className="pt-4 border-t border-slate-700">
                  <p className="text-slate-400 italic text-xs">{t.permanentRecord}</p>
                </div>
              </div>
              <Button
                onClick={() => setSelectedAct(null)}
                className="w-full mt-6 bg-slate-700 hover:bg-slate-600"
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
