import type { Metadata } from "next";
import PageIntro from "@/components/ui/PageIntro";
import SectionHeading from "@/components/ui/SectionHeading";
import InfoCard from "@/components/ui/InfoCard";
import CampaignCTA from "@/components/ui/CampaignCTA";
import RelatedLinks from "@/components/ui/RelatedLinks";
import styles from "../subpage.module.css";
import { getActionChecklist, getTakeActionItems } from "@/lib/campaign-data";
import TakeActionInteractive from "@/components/take-action/TakeActionInteractive";

export const metadata: Metadata = {
  title: "Take Action and Make a Pledge | After the Upgrade",
  description:
    "Take the personal e-waste action checklist, track your local device stewardship progress, and sign the community advocacy pledge.",
};

const TELEMETRY_METRICS = [
  { value: "100% CLIENT-SIDE", label: "IndexedDB Local Engine" },
  { value: "0 TRACKERS", label: "Zero Remote Data Transmission" },
  { value: "4 PILLARS", label: "Audit, Repair, Wipe, Return" },
  { value: "COMMUNITY PLEDGE", label: "Circular Hardware Standard" },
];

const COMMUNITY_PLEDGES = [
  {
    title: "The Diagnostic Before Replacement Pledge",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    description: "I commit to testing battery health, checking thermal vents, or reinstalling the OS before buying new hardware.",
  },
  {
    title: "The Zero-Landfill Battery Pledge",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="16" height="10" x="2" y="7" rx="2" />
        <line x1="22" x2="22" y1="11" y2="13" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    ),
    description: "I commit to never tossing lithium batteries or electronics into municipal curbside trash or general recycling bins.",
  },
  {
    title: "The Cryptographic Sanitization Pledge",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1" />
      </svg>
    ),
    description: "I commit to destroying hardware encryption keys and releasing activation locks so working devices can safely empower learners.",
  },
  {
    title: "The Annual Drawer Audit Pledge",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="8" x="2" y="3" rx="2" />
        <rect width="20" height="8" x="2" y="13" rx="2" />
        <line x1="10" x2="14" y1="7" y2="7" />
        <line x1="10" x2="14" y1="17" y2="17" />
      </svg>
    ),
    description: "I commit to clearing storage drawers annually to return idle electronics into active circulation before batteries degrade.",
  },
];

function getAudienceIcon(audience: string) {
  const lower = audience.toLowerCase();
  if (lower.includes("student")) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    );
  }
  if (lower.includes("laborator") || lower.includes("school")) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 3v12a3 3 0 0 0 6 0V3" />
        <path d="M6 3h12" />
        <line x1="8" y1="10" x2="16" y2="10" />
      </svg>
    );
  }
  if (lower.includes("office") || lower.includes("business")) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="16" height="20" x="4" y="2" rx="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
      </svg>
    );
  }
  if (lower.includes("famil")) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    );
  }
  if (lower.includes("enthusiast")) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="14" height="20" x="5" y="2" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

export default function TakeActionPage() {
  const checklists = getActionChecklist();
  const takeActionItems = getTakeActionItems();

  return (
    <div className={styles.pageWrapper}>
      <PageIntro
        category="Community Mobilization"
        topicCode="ACTION_AND_PLEDGE"
        title="Take Action and Make a Pledge"
        description="Individual stewardship scales into systemic circular impact. Complete your personal action checklist, log progress locally in your browser, and sign the community advocacy pledge."
        breadcrumbs={[{ label: "TAKE ACTION", href: "/take-action" }]}
      />

      <div className={`container ${styles.contentWrapper}`}>
        {/* Telemetry Metric Strip */}
        <div className={styles.statRow} role="region" aria-label="Action Framework Metrics">
          {TELEMETRY_METRICS.map((metric) => (
            <div key={metric.value} className={styles.statBadge}>
              <span className={styles.statValue}>{metric.value}</span>
              <span className={styles.statLabel}>{metric.label}</span>
            </div>
          ))}
        </div>

        {/* Interactive Checklist & Local IndexedDB Hub */}
        <section>
          <SectionHeading
            index="01"
            title="Interactive E-Waste Stewardship Hub"
            description="Track personal sustainability challenges, earn ranks, and commit to the local community pledge."
          />

          <TakeActionInteractive items={takeActionItems} />
        </section>

        {/* Core Principles Callout */}
        <section>
          <SectionHeading
            index="02"
            title="The Four Community Commitments"
            description="Foundational principles every consumer, educator, and workplace can adopt immediately."
          />

          <div className={styles.gridTwoCol}>
            {COMMUNITY_PLEDGES.map((pledge, idx) => (
              <InfoCard
                key={pledge.title}
                variant={idx === 0 ? "highlight" : idx === 1 ? "warning" : idx === 2 ? "tech" : "default"}
                tag={`COMMITMENT_0${idx + 1}`}
                title={pledge.title}
              >
                <div className={styles.cardIconRow}>
                  <span className={styles.cardTagTitle}>Standard Protocol</span>
                  <div className={`${styles.cardIcon} ${idx === 1 ? styles.cardIconWarning : styles.cardIconTech}`}>
                    {pledge.icon}
                  </div>
                </div>
                <p>{pledge.description}</p>
              </InfoCard>
            ))}
          </div>
        </section>

        {/* Action Checklists by Role */}
        <section>
          <SectionHeading
            index="03"
            title="Targeted Playbooks by Community Role"
            description="Tailored interventions for students, academic labs, enterprise offices, and gadget owners."
          />

          <div className={styles.gridTwoCol}>
            {checklists.map((item) => (
              <InfoCard
                key={item.id}
                tag={item.targetAudience}
                title={item.title}
              >
                <div className={styles.cardIconRow} style={{ marginBottom: "0.25rem" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: "var(--color-accent-tech)",
                      textTransform: "uppercase",
                    }}
                  >
                    {getAudienceIcon(item.targetAudience)}
                    {item.targetAudience}
                  </span>
                </div>
                <p>{item.description}</p>
                <div style={{ marginTop: "auto", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                  <span>{item.category.toUpperCase()}</span>
                  <span style={{ color: "var(--color-accent-acid)" }}>{item.impactLevel.replace(/-/g, " ").toUpperCase()}</span>
                </div>
              </InfoCard>
            ))}
          </div>
        </section>

        <CampaignCTA />

        <RelatedLinks
          links={[
            {
              tag: "Social Assets",
              title: "Social Media Campaign Toolkit",
              description: "Amplify the campaign message across your personal and institutional networks.",
              href: "/toolkit",
            },
            {
              tag: "Evaluation Flow",
              title: "Device Decision Matrix",
              description: "Determine the ideal circular outcome for any hardware currently in your possession.",
              href: "/device-decision",
            },
            {
              tag: "Safety Protocol",
              title: "Safe Electronic Disposal",
              description: "Review battery and display handling rules before drop-off.",
              href: "/safe-disposal",
            },
          ]}
        />
      </div>
    </div>
  );
}
