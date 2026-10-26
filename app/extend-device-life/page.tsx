import type { Metadata } from "next";
import PageIntro from "@/components/ui/PageIntro";
import SectionHeading from "@/components/ui/SectionHeading";
import InfoCard from "@/components/ui/InfoCard";
import TechnicalFigure from "@/components/ui/TechnicalFigure";
import CampaignCTA from "@/components/ui/CampaignCTA";
import RelatedLinks from "@/components/ui/RelatedLinks";
import styles from "../subpage.module.css";
import {
  getMaintenanceGuides,
  getCreativeReuseIdeas,
  getDonationSteps,
  getRetirementRubric,
} from "@/lib/campaign-data";

export const metadata: Metadata = {
  title: "Extend Your Device’s Life",
  description:
    "Plain-English, nontechnical guidance for battery care, phone & laptop handling, safe cleaning, storage management, repairs, creative reuse, and safe donation.",
};

export default function ExtendDeviceLifePage() {
  const guides = getMaintenanceGuides();
  const reuseIdeas = getCreativeReuseIdeas();
  const donationSteps = getDonationSteps();
  const retirementRubric = getRetirementRubric();

  const hardwareCare = guides.find((g) => g.category === "phone-laptop-care");
  const batteryCare = guides.find((g) => g.category === "battery-care");
  const cleaningCare = guides.find((g) => g.category === "safe-cleaning");
  const storageCare = guides.find((g) => g.category === "storage-management");
  const softwareCare = guides.find((g) => g.category === "software-maintenance");
  const repairVsReplace = guides.find((g) => g.category === "repair-vs-replace");

  return (
    <div className={styles.pageWrapper}>
      <PageIntro
        category="Everyday Field Manual"
        topicCode="DEVICE_LONGEVITY_GUIDE"
        title="Extend Your Device’s Life"
        description="Battery wear, full drives, and scuffs shouldn't force an upgrade. Follow these non-technical maintenance protocols to double your hardware's operating lifespan."
        breadcrumbs={[{ label: "EXTEND DEVICE LIFE", href: "/extend-device-life" }]}
      />

      <div className={`container ${styles.contentWrapper}`}>
        {/* Core Philosophy Callout */}
        <div className={styles.editorialCallout}>
          <div className={styles.editorialCalloutTitle}>THE LIFESPAN DIVIDEND</div>
          <p className={styles.editorialCalloutText}>
            Routine thermal hygiene, voltage moderation, and drive cleanup restore factory responsiveness, saving thousands of pesos annually while cutting manufacturing e-waste in half.
          </p>

          <div className={styles.statRow} style={{ marginTop: "1rem" }}>
            <div className={styles.statBadge}>
              <span className={styles.statValue}>+2–3 YRS</span>
              <span className={styles.statLabel}>Lifespan Extension</span>
            </div>
            <div className={styles.statBadge}>
              <span className={styles.statValue}>20%–80%</span>
              <span className={styles.statLabel}>Optimal Battery Window</span>
            </div>
            <div className={styles.statBadge}>
              <span className={styles.statValue}>15% FREE</span>
              <span className={styles.statLabel}>SSD Headroom for TRIM</span>
            </div>
            <div className={styles.statBadge}>
              <span className={styles.statValue}>₱0</span>
              <span className={styles.statLabel}>Preventative Upkeep Cost</span>
            </div>
          </div>
        </div>

        {/* Section 1: Phone and Laptop Physical Care */}
        {hardwareCare && (
          <section>
            <SectionHeading
              index="01"
              title="Physical Handling & Structural Care"
              description="Most physical failures trace back to mechanical torque and heat buildup. Four habits prevent cracked screens, snapped hinges, and worn ports."
            />

            <div className={styles.gridTwoCol}>
              <InfoCard
                variant="highlight"
                tag="Healthy Habits"
                title="Recommended Practices"
              >
                <div className={styles.tenetGrid} style={{ marginTop: 0 }}>
                  <div className={styles.doCard}>
                    <div className={styles.cardTagTitle}>
                      <span>🤲</span> Center Lid Opening
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Open laptop displays using two hands from the center of the bezel to eliminate asymmetrical hinge torque.
                    </p>
                  </div>

                  <div className={styles.doCard}>
                    <div className={styles.cardTagTitle}>
                      <span>💨</span> Unobstructed Airflow
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Rest laptops on hard, flat desks. Blankets and pillows choke underside intake grilles, overheating the CPU.
                    </p>
                  </div>

                  <div className={styles.doCard}>
                    <div className={styles.cardTagTitle}>
                      <span>🔌</span> Plug Collar Grip
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Always pull cables by the molded plastic plug collar, never by the thin copper wire.
                    </p>
                  </div>

                  <div className={styles.doCard}>
                    <div className={styles.cardTagTitle}>
                      <span>🛡️</span> Physical Armor
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      A ₱750 tempered glass shield and bumper case absorb shock that otherwise requires an ₱8,000+ panel replacement.
                    </p>
                  </div>
                </div>
              </InfoCard>

              <InfoCard
                variant="warning"
                tag="Common Pitfalls"
                title="What To Avoid"
              >
                <div className={styles.tenetGrid} style={{ marginTop: 0 }}>
                  <div className={styles.dontCard}>
                    <div className={styles.cardTagTitle} style={{ color: "var(--color-accent-warning)" }}>
                      <span>☀️</span> 140°F (60°C) Closed Vehicles
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Sunlight cooks car interiors, permanently destabilizing battery chemistry and melting adhesive display seals.
                    </p>
                  </div>

                  <div className={styles.dontCard}>
                    <div className={styles.cardTagTitle} style={{ color: "var(--color-accent-warning)" }}>
                      <span>🪨</span> Screen-Crushing Traps
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Closing laptop lids on pens, earbuds, or paperclips shatters delicate internal LCD/OLED glass matrices.
                    </p>
                  </div>

                  <div className={styles.dontCard}>
                    <div className={styles.cardTagTitle} style={{ color: "var(--color-accent-warning)" }}>
                      <span>🥪</span> Crumbs in Keyboards
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Snacking over laptops packs crumbs beneath scissor mechanisms, binding switches and trapping moisture.
                    </p>
                  </div>
                </div>
              </InfoCard>
            </div>
          </section>
        )}

        {/* Section 2: Battery Care */}
        {batteryCare && (
          <section>
            <SectionHeading
              index="02"
              title="Electrochemical Battery Care"
              description="Lithium-ion cells degrade fastest at charge extremes. Operating within 20% to 80% doubles total cycle lifespan."
            />

            <TechnicalFigure
              src="/images/battery-longevity-curve.svg"
              alt="Technical graph illustrating lithium-ion cell degradation across state-of-charge zones: 0-20% deep discharge stress, 20-80% optimal longevity plateau, and 80-100% high voltage degradation"
              captionTitle="ELECTROCHEMICAL FIELD GUIDE // THE 20%–80% BATTERY LONGEVITY RULE"
              captionDescription="Lithium-ion cells experience the lowest mechanical stress between 20% and 80% state-of-charge. Operating in this optimal plateau can more than double your device's total charge cycle lifespan."
              badge="BATTERY PROTOCOL // 20%–80% PLATEAU"
              variant="acid"
              width={800}
              height={420}
            />

            <div className={styles.gridTwoCol}>
              <InfoCard
                variant="tech"
                tag="Battery Longevity"
                title="Best Charging Habits"
              >
                <div className={styles.tenetGrid} style={{ marginTop: 0 }}>
                  <div className={styles.doCard}>
                    <div className={styles.cardTagTitle}>
                      <span>⚡</span> 80% Charge Limiting
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Enable &apos;Optimized Battery Charging&apos; in system settings to cap continuous AC power at 80%–85%.
                    </p>
                  </div>

                  <div className={styles.doCard}>
                    <div className={styles.cardTagTitle}>
                      <span>🔋</span> 20% Discharge Floor
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Recharge when capacity drops to 20%–30%; avoid chemical deep discharge to 0%.
                    </p>
                  </div>

                  <div className={styles.doCard}>
                    <div className={styles.cardTagTitle}>
                      <span>📦</span> 50% Storage Baseline
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Store idle devices at ~50% charge, powered off completely in a cool, dry room.
                    </p>
                  </div>

                  <div className={styles.doCard}>
                    <div className={styles.cardTagTitle}>
                      <span>❄️</span> Thermal Dissipation
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Remove thick phone cases during fast-charging to prevent trapped heat from cooking cells.
                    </p>
                  </div>
                </div>
              </InfoCard>

              <InfoCard
                variant="warning"
                tag="Battery Risks"
                title="Things That Hurt Your Battery"
              >
                <div className={styles.tenetGrid} style={{ marginTop: 0 }}>
                  <div className={styles.dontCard}>
                    <div className={styles.cardTagTitle} style={{ color: "var(--color-accent-warning)" }}>
                      <span>🚫</span> Cheap Uncertified Bricks
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Corner-store knockoff chargers deliver erratic voltage ripples that degrade cell chemistry.
                    </p>
                  </div>

                  <div className={styles.dontCard}>
                    <div className={styles.cardTagTitle} style={{ color: "var(--color-accent-warning)" }}>
                      <span>🚫</span> Thermal Trapping
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Gaming or rendering 4K video while plugged in under pillows permanently destroys capacity.
                    </p>
                  </div>

                  <div className={styles.dontCard}>
                    <div className={styles.cardTagTitle} style={{ color: "var(--color-accent-warning)" }}>
                      <span>🚫</span> Premature Retirement
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      A ₱2,000–₱3,500 battery replacement resets the clock; do not discard capable silicon for a worn cell.
                    </p>
                  </div>
                </div>
              </InfoCard>
            </div>
          </section>
        )}

        {/* Section 3: Safe Cleaning Methods */}
        {cleaningCare && (
          <section>
            <SectionHeading
              index="03"
              title="Safe Cleaning: Screens, Ports & Keyboards"
              description="Trapped lint and dust act as thermal insulation and clog connectors. Clean your hardware without stripping delicate oleophobic coatings."
            />

            <div className={styles.gridTwoCol}>
              <InfoCard
                variant="highlight"
                tag="Safe Cleaning"
                title="How To Clean Safely"
              >
                <div className={styles.tenetGrid} style={{ marginTop: 0 }}>
                  <div className={styles.doCard}>
                    <div className={styles.cardTagTitle}>
                      <span>🔌</span> Power Down First
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Turn off and unplug devices before applying any microfiber cloth or cleaning solution.
                    </p>
                  </div>

                  <div className={styles.doCard}>
                    <div className={styles.cardTagTitle}>
                      <span>👓</span> Dry Microfiber Weave
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Use dry, optical-grade microfiber to wipe fingerprints and oils from displays without scratching glass.
                    </p>
                  </div>

                  <div className={styles.doCard}>
                    <div className={styles.cardTagTitle}>
                      <span>💧</span> 70% Isopropyl Alcohol
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Lightly dampen the cloth with 70% isopropyl alcohol for stubborn grime; never spray liquid onto hardware.
                    </p>
                  </div>

                  <div className={styles.doCard}>
                    <div className={styles.cardTagTitle}>
                      <span>🪵</span> Wooden Toothpick Probe
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Gently scoop compacted pocket lint out of charging ports using non-conductive wooden toothpicks.
                    </p>
                  </div>
                </div>
              </InfoCard>

              <InfoCard
                variant="warning"
                tag="Chemical Dangers"
                title="Cleaning Mistakes to Avoid"
              >
                <div className={styles.tenetGrid} style={{ marginTop: 0 }}>
                  <div className={styles.dontCard}>
                    <div className={styles.cardTagTitle} style={{ color: "var(--color-accent-warning)" }}>
                      <span>❌</span> Household Glass Cleaners
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Windex, ammonia, vinegar, and bleach chemically dissolve oleophobic and anti-reflective screen coatings.
                    </p>
                  </div>

                  <div className={styles.dontCard}>
                    <div className={styles.cardTagTitle} style={{ color: "var(--color-accent-warning)" }}>
                      <span>❌</span> Metal Paperclips in Ports
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Poking conductive needles or clips into USB-C/Lightning ports short-circuits 5V–20V pin arrays.
                    </p>
                  </div>

                  <div className={styles.dontCard}>
                    <div className={styles.cardTagTitle} style={{ color: "var(--color-accent-warning)" }}>
                      <span>❌</span> Inverted Canned Air
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Tilting or shaking canned air sprays freezing liquid propellant, which thermal-shocks and cracks hot plastic.
                    </p>
                  </div>
                </div>
              </InfoCard>
            </div>
          </section>
        )}

        {/* Section 4: Storage & Software Maintenance */}
        <section>
          <SectionHeading
            index="04"
            title="Storage Hygiene & System Optimization"
            description="Solid-state drives need breathing room for garbage collection. Clear digital friction without installing shady booster apps."
          />

          <div className={styles.gridTwoCol}>
            {storageCare && (
              <InfoCard
                variant="tech"
                tag="Drive Hygiene"
                title="Solid-State Storage Care"
              >
                <div className={styles.tenetGrid} style={{ marginTop: 0 }}>
                  <div className={styles.doCard}>
                    <div className={styles.cardTagTitle}>
                      <span>💾</span> 15% Free Headroom
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Keep at least 15% to 20% of your SSD unallocated for wear-leveling and OS swap files.
                    </p>
                  </div>

                  <div className={styles.doCard}>
                    <div className={styles.cardTagTitle}>
                      <span>🎬</span> 4K Video Pruning
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Back up or delete large, forgotten 4K video recordings to instantly recover tens of gigabytes.
                    </p>
                  </div>

                  <div className={styles.doCard}>
                    <div className={styles.cardTagTitle}>
                      <span>📦</span> Cache & Downloads Flush
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Empty your Downloads folder and OS recycle bin monthly to purge stale disk ballast.
                    </p>
                  </div>

                  <div className={styles.dontCard}>
                    <div className={styles.cardTagTitle} style={{ color: "var(--color-accent-warning)" }}>
                      <span>🚫</span> Zero Booster Apps
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Never install &apos;RAM cleaners&apos; or &apos;driver boosters&apos;—they inject persistent background telemetry and adware.
                    </p>
                  </div>
                </div>
              </InfoCard>
            )}

            {softwareCare && (
              <InfoCard
                variant="default"
                tag="System Optimization"
                title="OS & Software Hygiene"
              >
                <div className={styles.tenetGrid} style={{ marginTop: 0 }}>
                  <div className={styles.doCard}>
                    <div className={styles.cardTagTitle}>
                      <span>🔄</span> Weekly Clean Reboot
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Restart your machine weekly to flush phantom RAM memory leaks and finalize kernel updates.
                    </p>
                  </div>

                  <div className={styles.doCard}>
                    <div className={styles.cardTagTitle}>
                      <span>🛑</span> Startup Apps Audit
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Disable auto-starting launchers (Discord, Spotify, game launchers) for 3x faster boot times.
                    </p>
                  </div>

                  <div className={styles.doCard}>
                    <div className={styles.cardTagTitle}>
                      <span>🧩</span> Browser Extension Diet
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Remove dormant extensions; each add-on consumes memory and CPU cycles on every open browser tab.
                    </p>
                  </div>

                  <div className={styles.doCard}>
                    <div className={styles.cardTagTitle}>
                      <span>🛡️</span> Security Patching
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      Install regular vendor patches to protect against modern remote vulnerabilities and OS regressions.
                    </p>
                  </div>
                </div>
              </InfoCard>
            )}
          </div>
        </section>

        {/* Section 5: Repairing Instead of Immediately Replacing */}
        {repairVsReplace && (
          <section>
            <SectionHeading
              index="05"
              title="Targeted Repairs vs. Premature Replacement"
              description="Most performance frustrations stem from one worn-out component, not a failed processor. Targeted swaps save thousands of pesos."
            />

            <div className={styles.gridTwoCol}>
              <div className={styles.pipelineCard}>
                <div className={styles.pipelineHeader}>
                  <span className={styles.roiBadgePositive}>BATTERY FIX // HIGH ROI</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--color-accent-acid)" }}>
                    ₱2,000 – ₱3,500
                  </span>
                </div>
                <h4 className={styles.pipelineTitle}>Battery Drains in 2 Hours</h4>
                <p className={styles.pipelineText}>
                  Swap the internal pouch cell for ₱2,000–₱3,500 instead of spending ₱45,000+ on a new phone. Restores 100% all-day portability.
                </p>
              </div>

              <div className={styles.pipelineCard}>
                <div className={styles.pipelineHeader}>
                  <span className={styles.roiBadgePositive}>5X SPEED // HIGH ROI</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--color-accent-acid)" }}>
                    ₱1,800 – ₱2,500
                  </span>
                </div>
                <h4 className={styles.pipelineTitle}>5-Minute Boot Latency</h4>
                <p className={styles.pipelineText}>
                  Spinning mechanical hard drives bottleneck older PCs. Swapping in a modern SATA/NVMe SSD drops boot times to 15 seconds.
                </p>
              </div>

              <div className={styles.pipelineCard}>
                <div className={styles.pipelineHeader}>
                  <span className={styles.roiBadgePositive}>EASY FIX // ₱250 KEYCAP</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--color-accent-acid)" }}>
                    ₱250
                  </span>
                </div>
                <h4 className={styles.pipelineTitle}>Broken or Missing Keycap</h4>
                <p className={styles.pipelineText}>
                  Individual replacement keycaps and scissor clips cost ₱250 online and snap into place in seconds without replacing the entire laptop.
                </p>
              </div>

              <div className={styles.pipelineCard}>
                <div className={styles.pipelineHeader}>
                  <span className={styles.roiBadgePositive}>THERMAL RESET // ₱450 PASTE</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--color-accent-acid)" }}>
                    ₱450
                  </span>
                </div>
                <h4 className={styles.pipelineTitle}>Constant Screaming Cooling Fan</h4>
                <p className={styles.pipelineText}>
                  A 20-minute dust blowout and fresh ₱450 thermal paste application on the heatsink cools processors back to factory silence.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Section 6: Reusing Devices for Another Purpose */}
        <section>
          <SectionHeading
            index="06"
            title="Creative Second-Life Projects: Reusing Retired Tech"
            description="Hardware retired from your primary daily workflow still possesses high-resolution screens, cameras, and processors."
          />

          <div className={styles.gridThreeCol}>
            {reuseIdeas.map((idea) => (
              <InfoCard
                key={idea.id}
                variant="tech"
                tag="Second-Life"
                title={idea.newPurpose}
              >
                <p style={{ fontSize: "0.85rem", color: "var(--color-accent-tech)", fontWeight: 700, fontFamily: "var(--font-mono)" }}>
                  HARVEST: {idea.oldDevice}
                </p>

                <div className={styles.cardSectionTitle}>Fast Setup:</div>
                <ul className={styles.list}>
                  {idea.setupSteps.map((step, idx) => (
                    <li key={idx} className={styles.listItem} style={{ fontSize: "0.85rem" }}>
                      {step}
                    </li>
                  ))}
                </ul>

                <div className={styles.cardSectionTitle} style={{ color: "var(--color-text-muted)" }}>
                  Accessories:
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
                  {idea.requiredAccessories.join(", ")}
                </p>
              </InfoCard>
            ))}
          </div>
        </section>

        {/* Section 7: Donating Working Electronics */}
        <section>
          <SectionHeading
            index="07"
            title="Donating Working Electronics Safely"
            description="Follow this sequential 6-stage protocol to prepare surplus devices for classrooms, libraries, or charities."
          />

          <div className={styles.pipelineGrid}>
            {donationSteps.map((stepItem, idx) => (
              <div key={idx} className={styles.pipelineCard}>
                <div className={styles.pipelineHeader}>
                  <span className={styles.pipelineStepNum}>{`STAGE 0${idx + 1}`}</span>
                </div>
                <h4 className={styles.pipelineTitle}>{stepItem.step.replace(/^\d+\.\s*/, "")}</h4>
                <p className={styles.pipelineText}>{stepItem.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Deciding When a Repair Is No Longer Practical */}
        <section>
          <SectionHeading
            index="08"
            title="Repair Feasibility Diagnostic Rubric"
            description="An honest economic rubric to determine when fixing hardware makes sense versus certified closed-loop recycling."
          />

          <div className={styles.gridTwoCol}>
            {retirementRubric.map((item, idx) => (
              <InfoCard
                key={idx}
                variant={item.verdict.includes("Feasible") ? "highlight" : "warning"}
                tag={item.verdict.includes("Feasible") ? "REPAIR FEASIBLE" : "RETIRE / RECYCLE"}
                title={item.issue}
              >
                <p>{item.explanation}</p>
                <div
                  className={styles.cardSectionTitle}
                  style={{
                    color: item.verdict.includes("Feasible")
                      ? "var(--color-accent-acid)"
                      : "var(--color-accent-warning)",
                  }}
                >
                  Recommended Action:
                </div>
                <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
                  {item.recommendation}
                </p>
              </InfoCard>
            ))}
          </div>
        </section>

        {/* Campaign Call to Action */}
        <CampaignCTA
          heading="Have an old laptop or tablet sitting in your drawer?"
          description="Take five minutes to test if it powers on, wipe it clean, and give it a second life in your home or community."
        />

        {/* Related Links & Next Steps */}
        <RelatedLinks
          title="Recommended Next Steps"
          links={[
            {
              tag: "Decision Flow",
              title: "Device Decision Matrix",
              description: "Use our interactive framework to evaluate any specific gadget in your household.",
              href: "/device-decision",
            },
            {
              tag: "Security Guide",
              title: "Protect Your Data",
              description: "Learn how to cryptographically wipe your device before donating it.",
              href: "/data-safety",
            },
            {
              tag: "Safe Disposal",
              title: "Safe Electronic Disposal",
              description: "Review battery safety and certified recycling protocols when repair is unfeasible.",
              href: "/safe-disposal",
            },
          ]}
        />
      </div>
    </div>
  );
}
