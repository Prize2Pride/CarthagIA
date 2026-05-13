import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Headphones, MessageSquare, Award, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AvatarTeacher from '@/components/AvatarTeacher';

const CEFRLevels = [
  { level: 'A1', name: 'Beginner', description: 'Elementary proficiency', color: 'from-blue-500 to-blue-600' },
  { level: 'A2', name: 'Elementary', description: 'Limited working proficiency', color: 'from-cyan-500 to-cyan-600' },
  { level: 'B1', name: 'Intermediate', description: 'Limited working proficiency', color: 'from-teal-500 to-teal-600' },
  { level: 'B2', name: 'Upper-Intermediate', description: 'General professional proficiency', color: 'from-green-500 to-green-600' },
  { level: 'C1', name: 'Advanced', description: 'Professional working proficiency', color: 'from-yellow-500 to-yellow-600' },
  { level: 'C2', name: 'Mastery', description: 'Full professional proficiency', color: 'from-gold to-orange-600' },
];

const lessonTypes = [
  { id: 'vocabulary', name: 'Vocabulary', icon: BookOpen, description: 'Learn new words and phrases' },
  { id: 'listening', name: 'Listening', icon: Headphones, description: 'Improve listening comprehension' },
  { id: 'speaking', name: 'Speaking', icon: MessageSquare, description: 'Practice pronunciation and dialogue' },
  { id: 'grammar', name: 'Grammar', icon: Zap, description: 'Master grammar rules' },
];

export default function LanguageLearning() {
  const { language, allLanguages, metadata } = useLanguage();
  const [selectedLevel, setSelectedLevel] = useState('A1');
  const [selectedLessonType, setSelectedLessonType] = useState('vocabulary');
  const [showAvatar, setShowAvatar] = useState(false);

  const lessons: Record<string, string> = {
    vocabulary_A1: `Let's learn basic vocabulary in ${metadata.nativeName}. Today we'll learn greetings and common phrases. Hello, my name is Teacher Avatar. What is your name?`,
    listening_A1: `Listen carefully. I will speak slowly. "Hello, how are you?" This is a common greeting. Can you repeat after me?`,
    speaking_A1: `Now it's your turn to speak. Try to introduce yourself. Say your name and tell me something about yourself in ${metadata.nativeName}.`,
    grammar_A1: `Let's learn basic grammar. In ${metadata.nativeName}, we use pronouns like "I", "you", "he", "she". Can you make a simple sentence?`,
  };

  const currentLesson = lessons[`${selectedLessonType}_${selectedLevel}`] || 
    `Welcome to ${selectedLevel} level ${selectedLessonType} lesson in ${metadata.nativeName}!`;

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
          Language Learning Hub
        </motion.h1>
        <motion.p variants={itemVariants} className="text-2xl text-teal mb-4">
          Master {metadata.nativeName} from A1 to C2
        </motion.p>
        <motion.p variants={itemVariants} className="text-gray-300 text-lg">
          Learn with AI Avatar Teacher - Interactive lessons in 10 languages
        </motion.p>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left: CEFR Levels */}
        <motion.div variants={itemVariants} className="md:col-span-1">
          <h2 className="text-2xl font-bold text-gold mb-6">CEFR Levels</h2>
          <div className="space-y-3">
            {CEFRLevels.map((cefrLevel) => (
              <motion.button
                key={cefrLevel.level}
                onClick={() => setSelectedLevel(cefrLevel.level)}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  selectedLevel === cefrLevel.level
                    ? `bg-gradient-to-r ${cefrLevel.color} text-white shadow-lg`
                    : 'bg-white/5 border border-gold/20 text-gray-300 hover:border-gold/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="font-bold">{cefrLevel.level}</div>
                <div className="text-sm">{cefrLevel.name}</div>
                <div className="text-xs opacity-75">{cefrLevel.description}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Center: Lessons */}
        <motion.div variants={itemVariants} className="md:col-span-1">
          <h2 className="text-2xl font-bold text-teal mb-6">Lesson Types</h2>
          <div className="space-y-3">
            {lessonTypes.map((lesson) => {
              const Icon = lesson.icon;
              return (
                <motion.button
                  key={lesson.id}
                  onClick={() => {
                    setSelectedLessonType(lesson.id);
                    setShowAvatar(true);
                  }}
                  className={`w-full p-4 rounded-lg text-left transition-all flex items-start gap-3 ${
                    selectedLessonType === lesson.id
                      ? 'bg-gradient-to-r from-gold to-teal text-slate-950 shadow-lg'
                      : 'bg-white/5 border border-teal/20 text-gray-300 hover:border-teal/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold">{lesson.name}</div>
                    <div className="text-xs opacity-75">{lesson.description}</div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Right: Avatar Teacher */}
        <motion.div variants={itemVariants} className="md:col-span-1">
          <h2 className="text-2xl font-bold text-gold mb-6">Your Teacher</h2>
          <AvatarTeacher
            message={currentLesson}
            language={language}
            autoPlay={showAvatar}
            onComplete={() => setShowAvatar(false)}
          />
        </motion.div>
      </motion.div>

      {/* Supported Languages */}
      <motion.div
        className="max-w-6xl mx-auto mt-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl font-bold text-gold mb-6 text-center">Available Languages</h2>
        <motion.div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {allLanguages.map((lang) => (
            <motion.div
              key={lang}
              className="backdrop-blur-md bg-white/5 border border-gold/30 rounded-lg p-4 text-center hover:border-gold/50 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl mb-2">🌍</div>
              <div className="font-semibold text-gold text-sm">{lang.toUpperCase()}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Progress Tracker */}
      <motion.div
        className="max-w-6xl mx-auto mt-16 backdrop-blur-md bg-white/5 border border-teal/30 rounded-2xl p-8"
        variants={itemVariants}
      >
        <h2 className="text-2xl font-bold text-teal mb-6 flex items-center gap-2">
          <Award className="w-6 h-6" />
          Your Progress
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-gold mb-2">A1</div>
            <div className="text-gray-300">Current Level</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-teal mb-2">15</div>
            <div className="text-gray-300">Lessons Completed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gold mb-2">42%</div>
            <div className="text-gray-300">Progress to B1</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
