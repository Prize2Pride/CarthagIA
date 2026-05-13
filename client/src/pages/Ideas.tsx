import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Language } from "@/contexts/LanguageContext";

const translations: Record<Language, any> = {
  en: {
    title: "Citizen Ideas",
    description: "Submit and vote on ideas for Tunisia's future",
    selectPhase: "Select a Phase",
    submitIdea: "Submit Idea",
    ideaTitle: "Idea Title",
    ideaDescription: "Description",
    yourIdea: "Your Idea",
    upvote: "Upvote",
    downvote: "Downvote",
    noIdeas: "No ideas yet. Be the first to submit!",
    loginToSubmit: "Login to submit ideas",
  },
  ar: {
    title: "أفكار المواطنين",
    description: "قدم وصوت على الأفكار لمستقبل تونس",
    selectPhase: "اختر مرحلة",
    submitIdea: "إرسال الفكرة",
    ideaTitle: "عنوان الفكرة",
    ideaDescription: "الوصف",
    yourIdea: "فكرتك",
    upvote: "موافق",
    downvote: "معارض",
    noIdeas: "لا توجد أفكار حتى الآن. كن الأول!",
    loginToSubmit: "سجل الدخول لإرسال الأفكار",
  },
  fr: {
    title: "Idées Citoyennes",
    description: "Soumettez et votez sur les idées pour l'avenir de la Tunisie",
    selectPhase: "Sélectionner une Phase",
    submitIdea: "Soumettre l'Idée",
    ideaTitle: "Titre de l'Idée",
    ideaDescription: "Description",
    yourIdea: "Votre Idée",
    upvote: "Approuver",
    downvote: "Désapprouver",
    noIdeas: "Aucune idée pour le moment. Soyez le premier!",
    loginToSubmit: "Connectez-vous pour soumettre des idées",
  },
  de: {
    title: "Bürgerbeteiligung",
    description: "Reichen Sie Ideen für Tunesiens Zukunft ein und stimmen ab",
    selectPhase: "Phase auswählen",
    submitIdea: "Idee einreichen",
    ideaTitle: "Ideentitel",
    ideaDescription: "Beschreibung",
    yourIdea: "Ihre Idee",
    upvote: "Zustimmen",
    downvote: "Ablehnen",
    noIdeas: "Noch keine Ideen. Seien Sie der Erste!",
    loginToSubmit: "Melden Sie sich an, um Ideen einzureichen",
  },
  it: {
    title: "Idee dei Cittadini",
    description: "Invia e vota le idee per il futuro della Tunisia",
    selectPhase: "Seleziona una Fase",
    submitIdea: "Invia Idea",
    ideaTitle: "Titolo dell'Idea",
    ideaDescription: "Descrizione",
    yourIdea: "La Tua Idea",
    upvote: "Approva",
    downvote: "Disapprova",
    noIdeas: "Nessuna idea ancora. Sii il primo!",
    loginToSubmit: "Accedi per inviare idee",
  },
  es: {
    title: "Ideas Ciudadanas",
    description: "Envía y vota ideas para el futuro de Túnez",
    selectPhase: "Seleccionar una Fase",
    submitIdea: "Enviar Idea",
    ideaTitle: "Título de la Idea",
    ideaDescription: "Descripción",
    yourIdea: "Tu Idea",
    upvote: "Aprobar",
    downvote: "Desaprobar",
    noIdeas: "Sin ideas aún. Sé el primero!",
    loginToSubmit: "Inicia sesión para enviar ideas",
  },
  pt: {
    title: "Ideias dos Cidadãos",
    description: "Envie e vote em ideias para o futuro da Tunísia",
    selectPhase: "Selecione uma Fase",
    submitIdea: "Enviar Ideia",
    ideaTitle: "Título da Ideia",
    ideaDescription: "Descrição",
    yourIdea: "Sua Ideia",
    upvote: "Aprovar",
    downvote: "Desaprovar",
    noIdeas: "Nenhuma ideia ainda. Seja o primeiro!",
    loginToSubmit: "Faça login para enviar ideias",
  },
  ko: {
    title: "시민 아이디어",
    description: "튀니지의 미래를 위한 아이디어 제출 및 투표",
    selectPhase: "단계 선택",
    submitIdea: "아이디어 제출",
    ideaTitle: "아이디어 제목",
    ideaDescription: "설명",
    yourIdea: "당신의 아이디어",
    upvote: "찬성",
    downvote: "반대",
    noIdeas: "아직 아이디어가 없습니다. 첫 번째가 되세요!",
    loginToSubmit: "아이디어를 제출하려면 로그인하세요",
  },
  ja: {
    title: "市民のアイデア",
    description: "チュニジアの未来のためのアイデアを提出して投票",
    selectPhase: "フェーズを選択",
    submitIdea: "アイデアを提出",
    ideaTitle: "アイデアのタイトル",
    ideaDescription: "説明",
    yourIdea: "あなたのアイデア",
    upvote: "賛成",
    downvote: "反対",
    noIdeas: "まだアイデアがありません。最初になってください!",
    loginToSubmit: "アイデアを提出するにはログインしてください",
  },
  zh: {
    title: "公民想法",
    description: "为突尼斯的未来提交和投票想法",
    selectPhase: "选择阶段",
    submitIdea: "提交想法",
    ideaTitle: "想法标题",
    ideaDescription: "描述",
    yourIdea: "你的想法",
    upvote: "赞成",
    downvote: "反对",
    noIdeas: "还没有想法。成为第一个!",
    loginToSubmit: "登录以提交想法",
  },
};

