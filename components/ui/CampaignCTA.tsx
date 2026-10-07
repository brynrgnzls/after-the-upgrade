import React from "react";
import Button from "./Button";
import styles from "./CampaignCTA.module.css";

interface CampaignCTAProps {
  heading?: string;
  description?: string;
}

export default function CampaignCTA({
  heading = "A gadget’s usefulness should not end when you upgrade.",
  description = "Join students, schools, gadget owners, and businesses across the country in practicing thoughtful electronics maintenance, secure reuse, and verified recycling.",
}: CampaignCTAProps) {
  return (
    <section className={styles.ctaSection} aria-label="Campaign Action Call">
      <div className={styles.bgCircuitGrid} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.badge}>TAKE ACTION</div>
        <h2 className={styles.mainMessage}>“{heading}”</h2>
        <p className={styles.sloganLine}>“Repair it. Reuse it. Return it responsibly.”</p>
        <p className={styles.description}>{description}</p>
        <div className={styles.buttonRow}>
          <Button href="/take-action" variant="primary">
            Make the Community Pledge →
          </Button>
          <Button href="/device-decision" variant="secondary">
            Use Device Decision Tool
          </Button>
          <Button href="/toolkit" variant="ghost">
            Share on Social Media
          </Button>
        </div>
      </div>
    </section>
  );
}
