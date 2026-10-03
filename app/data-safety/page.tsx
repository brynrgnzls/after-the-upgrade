import type { Metadata } from "next";
import PageIntro from "@/components/ui/PageIntro";
import SectionHeading from "@/components/ui/SectionHeading";
import InfoCard from "@/components/ui/InfoCard";
import WarningCallout from "@/components/ui/WarningCallout";
import TechnicalFigure from "@/components/ui/TechnicalFigure";
import CampaignCTA from "@/components/ui/CampaignCTA";
import RelatedLinks from "@/components/ui/RelatedLinks";
import DataSafetyChecklist from "@/components/campaign/DataSafetyChecklist";
import styles from "../subpage.module.css";
import { getDataSafetyChecklist } from "@/lib/campaign-data";

export const metadata: Metadata = {
  title: "Protect Your Data | Interactive Sanitization Checklist",
  description:
    "A practical, step-by-step checklist to securely back up personal files, sign out of cloud accounts, disable tracking locks, and cryptographically sanitize devices before donation or recycling.",
};

const TELEMETRY_METRICS = [
  { value: "CRYPTO-ERASE", label: "Master Hardware Key Destruction" },
  { value: "NIST 800-88", label: "Media Sanitization Standard" },
  { value: "100% UNLINKED", label: "Cloud & Anti-Theft Decoupling" },
  { value: "ZERO RESIDUAL", label: "Recirculation Security Protocol" },
];

const OS_SHORTCUTS = [
  {
    platform: "Apple (iOS / macOS)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
        <path d="M10 2c1 .5 2 2 2 5" />
      </svg>
    ),
    shortcut: "Settings > General > Transfer or Reset",
    desc: "Select Erase All Content and Settings to incinerate Secure Enclave keys.",
  },
  {
    platform: "Google (Android / ChromeOS)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M7 8V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" />
        <circle cx="9" cy="13" r="1" fill="currentColor" />
        <circle cx="15" cy="13" r="1" fill="currentColor" />
      </svg>
    ),
    shortcut: "Settings > Accounts > Remove, then Reset Options",
    desc: "Unlink Google Account first to avoid permanent Factory Reset Protection (FRP) lockout.",
  },
  {
    platform: "Microsoft (Windows 10/11)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="8" height="8" x="3" y="3" rx="1" />
        <rect width="8" height="8" x="13" y="3" rx="1" />
        <rect width="8" height="8" x="3" y="13" rx="1" />
        <rect width="8" height="8" x="13" y="13" rx="1" />
      </svg>
    ),
    shortcut: "Settings > System > Recovery > Reset this PC",
    desc: "Select 'Remove everything' and 'Fully clean the drive' for cryptographic sector wipe.",
  },
];

const VERIFICATION_PIPELINE = [
  {
    step: "01",
    title: "Welcome Display Check",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="18" height="14" x="3" y="3" rx="2" />
        <path d="M7 8h10" />
        <path d="M7 12h6" />
        <path d="M12 17v4" />
        <path d="M8 21h8" />
      </svg>
    ),
    text: "Device reboots to the initial out-of-the-box setup screen ('Hello' or 'Select Region'). Zero prompts for prior PIN, Apple ID, or Google password.",
  },
  {
    step: "02",
    title: "Zero Setup Configuration",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
    ),
    text: "Do NOT connect to local Wi-Fi, create a dummy profile, or complete setup. Leave the operating system in its pristine out-of-box state.",
  },
  {
    step: "03",
    title: "Hard Shutdown Handover",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
        <line x1="12" y1="2" x2="12" y2="12" />
      </svg>
    ),
    text: "Hold down the physical power button until screen shuts off completely. The device is now verified clean, safe, and ready for donation or recycling.",
  },
];

