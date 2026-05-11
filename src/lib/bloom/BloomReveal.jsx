import React, { useRef } from 'react';

/**
 * BloomReveal (The Animation Engine)
 * 
 * A headless wrapper that adds the Majestic Radial Bloom effect to ANY child component.
 * Use this if you want the animation but have your own icons/buttons.
 * 
 * @param {boolean} isDarkMode - Current theme state
 * @param {function} onToggle - Your state setter (e.g. setIsDarkMode)
 * @param {number} duration - Animation speed in seconds
 * @param {React.ReactNode} children - Your custom button/icon
 */
const BloomReveal = ({ 
  isDarkMode, 
  onToggle, 
  duration = 2,
  children 
}) => {
  const isTransitioning = useRef(false);

  const handleToggle = (e) => {
    if (isTransitioning.current) return;

    // 1. Capture click coordinates
    const x = e.clientX;
    const y = e.clientY;

    // 2. Fallback for non-supported browsers
    if (!document.startViewTransition) {
      onToggle(!isDarkMode);
      return;
    }

    isTransitioning.current = true;
    
    // 3. Set the ignition point for the CSS animation
    document.documentElement.style.setProperty('--x', `${x}px`);
    document.documentElement.style.setProperty('--y', `${y}px`);
    document.documentElement.style.setProperty('--reveal-duration', `${duration}s`);

    // 4. Trigger the native browser transition
    const transition = document.startViewTransition(() => {
      onToggle(!isDarkMode);
    });

    transition.finished.finally(() => {
      isTransitioning.current = false;
    });
  };

  return (
    <div onClick={handleToggle} className="inline-block cursor-pointer">
      {children}
      
      {/* GLOBAL ENGINE CSS (Injected once) */}
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
          animation: bloom-reveal var(--reveal-duration, 2s) cubic-bezier(0.4, 0, 0.2, 1) forwards;
          clip-path: circle(0% at var(--x, 50%) var(--y, 50%));
        }

        @keyframes bloom-reveal {
          from { clip-path: circle(0% at var(--x) var(--y)); }
          to { clip-path: circle(150% at var(--x) var(--y)); }
        }

        html { view-transition-name: none; }
        body { view-transition-name: root; }
      `}} />
    </div>
  );
};

export default BloomReveal;
