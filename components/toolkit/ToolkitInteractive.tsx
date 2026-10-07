"use client";

import React, { useState, useMemo, useCallback } from "react";
import styles from "./toolkit.module.css";
import TechnicalFigure from "@/components/ui/TechnicalFigure";
import {
  SocialPostsData,
  CampaignCaption,
} from "@/lib/types";

interface ToolkitInteractiveProps {
  data: SocialPostsData;
}

type CaptionCategoryFilter =
  | "all"
  | "short-social"
  | "long-organization"
  | "story-sized"
  | "announcement";

const CATEGORY_TABS: { value: CaptionCategoryFilter; label: string }[] = [
  { value: "all", label: "All Formats" },
  { value: "short-social", label: "Short Social" },
  { value: "long-organization", label: "Long / Organization" },
  { value: "story-sized", label: "Story Slides" },
  { value: "announcement", label: "Announcements" },
];

export default function ToolkitInteractive({ data }: ToolkitInteractiveProps) {
  // Caption Filter & Search
  const [activeCategory, setActiveCategory] = useState<CaptionCategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Copy Feedback State
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // 7-Day Schedule Tab
  const [activeDayNumber, setActiveDayNumber] = useState<number>(1);

  // Expanded Accordion States
  const [expandedPromptIds, setExpandedPromptIds] = useState<Set<string>>(
    new Set([data.classroomPrompts[0]?.id || "prompt-1"])
  );
  const [expandedActivityIds, setExpandedActivityIds] = useState<Set<string>>(
    new Set([data.offlineActivities[0]?.id || "act-cable-swap"])
  );

  // Copy to clipboard with robust textarea fallback
  const handleCopy = useCallback(async (text: string, id: string) => {
    let success = false;

    if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        success = true;
      } catch (err) {
        console.warn("[Toolkit] Clipboard API failed, attempting textarea fallback:", err);
      }
    }

    if (!success && typeof document !== "undefined") {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand("copy");
        textArea.remove();
      } catch (err) {
        console.warn("[Toolkit] Textarea fallback copy error:", err);
      }
    }

    if (success) {
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId((current) => (current === id ? null : current));
      }, 2500);
    }
  }, []);

  // Filtered Captions
  const filteredCaptions = useMemo(() => {
    return data.captions.filter((caption) => {
      const matchesCategory =
        activeCategory === "all" || caption.category === activeCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        caption.title.toLowerCase().includes(q) ||
        caption.hook.toLowerCase().includes(q) ||
        caption.content.toLowerCase().includes(q) ||
        caption.hashtags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [data.captions, activeCategory, searchQuery]);

  // Active Schedule Day
  const activeDay = useMemo(() => {
    return (
      data.sevenDaySchedule.find((d) => d.dayNumber === activeDayNumber) ||
      data.sevenDaySchedule[0]
    );
  }, [data.sevenDaySchedule, activeDayNumber]);

  // Toggle Prompt Accordion
  const togglePrompt = (id: string) => {
    const next = new Set(expandedPromptIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setExpandedPromptIds(next);
  };

  // Toggle Activity Accordion
  const toggleActivity = (id: string) => {
    const next = new Set(expandedActivityIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setExpandedActivityIds(next);
  };

  return (
    <div className={styles.toolkitContainer}>
      {/* 1. Official Campaign Hashtags */}
      <section aria-label="Official Campaign Hashtags">
        <div className={styles.sectionHeaderGroup}>
          <span className={styles.sectionIndexTag}>{"MODULE_01 // HASHTAG_BUNDLES"}</span>
          <h2 className={styles.sectionTitle}>Campaign Hashtags</h2>
          <p className={styles.sectionDescription}>
            Tag bundles organized by topic. Click any group to copy all hashtags instantly with space
            delimiters for clean pasting on Instagram, X, Threads, or LinkedIn.
          </p>
        </div>

        <div className={styles.hashtagGrid}>
          {data.hashtagGroups.map((group) => {
            const isCopied = copiedId === `tag-${group.id}`;
            const tagsString = group.hashtags.join(" ");

            return (
              <div key={group.id} className={styles.hashtagCard}>
                <div className={styles.hashtagCardHeader}>
                  <div>
                    <h3 className={styles.hashtagGroupName}>{group.groupName}</h3>
                    <p className={styles.hashtagGroupDesc}>{group.description}</p>
                  </div>
                </div>

                <div className={styles.hashtagTagsList}>
                  {group.hashtags.map((tag) => (
                    <span key={tag} className={styles.hashtagPill}>
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className={`${styles.copyButton} ${isCopied ? styles.copyButtonActive : ""}`}
                  onClick={() => handleCopy(tagsString, `tag-${group.id}`)}
                  aria-label={`Copy ${group.groupName} hashtags`}
                >
                  {isCopied ? "✓ Copied Tag Bundle!" : "Copy Hashtag Group"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Ready-to-Share Social Captions & Announcements */}
      <section aria-label="Social Media Copy and Captions">
        <div className={styles.sectionHeaderGroup}>
          <span className={styles.sectionIndexTag}>{"MODULE_02 // READY_TO_SHARE_COPY"}</span>
          <h2 className={styles.sectionTitle}>Advocacy Captions & Announcements</h2>
          <p className={styles.sectionDescription}>
            Curated messages for individual advocates, campus councils, and community organizers.
            Filter by length or format, or search by keyword.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className={styles.filterToolbar}>
          <div className={styles.categoryPills} role="tablist" aria-label="Caption Categories">
            {CATEGORY_TABS.map((tab) => {
              const count =
                tab.value === "all"
                  ? data.captions.length
                  : data.captions.filter((c) => c.category === tab.value).length;

              return (
                <button
                  key={tab.value}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === tab.value}
                  className={`${styles.categoryPill} ${
                    activeCategory === tab.value ? styles.categoryPillActive : ""
                  }`}
                  onClick={() => setActiveCategory(tab.value)}
                >
                  {tab.label} ({count})
                </button>
              );
            })}
          </div>

          <div className={styles.searchBox}>
            <span style={{ color: "var(--color-text-muted)" }}>🔍</span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search captions or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search captions by keyword"
            />
            {searchQuery && (
              <button
                type="button"
                className={styles.searchClearBtn}
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Captions Grid */}
        <div className={styles.captionsGrid}>
          {filteredCaptions.length > 0 ? (
            filteredCaptions.map((caption: CampaignCaption) => {
              const isCopied = copiedId === `cap-${caption.id}`;
              const fullPostText = `${caption.hook}\n\n${caption.content}\n\n${caption.hashtags.join(" ")}`;

              return (
                <div key={caption.id} className={styles.captionCard}>
                  <div className={styles.captionCardMeta}>
                    <span className={styles.captionFormatBadge}>{caption.categoryLabel}</span>
                    <span className={styles.captionPlatform}>{caption.platformSuggestion}</span>
                  </div>

                  <h3 className={styles.captionTitle}>{caption.title}</h3>
                  <div className={styles.captionHook}>“{caption.hook}”</div>
                  <div className={styles.captionContentBox}>{caption.content}</div>

                  <div className={styles.captionCardFooter}>
                    <div className={styles.captionHashtagsRow}>
                      {caption.hashtags.map((h) => (
                        <span key={h} className={styles.captionHashtagTag}>
                          {h}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      className={`${styles.copyButton} ${isCopied ? styles.copyButtonActive : ""}`}
                      onClick={() => handleCopy(fullPostText, `cap-${caption.id}`)}
                      aria-label={`Copy caption: ${caption.title}`}
                    >
                      {isCopied ? "✓ Copied Post!" : "Copy Caption"}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.emptyStateBox}>
              <div style={{ fontSize: "2rem" }}>🔎</div>
              <h4 className={styles.emptyStateTitle}>No Matching Captions Found</h4>
              <p className={styles.emptyStateText}>
                No advocacy posts match your current search query “{searchQuery}”. Try clearing your
                search or selecting another category.
              </p>
              <button
                type="button"
                className={styles.copyButton}
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. Seven-Day Campaign Schedule */}
      <section className={styles.scheduleSection} aria-label="Seven-Day Campaign Schedule">
        <div className={styles.sectionHeaderGroup} style={{ marginBottom: "0.5rem" }}>
          <span className={styles.sectionIndexTag}>{"MODULE_03 // ACTION_CALENDAR"}</span>
          <h2 className={styles.sectionTitle}>Seven-Day Campaign Schedule</h2>
          <p className={styles.sectionDescription}>
            A structured week of community action for schools, environmental clubs, and workplaces.
            Select each day to reveal the daily objective, offline action, and ready-to-share prompt.
          </p>
        </div>

        {/* Day Selector Tabs */}
        <div className={styles.daySelectorGrid} role="tablist" aria-label="Seven-day agenda selector">
          {data.sevenDaySchedule.map((day) => {
            const isActive = day.dayNumber === activeDayNumber;
            return (
              <button
                key={day.dayNumber}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${styles.dayButton} ${isActive ? styles.dayButtonActive : ""}`}
                onClick={() => setActiveDayNumber(day.dayNumber)}
              >
                <span className={styles.dayButtonLabel}>{day.dayLabel}</span>
                <span className={styles.dayButtonTheme}>{day.theme.split("&")[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Active Day Detail Panel */}
        {activeDay && (
          <div className={styles.dayDetailPanel} role="tabpanel">
            <div className={styles.dayDetailHeader}>
              <div>
                <span className={styles.dayDetailDayTag}>{`${activeDay.dayLabel} // THEME`}</span>
                <h3 className={styles.dayDetailTitle}>{activeDay.theme}</h3>
                <p className={styles.dayDetailFocus}>{activeDay.focusArea}</p>
              </div>
            </div>

            <div>
              <strong style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
                Primary Objective:
              </strong>
              <p style={{ fontSize: "0.95rem", color: "var(--color-text-secondary)", marginTop: "0.25rem", lineHeight: 1.5 }}>
                {activeDay.primaryObjective}
              </p>
            </div>

            <div className={styles.dayDetailActionBox}>
              <div className={styles.dayDetailActionTitle}>Suggested Offline Community Action:</div>
              <div className={styles.dayDetailActionText}>{activeDay.suggestedOfflineAction}</div>
            </div>

            <div className={styles.dayDetailPromptBox}>
              <div className={styles.dayDetailPromptLabel}>Daily Social Media Prompt:</div>
              <div className={styles.dayDetailPromptContent}>“{activeDay.socialMediaPrompt}”</div>
              <button
                type="button"
                className={`${styles.copyButton} ${
                  copiedId === `sched-${activeDay.dayNumber}` ? styles.copyButtonActive : ""
                }`}
                onClick={() =>
                  handleCopy(activeDay.socialMediaPrompt, `sched-${activeDay.dayNumber}`)
                }
              >
                {copiedId === `sched-${activeDay.dayNumber}` ? "✓ Copied Prompt!" : "Copy Daily Prompt"}
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 4. Poster Headlines Showcase */}
      <section aria-label="Poster Headlines for Printing and Displays">
        <div className={styles.sectionHeaderGroup}>
          <span className={styles.sectionIndexTag}>{"MODULE_04 // DISPLAY_HEADLINES"}</span>
          <h2 className={styles.sectionTitle}>Poster Headlines & Banner Copy</h2>
          <p className={styles.sectionDescription}>
            High-impact phrases formatted for student bulletin boards, computer lab signs, and
            collection bin banners. Copy any headline directly into your design tools or documents.
          </p>
        </div>

        <TechnicalFigure
          src="/images/poster-mockups.jpg"
          alt="Editorial mockup of high-contrast typographic advocacy posters on a raw concrete wall with slogans: 'A GADGET'S USEFULNESS SHOULD NOT END WHEN YOU UPGRADE' and 'REPAIR IT. REUSE IT. RETURN IT RESPONSIBLY.'"
          captionTitle="PRINT SPECIFICATION // BULLETIN & LAB DISPLAY CAMPAIGN POSTERS"
          captionDescription="High-contrast typography designed for campus printing, maker labs, and collection drop-off stations. Use the copy buttons below to grab formatted text for your local print templates."
          badge="EDITORIAL DESIGN // PHYSICAL ADVOCACY"
          variant="blueprint"
          fit="cover"
          width={900}
          height={480}
        />

        <div className={styles.posterGrid}>
          {data.posterHeadlines.map((poster) => {
            const isCopied = copiedId === `post-${poster.id}`;
            const posterText = `${poster.headline}\n${poster.subtext}`;

            return (
              <div key={poster.id} className={styles.posterCard}>
                <div>
                  <span className={styles.posterEnvironmentTag}>
                    RECOMMENDED: {poster.targetEnvironment}
                  </span>
                  <div className={styles.posterHeadlineText} style={{ marginTop: "0.5rem" }}>
                    “{poster.headline}”
                  </div>
                  <p className={styles.posterSubtext} style={{ marginTop: "0.5rem" }}>
                    {poster.subtext}
                  </p>
                </div>

                <button
                  type="button"
                  className={`${styles.copyButton} ${isCopied ? styles.copyButtonActive : ""}`}
                  onClick={() => handleCopy(posterText, `post-${poster.id}`)}
                  aria-label={`Copy headline: ${poster.headline}`}
                >
                  {isCopied ? "✓ Copied Headline!" : "Copy Poster Text"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Classroom Discussion Prompts */}
      <section aria-label="Classroom Discussion Prompts">
        <div className={styles.sectionHeaderGroup}>
          <span className={styles.sectionIndexTag}>{"MODULE_05 // EDUCATOR_PROMPTS"}</span>
          <h2 className={styles.sectionTitle}>Classroom Discussion Prompts</h2>
          <p className={styles.sectionDescription}>
            Thought-provoking questions for STEM educators, student debate societies, and environmental
            studies clubs exploring hardware equity, urban mining, and the right to repair.
          </p>
        </div>

        <div className={styles.accordionList}>
          {data.classroomPrompts.map((prompt) => {
            const isOpen = expandedPromptIds.has(prompt.id);

            return (
              <div key={prompt.id} className={styles.accordionItem}>
                <button
                  type="button"
                  className={styles.accordionHeader}
                  onClick={() => togglePrompt(prompt.id)}
                  aria-expanded={isOpen}
                >
                  <div className={styles.accordionHeaderLeft}>
                    <span className={styles.accordionTopicTag}>{prompt.topic}</span>
                    <span className={styles.accordionQuestionTitle}>{prompt.question}</span>
                  </div>
                  <span className={`${styles.accordionIcon} ${isOpen ? styles.accordionIconOpen : ""}`}>
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className={styles.accordionBody}>
                    <p className={styles.promptContext}>
                      <strong>Educational Context:</strong> {prompt.context}
                    </p>

                    <div>
                      <strong style={{ fontSize: "0.85rem", color: "var(--color-accent-green)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
                        Key Discussion Points to Guide Learners:
                      </strong>
                      <ul className={styles.pointsList} style={{ marginTop: "0.5rem" }}>
                        {prompt.keyDiscussionPoints.map((pt, idx) => (
                          <li key={idx}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Suggested Offline Activities */}
      <section aria-label="Suggested Offline Activities">
        <div className={styles.sectionHeaderGroup}>
          <span className={styles.sectionIndexTag}>{"MODULE_06 // HANDS_ON_PROGRAMS"}</span>
          <h2 className={styles.sectionTitle}>Suggested Offline Activities</h2>
          <p className={styles.sectionDescription}>
            Tested, hands-on events for schools and community centers that turn abstract electronic
            waste concepts into tangible circular habits.
          </p>
        </div>

        <div className={styles.accordionList}>
          {data.offlineActivities.map((act) => {
            const isOpen = expandedActivityIds.has(act.id);

            return (
              <div key={act.id} className={styles.activityCard}>
                <div className={styles.activityMetaRow}>
                  <span className={styles.activityTargetTag}>{act.targetGroup}</span>
                  <span>ESTIMATED DURATION: {act.duration}</span>
                </div>

                <h3 className={styles.activityTitle}>{act.title}</h3>
                <p className={styles.activitySummary}>{act.summary}</p>

                <button
                  type="button"
                  className={styles.activityDetailsToggle}
                  onClick={() => toggleActivity(act.id)}
                  aria-expanded={isOpen}
                >
                  {isOpen ? "Hide Event Guide ▲" : "View Step-by-Step Event Guide ▼"}
                </button>

                {isOpen && (
                  <div className={styles.activityExpandedSection}>
                    <div className={styles.materialsBox}>
                      <div className={styles.materialsTitle}>Materials & Equipment Needed:</div>
                      <ul className={styles.materialsList}>
                        {act.materialsNeeded.map((mat, idx) => (
                          <li key={idx}>{mat}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className={styles.materialsTitle}>Step-by-Step Organizer Instructions:</div>
                      <div className={styles.stepsList} style={{ marginTop: "0.5rem" }}>
                        {act.stepByStepInstructions.map((step, idx) => (
                          <div key={idx} className={styles.stepItem}>
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={styles.safetyNotice}>
                      <strong>⚠️ SAFETY REQUIREMENT:</strong> {act.safetyNotes}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Tips for Personalizing Campaign Posts */}
      <section aria-label="Tips for Personalizing Campaign Posts">
        <div className={styles.sectionHeaderGroup}>
          <span className={styles.sectionIndexTag}>{"MODULE_07 // ADVOCATE_GUIDELINES"}</span>
          <h2 className={styles.sectionTitle}>Tips for Personalizing Campaign Posts</h2>
          <p className={styles.sectionDescription}>
            Authentic advocacy works best when you share real experiences. Follow these four
            principles to customize your posts while preserving factual campaign integrity.
          </p>
        </div>

        <div className={styles.tipsGrid}>
          {data.personalizationTips.map((tip) => (
            <div key={tip.id} className={styles.tipCard}>
              <h3 className={styles.tipTitle}>✓ {tip.tipTitle}</h3>
              <p className={styles.tipRecommendation}>{tip.recommendation}</p>
              <div className={styles.tipExampleBox}>
                <strong>Example Voice:</strong> {tip.exampleSnippet}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
