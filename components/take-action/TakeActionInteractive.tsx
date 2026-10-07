"use client";

import React, { useState, useEffect, useMemo, useCallback, useSyncExternalStore } from "react";
import styles from "./take-action.module.css";
import {
  TakeActionItem,
  TakeActionCategory,
  PledgeRecord,
} from "@/lib/types";
import {
  isIndexedDBAvailable,
  getPledge,
  savePledge,
  removePledge,
  getActionProgressList,
  saveActionProgress,
  resetActionProgress,
  clearAllCampaignData,
} from "@/lib/indexed-db";

interface TakeActionInteractiveProps {
  items: TakeActionItem[];
}

const emptySubscribe = () => () => {};

const ADVOCACY_PLEDGE_TEXT =
  "I will think beyond the upgrade. I will repair when practical, reuse what still works, protect my personal data, and return unwanted electronics responsibly.";

const CATEGORY_FILTERS: { value: "all" | TakeActionCategory; label: string; icon: React.ReactNode }[] = [
  {
    value: "all",
    label: "All Actions",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
      </svg>
    ),
  },
  {
    value: "cleanup-challenge",
    label: "Device Cleanup",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    value: "digital-declutter",
    label: "Digital Decluttering",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14a9 3 0 0 0 18 0V5" />
        <path d="M3 12a9 3 0 0 0 18 0" />
      </svg>
    ),
  },
  {
    value: "repair-commitment",
    label: "Repair-Before-Replace",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    value: "donation-preparation",
    label: "Donation & Recycling",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.29 7 12 12 20.71 7" />
        <line x1="12" y1="22" x2="12" y2="12" />
      </svg>
    ),
  },
];

