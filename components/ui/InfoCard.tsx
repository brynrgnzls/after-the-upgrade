import React from "react";
import Link from "next/link";
import styles from "./InfoCard.module.css";

export interface InfoCardProps {
  variant?: "default" | "highlight" | "tech" | "warning";
  tag?: string;
  title: string;
  children: React.ReactNode;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
}

export default function InfoCard({
  variant = "default",
  tag,
  title,
  children,
  actionHref,
  actionLabel,
  className = "",
}: InfoCardProps) {
  const variantClass = variant !== "default" ? styles[variant] : "";
  const tagVariantClass =
    variant === "highlight"
      ? styles.tagHighlight
      : variant === "tech"
      ? styles.tagTech
      : "";

  return (
    <article className={`${styles.card} ${variantClass} ${className}`.trim()}>
      <div className={styles.cornerBracket} aria-hidden="true" />
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {tag && <span className={`${styles.tag} ${tagVariantClass}`}>{tag}</span>}
      </div>

      <div className={styles.content}>{children}</div>

      {actionHref && actionLabel && (
        <div className={styles.footer}>
          <Link
            href={actionHref}
            className={`${styles.actionLink} ${variant === "tech" ? styles.actionLinkTech : ""}`}
          >
            <span>{actionLabel}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
    </article>
  );
}
