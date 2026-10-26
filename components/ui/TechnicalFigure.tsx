import React from "react";
import Image from "next/image";
import styles from "./TechnicalFigure.module.css";

interface TechnicalFigureProps {
  src: string;
  alt: string;
  captionTitle?: string;
  captionDescription?: string;
  badge?: string;
  variant?: "default" | "blueprint" | "warning" | "acid";
  fit?: "cover" | "contain";
  priority?: boolean;
  width?: number;
  height?: number;
}

export default function TechnicalFigure({
  src,
  alt,
  captionTitle,
  captionDescription,
  badge,
  variant = "default",
  fit = "contain",
  priority = false,
  width = 800,
  height = 450,
}: TechnicalFigureProps) {
  const variantClass =
    variant === "blueprint"
      ? styles.figureBlueprint
      : variant === "warning"
      ? styles.figureWarning
      : variant === "acid"
      ? styles.figureAcid
      : "";

  const badgeVariantClass =
    variant === "acid"
      ? styles.badgeOverlayAcid
      : variant === "warning"
      ? styles.badgeOverlayWarning
      : "";

  return (
    <figure className={`${styles.figure} ${variantClass}`}>
      <div className={styles.mediaWrapper}>
        {badge && (
          <span className={`${styles.badgeOverlay} ${badgeVariantClass}`}>
            {badge}
          </span>
        )}
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          unoptimized
          className={fit === "contain" ? styles.imageContain : styles.image}
        />
      </div>

      {(captionTitle || captionDescription) && (
        <figcaption className={styles.caption}>
          {captionTitle && (
            <div className={styles.captionHeader}>
              <span className={styles.captionTitle}>{captionTitle}</span>
            </div>
          )}
          {captionDescription && (
            <p className={styles.captionText}>{captionDescription}</p>
          )}
        </figcaption>
      )}
    </figure>
  );
}