export default function TakeActionInteractive({ items }: TakeActionInteractiveProps) {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const isDbAvailable = useSyncExternalStore(
    emptySubscribe,
    () => isIndexedDBAvailable(),
    () => true
  );

  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [pledge, setPledge] = useState<PledgeRecord | null>(null);
  const [activeCategory, setActiveCategory] = useState<"all" | TakeActionCategory>("all");
  const [showClearModal, setShowClearModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show temporary feedback banner
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4000);
  }, []);

  // Hydrate data from IndexedDB once mounted on the client
  useEffect(() => {
    if (!isIndexedDBAvailable()) {
      return;
    }

    // Load saved checklist progress
    getActionProgressList()
      .then((records) => {
        const completed = new Set<string>();
        for (const record of records) {
          if (record.completed) {
            completed.add(record.actionId);
          }
        }
        setCompletedIds(completed);
      })
      .catch((err) => {
        console.warn("[TakeAction] Error loading action progress:", err);
      });

    // Load saved pledge
    getPledge()
      .then((savedPledge) => {
        if (savedPledge && savedPledge.completed) {
          setPledge(savedPledge);
        }
      })
      .catch((err) => {
        console.warn("[TakeAction] Error loading pledge:", err);
      });
  }, []);

  // Filtered items based on active tab
  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  // Completion calculation
  const totalCount = items.length;
  const completedCount = completedIds.size;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Milestone rank
  const milestone = useMemo(() => {
    if (progressPercent === 100) return "Master Tech Steward";
    if (progressPercent >= 75) return "Hardware Guardian";
    if (progressPercent >= 50) return "Active Conservationist";
    if (progressPercent >= 25) return "Awareness Advocate";
    return "Stewardship Candidate";
  }, [progressPercent]);

  // Toggle single action item
  const handleToggleAction = async (actionId: string) => {
    const nextCompleted = !completedIds.has(actionId);
    const updated = new Set(completedIds);
    if (nextCompleted) {
      updated.add(actionId);
    } else {
      updated.delete(actionId);
    }
    setCompletedIds(updated);

    if (isDbAvailable) {
      await saveActionProgress(actionId, nextCompleted);
    }
  };

  // Reset checklist progress
  const handleResetChecklist = async () => {
    if (completedIds.size === 0) return;
    setCompletedIds(new Set());
    if (isDbAvailable) {
      await resetActionProgress();
    }
    showToast("Checklist progress has been reset.");
  };

  // Mark all visible items as complete
  const handleCompleteAllVisible = async () => {
    const updated = new Set(completedIds);
    for (const item of filteredItems) {
      updated.add(item.id);
      if (isDbAvailable) {
        saveActionProgress(item.id, true);
      }
    }
    setCompletedIds(updated);
    showToast(`Marked ${filteredItems.length} action(s) complete.`);
  };

  // Take the advocacy pledge
  const handleTakePledge = async () => {
    if (pledge) return; // Prevent duplicate pledge

    const newRecord: PledgeRecord = {
      id: "community-advocacy-pledge",
      pledgeVersion: "v1.0",
      completed: true,
      completedAt: new Date().toISOString(),
    };

    setPledge(newRecord);

    if (isDbAvailable) {
      const saved = await savePledge("v1.0");
      if (saved) {
        setPledge(saved);
      }
    }
    showToast("Thank you! Your advocacy pledge has been recorded to your device.");
  };

  // Remove the advocacy pledge
  const handleRemovePledge = async () => {
    setPledge(null);
    if (isDbAvailable) {
      await removePledge();
    }
    showToast("Advocacy pledge removed from this device.");
  };

  // Nuclear clear of all campaign data (requires confirmation)
  const handleConfirmClearAll = async () => {
    setCompletedIds(new Set());
    setPledge(null);
    setShowClearModal(false);

    if (isDbAvailable) {
      const res = await clearAllCampaignData();
      if (res.success) {
        showToast("All campaign records and decision data cleared from this browser.");
      } else {
        showToast("Campaign memory cleared for this session.");
      }
    } else {
      showToast("Session memory cleared.");
    }
  };

  // Safe client-side date formatting for pledge
  const formattedPledgeDate = useMemo(() => {
    if (!pledge || !isClient) return null;
    try {
      const dateObj = new Date(pledge.completedAt);
      return dateObj.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return pledge.completedAt;
    }
  }, [pledge, isClient]);

  return (
    <div className={styles.interactiveContainer}>
      {/* Toast feedback */}
      {toastMessage && (
        <div className={styles.storageWarningBanner} style={{ borderColor: "var(--color-accent-green)" }}>
          <span className={styles.storageWarningIcon} style={{ color: "var(--color-accent-green)" }}>✓</span>
          <div>{toastMessage}</div>
        </div>
      )}

      {/* IndexedDB Unavailable Warning */}
      {isClient && !isDbAvailable && (
        <div className={styles.storageWarningBanner}>
          <span className={styles.storageWarningIcon}>!</span>
          <div>
            <strong>Browser Storage Restricted:</strong> Local database storage (IndexedDB) is blocked or
            unavailable in this browser environment (e.g. private window or strict cookie policy). You can still
            interact with the checklist and take the pledge in memory for this session, but progress will not
            persist across page reloads.
          </div>
        </div>
      )}

      {/* Progress Dashboard */}
      <section className={styles.progressDashboard} aria-label="Personal Action Progress">
        <div className={styles.progressHeader}>
          <div>
            <h2 className={styles.progressHeaderTitle}>Personal E-Waste Action Dashboard</h2>
            <p className={styles.progressHeaderSubtitle}>
              {completedCount} of {totalCount} stewardship actions completed on this device
            </p>
          </div>

          <div className={styles.progressMetrics}>
            <span className={styles.progressPercentage}>{progressPercent}%</span>
            <span
              className={`${styles.progressBadge} ${
                progressPercent === 100 ? styles.progressBadgeComplete : ""
              }`}
            >
              RANK: {milestone}
            </span>
          </div>
        </div>

        <div
          className={styles.progressBarTrack}
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className={styles.progressBarFill}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className={styles.progressFooter}>
          <span>DATA SCOPE: LOCAL BROWSER ONLY (`AfterTheUpgradeDB`)</span>
          <span>{totalCount - completedCount} REMAINING FOR COMPLETE CERTIFICATION</span>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <nav className={styles.filterTabs} aria-label="Checklist Categories">
        {CATEGORY_FILTERS.map((cat) => {
          const categoryCount =
            cat.value === "all"
              ? items.length
              : items.filter((it) => it.category === cat.value).length;
          const categoryCompleted =
            cat.value === "all"
              ? completedCount
              : items
                  .filter((it) => it.category === cat.value)
                  .filter((it) => completedIds.has(it.id)).length;

          return (
            <button
              key={cat.value}
              type="button"
              className={`${styles.filterButton} ${
                activeCategory === cat.value ? styles.filterButtonActive : ""
              }`}
              onClick={() => setActiveCategory(cat.value)}
            >
              {cat.icon}
              <span>{cat.label}</span>
              <span className={styles.filterCount}>
                {categoryCompleted}/{categoryCount}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Checklist Toolbar */}
      <div className={styles.checklistToolbar}>
        <div className={styles.checklistToolbarLabel}>
          Showing {filteredItems.length} action item{filteredItems.length === 1 ? "" : "s"}
        </div>
        <div className={styles.checklistToolbarActions}>
          <button
            type="button"
            className={styles.actionButtonSmall}
            onClick={handleCompleteAllVisible}
          >
            Mark Visible Complete
          </button>
          <button
            type="button"
            className={styles.actionButtonSmall}
            onClick={handleResetChecklist}
            disabled={completedIds.size === 0}
          >
            Reset Progress
          </button>
        </div>
      </div>

      {/* Checklist Grid */}
      <div className={styles.checklistGrid}>
        {filteredItems.map((item) => {
          const isDone = completedIds.has(item.id);
          return (
            <div
              key={item.id}
              className={`${styles.checklistItem} ${
                isDone ? styles.checklistItemCompleted : ""
              }`}
              onClick={() => handleToggleAction(item.id)}
              role="checkbox"
              aria-checked={isDone}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  handleToggleAction(item.id);
                }
              }}
            >
              <div className={styles.checkboxControl}>
                {isDone && <span className={styles.checkmark}>✓</span>}
              </div>

              <div className={styles.itemBody}>
                <div className={styles.itemHeader}>
                  <span className={styles.itemCategoryTag}>{item.categoryLabel}</span>
                  <span className={styles.itemTimeEstimate}>{item.timeEstimate}</span>
                </div>

                <div className={styles.itemTitle}>{item.title}</div>
                <p className={styles.itemDescription}>{item.description}</p>

                <div className={styles.itemImpact}>
                  <span className={styles.itemImpactLabel}>IMPACT:</span>
                  <span>{item.impact}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Advocacy Pledge Section */}
      <section className={styles.pledgeSection} aria-label="Campaign Advocacy Pledge">
        <div className={styles.pledgeHeader}>
          <span className={styles.pledgeTag}>COMMUNITY COMMITMENT // 2026</span>
          <span className={styles.pledgeVersion}>EDITION: v1.0 (SECURE LOCAL LOG)</span>
        </div>

        <h2 className={styles.pledgeTitle}>The “After the Upgrade” Community Pledge</h2>
        <p className={styles.pledgeSubtitle}>
          Commit to circular hardware stewardship. Reject premature obsolescence, champion verified repair, and ensure electronics never hit municipal landfills.
        </p>

        <div className={styles.pledgeQuoteBox}>
          <div className={styles.pledgeSealBadge}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
            </svg>
          </div>
          <blockquote className={styles.pledgeQuote}>
            “{ADVOCACY_PLEDGE_TEXT}”
          </blockquote>
        </div>

        {pledge ? (
          <div className={styles.pledgeActiveCard}>
            <div className={styles.pledgeActiveDetails}>
              <span className={styles.pledgeActiveStatus}>
                <span className={styles.statusIndicatorDot} />
                PLEDGE ACTIVE ON THIS DEVICE
              </span>
              <span className={styles.pledgeActiveTimestamp}>
                Recorded locally on {formattedPledgeDate || "this device"}.
              </span>
            </div>

            <div className={styles.pledgeActionGroup}>
              <button
                type="button"
                className={styles.pledgeTakeButton}
                disabled
                style={{ opacity: 0.8, cursor: "default" }}
              >
                ✓ Pledge Completed
              </button>
              <button
                type="button"
                className={styles.pledgeRemoveButton}
                onClick={handleRemovePledge}
                title="Remove this pledge from your local browser"
              >
                Remove Pledge
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.pledgeActionGroup}>
            <button
              type="button"
              className={styles.pledgeTakeButton}
              onClick={handleTakePledge}
            >
              Sign the Advocacy Pledge →
            </button>
          </div>
        )}
      </section>

      {/* Data Management & Privacy Guarantee Card */}
      <section className={styles.dataManagementCard} aria-label="Privacy and Local Storage Settings">
        <div className={styles.privacyGuaranteeBox}>
          <span className={styles.privacyIcon} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          <div className={styles.privacyText}>
            <strong>Zero Remote Tracking & Local-Only Guarantee:</strong> All checklist progress, diagnostic records, and pledge timestamps are stored <strong>strictly inside your browser&apos;s local IndexedDB (`AfterTheUpgradeDB`)</strong>. No personal data, email, passwords, or IP telemetry ever leaves your computer.
          </div>
        </div>

        <div className={styles.dataActionsRow}>
          <div className={styles.dataStorageInfo}>
            DATABASE: `AfterTheUpgradeDB` // STORES: `pledges`, `actionProgress`, `deviceDecisions`
          </div>

          <button
            type="button"
            className={styles.clearAllButton}
            onClick={() => setShowClearModal(true)}
          >
            Clear All Campaign Data from This Device
          </button>
        </div>
      </section>

      {/* Confirmation Modal for Clearing All Data */}
      {showClearModal && (
        <div
          className={styles.modalBackdrop}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className={styles.modalContent}>
            <h3 id="modal-title" className={styles.modalTitle}>
              Confirm Permanent Local Data Deletion
            </h3>
            <p className={styles.modalMessage}>
              Are you sure you want to delete all campaign data from this device? This will permanently
              erase your <strong>action checklist progress</strong>, your <strong>advocacy pledge</strong>,
              and all <strong>device decision records</strong> from your browser&apos;s `AfterTheUpgradeDB`.
            </p>
            <p className={styles.modalMessage} style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
              This action cannot be undone, but you can retake the pledge or restart your checklist at any time.
            </p>

            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.modalCancelButton}
                onClick={() => setShowClearModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.modalConfirmButton}
                onClick={handleConfirmClearAll}
              >
                Yes, Delete All Records
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
