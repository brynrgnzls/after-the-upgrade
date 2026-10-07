import type { Metadata } from "next";
import PageIntro from "@/components/ui/PageIntro";
import SectionHeading from "@/components/ui/SectionHeading";
import InfoCard from "@/components/ui/InfoCard";
import WarningCallout from "@/components/ui/WarningCallout";
import TechnicalFigure from "@/components/ui/TechnicalFigure";
import CampaignCTA from "@/components/ui/CampaignCTA";
import RelatedLinks from "@/components/ui/RelatedLinks";
import styles from "../subpage.module.css";
import { getFullDisposalGuidance } from "@/lib/campaign-data";

export const metadata: Metadata = {
  title: "Safe Electronic Disposal | Protocols & Vetting Guide",
  description:
    "Comprehensive guidance on why electronics require special handling, battery fire safety, transport preparation, and essential questions to ask e-waste recyclers.",
};

export default function SafeDisposalPage() {
  const disposalData = getFullDisposalGuidance();

  return (
    <div className={styles.pageWrapper}>
      <PageIntro
        category="Safety & Protocols"
        topicCode="DISPOSAL_SAFETY_MANUAL"
        title="Safe Electronic Disposal"
        description="Electronics present severe chemical and fire hazards when handled improperly. Follow verified safety protocols for broken hardware, cables, and swollen batteries, and learn how to vet third-party electronic recyclers."
        breadcrumbs={[{ label: "SAFE DISPOSAL", href: "/safe-disposal" }]}
      />

      <div className={`container ${styles.contentWrapper}`}>
        {/* Critical Swollen Battery Warning */}
        <WarningCallout
          label="CRITICAL HAZARD // SWOLLEN BATTERIES"
          title={disposalData.swollenBatteryProtocol.title}
        >
          <p>{disposalData.swollenBatteryProtocol.warning}</p>
          <div style={{ marginTop: "0.75rem" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 700, color: "var(--color-accent-warning)", marginBottom: "0.4rem" }}>
              IMMEDIATE SAFETY ACTIONS:
            </div>
            <ul className={styles.list}>
              {disposalData.swollenBatteryProtocol.immediateProtocols.map((proto, idx) => (
                <li key={idx} className={`${styles.listItem} ${styles.listItemWarning}`}>
                  {proto}
                </li>
              ))}
            </ul>
          </div>
        </WarningCallout>

        {/* Section 1: Why Electronics Require Special Handling */}
        <section>
          <SectionHeading
            index="01"
            title={disposalData.whySpecialHandling.headline}
            description={disposalData.whySpecialHandling.summary}
          />

          <div className={styles.gridThreeCol}>
            {disposalData.whySpecialHandling.keyReasons.map((reason) => (
              <InfoCard
                key={reason.title}
                variant="warning"
                tag="Hazard Factor"
                title={reason.title}
              >
                <p>{reason.detail}</p>
              </InfoCard>
            ))}
          </div>
        </section>

        {/* Section 2: Working Devices vs Broken Devices Pathways */}
        <section>
          <SectionHeading
            index="02"
            title="Two Pathways: Working vs. Broken Devices"
            description="The most fundamental rule of responsible disposal: never scrap a machine that still functions."
          />

          <div className={styles.gridTwoCol}>
            {/* Working Devices */}
            <InfoCard
              variant="highlight"
              tag="Path A // Functional Hardware"
              title={disposalData.workingDevicesPathway.title}
            >
              <p style={{ fontStyle: "italic", marginBottom: "0.75rem" }}>
                {disposalData.workingDevicesPathway.philosophy}
              </p>
              <div className={styles.cardSectionTitle}>Recommended Actions:</div>
              <ul className={styles.list}>
                {disposalData.workingDevicesPathway.recommendedActions.map((act) => (
                  <li key={act.step} className={styles.listItem}>
                    <strong>{act.step}:</strong> {act.description}
                  </li>
                ))}
              </ul>
            </InfoCard>

            {/* Broken Devices */}
            <InfoCard
              variant="tech"
              tag="Path B // Terminal Hardware"
              title={disposalData.brokenDevicesPathway.title}
            >
              <p style={{ fontStyle: "italic", marginBottom: "0.75rem" }}>
                {disposalData.brokenDevicesPathway.philosophy}
              </p>
              <div className={styles.cardSectionTitle}>Recommended Actions:</div>
              <ul className={styles.list}>
                {disposalData.brokenDevicesPathway.recommendedActions.map((act) => (
                  <li key={act.step} className={styles.listItem}>
                    <strong>{act.step}:</strong> {act.description}
                  </li>
                ))}
              </ul>
            </InfoCard>
          </div>
        </section>

        {/* Section 3: Handling Chargers, Cables, Batteries & Accessories */}
        <section>
          <SectionHeading
            index="03"
            title={disposalData.accessoriesAndCables.title}
            description={disposalData.accessoriesAndCables.summary}
          />

          <div className={styles.gridTwoCol}>
            {disposalData.accessoriesAndCables.guidelines.map((guide) => (
              <InfoCard
                key={guide.item}
                tag="Accessory Stream"
                title={guide.item}
              >
                <p>{guide.instruction}</p>
              </InfoCard>
            ))}
          </div>
        </section>

        {/* Section 4: What Visitors Should Avoid Doing */}
        <section>
          <SectionHeading
            index="04"
            title="What You Should Never Do"
            description="Common disposal mistakes that start fires, damage recycling infrastructure, and violate municipal ordinances."
          />

          <div className={styles.gridTwoCol}>
            {disposalData.whatToAvoid.map((item, idx) => (
              <InfoCard
                key={idx}
                variant="warning"
                tag="PROHIBITED ACTION"
                title={item.prohibition}
              >
                <div className={styles.cardSectionTitle} style={{ color: "var(--color-accent-warning)" }}>
                  Why This Is Dangerous:
                </div>
                <p>{item.reason}</p>
              </InfoCard>
            ))}
          </div>
        </section>

        {/* Section 5: How to Prepare a Device for Transport */}
        <section>
          <SectionHeading
            index="05"
            title="How to Prepare a Device for Transport"
            description="Four simple steps to safely package electronics and batteries before delivering them to a collection depot."
          />

          <TechnicalFigure
            src="/images/terminal-taping-howto.svg"
            alt="Technical protocol diagram demonstrating terminal taping on 9V rectangular batteries, smartphone lithium-ion flex connectors, and cylindrical 18650 cells before recycling drop-off"
            captionTitle="TRANSPORT PROTOCOL // NON-CONDUCTIVE TERMINAL INSULATION"
            captionDescription="Loose batteries packed in collection boxes can contact keys or other cells and short-circuit. Always cover contact points with non-conductive electrical or duct tape prior to drop-off."
            badge="SAFETY PROTOCOL // MANDATORY PREPARATION"
            variant="acid"
            width={800}
            height={480}
          />

          <div className={styles.gridTwoCol}>
            {disposalData.transportPreparation.map((prep) => (
              <InfoCard
                key={prep.step}
                variant="highlight"
                tag="Transport Step"
                title={prep.step}
              >
                <p>{prep.detail}</p>
              </InfoCard>
            ))}
          </div>
        </section>

        {/* Section 6: Questions to Ask an E-Waste Collection Provider */}
        <section>
          <SectionHeading
            index="06"
            title="Questions to Ask an E-Waste Collection Provider"
            description="Not all electronic recycling programs operate ethically. Ask these questions before surrendering your hardware."
          />

          <div className={styles.editorialCallout} style={{ borderLeftColor: "var(--color-accent-tech)" }}>
            <div className={styles.editorialCalloutTitle} style={{ color: "var(--color-accent-tech)" }}>
              VETTING CHECKLIST
            </div>
            <p className={styles.editorialCalloutText}>
              Legitimate, responsible electronic recyclers welcome customer transparency. If a collection provider cannot answer these basic questions or refuses to name their downstream auditing standard, choose another certified service.
            </p>
          </div>

          <div className={styles.gridTwoCol} style={{ marginTop: "1.5rem" }}>
            {disposalData.questionsToAskProvider.map((qa, idx) => (
              <InfoCard
                key={idx}
                variant="tech"
                tag={`VETTING_Q0${idx + 1}`}
                title={`“${qa.question}”`}
              >
                <div className={styles.cardSectionTitle}>Why This Question Matters:</div>
                <p style={{ fontSize: "0.95rem", color: "var(--color-text-secondary)" }}>
                  {qa.whyItMatters}
                </p>
              </InfoCard>
            ))}
          </div>
        </section>

        {/* Campaign Call to Action */}
        <CampaignCTA
          heading="Have an electronic device ready for disposal?"
          description="Make sure personal data has been cryptographically erased before dropping hardware at any collection event."
        />

        {/* Related Links */}
        <RelatedLinks
          title="Recommended Next Steps"
          links={[
            {
              tag: "Data Sanitization",
              title: "Protect Your Data",
              description: "Complete our interactive 8-step data wipe checklist before dropping off your hardware.",
              href: "/data-safety",
            },
            {
              tag: "Decision Flow",
              title: "Device Decision Matrix",
              description: "Evaluate whether your broken hardware is actually fixable before recycling it.",
              href: "/device-decision",
            },
            {
              tag: "Advocacy",
              title: "Take Action & Pledge",
              description: "Commit to never discarding batteries into curbside municipal bins.",
              href: "/take-action",
            },
          ]}
        />
      </div>
    </div>
  );
}
