import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

/**
 * ThemeToggle Component
 * A premium, reusable theme switcher with a Majestic Radial Bloom effect.
 * Uses the modern View Transition API for a cinematic theme-reveal experience.
 */
const ThemeToggle = ({ 
  isDarkMode, 
  onToggle, 
  accentColor = "#6366F1",
  duration = 2 
}) => {
  const isTransitioning = useRef(false);

  const handleToggle = (e) => {
    if (isTransitioning.current) return;

    const x = e.clientX;
    const y = e.clientY;

    if (!document.startViewTransition) {
      onToggle(!isDarkMode);
      return;
    }

    isTransitioning.current = true;
    
    document.documentElement.style.setProperty('--x', `${x}px`);
    document.documentElement.style.setProperty('--y', `${y}px`);
    document.documentElement.style.setProperty('--reveal-duration', `${duration}s`);

    const transition = document.startViewTransition(() => {
      onToggle(!isDarkMode);
    });

    transition.finished.finally(() => {
      isTransitioning.current = false;
    });
  };

  return (
    <>
      <button 
        onClick={handleToggle}
        className={`p-3 rounded-xl transition-all relative overflow-hidden group ${
          isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'
        }`}
        aria-label="Toggle Theme"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isDarkMode ? 'sun' : 'moon'}
            initial={{ y: 20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 90 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="relative z-10"
          >
            {isDarkMode ? (
              <Sun size={20} className="text-white group-hover:scale-110 transition-transform" />
            ) : (
              <Moon size={20} className="text-black group-hover:scale-110 transition-transform" />
            )}
          </motion.div>
        </AnimatePresence>
        
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl ${
          isDarkMode ? 'bg-white/10' : 'bg-black/10'
        }`} />
      </button>

      <style dangerouslySetInnerHTML={{ __html: `
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }

        ::view-transition-old(root) {
          z-index: 1;
        }

        ::view-transition-new(root) {
          z-index: 999999;
          animation: radial-reveal var(--reveal-duration, 2s) cubic-bezier(0.4, 0, 0.2, 1) forwards;
          clip-path: circle(0% at var(--x, 50%) var(--y, 50%));
        }

        @keyframes radial-reveal {
          from { clip-path: circle(0% at var(--x) var(--y)); }
          to { clip-path: circle(150% at var(--x) var(--y)); }
        }

        html { view-transition-name: none; }
        body { view-transition-name: root; }
      `}} />
    </>
  );
};

export default ThemeToggle;
