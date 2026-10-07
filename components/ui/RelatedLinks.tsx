import React from "react";
import Link from "next/link";
import styles from "./RelatedLinks.module.css";

export interface RelatedLinkItem {
  tag?: string;
  title: string;
  description: string;
  href: string;
}

interface RelatedLinksProps {
  title?: string;
  links: RelatedLinkItem[];
}

export default function RelatedLinks({
  title = "Related Campaign Tracks",
  links,
}: RelatedLinksProps) {
  return (
    <section className={styles.section} aria-label={title}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>

      <div className={styles.grid}>
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={styles.linkCard}>
            <div className={styles.cardTop}>
              <span className={styles.tag}>{link.tag || "Campaign Route"}</span>
              <span className={styles.arrow} aria-hidden="true">→</span>
            </div>
            <div className={styles.cardTitle}>{link.title}</div>
            <p className={styles.cardDesc}>{link.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
