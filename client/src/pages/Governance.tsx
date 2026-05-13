import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock } from "lucide-react";

type Language = "en" | "ar" | "fr";

const translations = {
  en: {
    title: "Decentralized Governance",
    subtitle: "Citizen voting on major decisions with blockchain transparency",
    sections: {
      active: "Active Proposals",
      passed: "Passed Proposals",
      create: "Create Proposal",
    },
    buttons: {
      voteFor: "Vote For",
      voteAgainst: "Vote Against",
      abstain: "Abstain",
      submit: "Submit Proposal",
    },
    stats: {
      totalProposals: "Total Proposals",
      passed: "Passed",
      active: "Active",
      participation: "Participation Rate",
    },
  },
  ar: {
    title: "الحكم اللامركزي",
    subtitle: "تصويت المواطنين على القرارات الرئيسية بشفافية البلوكتشين",
    sections: {
      active: "الاقتراحات النشطة",
      passed: "الاقتراحات الموافق عليها",
      create: "إنشاء اقتراح",
    },
    buttons: {
      voteFor: "صوت موافق",
      voteAgainst: "صوت معارض",
      abstain: "امتناع",
      submit: "إرسال الاقتراح",
    },
    stats: {
      totalProposals: "إجمالي الاقتراحات",
      passed: "موافق عليها",
      active: "نشطة",
      participation: "معدل المشاركة",
    },
  },
  fr: {
    title: "Gouvernance Décentralisée",
    subtitle: "Vote citoyen sur les décisions majeures avec transparence blockchain",
    sections: {
      active: "Propositions Actives",
      passed: "Propositions Approuvées",
      create: "Créer une Proposition",
    },
    buttons: {
      voteFor: "Voter Pour",
      voteAgainst: "Voter Contre",
      abstain: "S'abstenir",
      submit: "Soumettre la Proposition",
    },
    stats: {
      totalProposals: "Propositions Totales",
      passed: "Approuvées",
      active: "Actives",
      participation: "Taux de Participation",
    },
  },
};

// Mock proposals data
const mockProposals = [
  {
    id: 1,
    titleEn: "Increase Education Budget by 20%",
    titleAr: "زيادة ميزانية التعليم بنسبة 20%",
    titleFr: "Augmenter le budget de l'éducation de 20%",
    status: "active",
    votesFor: 1250,
    votesAgainst: 380,
    votesAbstain: 120,
    endDate: "2026-05-20",
  },
  {
    id: 2,
    titleEn: "Implement Solar Energy Initiative",
    titleAr: "تنفيذ مبادرة الطاقة الشمسية",
    titleFr: "Mettre en œuvre l'initiative d'énergie solaire",
    status: "active",
    votesFor: 980,
    votesAgainst: 220,
    votesAbstain: 80,
    endDate: "2026-05-18",
  },
  {
    id: 3,
    titleEn: "Healthcare System Modernization",
    titleAr: "تحديث نظام الرعاية الصحية",
    titleFr: "Modernisation du système de santé",
    status: "passed",
    votesFor: 2100,
    votesAgainst: 450,
    votesAbstain: 150,
    endDate: "2026-05-05",
  },
];

