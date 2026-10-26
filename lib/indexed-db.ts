/**
 * Native IndexedDB Wrapper for "After the Upgrade"
 * Database: AfterTheUpgradeDB
 *
 * Privacy & Security Rules:
 * - 100% Device-local: No network requests, no telemetric analytics, no external sync.
 * - Zero PII: Does not accept or store names, emails, phone numbers, locations, passwords, or accounts.
 * - SSR Safe: Checks typeof window and indexedDB before any execution.
 * - Graceful degradation: Functions return safe defaults (null / empty array / false) if IndexedDB is blocked or disabled.
 */

import {
  PledgeRecord,
  ActionProgressRecord,
  DeviceDecisionRecord,
} from "./types";

export const DB_NAME = "AfterTheUpgradeDB";
export const DB_VERSION = 1;

export const STORES = {
  PLEDGES: "pledges",
  ACTION_PROGRESS: "actionProgress",
  DEVICE_DECISIONS: "deviceDecisions",
} as const;

/**
 * Verifies if native IndexedDB is available and accessible in the current execution context.
 * Safely guards against server rendering and private browsing SecurityErrors.
 */
export function isIndexedDBAvailable(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    return (
      "indexedDB" in window &&
      window.indexedDB !== null &&
      typeof window.indexedDB.open === "function"
    );
  } catch {
    return false;
  }
}

/**
 * Opens a connection to AfterTheUpgradeDB, creating object stores and indexes on upgrade.
 */
export function openDatabase(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (!isIndexedDBAvailable()) {
      resolve(null);
      return;
    }

    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // 1. pledges: id (keyPath), pledgeVersion, completed, completedAt
        if (!db.objectStoreNames.contains(STORES.PLEDGES)) {
          db.createObjectStore(STORES.PLEDGES, { keyPath: "id" });
        }

        // 2. actionProgress: id (keyPath), actionId (indexed), completed, updatedAt
        if (!db.objectStoreNames.contains(STORES.ACTION_PROGRESS)) {
          const progressStore = db.createObjectStore(STORES.ACTION_PROGRESS, {
            keyPath: "id",
          });
          progressStore.createIndex("actionId", "actionId", { unique: false });
        }

        // 3. deviceDecisions: id (keyPath), deviceType, recommendation, completedAt
        if (!db.objectStoreNames.contains(STORES.DEVICE_DECISIONS)) {
          db.createObjectStore(STORES.DEVICE_DECISIONS, { keyPath: "id" });
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        console.warn("[AfterTheUpgradeDB] Database open error:", request.error);
        resolve(null);
      };

      request.onblocked = () => {
        console.warn("[AfterTheUpgradeDB] Database open request was blocked by an older connection.");
        resolve(null);
      };
    } catch (err) {
      console.warn("[AfterTheUpgradeDB] Exception while attempting to open IndexedDB:", err);
      resolve(null);
    }
  });
}

// ==========================================
// PLEDGES STORE OPERATIONS
// Fields: id, pledgeVersion, completed, completedAt
// ==========================================

const DEFAULT_PLEDGE_ID = "community-advocacy-pledge";

/**
 * Retrieves the stored local pledge record, if any exists.
 */
export async function getPledge(): Promise<PledgeRecord | null> {
  const db = await openDatabase();
  if (!db) return null;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.PLEDGES, "readonly");
      const store = tx.objectStore(STORES.PLEDGES);
      const request = store.get(DEFAULT_PLEDGE_ID);

      request.onsuccess = () => {
        resolve((request.result as PledgeRecord) || null);
      };

      request.onerror = () => {
        resolve(null);
      };
    } catch {
      resolve(null);
    }
  });
}

/**
 * Saves a new advocacy pledge record locally.
 * Prevents duplicates by writing to the consistent primary key.
 */
export async function savePledge(
  pledgeVersion: string = "v1.0"
): Promise<PledgeRecord | null> {
  const db = await openDatabase();
  if (!db) return null;

  const record: PledgeRecord = {
    id: DEFAULT_PLEDGE_ID,
    pledgeVersion,
    completed: true,
    completedAt: new Date().toISOString(),
  };

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.PLEDGES, "readwrite");
      const store = tx.objectStore(STORES.PLEDGES);
      const request = store.put(record);

      request.onsuccess = () => {
        resolve(record);
      };

      request.onerror = () => {
        resolve(null);
      };
    } catch {
      resolve(null);
    }
  });
}

/**
 * Removes the locally stored pledge record.
 */
export async function removePledge(): Promise<boolean> {
  const db = await openDatabase();
  if (!db) return false;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.PLEDGES, "readwrite");
      const store = tx.objectStore(STORES.PLEDGES);
      const request = store.delete(DEFAULT_PLEDGE_ID);

      request.onsuccess = () => {
        resolve(true);
      };

      request.onerror = () => {
        resolve(false);
      };
    } catch {
      resolve(false);
    }
  });
}

