import React from "react";
import styles from "./WarningCallout.module.css";

interface WarningCalloutProps {
  label?: string;
  title: string;
  children: React.ReactNode;
}

export default function WarningCallout({
  label = "HAZARD / PROTOCOL",
  title,
  children,
}: WarningCalloutProps) {
  return (
    <aside className={styles.callout} role="region" aria-label={`Warning: ${title}`}>
      <div className={styles.header}>
        <span className={styles.badge}>[{label}]</span>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.content}>{children}</div>
    </aside>
  );
}
