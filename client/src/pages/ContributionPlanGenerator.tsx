import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Lightbulb, Zap, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';

const translations = {
  en: {
    title: 'Personalized Contribution Plan',
    subtitle: 'AI-Powered Plan Generator',
    description: 'Tell us about yourself and your vision. Our AI will generate a personalized plan to help you contribute to a corruption-free world.',
    step1: 'Your Details',
    step2: 'Your Vision',
    step3: 'Your Plan',
    country: 'Country/Region',
    skills: 'Your Skills & Expertise',
    resources: 'Available Resources',
    timeCommitment: 'Time Commitment',
    imagination: 'Your Imagination & Vision',
    generatePlan: 'Generate My Plan',
    generating: 'Generating your personalized plan...',
    planTitle: 'Your Corruption-Free Contribution Plan',
    tasks: 'Actionable Tasks',
    timeline: 'Implementation Timeline',
    resources_section: 'Resources Needed',
    impact: 'Potential Impact',
    download: 'Download Plan',
    share: 'Share Plan',
    startNew: 'Start New Plan',
  },
  ar: {
    title: 'خطة المساهمة الشخصية',
    subtitle: 'مولد الخطط المدعوم بالذكاء الاصطناعي',
    description: 'أخبرنا عن نفسك ورؤيتك. سيقوم ذكاؤنا الاصطناعي بإنشاء خطة شخصية لمساعدتك على المساهمة في عالم خالٍ من الفساد.',
    step1: 'تفاصيلك',
    step2: 'رؤيتك',
    step3: 'خطتك',
    country: 'الدولة/المنطقة',
    skills: 'مهاراتك وخبرتك',
    resources: 'الموارد المتاحة',
    timeCommitment: 'الالتزام الزمني',
    imagination: 'خيالك ورؤيتك',
    generatePlan: 'أنشئ خطتي',
    generating: 'جاري إنشاء خطتك الشخصية...',
    planTitle: 'خطة مساهمتك الخالية من الفساد',
    tasks: 'المهام القابلة للتنفيذ',
    timeline: 'الجدول الزمني للتنفيذ',
    resources_section: 'الموارد المطلوبة',
    impact: 'التأثير المحتمل',
    download: 'تحميل الخطة',
    share: 'مشاركة الخطة',
    startNew: 'خطة جديدة',
  },
  fr: {
    title: 'Plan de Contribution Personnalisé',
    subtitle: 'Générateur de Plans Alimenté par l\'IA',
    description: 'Parlez-nous de vous et de votre vision. Notre IA générera un plan personnalisé pour vous aider à contribuer à un monde sans corruption.',
    step1: 'Vos Détails',
    step2: 'Votre Vision',
    step3: 'Votre Plan',
    country: 'Pays/Région',
    skills: 'Vos Compétences & Expertise',
    resources: 'Ressources Disponibles',
    timeCommitment: 'Engagement Temporel',
    imagination: 'Votre Imagination & Vision',
    generatePlan: 'Générer Mon Plan',
    generating: 'Génération de votre plan personnalisé...',
    planTitle: 'Votre Plan de Contribution Sans Corruption',
    tasks: 'Tâches Réalisables',
    timeline: 'Calendrier de Mise en Œuvre',
    resources_section: 'Ressources Nécessaires',
    impact: 'Impact Potentiel',
    download: 'Télécharger le Plan',
    share: 'Partager le Plan',
    startNew: 'Nouveau Plan',
  },
};