// ==========================================
// ACTION PROGRESS STORE OPERATIONS
// Fields: id, actionId, completed, updatedAt
// ==========================================

/**
 * Retrieves all saved action progress records.
 */
export async function getActionProgressList(): Promise<ActionProgressRecord[]> {
  const db = await openDatabase();
  if (!db) return [];

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.ACTION_PROGRESS, "readonly");
      const store = tx.objectStore(STORES.ACTION_PROGRESS);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve((request.result as ActionProgressRecord[]) || []);
      };

      request.onerror = () => {
        resolve([]);
      };
    } catch {
      resolve([]);
    }
  });
}

/**
 * Saves or updates a single action item's completion state.
 */
export async function saveActionProgress(
  actionId: string,
  completed: boolean
): Promise<boolean> {
  const db = await openDatabase();
  if (!db) return false;

  const record: ActionProgressRecord = {
    id: actionId,
    actionId,
    completed,
    updatedAt: new Date().toISOString(),
  };

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.ACTION_PROGRESS, "readwrite");
      const store = tx.objectStore(STORES.ACTION_PROGRESS);
      const request = store.put(record);

      request.onsuccess = () => {
        resolve(true);
      };

      request.onerror = () => {
        resolve(false);
      };
    } catch {
      resolve(false);
    }
  });
}

/**
 * Clears all progress records from the actionProgress store.
 */
export async function resetActionProgress(): Promise<boolean> {
  const db = await openDatabase();
  if (!db) return false;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.ACTION_PROGRESS, "readwrite");
      const store = tx.objectStore(STORES.ACTION_PROGRESS);
      const request = store.clear();

      request.onsuccess = () => {
        resolve(true);
      };

      request.onerror = () => {
        resolve(false);
      };
    } catch {
      resolve(false);
    }
  });
}

// ==========================================
// DEVICE DECISIONS STORE OPERATIONS
// Fields: id, deviceType, recommendation, completedAt
// ==========================================

/**
 * Saves a completed decision tool outcome into local storage.
 */
export async function saveDeviceDecision(decision: {
  deviceType: string;
  recommendation: string;
}): Promise<DeviceDecisionRecord | null> {
  const db = await openDatabase();
  if (!db) return null;

  const record: DeviceDecisionRecord = {
    id: `decision_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    deviceType: decision.deviceType,
    recommendation: decision.recommendation,
    completedAt: new Date().toISOString(),
  };

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.DEVICE_DECISIONS, "readwrite");
      const store = tx.objectStore(STORES.DEVICE_DECISIONS);
      const request = store.put(record);

      request.onsuccess = () => {
        resolve(record);
      };

      request.onerror = () => {
        resolve(null);
      };
    } catch {
      resolve(null);
    }
  });
}

/**
 * Retrieves all saved device decisions from local storage.
 */
export async function getAllDeviceDecisions(): Promise<DeviceDecisionRecord[]> {
  const db = await openDatabase();
  if (!db) return [];

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.DEVICE_DECISIONS, "readonly");
      const store = tx.objectStore(STORES.DEVICE_DECISIONS);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve((request.result as DeviceDecisionRecord[]) || []);
      };

      request.onerror = () => {
        resolve([]);
      };
    } catch {
      resolve([]);
    }
  });
}

// ==========================================
// NUCLEAR CAMPAIGN DATA RESET
// Clears all object stores in AfterTheUpgradeDB
// ==========================================

export interface ClearDataResult {
  success: boolean;
  clearedStores: string[];
}

/**
 * Clears all campaign records (pledges, actionProgress, deviceDecisions) from AfterTheUpgradeDB.
 */
export async function clearAllCampaignData(): Promise<ClearDataResult> {
  const db = await openDatabase();
  if (!db) {
    return { success: false, clearedStores: [] };
  }

  const storesToClear = [
    STORES.PLEDGES,
    STORES.ACTION_PROGRESS,
    STORES.DEVICE_DECISIONS,
  ];

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(storesToClear, "readwrite");
      const cleared: string[] = [];

      for (const storeName of storesToClear) {
        const store = tx.objectStore(storeName);
        store.clear();
        cleared.push(storeName);
      }

      tx.oncomplete = () => {
        resolve({ success: true, clearedStores: cleared });
      };

      tx.onerror = () => {
        console.warn("[AfterTheUpgradeDB] Error while clearing all stores:", tx.error);
        resolve({ success: false, clearedStores: [] });
      };

      tx.onabort = () => {
        resolve({ success: false, clearedStores: [] });
      };
    } catch (err) {
      console.warn("[AfterTheUpgradeDB] Exception clearing campaign data:", err);
      resolve({ success: false, clearedStores: [] });
    }
  });
}
