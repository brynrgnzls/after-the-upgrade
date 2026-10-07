import React from "react";
import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  index?: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ index, title, description }: SectionHeadingProps) {
  return (
    <div className={styles.header}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.decorLine} aria-hidden="true" />
      </div>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
