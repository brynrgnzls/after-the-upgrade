import type { Metadata } from "next";
import PageIntro from "@/components/ui/PageIntro";
import SectionHeading from "@/components/ui/SectionHeading";
import InfoCard from "@/components/ui/InfoCard";
import WarningCallout from "@/components/ui/WarningCallout";
import TechnicalFigure from "@/components/ui/TechnicalFigure";
import CampaignCTA from "@/components/ui/CampaignCTA";
import RelatedLinks from "@/components/ui/RelatedLinks";
import styles from "../subpage.module.css";
import {
  getLearningTopics,
  getEWasteCategories,
  getEWasteMisconceptions,
} from "@/lib/campaign-data";

export const metadata: Metadata = {
  title: "The E-Waste Problem | After the Upgrade",
  description:
    "An expert analysis of the electronic waste crisis: compaction truck fire hazards, heavy metal toxicity, and the immense value of urban mining.",
};

export default function EWasteProblemPage() {
  const topics = getLearningTopics();
  const categories = getEWasteCategories();
  const misconceptions = getEWasteMisconceptions();

  const whatIsEWaste = topics.find((t) => t.id === "what-is-e-waste");
  const neverGarbage = topics.find((t) => t.id === "never-ordinary-garbage");
  const toxicHazards = topics.find((t) => t.id === "toxicological-concerns");
  const unnecessaryUpgrades = topics.find((t) => t.id === "unnecessary-upgrades");
  const urbanMining = topics.find((t) => t.id === "urban-mining-hidden-value");

  return (
    <div className={styles.pageWrapper}>
      <PageIntro
        category="Ecological Analysis"
        topicCode="EWASTE CRISIS MANUAL"
        title="The E-Waste Problem"
        description="Electronics are the world’s fastest-growing municipal waste stream. Uncover the fire hazards, heavy metals, and hidden mineral wealth locked inside retired hardware."
        breadcrumbs={[{ label: "THE E-WASTE PROBLEM", href: "/e-waste-problem" }]}
      />

      <div className={`container ${styles.contentWrapper}`}>
        {/* Critical Fire & Toxic Warning */}
        <WarningCallout
          label="HAZARD ALERT: NEVER IN ORDINARY GARBAGE"
          title="Why Electronics Must Never Enter Regular Trash or Curbside Bins"
        >
          <ul className={styles.list} style={{ margin: "0.5rem 0 0 0" }}>
            <li className={`${styles.listItem} ${styles.listItemWarning}`}>
              <strong>Compaction Fires:</strong> Hydraulic rams in waste trucks crush lithium cells at 2,500+ PSI, sparking spontaneous 1,000°C+ thermal runaway fires on public roads.
            </li>
            <li className={`${styles.listItem} ${styles.listItemWarning}`}>
              <strong>Aquifer Contamination:</strong> Rainwater percolating through unsealed landfills reacts with lead, cadmium, and mercury, creating toxic leachate that seeps into drinking water.
            </li>
            <li className={`${styles.listItem} ${styles.listItemWarning}`}>
              <strong>Zero Biodegradation:</strong> Silicon semiconductors, fiberglass resins, and heavy metals never break down naturally.
            </li>
          </ul>
        </WarningCallout>

        {/* Section 1: What Electronic Waste Is */}
        {whatIsEWaste && (
          <section>
            <SectionHeading
              index="01"
              title="What is Electronic Waste?"
              description="Electrical and electronic equipment with batteries or cords at end-of-life."
            />

            <div className={styles.editorialCallout}>
              <div className={styles.editorialCalloutTitle}>CORE DEFINITION</div>
              <p className={styles.editorialCalloutText} style={{ fontSize: "1.1rem" }}>
                {whatIsEWaste.summary}
              </p>

              {/* Fast Trait Badges */}
              <div className={styles.statRow} style={{ marginTop: "0.5rem" }}>
                <div className={styles.statBadge}>
                  <span className={styles.statValue}>Complex Chemistry</span>
                  <span className={styles.statLabel}>Silicon, Rare Earths, Lead</span>
                </div>
                <div className={styles.statBadge}>
                  <span className={styles.statValue}>Zero Biodegradation</span>
                  <span className={styles.statLabel}>Endures Indefinitely</span>
                </div>
                <div className={styles.statBadge}>
                  <span className={styles.statValue}>High Embodied Energy</span>
                  <span className={styles.statLabel}>80% Carbon in Production</span>
                </div>
                <div className={styles.statBadge}>
                  <span className={styles.statValue}>100% Recyclable</span>
                  <span className={styles.statLabel}>Closed-Loop Potential</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 2: Common Types of E-Waste */}
        <section>
          <SectionHeading
            index="02"
            title="Common Types of Electronic Waste"
            description="Four primary hardware categories requiring dedicated recovery rather than trash disposal."
          />

          <div className={styles.gridTwoCol}>
            {categories.map((cat, idx) => (
              <InfoCard
                key={cat.id}
                variant="tech"
                tag={`STREAM 0${idx + 1}`}
                title={cat.name}
              >
                <div className={styles.cardSectionTitle}>Common Devices:</div>
                <p style={{ fontSize: "0.95rem", color: "var(--color-text-secondary)", margin: 0 }}>
                  {cat.examples.join(", ")}
                </p>

                <div className={styles.cardSectionTitle} style={{ color: "var(--color-accent-warning)" }}>
                  Hazardous Compounds:
                </div>
                <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", margin: 0 }}>
                  {cat.typicalHazardousElements.join(", ")}
                </p>

                <div className={styles.cardSectionTitle} style={{ color: "var(--color-accent-acid)" }}>
                  Recovery Potential:
                </div>
                <p style={{ fontSize: "0.9rem", color: "var(--color-accent-acid)", fontWeight: 600, margin: 0 }}>
                  {cat.recoveryPotential}
                </p>
              </InfoCard>
            ))}
          </div>
        </section>

        {/* Section 3: Why Electronics Must Be Kept Out of Ordinary Trash */}
        {neverGarbage && (
          <section>
            <SectionHeading
              index="03"
              title="The Curbside Trash Hazard"
              description="How improper disposal triggers explosive fires and permanent groundwater poisoning."
            />

            <TechnicalFigure
              src="/images/compaction-truck-hazard.svg"
              alt="Technical schematic illustrating the 3 phases of battery hazard in municipal waste trucks: curbside disposal, hydraulic compaction blade puncture, and self-fueling thermal runaway fire"
              captionTitle="MUNICIPAL INCIDENT MECHANISM: HYDRAULIC COMPACTION FAILURE"
              captionDescription="Municipal waste compactors exert over 2,500 PSI of mechanical force. When concealed lithium-ion pouches rupture, the polymer separator fails instantly, causing spontaneous 1,000°C+ thermal runaway."
              badge="HAZARD DIAGRAM: THERMAL RUNAWAY"
              variant="warning"
              width={800}
              height={440}
            />

            <div className={styles.gridTwoCol}>
              <InfoCard
                variant="warning"
                tag="Physical Hazard"
                title="Truck Compactor Fires"
              >
                <p>
                  Hydraulic rams crush lithium cells, tearing the 12µm polymer separator. The anode and cathode short-circuit, reaching 1,000°C in seconds. Lithium fires generate their own oxygen and cannot be smothered with standard extinguishers.
                </p>
              </InfoCard>

              <InfoCard
                variant="warning"
                tag="Ecological Threat"
                title="Groundwater Leachate Seepage"
              >
                <p>
                  Heavy metals never break down. Acidic rainwater dissolves lead, cadmium, and mercury from crushed circuit boards, forming toxic leachate that seeps past landfill liners into regional drinking aquifers.
                </p>
              </InfoCard>
            </div>
          </section>
        )}

        {/* Section 4: Environmental & Safety Concerns */}
        {toxicHazards && (
          <section>
            <SectionHeading
              index="04"
              title="Environmental & Toxicological Hazards"
              description="The chemical compounds embedded in computer hardware and their biological risks."
            />

            <div className={styles.gridTwoCol}>
              <InfoCard
                variant="default"
                tag="Heavy Metals"
                title="Lead, Mercury & Cadmium"
              >
                <div className={styles.elementBadge}>
                  [Pb] Lead • [Hg] Mercury • [Cd] Cadmium
                </div>
                <p>
                  Found in legacy solder, fluorescent backlights, and rechargeable cells. Inhaled or ingested via contaminated water, these elements permanently damage central nervous systems, brain development, and renal function.
                </p>
              </InfoCard>

              <InfoCard
                variant="default"
                tag="Synthetic Compounds"
                title="Brominated Flame Retardants"
              >
                <div className={styles.elementBadge} style={{ color: "var(--color-accent-tech)", borderColor: "var(--color-accent-tech-border)" }}>
                  [BFRs] Polybrominated Biphenyls
                </div>
                <p>
                  Infused into plastic casings and circuit boards to resist heat. When burned in open scrap yards, BFRs release lethal, bioaccumulative dioxins and furans that persist in human and animal tissue.
                </p>
              </InfoCard>
            </div>
          </section>
        )}

        {/* Section 5: The Problem with Unnecessary Upgrades */}
        {unnecessaryUpgrades && (
          <section>
            <SectionHeading
              index="05"
              title="The True Cost of Unnecessary Upgrades"
              description="Upstream carbon emissions and resource extraction vastly outweigh device operation."
            />

            <div className={styles.editorialCallout} style={{ borderLeftColor: "var(--color-accent-warning)" }}>
              <div className={styles.editorialCalloutTitle} style={{ color: "var(--color-accent-warning)" }}>
                EMBODIED MANUFACTURING BURDEN
              </div>
              <p className={styles.editorialCalloutText}>
                Up to <strong>80% of a computer’s total lifecycle carbon emissions</strong> are generated during mining, refining, and semiconductor fabrication—before you even unbox it. Extending device life by just 2 years halves its annual carbon burden.
              </p>

              {/* Fast Embodied Metrics */}
              <div className={styles.statRow} style={{ marginTop: "0.5rem" }}>
                <div className={styles.statBadge}>
                  <span className={styles.statValue}>240 kg</span>
                  <span className={styles.statLabel}>Fossil Fuels / PC</span>
                </div>
                <div className={styles.statBadge}>
                  <span className={styles.statValue}>1,500 L</span>
                  <span className={styles.statLabel}>Water / Microchip</span>
                </div>
                <div className={styles.statBadge}>
                  <span className={styles.statValue}>22 kg</span>
                  <span className={styles.statLabel}>Chemicals / Laptop</span>
                </div>
                <div className={styles.statBadge}>
                  <span className={styles.statValue}>50% Cut</span>
                  <span className={styles.statLabel}>Carbon via +2yr Use</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 6: Urban Mining & Hidden Value */}
        {urbanMining && (
          <section>
            <SectionHeading
              index="06"
              title="Urban Mining: The Hidden Wealth in Discarded Tech"
              description="Why circuit boards are rich mineral deposits rather than rubbish."
            />

            <TechnicalFigure
              src="/images/urban-mining-comparison.svg"
              alt="Comparative infographic illustrating resource yields from 1 metric ton of geological ore versus 1 metric ton of discarded circuit boards"
              captionTitle="CIRCULAR ECONOMY METRIC: ORE EXTRACTION VS. CIRCUIT BOARD HARVEST"
              captionDescription="One metric ton of printed circuit boards yields up to 300g of gold and 100kg of copper—surpassing the mineral density of virgin geological ore by a factor of 40 to 80 while drastically lowering CO2 emissions."
              badge="RESOURCE DATA: URBAN MINING RATIOS"
              variant="blueprint"
              width={800}
              height={460}
            />

            <div className={styles.gridTwoCol}>
              <InfoCard
                variant="highlight"
                tag="Critical Minerals"
                title="Precious & Rare Earth Metals"
              >
                <p>
                  High-grade circuit boards hold gold, silver, copper, and palladium at densities <strong>40x to 80x higher</strong> than natural geological ore. Closed-loop urban mining recovers these elements with 80% fewer emissions than virgin earth excavation.
                </p>
              </InfoCard>

              <InfoCard
                variant="tech"
                tag="Component Harvest"
                title="Modular Silicon Subsystems"
              >
                <p>
                  Retired computers often contain pristine modular subsystems: SSDs, RAM modules, camera sensors, and copper heat pipes. Harvesting these modules supplies local repair cafes and keeps other machines working for pennies.
                </p>
              </InfoCard>
            </div>
          </section>
        )}

        {/* Section 7: Common Misconceptions Debunked */}
        <section>
          <SectionHeading
            index="07"
            title="Common Misconceptions Debunked"
            description="Four myths that lead to accidental fires, data leaks, and unnecessary hardware turnover."
          />

          <div className={styles.gridTwoCol}>
            {misconceptions.map((item, idx) => (
              <InfoCard
                key={idx}
                variant="warning"
                tag={`MYTH 0${idx + 1}`}
                title={`“${item.myth}”`}
              >
                <div className={styles.realityBanner}>
                  <span>✓ REALITY:</span> {item.reality}
                </div>
                <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", margin: 0 }}>
                  {item.explanation}
                </p>
              </InfoCard>
            ))}
          </div>
        </section>

        {/* Campaign Call to Action */}
        <CampaignCTA
          heading="Turn knowledge into action: Extend your hardware's life today."
          description="Learn practical nontechnical maintenance tips or use our decision matrix to evaluate aging devices in your household or school."
        />

        {/* Related Links */}
        <RelatedLinks
          title="Recommended Next Steps"
          links={[
            {
              tag: "Field Manual",
              title: "Extend Your Device’s Life",
              description: "Learn practical, nontechnical care routines for batteries, storage, and cleaning.",
              href: "/extend-device-life",
            },
            {
              tag: "Decision Flow",
              title: "Device Decision Matrix",
              description: "Assess whether repair, reuse, donation, or certified recycling fits your device.",
              href: "/device-decision",
            },
            {
              tag: "Safety Protocol",
              title: "Safe Electronic Disposal",
              description: "Review battery taping instructions and third-party recycler certifications.",
              href: "/safe-disposal",
            },
          ]}
        />
      </div>
    </div>
  );
}
