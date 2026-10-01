'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-driven frame-sequence hero (adapted from the "MacBook Neo" hero).
 * Styles live in src/styles/globals.css under `.fsh-*`.
 *
 * @typedef {Object} FrameSequenceStep
 * @property {number} from          scroll progress (0–1) where this card appears
 * @property {number} to            scroll progress where it hands over to the next card
 * @property {string} color         accent color for the card
 * @property {string} num
 * @property {string} total
 * @property {import('react').ReactNode} [icon]
 * @property {string} title
 * @property {string} description
 * @property {string} label
 */

const cx = (...c) => c.filter(Boolean).join(' ');

export function FrameSequenceHero({
  frameCount,
  framePath,
  eagerCount = 140,
  scrollHeight = '600vh',
  brand,
  navLinks = [],
  ctaLabel,
  ctaHref = '#',
  title,
  subtitle,
  steps,
  className,
}) {
  const spacerRef = useRef(null);

  const cacheRef = useRef(new Array(frameCount));
  const loadedRef = useRef(0);
  const targetFrameRef = useRef(0);
  const displayFrameRef = useRef(0);
  const lastShownRef = useRef(-1);
  const rafActiveRef = useRef(false);

  const [loadPct, setLoadPct] = useState(0);
  const [loaderDone, setLoaderDone] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [subHidden, setSubHidden] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [stepLocal, setStepLocal] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(() => framePath(1));

  const showFrame = (i) => {
    if (i === lastShownRef.current) return;
    setCurrentSrc(framePath(i + 1));
    lastShownRef.current = i;
  };

  const loop = () => {
    if (rafActiveRef.current) return;
    rafActiveRef.current = true;
    const tick = () => {
      const diff = targetFrameRef.current - displayFrameRef.current;
      if (Math.abs(diff) < 0.08) displayFrameRef.current = targetFrameRef.current;
      else displayFrameRef.current += diff * 0.28;
      const idx = Math.max(0, Math.min(frameCount - 1, Math.round(displayFrameRef.current)));
      if (idx !== lastShownRef.current) showFrame(idx);
      if (displayFrameRef.current !== targetFrameRef.current) requestAnimationFrame(tick);
      else rafActiveRef.current = false;
    };
    requestAnimationFrame(tick);
  };

  useEffect(() => {
    const eager = Math.min(eagerCount, frameCount);
    const loadOne = (i) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = framePath(i + 1);
      const onSettle = () => {
        loadedRef.current += 1;
        const pct = Math.round((loadedRef.current / frameCount) * 100);
        setLoadPct(pct);
        if (loadedRef.current === eager) {
          setLoaderDone(true);
          for (let j = eager; j < frameCount; j++) loadOne(j);
        }
      };
      img.onload = onSettle;
      img.onerror = onSettle;
      cacheRef.current[i] = img;
    };
    for (let i = 0; i < eager; i++) loadOne(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount, eagerCount]);

  const onScroll = () => {
    const spacer = spacerRef.current;
    if (!spacer) return;
    const total = spacer.offsetHeight - window.innerHeight;
    const p = Math.max(0, Math.min(1, window.scrollY / Math.max(1, total)));
    targetFrameRef.current = p * (frameCount - 1);
    loop();
    setProgress(p);
    setNavScrolled(window.scrollY > 4);
    setSubHidden(window.scrollY > 8);
    let idx = -1;
    let local = 0;
    for (let i = 0; i < steps.length; i++) {
      const s = steps[i];
      if (p >= s.from && p < s.to) {
        idx = i;
        local = (p - s.from) / (s.to - s.from);
        break;
      }
    }
    setActiveIdx(idx);
    setStepLocal(Math.max(0, Math.min(1, local)));
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps, frameCount]);

  return (
    <div className={cx('fsh-root', className)}>
      <div aria-hidden className={cx('fsh-loader', loaderDone && 'fsh-loader-done')}>
        <div className="fsh-loader-text">{loadPct < 100 ? `Loading · ${loadPct}%` : 'Ready'}</div>
        <div className="fsh-loader-track">
          <span className="fsh-loader-fill" style={{ width: `${loadPct}%` }} />
        </div>
      </div>

      <nav className={cx('fsh-nav', (navScrolled || menuOpen) && 'fsh-nav-scrolled')}>
        <div className="fsh-brand">{brand}</div>
        {navLinks.length > 0 && (
          <div className="fsh-nav-links">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
        )}
        {ctaLabel && (
          <a href={ctaHref} className="fsh-cta">
            {ctaLabel}
          </a>
        )}
        {navLinks.length > 0 && (
          <button
            type="button"
            className="fsh-menu-btn"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        )}
      </nav>

      {menuOpen && (
        <div className="fsh-mobile-menu">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
      )}

      {/* Pinned stage — always full viewport */}
      <div className="fsh-stage">
        <div className="fsh-copy">
          <h1 className="fsh-title">{title}</h1>
          {subtitle && <p className={cx('fsh-sub', subHidden && 'fsh-sub-hidden')}>{subtitle}</p>}
        </div>

        <div className="fsh-canvas-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element -- frames are swapped every animation tick */}
          <img src={currentSrc} alt="" className="fsh-canvas" draggable={false} />
        </div>

        <div className="fsh-cards">
          {steps.map((s, i) => {
            const isActive = activeIdx === i;
            const isPrev = activeIdx >= 0 && i < activeIdx;
            return (
              <article
                key={i}
                aria-hidden={!isActive}
                style={{ '--c': s.color }}
                className={cx('fsh-card', isActive && 'fsh-card-active', isPrev && 'fsh-card-prev')}
              >
                <div className="fsh-card-inner">
                  <span aria-hidden className="fsh-card-glow" />
                  <div className="fsh-card-head">
                    <span className="fsh-card-num">
                      <strong>{s.num}</strong> / {s.total}
                    </span>
                    <span aria-hidden className="fsh-card-icon">
                      {s.icon ?? '✦'}
                    </span>
                  </div>
                  <h3 className="fsh-card-title">{s.title}</h3>
                  <p className="fsh-card-desc">{s.description}</p>
                  <div className="fsh-card-foot">
                    <div className="fsh-ticks">
                      {steps.map((_, j) => {
                        const done = j < activeIdx;
                        const cur = j === activeIdx;
                        return (
                          <i key={j} className="fsh-tick">
                            <span
                              style={{
                                transform: `scaleX(${done ? 1 : cur ? stepLocal : 0})`,
                                transition: done ? 'none' : 'transform 160ms linear',
                              }}
                            />
                          </i>
                        );
                      })}
                    </div>
                    <span className="fsh-card-label">{s.label}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="fsh-progress">
          <span className="fsh-progress-fill" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>

      {/* Empty scroll spacer: gives the page its scroll distance */}
      <div ref={spacerRef} className="fsh-spacer" style={{ height: scrollHeight }} />
    </div>
  );
}