export default function DataSafetyPage() {
  const checklistData = getDataSafetyChecklist();

  return (
    <div className={styles.pageWrapper}>
      <PageIntro
        category="Security & Privacy Field Guide"
        topicCode="DATA_SANITIZATION_MANUAL"
        title="Protect Your Data"
        description="Don't let data fears keep functional hardware idling in storage. Follow cryptographic sanitization protocols to donate, trade, or recycle electronics with total peace of mind."
        breadcrumbs={[{ label: "DATA SAFETY", href: "/data-safety" }]}
      />

      <div className={`container ${styles.contentWrapper}`}>
        {/* Security Telemetry Metric Strip */}
        <div className={styles.statRow} role="region" aria-label="Data Sanitization Standards">
          {TELEMETRY_METRICS.map((metric) => (
            <div key={metric.value} className={styles.statBadge}>
              <span className={styles.statValue}>{metric.value}</span>
              <span className={styles.statLabel}>{metric.label}</span>
            </div>
          ))}
        </div>

        {/* Operating System Quick-Nav Matrix */}
        <div className={styles.pipelineGrid} style={{ marginTop: "0.5rem" }}>
          {OS_SHORTCUTS.map((item) => (
            <div key={item.platform} className={styles.pipelineCard}>
              <div className={styles.pipelineHeader}>
                <span className={styles.cardTagTitle}>
                  <span className={styles.cardIconTech}>{item.icon}</span>
                  {item.platform}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  color: "var(--color-accent-acid)",
                  background: "var(--color-surface)",
                  padding: "0.35rem 0.5rem",
                  borderRadius: "var(--radius-xs)",
                  border: "1px solid var(--color-border)",
                }}
              >
                {item.shortcut}
              </div>
              <p className={styles.pipelineText} style={{ fontSize: "0.85rem", margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Critical Cloud Sync Warning & Diagram */}
        <WarningCallout
          label="TWO-WAY SYNC HAZARD"
          title="Manual Trash Deletion Destroys Cloud Backups"
        >
          <p>
            <strong>Never drag files to Trash while signed into iCloud, Google Drive, or OneDrive.</strong> Because modern drives sync bidirectionally, local deletions immediately wipe files across all your connected phones, tablets, and cloud vaults.
          </p>
          <p style={{ marginTop: "0.4rem" }}>
            Always sign out first, or execute a <strong>Factory Data Reset</strong>—which wipes local sectors without sending delete commands to remote storage.
          </p>
        </WarningCallout>

        <TechnicalFigure
          src="/images/cloud-sync-hazard-flow.svg"
          alt="Two-way cloud synchronization hazard diagram contrasting manual file deletion versus cryptographic device decoupling"
          captionTitle="CLOUD SYNCHRONIZATION // MANUAL TRASH PURGE VS. LOCAL DECOUPLING"
          captionDescription="Manual file deletion syncs upstream, purging cloud backups and connected devices. Factory Reset breaks the sync token and incinerates local keys while preserving remote storage."
          badge="DATA PRESERVATION // RFC 6749"
          variant="warning"
          width={800}
          height={390}
        />

        {/* Interactive Client Component: 8-Stage Sanitization Checklist */}
        <DataSafetyChecklist checklistData={checklistData} />

        {/* Static Deep Dive: Emptying Trash vs Cryptographic Erasure */}
        <section>
          <SectionHeading
            index="01"
            title="The Technical Reality: Trash vs. Cryptographic Wiping"
            description="Why clicking 'Delete' leaves 100% of raw data intact—and how hardware cryptography renders it permanently unreadable."
          />

          <TechnicalFigure
            src="/images/trash-vs-crypto-wipe.svg"
            alt="Technical comparison flowchart showing Method A (Standard OS delete leaving raw NAND flash data recoverable) versus Method B (Cryptographic erase destroying master keys in TPM or Secure Enclave)"
            captionTitle="CRYPTOGRAPHIC FIELD GUIDE // OS POINTER REMOVAL VS. HARDWARE KEY SANITIZATION"
            captionDescription="Standard OS deletion merely clears directory pointers; raw files remain readable on NAND chips. Hardware Factory Reset destroys the master cryptographic key—mathematically scrambling past data into unrecoverable noise."
            badge="SECURITY PROTOCOL // NIST 800-88"
            variant="blueprint"
            width={800}
            height={440}
          />

          <div className={styles.gridTwoCol}>
            <InfoCard
              variant="warning"
              tag="The Vulnerability"
              title="Why Operating System 'Delete' Fails"
            >
              <div className={styles.cardIconRow}>
                <span className={styles.cardTagTitle}>Index Pointer Removal Only</span>
                <div className={`${styles.cardIcon} ${styles.cardIconWarning}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </div>
              </div>
              <p>
                Emptying the Recycle Bin only removes file index pointers from the Master File Table. Documents, credentials, and tax returns remain readable on storage sectors until overwritten weeks later—easily reconstructed with free forensic tools.
              </p>
            </InfoCard>

            <InfoCard
              variant="highlight"
              tag="The Standard"
              title="How Cryptographic Erasure Works"
            >
              <div className={styles.cardIconRow}>
                <span className={styles.cardTagTitle}>Master Key Incineration</span>
                <div className={styles.cardIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <circle cx="12" cy="10" r="3" />
                    <path d="M12 13v4" />
                    <path d="M8 12h.01" />
                    <path d="M16 12h.01" />
                  </svg>
                </div>
              </div>
              <p>
                Modern devices encrypt storage blocks by default with an internal AES key held in the Secure Enclave or TPM. Factory Reset destroys this master key instantaneously—rendering all underlying data mathematically irreversible noise.
              </p>
            </InfoCard>
          </div>
        </section>

        {/* Static Deep Dive: Disabling Activation Locks */}
        <section>
          <SectionHeading
            index="02"
            title="Disabling Anti-Theft Activation Locks"
            description="The #1 cause of donated computers becoming landfill scrap: unreleased cloud credentials."
          />

          <TechnicalFigure
            src="/images/activation-lock-guide.svg"
            alt="Activation lock disassociation flowchart showing locked failure pathway versus decoupled circular reuse pathway"
            captionTitle="OWNERSHIP TRANSFER PROTOCOL // ACTIVATION LOCK DISASSOCIATION"
            captionDescription="Resetting hardware without decoupling Apple ID or Google FRP permanently locks devices to prior credentials. Unlinking accounts prior to reset enables seamless recirculation."
            badge="CIRCULAR STANDARD // ZERO-BRICK"
            variant="blueprint"
            width={800}
            height={390}
          />

          <div className={styles.gridTwoCol}>
            <InfoCard
              variant="tech"
              tag="Apple Ecosystem"
              title="Apple Activation Lock & Find My"
            >
              <div className={styles.cardIconRow}>
                <span className={styles.cardTagTitle}>iCloud ID Decoupling</span>
                <div className={`${styles.cardIcon} ${styles.cardIconTech}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
              </div>
              <p>
                Resetting an iPhone, Mac, or iPad without signing out of Apple ID locks the machine to your credentials. Confirm the device is delinked and removed at <code>iCloud.com/find</code> before handover.
              </p>
            </InfoCard>

            <InfoCard
              variant="tech"
              tag="Google Ecosystem"
              title="Factory Reset Protection (FRP)"
            >
              <div className={styles.cardIconRow}>
                <span className={styles.cardTagTitle}>Account Removal Step</span>
                <div className={`${styles.cardIcon} ${styles.cardIconTech}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="17" y1="11" x2="23" y2="11" />
                  </svg>
                </div>
              </div>
              <p>
                Android devices trigger FRP if reset via hardware buttons rather than Settings, demanding your password to boot. Always navigate to <strong>Settings &gt; Accounts &gt; Remove Account</strong> prior to initiating the wipe.
              </p>
            </InfoCard>
          </div>
        </section>

        {/* Static Verification Guide: 3-Stage Handover Pipeline */}
        <section>
          <SectionHeading
            index="03"
            title="Handover Verification Protocol"
            description="A 60-second inspection sequence to guarantee your device is ready for the next recipient."
          />

          <div className={styles.pipelineGrid}>
            {VERIFICATION_PIPELINE.map((item) => (
              <div key={item.step} className={styles.pipelineCard}>
                <div className={styles.pipelineHeader}>
                  <span className={styles.pipelineStepNum}>STAGE {item.step}</span>
                  <span className={styles.cardIconTech}>{item.icon}</span>
                </div>
                <h3 className={styles.pipelineTitle}>{item.title}</h3>
                <p className={styles.pipelineText}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Campaign Call to Action */}
        <CampaignCTA
          heading="Clean, safe, and ready for its second life."
          description="Donate verified hardware to local schools, pass it to community learners, or drop it off at certified zero-landfill recyclers."
        />

        {/* Related Links */}
        <RelatedLinks
          title="Recommended Next Steps"
          links={[
            {
              tag: "Decision Flow",
              title: "What Should I Do With This Device?",
              description: "Use our interactive diagnostic tool to confirm whether donation, repair, or recycling is ideal.",
              href: "/device-decision",
            },
            {
              tag: "Safety Protocol",
              title: "Safe Electronic Disposal",
              description: "Learn how to prepare batteries for transport and what questions to ask e-waste recyclers.",
              href: "/safe-disposal",
            },
            {
              tag: "Community Action",
              title: "Take Action & Pledge",
              description: "Commit to never throwing personal devices away without verified cryptographic sanitization.",
              href: "/take-action",
            },
          ]}
        />
      </div>
    </div>
  );
}
