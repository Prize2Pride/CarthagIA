import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { Check, X, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

type Language = "en" | "ar" | "fr";

const translations = {
  en: {
    title: "Admin Panel",
    description: "Manage citizen ideas and view engagement statistics",
    accessDenied: "Access Denied",
    adminOnly: "This page is for administrators only.",
    stats: {
      totalIdeas: "Total Ideas",
      approved: "Approved",
      pending: "Pending",
      rejected: "Rejected",
    },
    ideaManagement: "Idea Management",
    approve: "Approve",
    reject: "Reject",
    status: "Status",
    actions: "Actions",
    noIdeas: "No ideas to manage.",
  },
  ar: {
    title: "لوحة التحكم",
    description: "إدارة أفكار المواطنين وعرض إحصائيات المشاركة",
    accessDenied: "تم رفض الوصول",
    adminOnly: "هذه الصفحة مخصصة للمسؤولين فقط.",
    stats: {
      totalIdeas: "إجمالي الأفكار",
      approved: "موافق عليها",
      pending: "قيد الانتظار",
      rejected: "مرفوضة",
    },
    ideaManagement: "إدارة الأفكار",
    approve: "الموافقة",
    reject: "الرفض",
    status: "الحالة",
    actions: "الإجراءات",
    noIdeas: "لا توجد أفكار للإدارة.",
  },
  fr: {
    title: "Panneau Admin",
    description: "Gérer les idées citoyennes et afficher les statistiques d'engagement",
    accessDenied: "Accès Refusé",
    adminOnly: "Cette page est réservée aux administrateurs.",
    stats: {
      totalIdeas: "Total Idées",
      approved: "Approuvées",
      pending: "En Attente",
      rejected: "Rejetées",
    },
    ideaManagement: "Gestion des Idées",
    approve: "Approuver",
    reject: "Rejeter",
    status: "Statut",
    actions: "Actions",
    noIdeas: "Aucune idée à gérer.",
  },
};

export default function Admin() {
  const { language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  const { data: allIdeas, refetch } = trpc.ideas.getAll.useQuery();
  const updateStatusMutation = trpc.ideas.updateStatus.useMutation();

  const t = translations[language];
  const dir = language === "ar" ? "rtl" : "ltr";

  // Check admin access
  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#04080F] text-[#E8EDFF] flex items-center justify-center px-4" dir={dir}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <AlertCircle size={64} className="text-[#F43F5E] mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#C9A84C] mb-2">
            {t.accessDenied}
          </h1>
          <p className="text-[#96A4B4] mb-6">{t.adminOnly}</p>
          <Button
            onClick={() => navigate("/")}
            className="btn-primary"
          >
            Back to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  const handleStatusChange = async (ideaId: number, status: "approved" | "rejected") => {
    try {
      await updateStatusMutation.mutateAsync({ ideaId, status });
      refetch();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Calculate statistics from real data
  const stats = [
    { label: t.stats.totalIdeas, value: allIdeas?.length || 0, color: "from-[#C9A84C]" },
    { label: t.stats.approved, value: allIdeas?.filter(i => i.status === "approved").length || 0, color: "from-[#00D4A7]" },
    { label: t.stats.pending, value: allIdeas?.filter(i => i.status === "pending").length || 0, color: "from-[#F59E0B]" },
    { label: t.stats.rejected, value: allIdeas?.filter(i => i.status === "rejected").length || 0, color: "from-[#F43F5E]" },
  ];

  return (
    <div className="min-h-screen bg-[#04080F] text-[#E8EDFF] py-12 px-4" dir={dir}>
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#C9A84C] mb-4">{t.title}</h1>
          <p className="text-[#96A4B4]">{t.description}</p>
        </motion.div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`bg-gradient-to-br ${stat.color} to-[#04080F] border border-[rgba(201,168,76,0.2)] rounded-lg p-6 text-center`}
            >
              <p className="text-[#96A4B4] mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-[#E8EDFF]">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Ideas Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#070C18] border border-[rgba(201,168,76,0.3)] rounded-lg p-6"
        >
          <h2 className="text-2xl font-bold text-[#C9A84C] mb-6">
            {t.ideaManagement}
          </h2>

          {allIdeas && allIdeas.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(201,168,76,0.2)]">
                    <th className="text-left py-3 px-4 text-[#96A4B4]">Title</th>
                    <th className="text-left py-3 px-4 text-[#96A4B4]">
                      {t.status}
                    </th>
                    <th className="text-left py-3 px-4 text-[#96A4B4]">
                      Votes
                    </th>
                    <th className="text-left py-3 px-4 text-[#96A4B4]">
                      {t.actions}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allIdeas.map((idea) => (
                    <tr
                      key={idea.id}
                      className="border-b border-[rgba(201,168,76,0.1)] hover:bg-[rgba(201,168,76,0.05)] transition"
                    >
                      <td className="py-3 px-4">
                        {language === "ar" ? idea.titleAr : language === "fr" ? idea.titleFr : idea.titleEn}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            idea.status === "approved"
                              ? "bg-[rgba(0,212,167,0.1)] text-[#00D4A7]"
                              : idea.status === "rejected"
                              ? "bg-[rgba(244,63,94,0.1)] text-[#F43F5E]"
                              : "bg-[rgba(201,168,76,0.1)] text-[#C9A84C]"
                          }`}
                        >
                          {idea.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[#00D4A7]">
                          ↑ {idea.upvotes || 0} ↓ {idea.downvotes || 0}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          {idea.status !== "approved" && (
                            <button
                              onClick={() =>
                                handleStatusChange(idea.id, "approved")
                              }
                              disabled={updateStatusMutation.isPending}
                              className="flex items-center gap-1 px-3 py-1 bg-[rgba(0,212,167,0.1)] text-[#00D4A7] rounded hover:bg-[rgba(0,212,167,0.2)] transition disabled:opacity-50"
                            >
                              <Check size={16} />
                              {t.approve}
                            </button>
                          )}
                          {idea.status !== "rejected" && (
                            <button
                              onClick={() =>
                                handleStatusChange(idea.id, "rejected")
                              }
                              disabled={updateStatusMutation.isPending}
                              className="flex items-center gap-1 px-3 py-1 bg-[rgba(244,63,94,0.1)] text-[#F43F5E] rounded hover:bg-[rgba(244,63,94,0.2)] transition disabled:opacity-50"
                            >
                              <X size={16} />
                              {t.reject}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-[#96A4B4] py-8">{t.noIdeas}</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
