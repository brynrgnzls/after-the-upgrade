import type { Metadata } from "next";
import PageIntro from "@/components/ui/PageIntro";
import CampaignCTA from "@/components/ui/CampaignCTA";
import RelatedLinks from "@/components/ui/RelatedLinks";
import styles from "../subpage.module.css";
import { getCampaignToolkitData, getCampaignInfo } from "@/lib/campaign-data";
import ToolkitInteractive from "@/components/toolkit/ToolkitInteractive";

export const metadata: Metadata = {
  title: "Campaign Toolkit & Social Assets | After the Upgrade",
  description:
    "Ready-to-share social captions, story messages, official hashtag bundles, poster headlines, a seven-day campaign calendar, classroom prompts, and offline activities.",
};

export default function ToolkitPage() {
  const toolkitData = getCampaignToolkitData();
  const campaign = getCampaignInfo();

  return (
    <div className={styles.pageWrapper}>
      <PageIntro
        category="Advocacy Resources"
        topicCode="MEDIA_TOOLKIT"
        title="Campaign Toolkit & Advocacy Assets"
        description="Amplify the message. Access copy-ready captions, hashtag groups, display headlines, an interactive seven-day campaign calendar, classroom prompts, and offline workshop guides for your school or organization."
        breadcrumbs={[{ label: "TOOLKIT", href: "/toolkit" }]}
      />

      <div className={`container ${styles.contentWrapper}`}>
        {/* Core Slogan Reference */}
        <div className={styles.editorialCallout}>
          <div className={styles.editorialCalloutTitle}>ANCHOR SLOGANS</div>
          <p className={styles.editorialCalloutText}>
            <strong>Main Campaign Message:</strong> “{campaign.mainMessage}”
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--color-accent-acid)", fontWeight: 700, marginTop: "0.4rem" }}>
            <strong>Campaign Slogan:</strong> “{campaign.slogan}”
          </p>
        </div>

        {/* Complete Interactive Toolkit */}
        <ToolkitInteractive data={toolkitData} />


        <CampaignCTA />

        <RelatedLinks
          links={[
            {
              tag: "Community",
              title: "Take Action & Pledge",
              description: "Review checklists and commit to our circular hardware principles.",
              href: "/take-action",
            },
            {
              tag: "About",
              title: "About the Campaign",
              description: "Learn about our founding mission, vision, and advocacy pillars.",
              href: "/about",
            },
            {
              tag: "Home",
              title: "Return to Campaign Homepage",
              description: "Explore the core pillars and device decision matrix.",
              href: "/",
            },
          ]}
        />
      </div>
    </div>
  );
}
