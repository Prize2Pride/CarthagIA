import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, BookOpen, Zap, Target, Users, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';

const translations = {
  en: {
    title: 'AI Training Hub',
    subtitle: 'Become a Super-Augmented Contributor',
    description: 'Learn how to identify corruption, leverage blockchain, and contribute to building a corruption-free world.',
    modules: 'Training Modules',
    module1: 'Corruption Detection',
    module1Desc: 'Learn to identify suspicious patterns, anomalies, and red flags in government spending and contracts.',
    module2: 'Blockchain Transparency',
    module2Desc: 'Understand how blockchain records immutable transactions and creates permanent audit trails.',
    module3: 'AI Augmentation',
    module3Desc: 'Master AI tools to analyze data, generate insights, and create action plans for change.',
    module4: 'Citizen Governance',
    module4Desc: 'Participate in decentralized voting, propose ideas, and shape policy decisions.',
    module5: 'Community Building',
    module5Desc: 'Organize movements, build coalitions, and mobilize citizens for corruption-free initiatives.',
    module6: 'Impact Measurement',
    module6Desc: 'Track your contributions, measure impact, and celebrate achievements in the fight against corruption.',
    startTraining: 'Start Training',
    generatePlan: 'Generate My Plan',
    myProgress: 'My Progress',
    completedModules: 'Completed Modules',
    nextModule: 'Next Module',
  },
  ar: {
    title: 'مركز التدريب بالذكاء الاصطناعي',
    subtitle: 'كن مساهماً معززاً بالذكاء الاصطناعي',
    description: 'تعلم كيفية تحديد الفساد والاستفادة من البلوكتشين والمساهمة في بناء عالم خالٍ من الفساد.',
    modules: 'وحدات التدريب',
    module1: 'كشف الفساد',
    module1Desc: 'تعلم تحديد الأنماط المريبة والشذوذ والعلامات الحمراء في الإنفاق الحكومي والعقود.',
    module2: 'شفافية البلوكتشين',
    module2Desc: 'افهم كيف يسجل البلوكتشين المعاملات غير القابلة للتعديل وينشئ مسارات تدقيق دائمة.',
    module3: 'تعزيز الذكاء الاصطناعي',
    module3Desc: 'أتقن أدوات الذكاء الاصطناعي لتحليل البيانات وإنشاء خطط عمل للتغيير.',
    module4: 'الحكم الديمقراطي',
    module4Desc: 'شارك في التصويت اللامركزي واقترح الأفكار وشكل قرارات السياسة.',
    module5: 'بناء المجتمع',
    module5Desc: 'نظم الحركات وبناء التحالفات وتعبئة المواطنين للمبادرات الخالية من الفساد.',
    module6: 'قياس التأثير',
    module6Desc: 'تتبع مساهماتك وقياس التأثير والاحتفال بالإنجازات في مكافحة الفساد.',
    startTraining: 'ابدأ التدريب',
    generatePlan: 'أنشئ خطتي',
    myProgress: 'تقدمي',
    completedModules: 'الوحدات المكتملة',
    nextModule: 'الوحدة التالية',
  },
  fr: {
    title: 'Centre de Formation IA',
    subtitle: 'Devenez un Contributeur Super-Augmenté',
    description: 'Apprenez à identifier la corruption, exploitez la blockchain et contribuez à construire un monde sans corruption.',
    modules: 'Modules de Formation',
    module1: 'Détection de la Corruption',
    module1Desc: 'Apprenez à identifier les modèles suspects, les anomalies et les signaux d\'alerte dans les dépenses gouvernementales.',
    module2: 'Transparence Blockchain',
    module2Desc: 'Comprenez comment la blockchain enregistre les transactions immuables et crée des pistes d\'audit permanentes.',
    module3: 'Augmentation IA',
    module3Desc: 'Maîtrisez les outils IA pour analyser les données et créer des plans d\'action pour le changement.',
    module4: 'Gouvernance Citoyenne',
    module4Desc: 'Participez aux votes décentralisés, proposez des idées et façonnez les décisions politiques.',
    module5: 'Construction Communautaire',
    module5Desc: 'Organisez des mouvements, construisez des coalitions et mobilisez les citoyens pour des initiatives sans corruption.',
    module6: 'Mesure d\'Impact',
    module6Desc: 'Suivez vos contributions, mesurez l\'impact et célébrez les réalisations dans la lutte contre la corruption.',
    startTraining: 'Commencer la Formation',
    generatePlan: 'Générer Mon Plan',
    myProgress: 'Ma Progression',
    completedModules: 'Modules Complétés',
    nextModule: 'Module Suivant',
  },
};

const modules = [
  { icon: Brain, color: 'text-teal' },
  { icon: Zap, color: 'text-gold' },
  { icon: Target, color: 'text-teal' },
  { icon: Users, color: 'text-gold' },
  { icon: BookOpen, color: 'text-teal' },
  { icon: Award, color: 'text-gold' },
];