export default function Governance() {
  const { language, dir } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("active");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const t = translations[language];

  const getProposalTitle = (proposal: any) => {
    if (language === "ar") return proposal.titleAr;
    if (language === "fr") return proposal.titleFr;
    return proposal.titleEn;
  };

  const filteredProposals = mockProposals.filter(p => 
    activeTab === "active" ? p.status === "active" : p.status === "passed"
  );

  const totalVotes = (proposal: any) => proposal.votesFor + proposal.votesAgainst + proposal.votesAbstain;
  const forPercentage = (proposal: any) => (proposal.votesFor / totalVotes(proposal)) * 100;
  const againstPercentage = (proposal: any) => (proposal.votesAgainst / totalVotes(proposal)) * 100;

  return (
    <div className="min-h-screen bg-[#04080F] text-[#E8EDFF] py-12 px-4" dir={dir}>
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00D4A7] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#C9A84C] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00D4A7] to-[#C9A84C] mb-4">
            {t.title}
          </h1>
          <p className="text-[#96A4B4]">{t.subtitle}</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: t.stats.totalProposals, value: "47", color: "from-[#C9A84C]" },
            { label: t.stats.passed, value: "32", color: "from-[#00D4A7]" },
            { label: t.stats.active, value: "8", color: "from-[#8B5CF6]" },
            { label: t.stats.participation, value: "78%", color: "from-[#F59E0B]" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-gradient-to-br ${stat.color} to-[#04080F] border border-[rgba(201,168,76,0.2)] rounded-lg p-6 text-center`}
            >
              <p className="text-[#96A4B4] mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-[#E8EDFF]">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {["active", "passed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === tab
                  ? "bg-gradient-to-r from-[#00D4A7] to-[#C9A84C] text-[#04080F]"
                  : "bg-[#070C18] text-[#96A4B4] border border-[#00D4A7]"
              }`}
            >
              {activeTab === "active" ? t.sections.active : t.sections.passed}
            </button>
          ))}
          {isAuthenticated && (
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="ml-auto px-6 py-3 rounded-lg font-semibold bg-[#C9A84C] text-[#04080F] hover:bg-[#E8EDFF] transition"
            >
              {t.sections.create}
            </button>
          )}
        </div>

        {/* Create Form */}
        {showCreateForm && isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#070C18] border border-[rgba(201,168,76,0.3)] rounded-lg p-6 mb-8"
          >
            <h3 className="text-xl font-semibold text-[#C9A84C] mb-4">{t.sections.create}</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Proposal Title"
                className="w-full bg-[#0A1122] border border-[rgba(201,168,76,0.3)] rounded px-4 py-2 text-[#E8EDFF] placeholder-[#646C8B]"
              />
              <textarea
                placeholder="Description"
                rows={4}
                className="w-full bg-[#0A1122] border border-[rgba(201,168,76,0.3)] rounded px-4 py-2 text-[#E8EDFF] placeholder-[#646C8B]"
              />
              <div className="flex gap-2">
                <Button className="btn-primary flex-1">{t.buttons.submit}</Button>
                <Button onClick={() => setShowCreateForm(false)} className="btn-secondary flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Proposals List */}
        <div className="space-y-6">
          {filteredProposals.map((proposal, idx) => (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="backdrop-blur-md bg-[#070C18] border border-[rgba(201,168,76,0.2)] rounded-lg p-6"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#E8EDFF] mb-2">
                    {getProposalTitle(proposal)}
                  </h3>
                  <div className="flex items-center gap-2">
                    {proposal.status === "active" ? (
                      <>
                        <Clock size={16} className="text-[#F59E0B]" />
                        <span className="text-sm text-[#F59E0B]">Ends: {proposal.endDate}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} className="text-[#00D4A7]" />
                        <span className="text-sm text-[#00D4A7]">Passed</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#C9A84C]">{totalVotes(proposal).toLocaleString()}</p>
                  <p className="text-sm text-[#96A4B4]">Total Votes</p>
                </div>
              </div>

              {/* Vote Breakdown */}
              <div className="mb-6">
                <div className="flex h-8 rounded-full overflow-hidden border border-[rgba(201,168,76,0.2)]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${forPercentage(proposal)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="bg-[#00D4A7] flex items-center justify-center text-xs font-bold text-[#04080F]"
                  >
                    {forPercentage(proposal) > 10 && `${Math.round(forPercentage(proposal))}%`}
                  </motion.div>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${againstPercentage(proposal)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="bg-[#F43F5E] flex items-center justify-center text-xs font-bold text-white"
                  >
                    {againstPercentage(proposal) > 10 && `${Math.round(againstPercentage(proposal))}%`}
                  </motion.div>
                  <div className="flex-1 bg-[rgba(201,168,76,0.1)]" />
                </div>
              </div>

              {/* Vote Details */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-sm text-[#96A4B4] mb-1">For</p>
                  <p className="text-2xl font-bold text-[#00D4A7]">{proposal.votesFor.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-[#96A4B4] mb-1">Against</p>
                  <p className="text-2xl font-bold text-[#F43F5E]">{proposal.votesAgainst.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-[#96A4B4] mb-1">Abstain</p>
                  <p className="text-2xl font-bold text-[#8B5CF6]">{proposal.votesAbstain.toLocaleString()}</p>
                </div>
              </div>

              {/* Voting Buttons */}
              {proposal.status === "active" && isAuthenticated && (
                <div className="flex gap-2">
                  <Button className="flex-1 bg-[#00D4A7] text-[#04080F] hover:bg-[#00E8BB]">
                    {t.buttons.voteFor}
                  </Button>
                  <Button className="flex-1 bg-[#F43F5E] text-white hover:bg-[#FF5A7A]">
                    {t.buttons.voteAgainst}
                  </Button>
                  <Button className="flex-1 bg-[#8B5CF6] text-white hover:bg-[#A78BFA]">
                    {t.buttons.abstain}
                  </Button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
