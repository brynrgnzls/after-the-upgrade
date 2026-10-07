"use client";

import React, { useState } from "react";
import styles from "./DeviceDecisionTool.module.css";
import Button from "@/components/ui/Button";
import { DecisionRuleOutcome } from "@/lib/types";
import { saveDeviceDecision } from "@/lib/indexed-db";

interface Props {
  decisionRules: DecisionRuleOutcome[];
}

export default function DeviceDecisionTool({ decisionRules }: Props) {
  // Form States
  const [deviceType, setDeviceType] = useState<string>("smartphone");
  const [stillWorks, setStillWorks] = useState<string>("yes");
  const [physicallyDamaged, setPhysicallyDamaged] = useState<string>("none");
  const [batteryHazard, setBatteryHazard] = useState<string>("no");
  const [securityUpdates, setSecurityUpdates] = useState<string>("yes");
  const [personalData, setPersonalData] = useState<string>("yes");
  const [repairCostChecked, setRepairCostChecked] = useState<string>("not_checked");

  // Recommendation State
  const [recommendation, setRecommendation] = useState<DecisionRuleOutcome | null>(null);

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();

    let outcomeId = "continue-using-it";

    // 1. Critical battery hazard priority
    if (batteryHazard === "yes") {
      outcomeId = "seek-professional-battery-handling";
    }
    // 2. Terminal failure / Unrepairable
    else if (
      stillWorks === "no" &&
      (repairCostChecked === "too_high" || physicallyDamaged === "significant")
    ) {
      outcomeId = "recycle-it-through-an-appropriate-facility";
    }
    // 3. Fixable wear or repair feasible
    else if (
      (stillWorks === "partially" || physicallyDamaged === "significant") &&
      repairCostChecked !== "too_high"
    ) {
      outcomeId = "repair-it";
    }
    // 4. Working but software discontinued
    else if (stillWorks === "yes" && securityUpdates === "no") {
      outcomeId = "reuse-it-for-another-purpose";
    }
    // 5. Working device with updates
    else if (stillWorks === "yes" && securityUpdates === "yes") {
      // If user has personal data and wants to pass it on or already checked repair
      if (repairCostChecked === "affordable" || physicallyDamaged === "none") {
        outcomeId = "continue-using-it";
      } else {
        outcomeId = "donate-or-give-it-away";
      }
    }
    // 6. Cables/Peripherals fallback
    else if (deviceType === "cable_power" || deviceType === "peripheral") {
      outcomeId =
        stillWorks === "no"
          ? "recycle-it-through-an-appropriate-facility"
          : "reuse-it-for-another-purpose";
    } else {
      outcomeId = "donate-or-give-it-away";
    }

    const matched = decisionRules.find((r) => r.id === outcomeId) || decisionRules[0];
    setRecommendation(matched);

    if (matched) {
      saveDeviceDecision({
        deviceType,
        recommendation: matched.title,
      }).catch((err) => {
        console.warn("[DeviceDecisionTool] Could not persist decision to IndexedDB:", err);
      });
    }
  };

  const handleReset = () => {
    setRecommendation(null);
    setDeviceType("smartphone");
    setStillWorks("yes");
    setPhysicallyDamaged("none");
    setBatteryHazard("no");
    setSecurityUpdates("yes");
    setPersonalData("yes");
    setRepairCostChecked("not_checked");
  };

  return (
    <section className={styles.toolContainer} aria-label="Device Decision Assessment">
      <div className={styles.header}>
        <span className={styles.badge}>CIRCULAR DECISION ENGINE</span>
        <h2 className={styles.title}>What Should I Do With This Device?</h2>
        <p className={styles.subtitle}>
          Answer seven diagnostic checks to receive an objective, circular recommendation based on hardware condition, safety, and software support.
        </p>
      </div>

      {!recommendation ? (
        <form onSubmit={handleEvaluate} className={styles.form}>
          {/* Question 1: Device Type */}
          <div className={styles.questionCard}>
            <div className={styles.questionHeader}>
              <span className={styles.questionIndex}>[Q1]</span>
              <label className={styles.questionLabel} htmlFor="q1-device-type">
                Device Category
              </label>
            </div>
            <div className={styles.optionsGrid}>
              {[
                {
                  val: "smartphone",
                  label: "Smartphone",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                      <line x1="12" y1="18" x2="12.01" y2="18"/>
                    </svg>
                  ),
                },
                {
                  val: "laptop",
                  label: "Laptop / Notebook",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="12" rx="2"/>
                      <line x1="2" y1="20" x2="22" y2="20"/>
                    </svg>
                  ),
                },
                {
                  val: "tablet",
                  label: "Tablet / e-Reader",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                      <line x1="12" y1="18" x2="12.01" y2="18"/>
                    </svg>
                  ),
                },
                {
                  val: "desktop",
                  label: "Desktop / Tower PC",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="3" width="20" height="14" rx="2"/>
                      <line x1="8" y1="21" x2="16" y2="21"/>
                      <line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                  ),
                },
                {
                  val: "peripheral",
                  label: "Peripheral / Monitor",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="6" width="20" height="8" rx="1"/>
                      <line x1="6" y1="18" x2="18" y2="18"/>
                    </svg>
                  ),
                },
                {
                  val: "cable_power",
                  label: "Cable / Power Supply",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 2v6m-4 0h8v4a4 4 0 0 1-8 0v-4z"/>
                      <line x1="12" y1="16" x2="12" y2="22"/>
                    </svg>
                  ),
                },
              ].map((opt) => (
                <label
                  key={opt.val}
                  className={`${styles.optionLabel} ${deviceType === opt.val ? styles.optionSelected : ""}`}
                >
                  <input
                    type="radio"
                    name="deviceType"
                    value={opt.val}
                    checked={deviceType === opt.val}
                    onChange={(e) => setDeviceType(e.target.value)}
                    className={styles.optionRadio}
                  />
                  <div className={styles.optionContent}>
                    <span className={styles.optionIcon}>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Question 2: Does it still work? */}
          <div className={styles.questionCard}>
            <div className={styles.questionHeader}>
              <span className={styles.questionIndex}>[Q2]</span>
              <span className={styles.questionLabel}>Operational Status</span>
            </div>
            <div className={styles.optionsGrid}>
              {[
                {
                  val: "yes",
                  label: "Fully Functional",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  ),
                },
                {
                  val: "partially",
                  label: "Partial (Degraded Battery/Slow)",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polygon points="12 2 2 22 22 22"/>
                      <line x1="12" y1="9" x2="12" y2="13"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  ),
                },
                {
                  val: "no",
                  label: "Non-Functional / Dead",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="15" y1="9" x2="9" y2="15"/>
                      <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                  ),
                },
              ].map((opt) => (
                <label
                  key={opt.val}
                  className={`${styles.optionLabel} ${stillWorks === opt.val ? styles.optionSelected : ""}`}
                >
                  <input
                    type="radio"
                    name="stillWorks"
                    value={opt.val}
                    checked={stillWorks === opt.val}
                    onChange={(e) => setStillWorks(e.target.value)}
                    className={styles.optionRadio}
                  />
                  <div className={styles.optionContent}>
                    <span className={styles.optionIcon}>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Question 3: Physical damage */}
          <div className={styles.questionCard}>
            <div className={styles.questionHeader}>
              <span className={styles.questionIndex}>[Q3]</span>
              <span className={styles.questionLabel}>Physical Integrity</span>
            </div>
            <div className={styles.optionsGrid}>
              {[
                {
                  val: "none",
                  label: "Intact / No Damage",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  ),
                },
                {
                  val: "minor",
                  label: "Minor Scuffs / Scratches",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  ),
                },
                {
                  val: "significant",
                  label: "Cracked Glass / Liquid Ingress",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ),
                },
              ].map((opt) => (
                <label
                  key={opt.val}
                  className={`${styles.optionLabel} ${physicallyDamaged === opt.val ? styles.optionSelected : ""}`}
                >
                  <input
                    type="radio"
                    name="physicallyDamaged"
                    value={opt.val}
                    checked={physicallyDamaged === opt.val}
                    onChange={(e) => setPhysicallyDamaged(e.target.value)}
                    className={styles.optionRadio}
                  />
                  <div className={styles.optionContent}>
                    <span className={styles.optionIcon}>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Question 4: Battery condition (Hazard check) */}
          <div className={styles.questionCard} style={{ borderLeft: "3px solid var(--color-accent-warning)" }}>
            <div className={styles.questionHeader}>
              <span className={styles.questionIndex} style={{ color: "var(--color-accent-warning)" }}>
                [Q4 // CRITICAL]
              </span>
              <span className={styles.questionLabel}>
                Battery Hazard Check (Swollen / Hot / Leaking)
              </span>
            </div>
            <div className={styles.optionsGrid}>
              {[
                {
                  val: "yes",
                  label: "HAZARD: Swollen, Bulging, or Hot",
                  hazard: true,
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z"/>
                    </svg>
                  ),
                },
                {
                  val: "no",
                  label: "Normal: Flat & Cool Casing",
                  hazard: false,
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="7" width="16" height="10" rx="2" ry="2"/>
                      <line x1="22" y1="11" x2="22" y2="13"/>
                    </svg>
                  ),
                },
                {
                  val: "na",
                  label: "N/A: Wall Powered (No Battery)",
                  hazard: false,
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 2v6m-4 0h8v4a4 4 0 0 1-8 0v-4z"/>
                      <line x1="12" y1="16" x2="12" y2="22"/>
                    </svg>
                  ),
                },
              ].map((opt) => (
                <label
                  key={opt.val}
                  className={`${styles.optionLabel} ${opt.hazard ? styles.hazardOption : ""} ${
                    batteryHazard === opt.val
                      ? opt.hazard
                        ? styles.hazardSelected
                        : styles.optionSelected
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="batteryHazard"
                    value={opt.val}
                    checked={batteryHazard === opt.val}
                    onChange={(e) => setBatteryHazard(e.target.value)}
                    className={styles.optionRadio}
                  />
                  <div className={styles.optionContent}>
                    <span className={styles.optionIcon}>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Question 5: Security & Software updates */}
          <div className={styles.questionCard}>
            <div className={styles.questionHeader}>
              <span className={styles.questionIndex}>[Q5]</span>
              <span className={styles.questionLabel}>Manufacturer Software Updates</span>
            </div>
            <div className={styles.optionsGrid}>
              {[
                {
                  val: "yes",
                  label: "Supported (Receiving Patches)",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <polyline points="9 12 11 14 15 10"/>
                    </svg>
                  ),
                },
                {
                  val: "no",
                  label: "Discontinued / End-of-Life",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  ),
                },
                {
                  val: "unsure",
                  label: "Unsure / Legacy OS",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  ),
                },
              ].map((opt) => (
                <label
                  key={opt.val}
                  className={`${styles.optionLabel} ${securityUpdates === opt.val ? styles.optionSelected : ""}`}
                >
                  <input
                    type="radio"
                    name="securityUpdates"
                    value={opt.val}
                    checked={securityUpdates === opt.val}
                    onChange={(e) => setSecurityUpdates(e.target.value)}
                    className={styles.optionRadio}
                  />
                  <div className={styles.optionContent}>
                    <span className={styles.optionIcon}>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Question 6: Personal information */}
          <div className={styles.questionCard}>
            <div className={styles.questionHeader}>
              <span className={styles.questionIndex}>[Q6]</span>
              <span className={styles.questionLabel}>Personal Data & Logged-In Accounts</span>
            </div>
            <div className={styles.optionsGrid}>
              {[
                {
                  val: "yes",
                  label: "Contains Personal Data / Logins",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  ),
                },
                {
                  val: "no",
                  label: "No Personal Information",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                  ),
                },
                {
                  val: "wiped",
                  label: "Cryptographically Wiped",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  ),
                },
              ].map((opt) => (
                <label
                  key={opt.val}
                  className={`${styles.optionLabel} ${personalData === opt.val ? styles.optionSelected : ""}`}
                >
                  <input
                    type="radio"
                    name="personalData"
                    value={opt.val}
                    checked={personalData === opt.val}
                    onChange={(e) => setPersonalData(e.target.value)}
                    className={styles.optionRadio}
                  />
                  <div className={styles.optionContent}>
                    <span className={styles.optionIcon}>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Question 7: Repair cost check */}
          <div className={styles.questionCard}>
            <div className={styles.questionHeader}>
              <span className={styles.questionIndex}>[Q7]</span>
              <span className={styles.questionLabel}>Repair Quote Feasibility</span>
            </div>
            <div className={styles.optionsGrid}>
              {[
                {
                  val: "affordable",
                  label: "Affordable (<50% Replacement)",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  ),
                },
                {
                  val: "too_high",
                  label: "Too High (>60% Replacement)",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  ),
                },
                {
                  val: "not_checked",
                  label: "Not Checked / Unsure",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  ),
                },
              ].map((opt) => (
                <label
                  key={opt.val}
                  className={`${styles.optionLabel} ${repairCostChecked === opt.val ? styles.optionSelected : ""}`}
                >
                  <input
                    type="radio"
                    name="repairCostChecked"
                    value={opt.val}
                    checked={repairCostChecked === opt.val}
                    onChange={(e) => setRepairCostChecked(e.target.value)}
                    className={styles.optionRadio}
                  />
                  <div className={styles.optionContent}>
                    <span className={styles.optionIcon}>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.submitRow}>
            <Button type="submit" variant="primary">
              Generate Recommendation →
            </Button>
            <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
              🔒 Local Client-Side Execution // 0 Server Tracking
            </span>
          </div>
        </form>
      ) : (
        /* Results View */
        <div className={styles.resultCard}>
          <div className={styles.resultHeader}>
            <div className={styles.outcomeIconBox}>
              {recommendation.id === "seek-professional-battery-handling" && (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-warning)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z"/>
                </svg>
              )}
              {recommendation.id === "continue-using-it" && (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-acid)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
              )}
              {recommendation.id === "repair-it" && (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-acid)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              )}
              {recommendation.id === "reuse-it-for-another-purpose" && (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-tech)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="4" y="4" width="16" height="16" rx="2"/>
                  <rect x="9" y="9" width="6" height="6"/>
                  <line x1="9" y1="1" x2="9" y2="4"/>
                  <line x1="15" y1="1" x2="15" y2="4"/>
                  <line x1="9" y1="20" x2="9" y2="23"/>
                  <line x1="15" y1="20" x2="15" y2="23"/>
                  <line x1="20" y1="9" x2="23" y2="9"/>
                  <line x1="20" y1="14" x2="23" y2="14"/>
                  <line x1="1" y1="9" x2="4" y2="9"/>
                  <line x1="1" y1="14" x2="4" y2="14"/>
                </svg>
              )}
              {recommendation.id === "donate-or-give-it-away" && (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-acid)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 12 20 22 4 22 4 12"/>
                  <rect x="2" y="7" width="20" height="5"/>
                  <line x1="12" y1="22" x2="12" y2="7"/>
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
                </svg>
              )}
              {recommendation.id === "recycle-it-through-an-appropriate-facility" && (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-warning)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="7 10 12 15 17 10"/>
                  <path d="M12 15V3"/>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                </svg>
              )}
            </div>

            <span
              className={`${styles.resultBadge} ${
                recommendation.variant === "warning"
                  ? styles.badgeWarning
                  : recommendation.variant === "highlight"
                  ? styles.badgeHighlight
                  : styles.badgeTech
              }`}
            >
              RECOMMENDED OUTCOME // {recommendation.badge}
            </span>
            <h3 className={styles.resultTitle}>{recommendation.title}</h3>
            <p className={styles.resultSummary}>{recommendation.summary}</p>
          </div>

          {/* Why Selected */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionTitle}>WHY THIS WAS SELECTED</div>
            <p className={styles.sectionBody}>{recommendation.whySelected}</p>
          </div>

          {/* Next Steps */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionTitle}>ACTION SEQUENCE</div>
            <ul className={styles.stepsList}>
              {recommendation.nextSteps.map((step, idx) => (
                <li key={idx} className={styles.stepItem}>
                  <span className={styles.stepBullet}>{`0${idx + 1}.`}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Data Safety Notice if applicable */}
          {personalData === "yes" && recommendation.id !== "continue-using-it" && (
            <div className={styles.sectionBlock} style={{ borderLeft: "3px solid var(--color-accent-warning)", paddingLeft: "1rem" }}>
              <div className={styles.sectionTitle} style={{ color: "var(--color-accent-warning)" }}>
                [DATA SANITIZATION REQUIRED]
              </div>
              <p className={styles.sectionBody}>
                Personal credentials detected. Perform a cryptographic wipe before transfer or recycling.{" "}
                <a href="/data-safety" style={{ color: "var(--color-accent-acid)", textDecoration: "underline", fontWeight: 700 }}>
                  Open Wipe Checklist →
                </a>
              </p>
            </div>
          )}

          {/* Non-professional Safety Advice Disclaimer */}
          <div className={styles.disclaimerBox}>
            <div className={styles.disclaimerTitle}>SAFETY & ADVISORY NOTICE:</div>
            <p>
              {recommendation.disclaimer} This tool provides non-professional circular guidance. Follow official manufacturer manuals and regional hazardous waste regulations.
            </p>
          </div>

          {/* Action Row */}
          <div className={styles.resultActions}>
            <Button variant="secondary" onClick={handleReset}>
              ← Evaluate Another Device
            </Button>
            {recommendation.id === "repair-it" && (
              <Button href="/extend-device-life" variant="primary">
                View Repair & Maintenance Guides →
              </Button>
            )}
            {recommendation.id === "donate-or-give-it-away" && (
              <Button href="/data-safety" variant="primary">
                Open Data Wipe Checklist →
              </Button>
            )}
            {(recommendation.id === "recycle-it-through-an-appropriate-facility" ||
              recommendation.id === "seek-professional-battery-handling") && (
              <Button href="/safe-disposal" variant="warning">
                Review Certified Drop-Off Protocols →
              </Button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
