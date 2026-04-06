import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ttsService, TTSState } from '../services/ttsService';

export const SubtitleOverlay: React.FC = () => {
  const [ttsState, setTtsState] = useState<TTSState>({ isPlaying: false, text: '', progress: 0 });

  useEffect(() => {
    const unsubscribe = ttsService.subscribe(setTtsState);
    return () => unsubscribe();
  }, []);

  // Show if playing, or if there's text and it's paused/finished (until cleared)
  const isVisible = ttsState.text.length > 0;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-50"
        >
          <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-700/50 relative overflow-hidden">
            
            {/* Progress Bar Background */}
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
              <motion.div 
                className="h-full bg-blue-500"
                style={{ width: `${ttsState.progress}%` }}
                layout
              />
            </div>

            <div className="flex items-start gap-3 mt-1">
              {/* Animated Speaker Icon */}
              <div className="mt-1 flex-shrink-0">
                {ttsState.isPlaying ? (
                  <div className="flex gap-1 items-center h-5">
                    <motion.div animate={{ height: ["4px", "12px", "4px"] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-blue-400 rounded-full" />
                    <motion.div animate={{ height: ["8px", "16px", "8px"] }} transition={{ repeat: Infinity, duration: 1.0 }} className="w-1 bg-blue-400 rounded-full" />
                    <motion.div animate={{ height: ["4px", "10px", "4px"] }} transition={{ repeat: Infinity, duration: 0.9 }} className="w-1 bg-blue-400 rounded-full" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-slate-600 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-sm" />
                  </div>
                )}
              </div>

              {/* Text Content */}
              <p className="text-slate-100 text-sm md:text-base leading-relaxed font-medium tracking-wide">
                {ttsState.text}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
