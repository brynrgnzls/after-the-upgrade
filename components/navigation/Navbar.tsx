"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

interface NavRoute {
  label: string;
  href: string;
  shortLabel?: string;
}

interface NavGroup {
  name: string;
  index: string;
  routes: NavRoute[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    name: "Understand",
    index: "01",
    routes: [
      { label: "Campaign Home", shortLabel: "Home", href: "/" },
      { label: "About Campaign", shortLabel: "About", href: "/about" },
      { label: "The E-Waste Problem", shortLabel: "E-Waste", href: "/e-waste-problem" },
      { label: "Extend Device Life", shortLabel: "Extend Life", href: "/extend-device-life" },
    ],
  },
  {
    name: "Decide & Protect",
    index: "02",
    routes: [
      { label: "Device Decision Matrix", shortLabel: "Decisions", href: "/device-decision" },
      { label: "Safe Electronic Disposal", shortLabel: "Disposal", href: "/safe-disposal" },
      { label: "Protect Your Data", shortLabel: "Data Safety", href: "/data-safety" },
    ],
  },
  {
    name: "Act & Amplify",
    index: "03",
    routes: [
      { label: "Take Action & Pledge", shortLabel: "Take Action", href: "/take-action" },
      { label: "Social Campaign Toolkit", shortLabel: "Toolkit", href: "/toolkit" },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  // Handle escape key to close drawer & manage body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        toggleButtonRef.current?.focus();
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      // Focus the close button when opened
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const allRoutes = NAV_GROUPS.flatMap((group) => group.routes);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        {/* Brand Logo */}
        <Link href="/" className={styles.brand} aria-label="After the Upgrade Campaign Homepage">
          <Logo variant="mark" size={40} alt="After the Upgrade Logo" />
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>AFTER THE UPGRADE</span>
            <span className={styles.brandTagline}>REPAIR • REUSE • RETURN</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <ul className={styles.desktopList}>
            {allRoutes.map((route) => {
              const isActive = pathname === route.href;
              return (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {route.shortLabel || route.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Header Actions & Mobile Toggle */}
        <div className={styles.headerActions}>
          <Button href="/take-action" variant="primary" style={{ display: "none" }}>
            Pledge
          </Button>

          <button
            ref={toggleButtonRef}
            type="button"
            className={styles.mobileToggle}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            <svg
              className={styles.mobileToggleIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Accessible Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            className={styles.mobileBackdrop}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div
            id="mobile-nav-drawer"
            className={styles.mobileDrawer}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <div className={styles.drawerHeader}>
              <div className={styles.drawerTitle}>
                <Logo variant="mark" size={30} alt="" />
                <span>NAVIGATION</span>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                className={styles.drawerCloseBtn}
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className={styles.drawerBody}>
              {NAV_GROUPS.map((group) => (
                <div key={group.name} className={styles.navGroup}>
                  <div className={styles.groupLabel}>
                    <span>[{group.index}]</span>
                    <span>{group.name}</span>
                  </div>
                  <ul className={styles.drawerList}>
                    {group.routes.map((route) => {
                      const isActive = pathname === route.href;
                      return (
                        <li key={route.href}>
                          <Link
                            href={route.href}
                            className={`${styles.drawerLink} ${isActive ? styles.drawerLinkActive : ""}`}
                            aria-current={isActive ? "page" : undefined}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span>{route.label}</span>
                            {isActive && <span className={styles.activeTag}>[CURRENT]</span>}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <div className={styles.drawerFooter}>
              <Button href="/take-action" variant="primary" fullWidth onClick={() => setMobileMenuOpen(false)}>
                Make the Community Pledge →
              </Button>
              <div className={styles.drawerSlogan}>
                “Repair it. Reuse it. Return it responsibly.”
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
