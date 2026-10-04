import type { Metadata } from "next";
import PageIntro from "@/components/ui/PageIntro";
import SectionHeading from "@/components/ui/SectionHeading";
import InfoCard from "@/components/ui/InfoCard";
import TechnicalFigure from "@/components/ui/TechnicalFigure";
import CampaignCTA from "@/components/ui/CampaignCTA";
import RelatedLinks from "@/components/ui/RelatedLinks";
import styles from "../subpage.module.css";
import { getCampaignInfo } from "@/lib/campaign-data";

export const metadata: Metadata = {
  title: "About the Campaign | After the Upgrade",
  description:
    "Discover After the Upgrade: our mission, core operating principles, and how communities lead the circular hardware movement.",
};

export default function AboutPage() {
  const campaign = getCampaignInfo();

  return (
    <div className={styles.pageWrapper}>
      <PageIntro
        category="Advocacy Briefing"
        topicCode="CAMPAIGN OVERVIEW"
        title="About “After the Upgrade”"
        description="Challenging disposable tech culture. We champion hardware repair, creative reuse, and verified e-waste recovery."
        breadcrumbs={[{ label: "ABOUT THE CAMPAIGN", href: "/about" }]}
      />

      <div className={`container ${styles.contentWrapper}`}>
        {/* Anchor Message & Telemetry Box */}
        <div className={styles.editorialCallout}>
          <div className={styles.editorialCalloutTitle}>CORE CAMPAIGN THESIS</div>
          <p className={styles.editorialCalloutText} style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
            “{campaign.mainMessage}”
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "1.05rem", color: "var(--color-accent-acid)", fontWeight: 700 }}>
            {campaign.slogan}
          </p>

          {/* Quick Telemetry Row */}
          <div className={styles.statRow}>
            <div className={styles.statBadge}>
              <span className={styles.statValue}>2026</span>
              <span className={styles.statLabel}>Founded</span>
            </div>
            <div className={styles.statBadge}>
              <span className={styles.statValue}>100% Open</span>
              <span className={styles.statLabel}>Public Advocacy</span>
            </div>
            <div className={styles.statBadge}>
              <span className={styles.statValue}>6 Groups</span>
              <span className={styles.statLabel}>Stakeholder Coalition</span>
            </div>
            <div className={styles.statBadge}>
              <span className={styles.statValue}>Circular</span>
              <span className={styles.statLabel}>Hardware Hierarchy</span>
            </div>
          </div>
        </div>

        {/* 01: The Campaign & Its Origin */}
        <section>
          <SectionHeading
            index="01"
            title="The Campaign & Its Origin"
            description="Challenging planned obsolescence with hardware autonomy."
          />

          <div className={styles.gridTwoCol}>
            <InfoCard
              variant="highlight"
              tag="The Initiative"
              title="What is “After the Upgrade”?"
            >
              <p>
                We are a grassroots advocacy initiative reforming how society consumes, maintains, and retires technology. We believe hardware must be built to endure, consumers deserve the legal right to repair, and functional computers belong in classrooms—never toxic landfills.
              </p>
            </InfoCard>

            <InfoCard
              variant="tech"
              tag="The Catalyst"
              title="Why It Was Created"
            >
              <p>
                Every year, 62 million tons of electronics are discarded prematurely. Marketing cycles encourage replacing devices that need only simple battery swaps or storage cleanouts—squandering critical minerals and polluting global watersheds.
              </p>
            </InfoCard>
          </div>
        </section>

        {/* 02: Mission & Vision */}
        <section>
          <SectionHeading
            index="02"
            title="Mission & Vision"
            description="Our dual compass for transforming technology consumption."
          />

          <div className={styles.gridTwoCol}>
            <InfoCard
              variant="highlight"
              tag="Strategic Purpose"
              title="Our Mission"
            >
              <div className={styles.cardIconRow}>
                <div className={styles.cardIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
              </div>
              <p>
                Democratize hardware maintenance, eliminate premature electronic disposal, and bridge the digital divide through community repair workshops and accessible educational frameworks.
              </p>
            </InfoCard>

            <InfoCard
              variant="tech"
              tag="Long-Term Horizon"
              title="Our Vision"
            >
              <div className={styles.cardIconRow}>
                <div className={`${styles.cardIcon} ${styles.cardIconTech}`} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                  </svg>
                </div>
              </div>
              <p>
                A circular technology ecosystem where modular design, open schematics, and zero electronic landfill waste are universal manufacturing and civic standards.
              </p>
            </InfoCard>
          </div>
        </section>

        {/* 03: Four Operating Principles */}
        <section>
          <SectionHeading
            index="03"
            title="Our Four Operating Principles"
            description="Core rules defining our approach to sustainable hardware stewardship."
          />

          <div className={styles.gridTwoCol}>
            {campaign.principles.map((principle, idx) => {
              const isFirst = idx === 0;
              const isSecond = idx === 1;
              const isThird = idx === 2;

              return (
                <InfoCard
                  key={principle.title}
                  variant={isFirst ? "highlight" : isSecond ? "tech" : isThird ? "default" : "warning"}
                  tag={`PRINCIPLE 0${idx + 1}`}
                  title={principle.title}
                >
                  <div className={styles.cardIconRow}>
                    <div
                      className={`${styles.cardIcon} ${
                        isSecond ? styles.cardIconTech : !isFirst && !isSecond && !isThird ? styles.cardIconWarning : ""
                      }`}
                      aria-hidden="true"
                    >
                      {isFirst && (
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                        </svg>
                      )}
                      {isSecond && (
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      )}
                      {isThird && (
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="4" y="4" width="16" height="16" rx="2" />
                          <rect x="9" y="9" width="6" height="6" />
                          <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
                          <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
                        </svg>
                      )}
                      {!isFirst && !isSecond && !isThird && (
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                        </svg>
                      )}
                    </div>

                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--color-accent-acid)", fontWeight: 700 }}>
                      “{principle.motto}”
                    </span>
                  </div>

                  <p>{principle.description}</p>
                </InfoCard>
              );
            })}
          </div>
        </section>

        {/* 04: Responsible Tech Consumption */}
        <section>
          <SectionHeading
            index="04"
            title="Responsible Technology Consumption"
            description="Four practical commitments for every hardware owner."
          />

          <div className={styles.editorialCallout} style={{ borderLeftColor: "var(--color-accent-tech)" }}>
            <div className={styles.editorialCalloutTitle} style={{ color: "var(--color-accent-tech)" }}>
              {campaign.responsibleConsumption.headline.toUpperCase()}
            </div>
            <p className={styles.editorialCalloutText}>
              Stewardship means shifting from passive consumption to intentional ownership: buying for longevity, repairing bottlenecks, and ensuring retired hardware completes a verified circular loop.
            </p>

            {/* Visual Tenet Checklist Grid */}
            <div className={styles.tenetGrid}>
              {campaign.responsibleConsumption.coreTenets.map((tenet, idx) => (
                <div key={idx} className={styles.tenetCard}>
                  <div className={styles.tenetCheck} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className={styles.tenetText}>
                    <strong>Commitment 0{idx + 1}:</strong> {tenet}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 05: Target Audiences & Stakeholders */}
        <section>
          <SectionHeading
            index="05"
            title="Coalition Stakeholders"
            description="Every sector has a decisive role in halting electronic waste."
          />

          <div className={styles.gridThreeCol}>
            {campaign.audiences.map((audience, idx) => (
              <InfoCard
                key={audience}
                tag={`STAKEHOLDER 0${idx + 1}`}
                title={audience}
              >
                <p>
                  Tailored toolkits, hardware audits, battery preservation manuals, and sanitization checklists engineered specifically for {audience.toLowerCase()}.
                </p>
              </InfoCard>
            ))}
          </div>
        </section>

        {/* 06: Community Participation & Repair Cafes */}
        <section>
          <SectionHeading
            index="06"
            title="Community Action: Repair Cafes"
            description="Transforming disposal habits into collaborative hardware autonomy."
          />

          {/* Documentary Photo: High-Impact Repair Cafe */}
          <TechnicalFigure
            src="/images/community-repair-workshop.jpg"
            alt="Diverse students and volunteer mentors collaborating at a community repair cafe workbench, diagnosing laptop motherboards and cleaning fan assemblies"
            captionTitle="FIELD REPORT: COMMUNITY REPAIR CAFE INITIATIVE"
            captionDescription="Campus repair cafes empower students and local citizens with practical diagnostic skills—diverting working computers from landfills while building community hardware autonomy."
            badge="COMMUNITY ACTION: REPAIR WORKSHOP"
            variant="acid"
            fit="cover"
            width={900}
            height={450}
          />

          <div className={styles.gridThreeCol}>
            {campaign.communityParticipation.map((community) => (
              <InfoCard
                key={community.group}
                variant="highlight"
                tag="Action Playbook"
                title={community.group}
              >
                <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
                  {community.roleDescription}
                </p>

                <div className={styles.cardSectionTitle}>Key Actions:</div>
                <ul className={styles.list}>
                  {community.practicalActivities.map((act, idx) => (
                    <li key={idx} className={styles.listItem}>
                      {act}
                    </li>
                  ))}
                </ul>
              </InfoCard>
            ))}
          </div>
        </section>

        {/* Campaign Call to Action */}
        <CampaignCTA
          heading="Ready to become an active hardware steward?"
          description="Explore our diagnostic decision matrix or access our field manual on extending device longevity."
        />

        {/* Related Links */}
        <RelatedLinks
          title="Recommended Next Steps"
          links={[
            {
              tag: "The Crisis",
              title: "The E-Waste Problem",
              description: "Understand toxic compounds, groundwater leaching, and urban mining value.",
              href: "/e-waste-problem",
            },
            {
              tag: "Maintenance",
              title: "Extend Your Device’s Life",
              description: "Practical nontechnical steps to keep batteries and laptops snappy for years.",
              href: "/extend-device-life",
            },
            {
              tag: "Take Action",
              title: "Make a Community Pledge",
              description: "Commit to checking repairability before making premature replacement purchases.",
              href: "/take-action",
            },
          ]}
        />
      </div>
    </div>
  );
}