export default function ContributionPlanGenerator() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  const [formData, setFormData] = useState({
    country: '',
    skills: '',
    resources: '',
    timeCommitment: '',
    imagination: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGeneratePlan = async () => {
    setLoading(true);
    try {
      // Simulate AI plan generation
      await new Promise(resolve => setTimeout(resolve, 2000));

      const plan = {
        title: `${t.planTitle} - ${formData.country}`,
        tasks: [
          {
            id: 1,
            title: 'Phase 1: Research & Analysis',
            description: 'Analyze current corruption patterns in your region',
            duration: '2 weeks',
            priority: 'High',
          },
          {
            id: 2,
            title: 'Phase 2: Community Engagement',
            description: 'Build awareness and gather support from local communities',
            duration: '4 weeks',
            priority: 'High',
          },
          {
            id: 3,
            title: 'Phase 3: Implementation',
            description: 'Execute transparency initiatives and blockchain solutions',
            duration: '8 weeks',
            priority: 'Medium',
          },
          {
            id: 4,
            title: 'Phase 4: Monitoring & Scaling',
            description: 'Track impact and scale successful initiatives',
            duration: 'Ongoing',
            priority: 'Medium',
          },
        ],
        resources: [
          'Blockchain infrastructure',
          'AI analysis tools',
          'Community volunteers',
          'Government partnerships',
          'Media & communications',
        ],
        impact: {
          shortTerm: '30% reduction in corruption cases within 6 months',
          mediumTerm: '70% transparency in government spending within 1 year',
          longTerm: 'Complete transformation to corruption-free governance',
        },
      };

      setGeneratedPlan(plan);
      setStep(3);
    } catch (error) {
      console.error('Error generating plan:', error);
    } finally {
      setLoading(false);
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
        className="max-w-4xl mx-auto mb-16 text-center"
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
        <motion.p variants={itemVariants} className="text-gray-300 text-lg">
          {t.description}
        </motion.p>
      </motion.div>

      {/* Progress Steps */}
      <motion.div
        className="max-w-4xl mx-auto mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-between items-center mb-8">
          {[1, 2, 3].map((s) => (
            <motion.div key={s} className="flex items-center flex-1" variants={itemVariants}>
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                  step >= s
                    ? 'bg-gradient-to-r from-gold to-teal text-slate-950'
                    : 'bg-white/10 text-gray-400'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {s}
              </motion.div>
              {s < 3 && (
                <div
                  className={`flex-1 h-1 mx-4 transition-all ${
                    step > s ? 'bg-gradient-to-r from-gold to-teal' : 'bg-white/10'
                  }`}
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Form Steps */}
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Step 1: Your Details */}
        {step === 1 && !generatedPlan && (
          <motion.div variants={itemVariants} className="backdrop-blur-md bg-white/5 border border-gold/30 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-gold mb-8">{t.step1}</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-teal font-semibold mb-2">{t.country}</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold transition-all"
                >
                  <option value="">Select your country...</option>
                  <option value="Tunisia">Tunisia</option>
                  <option value="Algeria">Algeria</option>
                  <option value="Morocco">Morocco</option>
                  <option value="Egypt">Egypt</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-teal font-semibold mb-2">{t.skills}</label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="e.g., Data analysis, blockchain development, community organizing..."
                  className="w-full px-4 py-3 bg-white/5 border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold transition-all resize-none"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-teal font-semibold mb-2">{t.resources}</label>
                <textarea
                  name="resources"
                  value={formData.resources}
                  onChange={handleInputChange}
                  placeholder="e.g., Budget, team members, technology access..."
                  className="w-full px-4 py-3 bg-white/5 border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold transition-all resize-none"
                  rows={4}
                />
              </div>

              <motion.button
                onClick={() => setStep(2)}
                className="w-full px-6 py-3 bg-gradient-to-r from-gold to-teal text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-gold/50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next: Your Vision
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Your Vision */}
        {step === 2 && !generatedPlan && (
          <motion.div variants={itemVariants} className="backdrop-blur-md bg-white/5 border border-teal/30 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-teal mb-8">{t.step2}</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gold font-semibold mb-2">{t.timeCommitment}</label>
                <select
                  name="timeCommitment"
                  value={formData.timeCommitment}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-teal/30 rounded-lg text-white focus:outline-none focus:border-teal transition-all"
                >
                  <option value="">Select time commitment...</option>
                  <option value="Part-time (5-10 hours/week)">Part-time (5-10 hours/week)</option>
                  <option value="Full-time (40+ hours/week)">Full-time (40+ hours/week)</option>
                  <option value="Volunteer (flexible)">Volunteer (flexible)</option>
                </select>
              </div>

              <div>
                <label className="block text-gold font-semibold mb-2">{t.imagination}</label>
                <textarea
                  name="imagination"
                  value={formData.imagination}
                  onChange={handleInputChange}
                  placeholder="Describe your vision for a corruption-free world. What specific changes do you want to see? How do you imagine your contribution making a difference?"
                  className="w-full px-4 py-3 bg-white/5 border border-teal/30 rounded-lg text-white focus:outline-none focus:border-teal transition-all resize-none"
                  rows={6}
                />
              </div>

              <div className="flex gap-4">
                <motion.button
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 border-2 border-teal text-teal font-bold rounded-lg hover:bg-teal/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Back
                </motion.button>
                <motion.button
                  onClick={handleGeneratePlan}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-gold to-teal text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-gold/50 transition-all disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loading ? t.generating : t.generatePlan}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Generated Plan */}
        {step === 3 && generatedPlan && (
          <motion.div variants={itemVariants} className="space-y-8">
            <motion.div className="backdrop-blur-md bg-gradient-to-r from-gold/10 to-teal/10 border border-gold/30 rounded-2xl p-12">
              <div className="flex items-center gap-4 mb-6">
                <CheckCircle2 className="w-8 h-8 text-teal" />
                <h2 className="text-3xl font-bold text-gold">{generatedPlan.title}</h2>
              </div>

              {/* Tasks */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-teal mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  {t.tasks}
                </h3>
                <div className="space-y-4">
                  {generatedPlan.tasks.map((task: any) => (
                    <motion.div
                      key={task.id}
                      className="backdrop-blur-md bg-white/5 border border-gold/20 rounded-lg p-6"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-bold text-gold">{task.title}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          task.priority === 'High' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-2">{task.description}</p>
                      <p className="text-teal text-sm">⏱️ {task.duration}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-teal mb-4 flex items-center gap-2">
                  <Zap className="w-6 h-6" />
                  {t.resources_section}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {generatedPlan.resources.map((resource: string, i: number) => (
                    <motion.div
                      key={i}
                      className="backdrop-blur-md bg-white/5 border border-teal/20 rounded-lg p-4 flex items-center gap-3"
                      whileHover={{ scale: 1.05 }}
                    >
                      <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                      <span className="text-gray-300">{resource}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Impact */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-teal mb-4 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6" />
                  {t.impact}
                </h3>
                <div className="space-y-4">
                  <div className="backdrop-blur-md bg-white/5 border border-gold/20 rounded-lg p-6">
                    <p className="text-gold font-semibold mb-2">Short-term (0-6 months)</p>
                    <p className="text-gray-300">{generatedPlan.impact.shortTerm}</p>
                  </div>
                  <div className="backdrop-blur-md bg-white/5 border border-gold/20 rounded-lg p-6">
                    <p className="text-teal font-semibold mb-2">Medium-term (6-12 months)</p>
                    <p className="text-gray-300">{generatedPlan.impact.mediumTerm}</p>
                  </div>
                  <div className="backdrop-blur-md bg-white/5 border border-gold/20 rounded-lg p-6">
                    <p className="text-gold font-semibold mb-2">Long-term (1+ years)</p>
                    <p className="text-gray-300">{generatedPlan.impact.longTerm}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4">
                <motion.button
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-gold to-teal text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-gold/50 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.download}
                </motion.button>
                <motion.button
                  className="flex-1 px-6 py-3 border-2 border-teal text-teal font-bold rounded-lg hover:bg-teal/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.share}
                </motion.button>
                <motion.button
                  onClick={() => {
                    setStep(1);
                    setGeneratedPlan(null);
                    setFormData({ country: '', skills: '', resources: '', timeCommitment: '', imagination: '' });
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gold text-gold font-bold rounded-lg hover:bg-gold/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.startNew}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
