import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";
import {
  getCampaignInfo,
  getLearningTopics,
  getDeviceDecisions,
} from "@/lib/campaign-data";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import InfoCard from "@/components/ui/InfoCard";
import TechnicalFigure from "@/components/ui/TechnicalFigure";
import CampaignCTA from "@/components/ui/CampaignCTA";

export const metadata: Metadata = {
  title: "Home | After the Upgrade",
  description:
    "A gadget’s usefulness should not end when you upgrade. Repair it. Reuse it. Return it responsibly. An advocacy campaign for sustainable technology consumption.",
};

export default function HomePage() {
  const campaign = getCampaignInfo();
  const topics = getLearningTopics().slice(0, 3);
  const decisions = getDeviceDecisions().slice(0, 3);

  return (
    <div>
      {/* Compact First-Viewport Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroContent}>
            <div className={styles.heroTracker}>
              <span>SUSTAINABLE HARDWARE ADVOCACY INITIATIVE 2026</span>
            </div>

            <div className={styles.heroTitleGroup}>
              <span className={styles.heroCampaignName}>{campaign.name}</span>
              <h1 className={styles.heroHeadline}>
                “{campaign.mainMessage}”
              </h1>
              <p className={styles.heroSlogan}>
                Campaign Slogan: “{campaign.slogan}”
              </p>
            </div>

            <p className={styles.heroExplanation}>
              Every year, over 60 million tons of electronics are discarded prematurely. We champion practical hardware repair, creative device repurposing, and certified toxic-free recycling.
            </p>

            {/* Fast Visual Metrics Strip */}
            <div className={styles.metricsStrip}>
              <div className={styles.metricPill}>
                <span className={styles.metricValue}>62M Tons</span>
                <span className={styles.metricLabel}>Global E-Waste / Year</span>
              </div>
              <div className={styles.metricPill}>
                <span className={styles.metricValue}>80% Carbon</span>
                <span className={styles.metricLabel}>In Production Phase</span>
              </div>
              <div className={styles.metricPill}>
                <span className={styles.metricValue}>40x Richer</span>
                <span className={styles.metricLabel}>PCBs vs. Virgin Ore</span>
              </div>
              <div className={styles.metricPill}>
                <span className={styles.metricValue}>2x Lifespan</span>
                <span className={styles.metricLabel}>With Routine Care</span>
              </div>
            </div>

            <div className={styles.heroActions}>
              <Button href="/device-decision" variant="primary">
                Evaluate An Aging Device →
              </Button>
              <Button href="/e-waste-problem" variant="secondary">
                The E-Waste Crisis
              </Button>
              <Button href="/extend-device-life" variant="ghost">
                Device Care Tips
              </Button>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <Image
              src="/images/hero-exploded-tech.jpg"
              alt="Cinematic macro photograph of an exploded-view modular laptop and smartphone revealing internal battery, copper heat pipe, logic board, and torx screws"
              width={640}
              height={480}
              priority
              unoptimized
              className={styles.heroVisualImg}
            />
            <div className={styles.heroVisualHud}>
              <span className={styles.heroVisualBadge}>
                <span>●</span> MODULAR HARDWARE ARCHITECTURE
              </span>
              <span>TORX T5 FASTENERS • REPAIRABLE SILICON</span>
            </div>
          </div>
        </div>
      </section>

      {/* Three Campaign Actions */}
      <section className={styles.section}>
        <div className="container">
          <SectionHeading
            index="01"
            title="Three Core Campaign Actions"
            description="The foundational hierarchy to practice whenever hardware begins showing signs of age."
          />

          <div className={styles.actionsGrid}>
            {campaign.campaignActions.map((actionItem) => {
              const isRepair = actionItem.action === "Repair";
              const isReuse = actionItem.action === "Reuse";

              return (
                <div key={actionItem.action} className={styles.actionCard}>
                  <div className={styles.actionCardHeader}>
                    <div className={styles.actionHeader}>
                      <span className={styles.actionTag}>[{actionItem.tag}]</span>
                      <h2 className={styles.actionTitle}>{actionItem.action}</h2>
                    </div>

                    <div
                      className={`${styles.actionIconBox} ${
                        isReuse ? styles.actionIconBoxTech : !isRepair ? styles.actionIconBoxWarning : ""
                      }`}
                      aria-hidden="true"
                    >
                      {isRepair && (
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                        </svg>
                      )}
                      {isReuse && (
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                          <rect x="8" y="8" width="8" height="8" rx="1.5" />
                        </svg>
                      )}
                      {!isRepair && !isReuse && (
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          <path d="M9 12l2 2 4-4" />
                        </svg>
                      )}
                    </div>
                  </div>

                  <p className={styles.actionSummary}>{actionItem.summary}</p>

                  <div>
                    <ul className={styles.actionPracticesList}>
                      {actionItem.keyPractices.map((practice, idx) => (
                        <li key={idx} className={styles.actionPracticeItem}>
                          {practice}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.actionLinkRow}>
                    <Button href={actionItem.route} variant="ghost" style={{ paddingLeft: 0, justifyContent: "flex-start" }}>
                      {actionItem.actionLabel} →
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visual Infographic Feature: Urban Mining Ratios */}
      <section className={styles.section} style={{ backgroundColor: "var(--color-surface)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container">
          <SectionHeading
            index="02"
            title="The Hidden Power of Hardware Recovery"
            description="Comparing 1 ton of raw geological ore against 1 ton of discarded circuit boards."
          />

          <TechnicalFigure
            src="/images/urban-mining-comparison.svg"
            alt="Comparative infographic illustrating resource yields from 1 metric ton of geological ore versus 1 metric ton of discarded circuit boards"
            captionTitle="CIRCULAR ECONOMY METRIC: ORE MINING VS. CIRCUIT BOARD HARVEST"
            captionDescription="One metric ton of printed circuit boards yields up to 300g of gold and 100kg of copper—surpassing the mineral density of natural geological ore by a factor of 40 to 80 while bypassing devastating surface extraction."
            badge="RESOURCE DATA: URBAN MINING RATIOS"
            variant="blueprint"
            width={800}
            height={460}
          />

          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <Button href="/e-waste-problem" variant="secondary">
              Explore The Complete E-Waste Analysis →
            </Button>
          </div>
        </div>
      </section>

      {/* Educational Topics Preview */}
      <section className={styles.section}>
        <div className="container">
          <SectionHeading
            index="03"
            title="Core Educational Briefings"
            description="Essential knowledge modules addressing planned obsolescence, toxic elements, and hardware care."
          />

          <div className={styles.topicsPreviewGrid}>
            {topics.map((topic) => (
              <InfoCard
                key={topic.id}
                variant={topic.category === "environmental-impact" ? "warning" : "tech"}
                tag={topic.category.replace(/-/g, " ")}
                title={topic.title}
                actionHref="/e-waste-problem"
                actionLabel="Read Analysis"
              >
                <p>{topic.summary}</p>
              </InfoCard>
            ))}
          </div>
        </div>
      </section>

      {/* Decision Tool Preview */}
      <section className={styles.section} style={{ backgroundColor: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
        <div className="container">
          <SectionHeading
            index="04"
            title="The Device Decision Framework"
            description="Take the guesswork out of aging hardware with our structured diagnostic rubric."
          />

          <div className={styles.decisionPreviewContainer}>
            <div className={styles.decisionPreviewHeader}>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--color-text-primary)" }}>
                  Sample Hardware Decision Paths
                </h3>
                <p style={{ fontSize: "0.95rem", color: "var(--color-text-secondary)", marginTop: "0.25rem" }}>
                  Match symptoms to find the ideal circular outcome:
                </p>
              </div>
              <Button href="/device-decision" variant="primary">
                Open Complete Decision Tool →
              </Button>
            </div>

            <div className={styles.decisionCardsGrid}>
              {decisions.map((item) => (
                <div key={item.id} className={styles.decisionMiniCard}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span
                      className={`${styles.decisionBadge} ${
                        item.recommendedAction === "Repair"
                          ? styles.decisionBadgeRepair
                          : item.recommendedAction === "Reuse"
                          ? styles.decisionBadgeReuse
                          : item.recommendedAction === "Donate"
                          ? styles.decisionBadgeDonate
                          : styles.decisionBadgeRecycle
                      }`}
                    >
                      RECOMMENDED: {item.recommendedAction.toUpperCase()}
                    </span>
                  </div>
                  <div className={styles.decisionCondition}>
                    Device: {item.deviceType}
                  </div>
                  <p className={styles.decisionAdvice}>{item.actionSummary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final Community Pledge Call-to-Action */}
      <section className={styles.sectionCompact} style={{ borderTop: "1px solid var(--color-border)" }}>
        <div className="container">
          <CampaignCTA
            heading="Join the movement: A gadget’s usefulness should not end when you upgrade."
            description="Make the community commitment today. Learn practical maintenance, keep hazardous batteries out of curbside bins, and pass functioning hardware to learners who need it."
          />
        </div>
      </section>
    </div>
  );
}
