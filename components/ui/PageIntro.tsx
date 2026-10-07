import React from "react";
import Breadcrumbs, { BreadcrumbItem } from "./Breadcrumbs";
import styles from "./PageIntro.module.css";

interface PageIntroProps {
  category?: string;
  topicCode?: string;
  title: string;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
}

export default function PageIntro({
  category,
  topicCode,
  title,
  description,
  breadcrumbs,
}: PageIntroProps) {
  return (
    <div className={styles.hero}>
      <div className="container">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} />
        )}

        <div className={styles.badgeRow}>
          {category && <span className={styles.categoryBadge}>{category}</span>}
          {topicCode && <span className={styles.techTag}>{topicCode}</span>}
        </div>

        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.cornerDetail} aria-hidden="true" />
    </div>
  );
}
