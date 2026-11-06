"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Search, Sun, Moon, Menu, X, Compass } from "lucide-react";
import { useTheme } from "next-themes";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Experience", href: "#experience" },
  { label: "Packages", href: "#packages" },
  { label: "AI Assistant", href: "#ai-assistant" },
  { label: "Knowledge View", href: "#knowledge-base" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("experience");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [logoError, setLogoError] = useState<boolean>(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [ mounted, setMounted ] = useState(false); // prevents "React Hydration Error" and brief icon switch/flicker on page load (eg: sun to moon)

  // Get and Set Dark Mode.
  const isDarkMode =  mounted ? resolvedTheme === "dark" : false; 

  // Toggle Dark Mode with smooth transition
  const toggleDarkMode = () => {
    const doc = document.documentElement;
    doc.classList.add("transition-colors");
  
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

    setTimeout(() => {
      doc.classList.remove("transition-colors");
    }, 350);
  };

  // Scroll to assistant chat input & focus it
  const scrollToAssistant = useCallback(() => {
    const chatSection = document.getElementById("ai-assistant");
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: "smooth" });

      const inputEl = document.getElementById("chat-user-input") as HTMLInputElement | null;
      if (inputEl) {
        setTimeout(() => inputEl.focus(), 400);
      }
    }
    setMobileMenuOpen(false);
  }, []);

  // Handle smooth scroll on nav link click
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.slice(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
    setActiveSection(targetId);
    setMobileMenuOpen(false);
  };

  // Keyboard shortcut listener: Cmd+K / Ctrl+K opens/focuses AI search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); // prevents browser's default behaviour of focusing the search bar
        scrollToAssistant();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to prevent any unexpected behaviours, before next effect or on unmount
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollToAssistant]);

  // Scroll spy to highlight active section in Navbar whenever the user manually scrolls to a section or visit it via URL
  useEffect(() => {
    const handleManualScroll = () => {
      const scrollPosition = window.scrollY + 120; // 120 offset accounts for the fixed navbar
      for (const item of [...NAV_ITEMS].reverse()) { // to chooses the last section whose top has been passed by the page's scroll position, which approximates the current section.
        const id = item.href.slice(1);
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop; // distance of the element from the top edge of it's parent
          if (scrollPosition >= top) { // means, page’s scroll position has reached or passed the section’s top
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleManualScroll, { passive: true });
    handleManualScroll();
    return () => window.removeEventListener("scroll", handleManualScroll);
  }, []);

  // On Mount of the Component, execute this effect
  useEffect(() => setMounted(true), []);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/85 dark:bg-[#0c1424]/90 backdrop-blur-md border-b border-slate-border/80 dark:border-[#22314d] transition-colors">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-2 md:gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#"
            aria-label="Greedy Adventures Homepage"
            className="flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-sky-light rounded-lg"
          >
            {!logoError ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src="https://www.greedyadventures.com/greedy/img/brand/greedy-adventures-wordmark-dark.png"
                alt="Greedy Adventures"
                className="h-7 sm:h-8 w-auto object-contain brand-wordmark-invert transition-all"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="flex items-center gap-2 font-display-hero font-bold tracking-tight text-text-primary dark:text-white select-none">
                <div className="w-8 h-8 rounded-lg bg-primary-container dark:bg-sky-azure text-white flex items-center justify-center shadow-sm shrink-0">
                  <Compass className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[13px] sm:text-[14px] font-bold tracking-wider text-text-primary dark:text-white">
                    GREEDY
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest text-primary-container dark:text-sky-light">
                    ADVENTURES
                  </span>
                </div>
              </div>
            )}
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2.5 lg:gap-6 xl:gap-8 shrink" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-xs md:text-[13px] lg:text-body-sm whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-sky-light rounded-md px-1.5 py-0.5 ${
                  isActive
                    ? "font-semibold text-primary-container dark:text-sky-light"
                    : "font-medium text-text-muted dark:text-[#94a3b8] hover:text-text-primary dark:hover:text-white"
                  } 
                `}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 shrink-0">
          {/* Quick Search Shortcut */}
          <button
            type="button"
            onClick={scrollToAssistant}
            className="hidden sm:inline-flex items-center justify-center lg:justify-start gap-2 h-9 px-2.5 lg:px-3 rounded-lg border border-slate-border dark:border-[#24334f] bg-surface-container-low dark:bg-[#131e33] hover:bg-surface-container dark:hover:bg-[#1a2942] text-text-muted dark:text-[#94a3b8] hover:text-text-primary dark:hover:text-white text-body-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-sky-light cursor-pointer shrink-0"
            aria-label="Quick search (Cmd+K)"
            title="Quick search (⌘K)"
          >
            <Search className="w-4 h-4 text-text-muted dark:text-[#94a3b8] shrink-0" aria-hidden="true" />
            <span className="hidden lg:inline">Search</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 rounded text-[11px] font-code-inspector bg-white dark:bg-[#1e293b] border border-slate-border dark:border-[#334155] text-text-muted dark:text-[#cbd5e1]">
              ⌘K
            </kbd>
          </button>

          {/* Desktop Dark Mode Toggle Button */}
          <button
            type="button"
            id="theme-toggle-desktop"
            onClick={toggleDarkMode}
            className="relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-border dark:border-[#24334f] bg-surface-container-low dark:bg-[#131e33] hover:bg-surface-container dark:hover:bg-[#1c2b46] text-text-primary dark:text-[#f8fafc] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-sky-light focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0a101d] cursor-pointer shrink-0"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={isDarkMode}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <Sun aria-hidden="true" className="w-5 h-5 text-amber-500" />
            ) : (
              <Moon aria-hidden="true" className="w-5 h-5 text-sky-light" />
            )}
          </button>

          {/* Book Drop Primary Button */}
          <a
            href="#packages"
            onClick={(e) => handleNavClick(e, "#packages")}
            className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-primary-container hover:bg-sky-azure dark:bg-sky-azure dark:hover:bg-sky-light dark:hover:text-slate-900 text-white text-xs sm:text-body-sm font-semibold whitespace-nowrap transition-colors shadow-sm shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-sky-light"
          >
            Book Drop
          </a>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-border dark:border-[#24334f] bg-surface-container-low dark:bg-[#131e33] text-text-primary dark:text-[#f8fafc] hover:bg-surface-container dark:hover:bg-[#1c2b46] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Open mobile navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X aria-hidden="true" className="w-5 h-5 text-current" />
            ) : (
              <Menu aria-hidden="true" className="w-5 h-5 text-current" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden px-6 py-4 bg-white/95 dark:bg-[#0d1627]/95 border-b border-slate-border dark:border-[#22314d] backdrop-blur-md flex flex-col gap-3 transition-colors animate-fadeIn"
        >
          <nav className="flex flex-col gap-2.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-2 rounded-lg text-body-sm transition-colors ${
                    isActive
                      ? "font-semibold text-primary-container dark:text-sky-light bg-surface-container-low dark:bg-[#131e33]"
                      : "font-medium text-text-muted dark:text-[#94a3b8] hover:text-text-primary dark:hover:text-white hover:bg-surface-container-low dark:hover:bg-[#131e33]"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