export default function Ideas() {
  const { language, dir } = useLanguage();
  const [selectedPhase, setSelectedPhase] = useState<number>(1);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    titleEn: "",
    titleAr: "",
    titleFr: "",
    descriptionEn: "",
    descriptionAr: "",
    descriptionFr: "",
  });

  const { user, isAuthenticated } = useAuth();
  const { data: phases } = trpc.phases.getAll.useQuery();
  const { data: ideas, refetch } = trpc.ideas.getByPhaseId.useQuery({
    phaseId: selectedPhase,
  });
  const createIdeaMutation = trpc.ideas.create.useMutation();
  const voteMutation = trpc.votes.vote.useMutation();

  const t = translations[language];

  const handleSubmitIdea = async () => {
    if (!formData.titleEn || !formData.descriptionEn) return;

    try {
      await createIdeaMutation.mutateAsync({
        phaseId: selectedPhase,
        titleEn: formData.titleEn,
        titleAr: formData.titleAr,
        titleFr: formData.titleFr,
        descriptionEn: formData.descriptionEn,
        descriptionAr: formData.descriptionAr,
        descriptionFr: formData.descriptionFr,
      });
      setFormData({
        titleEn: "",
        titleAr: "",
        titleFr: "",
        descriptionEn: "",
        descriptionAr: "",
        descriptionFr: "",
      });
      setShowForm(false);
      refetch();
    } catch (error) {
      console.error("Failed to create idea:", error);
    }
  };

  const handleVote = async (ideaId: number, voteType: "upvote" | "downvote") => {
    try {
      await voteMutation.mutateAsync({
        ideaId,
        voteType,
      });
      refetch();
    } catch (error) {
      console.error("Failed to vote:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-20" dir={dir}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold text-gold mb-4">{t.title}</h1>
          <p className="text-gray-300 text-lg">{t.description}</p>
        </motion.div>

        {/* Phase Selector */}
        <motion.div className="mb-8 flex flex-wrap gap-2 justify-center">
          {phases?.map((phase) => (
            <motion.button
              key={phase.id}
              onClick={() => setSelectedPhase(phase.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedPhase === phase.id
                  ? "bg-gradient-to-r from-gold to-teal text-slate-950"
                  : "bg-white/5 border border-gold/30 text-gray-300 hover:border-gold/50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {language === "ar" ? phase.titleAr : language === "fr" ? phase.titleFr : phase.titleEn}
            </motion.button>
          ))}
        </motion.div>

        {/* Submit Button */}
        {isAuthenticated ? (
          <motion.button
            onClick={() => setShowForm(!showForm)}
            className="w-full px-6 py-3 bg-gradient-to-r from-gold to-teal text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-gold/50 transition-all mb-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.submitIdea}
          </motion.button>
        ) : (
          <motion.a
            href={getLoginUrl()}
            className="block w-full px-6 py-3 bg-gradient-to-r from-gold to-teal text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-gold/50 transition-all mb-8 text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.loginToSubmit}
          </motion.a>
        )}

        {/* Form */}
        {showForm && isAuthenticated && (
          <motion.div
            className="backdrop-blur-md bg-white/5 border border-gold/30 rounded-2xl p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <input
              type="text"
              placeholder={t.ideaTitle}
              value={formData.titleEn}
              onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-gold/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold mb-4"
            />
            <textarea
              placeholder={t.ideaDescription}
              value={formData.descriptionEn}
              onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-gold/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold mb-4 resize-none"
              rows={4}
            />
            <motion.button
              onClick={handleSubmitIdea}
              disabled={createIdeaMutation.isPending}
              className="w-full px-6 py-3 bg-gradient-to-r from-gold to-teal text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-gold/50 transition-all disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {createIdeaMutation.isPending ? "Submitting..." : t.submitIdea}
            </motion.button>
          </motion.div>
        )}

        {/* Ideas List */}
        <motion.div className="space-y-4">
          {ideas && ideas.length > 0 ? (
            ideas.map((idea) => (
              <motion.div
                key={idea.id}
                className="backdrop-blur-md bg-white/5 border border-teal/30 rounded-lg p-6"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-bold text-gold mb-2">
                  {language === "ar" ? idea.titleAr : language === "fr" ? idea.titleFr : idea.titleEn}
                </h3>
                <p className="text-gray-300 mb-4">
                  {language === "ar" ? idea.descriptionAr : language === "fr" ? idea.descriptionFr : idea.descriptionEn}
                </p>
                <div className="flex gap-4">
                  <motion.button
                    onClick={() => handleVote(idea.id, "upvote")}
                    className="flex items-center gap-2 px-4 py-2 bg-teal/20 text-teal rounded-lg hover:bg-teal/30 transition-all"
                    whileHover={{ scale: 1.05 }}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    {idea.upvotes}
                  </motion.button>
                  <motion.button
                    onClick={() => handleVote(idea.id, "downvote")}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                    whileHover={{ scale: 1.05 }}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    {idea.downvotes}
                  </motion.button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div className="text-center py-12">
              <p className="text-gray-400 text-lg">{t.noIdeas}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
