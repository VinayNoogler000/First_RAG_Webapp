"use client"

import React, { useState, useEffect, useCallback } from "react";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Experience", href: "#experience" },
  { label: "Packages", href: "#packages" },
  { label: "AI Assistant", href: "#ai-assistant" },
  { label: "Knowledge View", href: "#knowledge-view" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("experience");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [logoError, setLogoError] = useState<boolean>(false);

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
    handleManualScroll(); // run it once immediately so the active state is correct on initial load.
    
    return () => window.removeEventListener("scroll", handleManualScroll);
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

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-border/80">
      <div className="h-16 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#"
            aria-label="Greedy Adventures Homepage"
            className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          >
            {!logoError ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src="https://www.greedyadventures.com/greedy/img/brand/greedy-adventures-wordmark-dark.png"
                alt="Greedy Adventures"
                className="h-8 w-auto object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary-container text-white flex items-center justify-center font-bold text-sm">
                  GA
                </span>
                <span className="font-headline-md font-bold text-text-primary text-base tracking-tight">
                  GREEDY ADVENTURES
                </span>
              </div>
            )}
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-body-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1 py-0.5 
                  ${ isActive
                      ? "font-semibold text-primary-container"
                      : "font-medium text-text-muted hover:text-text-primary"
                  }
                  ${ item.href === "#ai-assistant" ? "hidden min-[945px]:inline-flex" : "" }
                `}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Search Shortcut */}
          <button
            type="button"
            onClick={scrollToAssistant}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-border bg-surface-container-low hover:bg-surface-container text-text-muted hover:text-text-primary text-body-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            aria-label="Quick search (Cmd+K)"
          >
            <svg
              className="w-4.5 h-4.5 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 rounded text-[11px] font-code-inspector bg-white border border-slate-border text-text-muted">
              ⌘K
            </kbd>
          </button>

          {/* Primary Action Button */}
          <a
            href="#packages"
            onClick={(e) => handleNavClick(e, "#packages")}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary-container hover:bg-sky-azure text-white text-body-sm font-semibold transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Book Drop
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border border-slate-border text-text-muted hover:text-text-primary hover:bg-surface-container transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Open navigation menu</span>
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-border bg-white/95 backdrop-blur-md px-6 py-4 shadow-lg animate-fadeIn">
          <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-2 rounded-lg text-body-md transition-colors ${
                    isActive
                      ? "font-semibold text-primary-container bg-surface-container-low"
                      : "font-medium text-text-muted hover:text-text-primary hover:bg-surface-container-low"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            {/* Ask AI Assistant Button */}
            <div className="pt-2 border-t border-slate-border/60 flex min-[640px]:hidden items-center justify-between gap-3">
              <button
                type="button"
                onClick={scrollToAssistant}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-border bg-surface-container-low text-text-muted hover:text-text-primary text-body-sm font-medium"
              >
                <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Ask AI Assistant</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