export default function AITrainingHub() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;
  const [selectedModule, setSelectedModule] = useState(0);
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  const moduleKeys = ['module1', 'module2', 'module3', 'module4', 'module5', 'module6'] as const;
  const moduleDescKeys = ['module1Desc', 'module2Desc', 'module3Desc', 'module4Desc', 'module5Desc', 'module6Desc'] as const;

  const handleCompleteModule = (index: number) => {
    if (!completedModules.includes(index)) {
      setCompletedModules([...completedModules, index]);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-20">
      {/* Header */}
      <motion.div
        className="max-w-6xl mx-auto mb-16 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gold via-teal to-gold bg-clip-text text-transparent">
          {t.title}
        </motion.h1>
        <motion.p variants={itemVariants} className="text-2xl text-teal mb-4">
          {t.subtitle}
        </motion.p>
        <motion.p variants={itemVariants} className="text-gray-300 text-lg max-w-3xl mx-auto">
          {t.description}
        </motion.p>
      </motion.div>

      {/* Progress Stats */}
      <motion.div
        className="max-w-6xl mx-auto mb-16 grid md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="backdrop-blur-md bg-white/5 border border-gold/30 rounded-xl p-6 text-center"
        >
          <div className="text-4xl font-bold text-gold mb-2">{completedModules.length}/6</div>
          <p className="text-gray-300">{t.completedModules}</p>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="backdrop-blur-md bg-white/5 border border-teal/30 rounded-xl p-6 text-center"
        >
          <div className="text-4xl font-bold text-teal mb-2">{Math.round((completedModules.length / 6) * 100)}%</div>
          <p className="text-gray-300">{t.myProgress}</p>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="backdrop-blur-md bg-white/5 border border-gold/30 rounded-xl p-6 text-center"
        >
          <div className="text-4xl font-bold text-gold mb-2">{6 - completedModules.length}</div>
          <p className="text-gray-300">{t.nextModule}</p>
        </motion.div>
      </motion.div>

      {/* Training Modules Grid */}
      <motion.div
        className="max-w-6xl mx-auto mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-3xl font-bold text-gold mb-8 text-center">{t.modules}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {modules.map((module, i) => {
            const Icon = module.icon;
            const isCompleted = completedModules.includes(i);
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`backdrop-blur-md border rounded-xl p-8 cursor-pointer transition-all ${
                  selectedModule === i
                    ? 'border-gold bg-gold/10'
                    : isCompleted
                    ? 'border-teal/50 bg-teal/5'
                    : 'border-gold/30 bg-white/5 hover:border-gold/60'
                }`}
                onClick={() => setSelectedModule(i)}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-8 h-8 ${module.color}`} />
                  {isCompleted && <Award className="w-6 h-6 text-teal" />}
                </div>
                <h3 className="text-lg font-bold text-gold mb-2">
                  {t[moduleKeys[i]]}
                </h3>
                <p className="text-sm text-gray-300">
                  {t[moduleDescKeys[i]]}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Module Details */}
      <motion.div
        className="max-w-6xl mx-auto backdrop-blur-md bg-gradient-to-r from-gold/10 to-teal/10 border border-gold/30 rounded-2xl p-12 mb-16"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center gap-4 mb-6">
          {modules[selectedModule] && (() => {
            const Icon = modules[selectedModule].icon;
            return <Icon className={`w-8 h-8 ${modules[selectedModule].color}`} />;
          })()}
          <h3 className="text-2xl font-bold text-gold">
            {t[moduleKeys[selectedModule]]}
          </h3>
        </div>
        <p className="text-gray-300 text-lg mb-8">
          {t[moduleDescKeys[selectedModule]]}
        </p>

        {/* Module Content */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <h4 className="text-teal font-bold">Key Concepts:</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-teal rounded-full" />
                Understanding systemic corruption patterns
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gold rounded-full" />
                Leveraging technology for transparency
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-teal rounded-full" />
                Building citizen movements
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-gold font-bold">Learning Outcomes:</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gold rounded-full" />
                Master corruption detection techniques
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-teal rounded-full" />
                Create actionable change strategies
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gold rounded-full" />
                Lead community initiatives
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <motion.button
            className="flex-1 px-6 py-3 bg-gradient-to-r from-gold to-teal text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-gold/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCompleteModule(selectedModule)}
          >
            {completedModules.includes(selectedModule) ? '✓ Completed' : t.startTraining}
          </motion.button>
          <motion.button
            className="flex-1 px-6 py-3 border-2 border-teal text-teal font-bold rounded-lg hover:bg-teal/10 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.generatePlan}
          </motion.button>
        </div>
      </motion.div>

      {/* Achievement Section */}
      <motion.div
        className="max-w-6xl mx-auto text-center"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        {completedModules.length === 6 && (
          <motion.div
            className="backdrop-blur-md bg-gradient-to-r from-gold/20 to-teal/20 border-2 border-gold rounded-2xl p-12"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Award className="w-16 h-16 text-gold mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gold mb-2">Super-Augmented Contributor!</h3>
            <p className="text-gray-300 text-lg">You have completed all training modules and are ready to lead the fight against corruption.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
