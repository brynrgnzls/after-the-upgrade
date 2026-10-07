import type { Metadata } from "next";
import PageIntro from "@/components/ui/PageIntro";
import SectionHeading from "@/components/ui/SectionHeading";
import InfoCard from "@/components/ui/InfoCard";
import WarningCallout from "@/components/ui/WarningCallout";
import TechnicalFigure from "@/components/ui/TechnicalFigure";
import CampaignCTA from "@/components/ui/CampaignCTA";
import RelatedLinks from "@/components/ui/RelatedLinks";
import DeviceDecisionTool from "@/components/decision-tool/DeviceDecisionTool";
import styles from "../subpage.module.css";
import { getDecisionRules } from "@/lib/campaign-data";

export const metadata: Metadata = {
  title: "What Should I Do With This Device? | Decision Matrix",
  description:
    "An interactive diagnostic tool to evaluate your electronic hardware: discover whether to continue using, repair, reuse, donate, recycle, or seek professional battery handling.",
};

export default function DeviceDecisionPage() {
  const decisionRules = getDecisionRules();

  const getOutcomeIcon = (id: string) => {
    switch (id) {
      case "seek-professional-battery-handling":
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-warning)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z"/>
          </svg>
        );
      case "continue-using-it":
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-acid)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <polyline points="9 12 11 14 15 10"/>
          </svg>
        );
      case "repair-it":
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-acid)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
          </svg>
        );
      case "reuse-it-for-another-purpose":
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-tech)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
        );
      case "donate-or-give-it-away":
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-acid)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 12 20 22 4 22 4 12"/>
            <rect x="2" y="7" width="20" height="5"/>
            <line x1="12" y1="22" x2="12" y2="7"/>
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
          </svg>
        );
      case "recycle-it-through-an-appropriate-facility":
      default:
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-warning)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="7 10 12 15 17 10"/>
            <path d="M12 15V3"/>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          </svg>
        );
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <PageIntro
        category="Interactive Diagnostic Tool"
        topicCode="DECISION_FRAMEWORK"
        title="What Should I Do With This Device?"
        description="Diagnostic triage for retired electronics. Answer seven rapid symptom checks to receive an objective, circular recommendation based on hardware feasibility, battery safety, and software support."
        breadcrumbs={[{ label: "DEVICE DECISION TOOL", href: "/device-decision" }]}
      />

      <div className={`container ${styles.contentWrapper}`}>
        {/* Interactive Decision Tool Component */}
        <DeviceDecisionTool decisionRules={decisionRules} />

        {/* Visual Battery Diagnostic Aid */}
        <TechnicalFigure
          src="/images/battery-swelling-spotter.svg"
          alt="Visual diagnostic infographic showing the 3 progression stages of lithium-ion battery swelling: normal flat cell, early stage 1 pillowing lifting screens or trackpads, and stage 2 severe hazardous pouch expansion"
          captionTitle="VISUAL DIAGNOSIS // 3 STAGES OF LITHIUM-ION BATTERY SWELLING"
          captionDescription="Not all battery failures cause smoke. Watch for early mechanical indicators like stiff trackpads, popped screen bezels, or uneven laptop footing before internal pressure breaches the pouch."
          badge="DIAGNOSTIC SPOTTER // BATTERY HEALTH"
          variant="warning"
          width={800}
          height={460}
        />

        {/* Safety Disclaimer Banner */}
        <WarningCallout
          label="SAFETY & ADVISORY NOTICE"
          title="Non-Professional Educational Guidance"
        >
          <p>
            Educational guidance based on community electronics stewardship. If any electronic device exhibits an actively smoking, hissing, or overheating battery, immediately evacuate the area and contact local emergency services.
          </p>
        </WarningCallout>

        {/* The Circular Hierarchy Explained */}
        <section>
          <SectionHeading
            index="01"
            title="The Hierarchy of Hardware Outcomes"
            description="Six circular destinations categorized by ecological priority and hardware feasibility."
          />

          <div className={styles.gridTwoCol}>
            {decisionRules.map((rule) => (
              <InfoCard
                key={rule.id}
                variant={rule.variant}
                tag={rule.badge}
                title={rule.title}
              >
                <div className={styles.cardIconRow}>
                  <div
                    className={`${styles.cardIcon} ${
                      rule.variant === "warning"
                        ? styles.cardIconWarning
                        : rule.variant === "tech"
                        ? styles.cardIconTech
                        : ""
                    }`}
                  >
                    {getOutcomeIcon(rule.id)}
                  </div>
                </div>
                <p>{rule.summary}</p>
                <div className={styles.cardSectionTitle}>Why This Path Matters:</div>
                <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
                  {rule.whySelected}
                </p>
              </InfoCard>
            ))}
          </div>
        </section>

        {/* How to Evaluate Repair Quotes */}
        <section>
          <SectionHeading
            index="02"
            title="Evaluating Repair Quotes: The 50% Rule"
            description="If a repair costs under 50% to 60% of an equivalent refurbished model, repairing is the superior financial and ecological choice."
          />

          <div className={styles.gridTwoCol}>
            <div className={styles.pipelineCard}>
              <div className={styles.pipelineHeader}>
                <span className={styles.roiBadgePositive}>HIGH ROI // 100% LIFE RESTORE</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--color-accent-acid)" }}>
                  ₱2,000 – ₱4,000
                </span>
              </div>
              <h4 className={styles.pipelineTitle}>Battery Replacement</h4>
              <p className={styles.pipelineText}>
                Almost always worth it. A fresh cell doubles daily portability on a ₱35,000–₱60,000 phone or laptop, resetting mechanical cycle life.
              </p>
            </div>

            <div className={styles.pipelineCard}>
              <div className={styles.pipelineHeader}>
                <span className={styles.roiBadgePositive}>HIGH ROI // DISPLAY RESTORE</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--color-accent-acid)" }}>
                  ₱4,000 – ₱9,000
                </span>
              </div>
              <h4 className={styles.pipelineTitle}>Cracked Glass & Screen</h4>
              <p className={styles.pipelineText}>
                Highly economical if the motherboard and silicon fulfill your daily workflows. Avoids discarding 90% of working hardware for shattered glass.
              </p>
            </div>

            <div className={styles.pipelineCard}>
              <div className={styles.pipelineHeader}>
                <span className={styles.roiBadgePositive}>5X SPEED // ESSENTIAL UPGRADE</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--color-accent-acid)" }}>
                  ₱1,500 – ₱3,000
                </span>
              </div>
              <h4 className={styles.pipelineTitle}>SSD Storage Swap</h4>
              <p className={styles.pipelineText}>
                Swapping a sluggish mechanical hard drive for a modern Solid State Drive (SSD) delivers an instant 5x speed boost on older laptops and desktops.
              </p>
            </div>

            <div className={styles.pipelineCard}>
              <div className={styles.pipelineHeader}>
                <span className={styles.roiBadgeWarning}>LOW ROI // HARVEST & RECYCLE</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--color-accent-warning)" }}>
                  ₱15,000+
                </span>
              </div>
              <h4 className={styles.pipelineTitle}>Motherboard Micro-Soldering</h4>
              <p className={styles.pipelineText}>
                Liquid corrosion across multi-layer logic boards often exceeds replacement value. Harvest working RAM, SSD, and display, then recycle the chassis.
              </p>
            </div>
          </div>
        </section>

        {/* Campaign Call to Action */}
        <CampaignCTA
          heading="Have an idle laptop or smartphone waiting in a drawer?"
          description="Use this interactive tool anytime you are unsure whether an aging gadget can be repaired, donated to a student, or safely recycled."
        />

        {/* Related Links */}
        <RelatedLinks
          title="Recommended Next Steps"
          links={[
            {
              tag: "Security Guide",
              title: "Protect Your Data",
              description: "Follow our 8-stage interactive sanitization checklist before donating or handing over your device.",
              href: "/data-safety",
            },
            {
              tag: "Disposal Protocol",
              title: "Safe Electronic Disposal",
              description: "Review battery safety handling and the critical questions to ask an e-waste recycler.",
              href: "/safe-disposal",
            },
            {
              tag: "Maintenance Manual",
              title: "Extend Your Device’s Life",
              description: "Learn practical everyday phone and laptop care habits to prevent future hardware breakdowns.",
              href: "/extend-device-life",
            },
          ]}
        />
      </div>
    </div>
  );
}

