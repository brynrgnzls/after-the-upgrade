import React from "react";
import Button from "@/components/ui/Button";
import styles from "./subpage.module.css";

export default function NotFound() {
  return (
    <div
      className={styles.pageWrapper}
      style={{
        minHeight: "65vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "680px",
          textAlign: "center",
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderTop: "3px solid var(--color-accent-warning)",
          borderRadius: "var(--radius-sm)",
          padding: "3.5rem 2rem",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            fontWeight: 800,
            letterSpacing: "0.08em",
            color: "var(--color-accent-warning)",
            backgroundColor: "var(--color-accent-warning-soft)",
            border: "1px solid var(--color-accent-warning-border)",
            padding: "0.25rem 0.75rem",
            borderRadius: "var(--radius-xs)",
            marginBottom: "1.25rem",
          }}
        >
          [ERR_404 // SIGNAL_TERMINATED]
        </span>

        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: "var(--color-text-primary)",
            marginBottom: "1rem",
            lineHeight: 1.15,
          }}
        >
          ROUTE NOT LOCATED
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--color-text-secondary)",
            lineHeight: 1.65,
            marginBottom: "2.25rem",
          }}
        >
          The resource you requested does not exist or has been decommissioned. Just like retired electronics, outdated links can always be repurposed toward productive destinations!
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button href="/" variant="primary">
            Return to Campaign Home →
          </Button>
          <Button href="/device-decision" variant="secondary">
            View Decision Matrix
          </Button>
          <Button href="/take-action" variant="ghost">
            Make a Pledge
          </Button>
        </div>
      </div>
    </div>
  );
}
