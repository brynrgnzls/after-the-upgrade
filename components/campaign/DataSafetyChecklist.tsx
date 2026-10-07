"use client";

import React, { useState } from "react";
import styles from "./DataSafetyChecklist.module.css";
import Button from "@/components/ui/Button";
import { DataSafetyChecklistData } from "@/lib/types";

interface Props {
  checklistData: DataSafetyChecklistData;
}

function getStepIcon(stepId: string) {
  switch (stepId) {
    case "step-backup":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14a9 3 0 0 0 18 0V5" />
          <path d="M3 12a9 3 0 0 0 18 0" />
        </svg>
      );
    case "step-signout-accounts":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      );
    case "step-remove-sim-memory":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="14" height="20" x="5" y="2" rx="2" />
          <path d="M10 2v4" />
          <path d="M14 2v4" />
          <circle cx="12" cy="14" r="2" />
        </svg>
      );
    case "step-disable-locks":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 9.9-1" />
        </svg>
      );
    case "step-factory-reset":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m2 9 3-3 3 3" />
          <path d="M13 5h2a7 7 0 0 1 7 7v1" />
          <path d="m22 15-3 3-3-3" />
          <path d="M11 19H9a7 7 0 0 1-7-7v-1" />
        </svg>
      );
    case "step-check-removable-storage":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    case "step-separate-account-removal":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      );
    case "step-confirm-next-owner":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <polyline points="7 10 10 13 17 6" />
        </svg>
      );
    default:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
  }
}

export default function DataSafetyChecklist({ checklistData }: Props) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [activeOS, setActiveOS] = useState<"apple" | "android" | "windows">("apple");

  const totalSteps = checklistData.checklistSteps.length;
  const completedCount = completedSteps.length;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);

  const handleToggle = (id: string) => {
    setCompletedSteps((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setCompletedSteps([]);
  };

  const handleMarkAll = () => {
    setCompletedSteps(checklistData.checklistSteps.map((s) => s.id));
  };

  return (
    <section className={styles.checklistContainer} aria-label="Interactive Data Sanitization Checklist">
      <div className={styles.header}>
        <span className={styles.badge}>INTERACTIVE WORKFLOW</span>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>8-Stage Device Sanitization Checklist</h2>
          <div className={styles.progressStats}>
            <span>
              {completedCount} of {totalSteps} Completed ({progressPercent}%)
            </span>
          </div>
        </div>

        <div className={styles.progressBarContainer} aria-hidden="true">
          <div
            className={styles.progressBarFill}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Platform Instructions Switcher with bespoke vector logos */}
      <div className={styles.osTabsRow}>
        <span style={{ fontSize: "0.8rem", fontFamily: "var(--font-mono)", color: "var(--color-text-muted)" }}>
          OS-SPECIFIC GUIDE:
        </span>
        {[
          {
            key: "apple",
            label: "Apple (iOS / macOS)",
            icon: (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                <path d="M10 2c1 .5 2 2 2 5" />
              </svg>
            ),
          },
          {
            key: "android",
            label: "Google (Android / ChromeOS)",
            icon: (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="16" height="12" x="4" y="8" rx="2" />
                <path d="M7 8V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" />
                <circle cx="9" cy="13" r="1" fill="currentColor" />
                <circle cx="15" cy="13" r="1" fill="currentColor" />
              </svg>
            ),
          },
          {
            key: "windows",
            label: "Microsoft (Windows 10/11)",
            icon: (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="8" height="8" x="3" y="3" rx="1" />
                <rect width="8" height="8" x="13" y="3" rx="1" />
                <rect width="8" height="8" x="3" y="13" rx="1" />
                <rect width="8" height="8" x="13" y="13" rx="1" />
              </svg>
            ),
          },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`${styles.osTabBtn} ${activeOS === tab.key ? styles.osTabActive : ""}`}
            onClick={() => setActiveOS(tab.key as "apple" | "android" | "windows")}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Steps List */}
      <div className={styles.stepsList}>
        {checklistData.checklistSteps.map((step) => {
          const isDone = completedSteps.includes(step.id);
          const tip = step.osSpecificTips[activeOS];

          return (
            <article
              key={step.id}
              className={`${styles.stepCard} ${isDone ? styles.stepCompleted : ""}`}
            >
              <div className={styles.stepHeader}>
                <input
                  type="checkbox"
                  id={`check-${step.id}`}
                  checked={isDone}
                  onChange={() => handleToggle(step.id)}
                  className={styles.checkbox}
                  aria-label={`Mark step ${step.stepNumber}: ${step.title} as completed`}
                />

                <div className={`${styles.stepIconBox} ${isDone ? styles.stepIconBoxCompleted : ""}`}>
                  {getStepIcon(step.id)}
                </div>

                <div className={styles.stepContent}>
                  <div className={styles.stepTitleLine}>
                    <span className={styles.stepNumber}>{`[STAGE_0${step.stepNumber}]`}</span>
                    <label
                      htmlFor={`check-${step.id}`}
                      className={styles.stepTitle}
                      style={{ cursor: "pointer", textDecoration: isDone ? "line-through" : "none" }}
                    >
                      {step.title}
                    </label>
                  </div>

                  <p className={styles.stepSummary}>{step.summary}</p>

                  <ul className={styles.actionItemsList}>
                    {step.actionItems.map((action, idx) => (
                      <li key={idx} className={styles.actionItem}>
                        {action}
                      </li>
                    ))}
                  </ul>

                  {tip && (
                    <div className={styles.osTipBox}>
                      <div className={styles.osTipLabel}>
                        {activeOS.toUpperCase()} FAST NAVIGATION:
                      </div>
                      <p>{tip}</p>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Footer Controls */}
      <div className={styles.footerControls}>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Button variant="outline" onClick={handleReset}>
            Reset Checklist
          </Button>
          <Button variant="ghost" onClick={handleMarkAll}>
            Mark All Completed
          </Button>
        </div>

        {completedCount === totalSteps && (
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--color-accent-acid)", fontWeight: 700 }}>
            ✓ ALL 8 STAGES VERIFIED — Cryptographically sanitized & ready for recirculation!
          </div>
        )}
      </div>
    </section>
  );
}
