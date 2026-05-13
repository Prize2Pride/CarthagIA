import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Pause, Play, SkipForward } from 'lucide-react';
import type { Language } from '@/contexts/LanguageContext';

interface AvatarTeacherProps {
  message: string;
  language: Language;
  onComplete?: () => void;
  autoPlay?: boolean;
}

const languageVoices: Record<Language, string> = {
  en: 'en-US',
  ar: 'ar-SA',
  fr: 'fr-FR',
  de: 'de-DE',
  it: 'it-IT',
  es: 'es-ES',
  pt: 'pt-BR',
  ko: 'ko-KR',
  ja: 'ja-JP',
  zh: 'zh-CN',
};

export default function AvatarTeacher({ message, language, onComplete, autoPlay = true }: AvatarTeacherProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (autoPlay) {
      speak();
    }
  }, [message, language, autoPlay]);

  const speak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = languageVoices[language];
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setIsSpeaking(false);
        onComplete?.();
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        setIsSpeaking(false);
      };

      synthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
    } else {
      speak();
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsSpeaking(false);
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-8 p-8 backdrop-blur-md bg-white/5 border border-gold/30 rounded-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Avatar */}
      <motion.div
        className="relative w-32 h-32 rounded-full bg-gradient-to-br from-gold to-teal flex items-center justify-center overflow-hidden"
        animate={{
          scale: isSpeaking ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 0.6,
          repeat: isSpeaking ? Infinity : 0,
        }}
      >
        {/* Avatar Face */}
        <div className="text-6xl">🤖</div>

        {/* Speaking Indicator */}
        {isSpeaking && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-teal"
              animate={{ scale: [1, 1.3], opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-gold"
              animate={{ scale: [1, 1.5], opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            />
          </>
        )}
      </motion.div>

      {/* Message Text */}
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-gray-300 text-lg leading-relaxed">{message}</p>
      </motion.div>

      {/* Controls */}
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={togglePlayPause}
          className="p-3 rounded-full bg-gradient-to-r from-gold to-teal text-slate-950 hover:shadow-lg hover:shadow-gold/50 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </motion.button>

        <motion.button
          onClick={stop}
          className="p-3 rounded-full border-2 border-teal text-teal hover:bg-teal/10 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <SkipForward className="w-5 h-5" />
        </motion.button>

        <motion.button
          onClick={speak}
          className="p-3 rounded-full border-2 border-gold text-gold hover:bg-gold/10 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Volume2 className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Status */}
      <motion.p
        className="text-sm text-teal font-semibold"
        animate={{ opacity: isSpeaking ? 1 : 0.5 }}
      >
        {isSpeaking ? '🎤 Speaking...' : '✓ Ready'}
      </motion.p>
    </motion.div>
  );
}
