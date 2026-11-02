"use client";

import React, { useCallback, useRef, useState, useEffect } from "react";
import { ArrowRight, MessageSquare, Star, Play, Pause } from "lucide-react";

interface HeroStat {
  value: string;
  unit?: string;
  label: string;
  showStar?: boolean;
  srText?: string;
}

const HERO_STATS: readonly HeroStat[] = [
  {
    value: "14,000",
    unit: "ft",
    label: "Drop Altitude",
    srText: "14,000 feet drop altitude",
  },
  {
    value: "60",
    unit: "sec",
    label: "Terminal Freefall",
    srText: "60 seconds terminal freefall",
  },
  {
    value: "100%",
    label: "USPA Safety Record",
    srText: "100% USPA safety record",
  },
  {
    value: "5.0",
    label: "850+ Verified Jumps",
    showStar: true,
    srText: "Rated 5.0 out of 5 stars from over 850 verified jumps",
  },
];

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Respect user's motion preferences (WCAG 2.2.2 Pause, Stop, Hide)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Smooth scroll and focus AI Assistant chat
  const scrollToAssistant = useCallback(() => {
    const chatSection = document.getElementById("ai-assistant");
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: "smooth" });
      const inputEl = document.getElementById("chat-user-input") as HTMLInputElement | null;
      if (inputEl) {
        setTimeout(() => inputEl.focus(), 400);
      }
    }
  }, []);

  // Toggle video playback
  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      className="relative w-full pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-28 overflow-hidden bg-surface dark:bg-[#0a101d] transition-colors"
      id="experience"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-12 lg:gap-16">
        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Hero Copy */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1
                id="hero-heading"
                className="font-display-hero text-3xl sm:text-5xl lg:text-6xl font-bold text-text-primary dark:text-[#f8fafc] tracking-tight leading-[1.15]"
              >
                Drop In From{" "}
                <span className="text-primary-container dark:text-sky-light">
                  14,000 Feet
                </span>{" "}
                Above The Coast
              </h1>
              <p className="font-body-lg text-base sm:text-lg text-text-muted dark:text-[#94a3b8] max-w-xl leading-relaxed">
                Experience the pinnacle of high-altitude ocean freefall over turquoise reef
                waters, paired with licensed master instructors and guaranteed beach landings.
              </p>
            </div>

            {/* Decisive CTAs - Responsive mobile-first stack */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href="#packages"
                aria-label="Explore skydiving packages"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary-container hover:bg-sky-azure dark:bg-sky-azure dark:hover:bg-sky-light dark:hover:text-slate-900 text-white font-headline-sm text-sm sm:text-base font-semibold transition-all shadow-md shadow-primary-container/20 dark:shadow-sky-azure/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-sky-light"
              >
                <span>Explore Packages</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={scrollToAssistant}
                aria-label="Chat with AI assistant"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container-lowest dark:bg-[#131e33] border border-slate-border dark:border-[#24334f] hover:bg-surface-container-low dark:hover:bg-[#182640] text-text-primary dark:text-[#f8fafc] font-headline-sm text-sm sm:text-base font-semibold transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-sky-light cursor-pointer"
              >
                <MessageSquare
                  className="w-4 h-4 text-primary-container dark:text-sky-light shrink-0"
                  aria-hidden="true"
                />
                <span>Chat with AI</span>
              </button>
            </div>

            {/* Key Stats Clean Horizontal Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-slate-border dark:border-[#22314d]">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  {stat.srText && <span className="sr-only">{stat.srText}</span>}
                  <div
                    aria-hidden={Boolean(stat.srText)}
                    className="font-headline-lg text-2xl sm:text-3xl font-bold text-text-primary dark:text-[#f8fafc] tracking-tight flex items-center gap-1.5"
                  >
                    <span>{stat.value}</span>
                    {stat.unit && (
                      <span className="text-sm sm:text-base font-medium text-text-muted dark:text-[#94a3b8]">
                        {stat.unit}
                      </span>
                    )}
                    {stat.showStar && (
                      <Star
                        className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-text-muted dark:text-[#94a3b8] mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clean Hero Video Card - Interactive Play/Pause on click */}
          <div className="lg:col-span-5 relative">
            <div
              role="button"
              tabIndex={0}
              onClick={toggleVideoPlayback}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  toggleVideoPlayback();
                }
              }}
              aria-label={isPlaying ? "Pause skydiving background video" : "Play skydiving background video"}
              title={isPlaying ? "Click anywhere to pause video" : "Click anywhere to play video"}
              className="relative rounded-2xl overflow-hidden shadow-xl aspect-[16/10] sm:aspect-[4/5] bg-surface-container-high dark:bg-[#131e33] border border-slate-border/50 dark:border-[#24334f] cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-sky-light select-none"
            >
              <video
                ref={videoRef}
                autoPlay
                className="w-full h-full object-cover pointer-events-none"
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="High altitude coastal skydiving video"
              >
                <source
                  src="https://www.greedyadventures.com/greedy/films/sea-view-studio-hero.mp4"
                  type="video/mp4"
                />
              </video>

              {/* Play/Pause state indicator pill badge */}
              <div
                className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center gap-1.5 text-xs font-medium backdrop-blur-sm transition-opacity opacity-80 group-hover:opacity-100"
                aria-hidden="true"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Play</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
