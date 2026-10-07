import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import { getCampaignInfo } from "@/lib/campaign-data";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  const campaign = getCampaignInfo();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.topGrid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <div className={styles.brandLogo}>
              <Logo variant="mark" size={34} alt="" />
              <span className={styles.brandTitle}>{campaign.name}</span>
            </div>
            <div className={styles.sloganBadge}>
              “{campaign.slogan}”
            </div>
            <p className={styles.brandMessage}>
              “{campaign.mainMessage}”
            </p>
          </div>

          {/* Column 1: Principles */}
          <div>
            <div className={styles.colTitle}>UNDERSTAND</div>
            <ul className={styles.linkList}>
              <li><Link href="/" className={styles.linkItem}>Campaign Home</Link></li>
              <li><Link href="/about" className={styles.linkItem}>About the Initiative</Link></li>
              <li><Link href="/e-waste-problem" className={styles.linkItem}>The E-Waste Crisis</Link></li>
              <li><Link href="/extend-device-life" className={styles.linkItem}>Extend Hardware Life</Link></li>
            </ul>
          </div>

          {/* Column 2: Action & Protocols */}
          <div>
            <div className={styles.colTitle}>ACT & PROTECT</div>
            <ul className={styles.linkList}>
              <li><Link href="/device-decision" className={styles.linkItem}>Decision Matrix</Link></li>
              <li><Link href="/safe-disposal" className={styles.linkItem}>Safe Disposal Safety</Link></li>
              <li><Link href="/data-safety" className={styles.linkItem}>Sanitize Your Data</Link></li>
              <li><Link href="/take-action" className={styles.linkItem}>Make a Community Pledge</Link></li>
              <li><Link href="/toolkit" className={styles.linkItem}>Campaign Media Toolkit</Link></li>
            </ul>
          </div>

          {/* Column 3: Audiences */}
          <div>
            <div className={styles.colTitle}>STAKEHOLDERS</div>
            <div className={styles.audiencePills}>
              {campaign.audiences.map((aud) => (
                <span key={aud} className={styles.pill}>
                  {aud}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} After the Upgrade Campaign. Dedicated to circular electronics & right to repair.</p>
        </div>
      </div>
    </footer>
  );
}
