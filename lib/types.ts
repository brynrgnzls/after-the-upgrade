/**
 * After the Upgrade — Core Type Definitions
 * Campaign: Advocacy for responsible e-waste, repair, reuse, donation, and data protection.
 */

// Target Audience types
export type TargetAudience =
  | "Students"
  | "Gadget owners"
  | "Schools and computer laboratories"
  | "Offices and small businesses"
  | "Families with unused electronics"
  | "Technology enthusiasts";

// Core Pillars
export type CampaignPillar = "Repair" | "Reuse" | "Donate" | "Recycle";

// Campaign Action (matching slogan: Repair it. Reuse it. Return it responsibly.)
export interface CampaignAction {
  action: "Repair" | "Reuse" | "Return Responsibly";
  tag: string;
  summary: string;
  route: string;
  actionLabel: string;
  keyPractices: string[];
}

// Campaign Metadata & Overview
export interface CampaignInfo {
  name: string;
  tagline: string;
  mainMessage: string;
  slogan: string;
  mission: string;
  vision: string;
  whyCreated: string;
  audiences: TargetAudience[];
  pillars: {
    name: CampaignPillar;
    description: string;
    actionLabel: string;
    route: string;
  }[];
  campaignActions: CampaignAction[];
  objectives: {
    id: string;
    title: string;
    description: string;
    targetGroup: string;
  }[];
  principles: {
    title: string;
    motto: string;
    description: string;
  }[];
  responsibleConsumption: {
    headline: string;
    coreTenets: string[];
    explanation: string;
  };
  communityParticipation: {
    group: string;
    roleDescription: string;
    practicalActivities: string[];
  }[];
}

// Learning Topic for E-Waste Problem
export interface LearningTopic {
  id: string;
  title: string;
  category: "environmental-impact" | "materials-and-minerals" | "device-longevity" | "circular-economy";
  summary: string;
  keyPoints: string[];
  recommendedActions: string[];
}

// E-Waste Equipment Categories
export interface EWasteCategory {
  id: string;
  name: string;
  examples: string[];
  typicalHazardousElements: string[];
  recoveryPotential: string;
}

// E-Waste Misconception
export interface EWasteMisconception {
  myth: string;
  reality: string;
  explanation: string;
}

// Device Decision Tree Matrix
export interface DeviceDecisionPath {
  id: string;
  deviceType: "smartphone" | "laptop" | "tablet" | "desktop" | "peripherals" | "cables";
  conditionCriteria: {
    working: boolean;
    batteryHealthPoor: boolean;
    screenDamaged: boolean;
    softwareSupported: boolean;
    userNeedsMet: boolean;
  };
  recommendedAction: CampaignPillar | "Responsible Disposal";
  actionSummary: string;
  suggestedNextSteps: string[];
  prerequisites: string[];
}

// Nontechnical Maintenance Topics
export interface DeviceMaintenanceTopic {
  id: string;
  title: string;
  category: "phone-laptop-care" | "battery-care" | "safe-cleaning" | "storage-management" | "software-maintenance" | "repair-vs-replace";
  targetHardware: string;
  difficulty: "Beginner" | "Intermediate";
  plainEnglishSummary: string;
  stepByStepGuidance: string[];
  whatToAvoid: string[];
}

// Creative Reuse Idea
export interface CreativeReuseIdea {
  id: string;
  oldDevice: string;
  newPurpose: string;
  setupSteps: string[];
  requiredAccessories: string[];
}

// Retirement Diagnostic Rubric
export interface RetirementThresholdItem {
  issue: string;
  verdict: "Repair Feasible" | "Consider Replacement / Certified Recycling";
  explanation: string;
  recommendation: string;
}

// Decision Recommendation Outcome
export interface DecisionRuleOutcome {
  id: string;
  title: string;
  badge: string;
  variant: "warning" | "highlight" | "tech" | "default";
  summary: string;
  whySelected: string;
  nextSteps: string[];
  disclaimer: string;
}

// Full Disposal Guidance Dataset
export interface DisposalGuidanceData {
  whySpecialHandling: {
    headline: string;
    summary: string;
    keyReasons: { title: string; detail: string }[];
  };
  workingDevicesPathway: {
    title: string;
    philosophy: string;
    recommendedActions: { step: string; description: string }[];
  };
  brokenDevicesPathway: {
    title: string;
    philosophy: string;
    recommendedActions: { step: string; description: string }[];
  };
  accessoriesAndCables: {
    title: string;
    summary: string;
    guidelines: { item: string; instruction: string }[];
  };
  swollenBatteryProtocol: {
    title: string;
    warning: string;
    immediateProtocols: string[];
  };
  whatToAvoid: {
    prohibition: string;
    reason: string;
  }[];
  transportPreparation: {
    step: string;
    detail: string;
  }[];
  questionsToAskProvider: {
    question: string;
    whyItMatters: string;
  }[];
}

// Data Safety Checklist Types
export interface DataSafetyChecklistItem {
  id: string;
  stepNumber: number;
  title: string;
  category: string;
  summary: string;
  actionItems: string[];
  osSpecificTips: {
    apple: string;
    android: string;
    windows: string;
  };
}

export interface DataSafetyChecklistData {
  notice: string;
  warningCloudSync: {
    title: string;
    summary: string;
    detail: string;
  };
  checklistSteps: DataSafetyChecklistItem[];
}

// Disposal Guidance & Safe Handling
export interface DisposalGuidanceItem {
  id: string;
  component: string;
  hazards: string[];
  safetyProtocol: string[];
  handlingPrecautions: string[];
  certificationStandards: string[];
}

// Action Checklist & Pledge
export interface ActionChecklistItem {
  id: string;
  title: string;
  description: string;
  category: "maintenance" | "preparation" | "donation" | "recycling";
  targetAudience: TargetAudience;
  impactLevel: "low-effort-high-impact" | "moderate" | "comprehensive";
}

// Social Media Toolkit Template
export interface SocialPostTemplate {
  id: string;
  platform: "x" | "linkedin" | "instagram" | "facebook" | "general";
  topic: string;
  hook: string;
  content: string;
  callToAction: string;
  hashtags: string[];
}

// Campaign Toolkit Enriched Types
export interface CampaignCaption {
  id: string;
  category: "short-social" | "long-organization" | "story-sized" | "announcement";
  categoryLabel: string;
  platformSuggestion: string;
  title: string;
  hook: string;
  content: string;
  callToAction: string;
  hashtags: string[];
}

export interface CampaignHashtagGroup {
  id: string;
  groupName: string;
  description: string;
  hashtags: string[];
}

export interface PosterHeadline {
  id: string;
  headline: string;
  subtext: string;
  targetEnvironment: string;
}

export interface CampaignDaySchedule {
  dayNumber: number;
  dayLabel: string;
  theme: string;
  focusArea: string;
  primaryObjective: string;
  suggestedOfflineAction: string;
  socialMediaPrompt: string;
}

export interface ClassroomPrompt {
  id: string;
  topic: string;
  question: string;
  context: string;
  keyDiscussionPoints: string[];
}

export interface OfflineActivity {
  id: string;
  title: string;
  targetGroup: string;
  duration: string;
  summary: string;
  materialsNeeded: string[];
  stepByStepInstructions: string[];
  safetyNotes: string;
}

export interface PersonalizationTip {
  id: string;
  tipTitle: string;
  recommendation: string;
  exampleSnippet: string;
}

export interface SocialPostsData {
  hashtagGroups: CampaignHashtagGroup[];
  captions: CampaignCaption[];
  posterHeadlines: PosterHeadline[];
  sevenDaySchedule: CampaignDaySchedule[];
  classroomPrompts: ClassroomPrompt[];
  offlineActivities: OfflineActivity[];
  personalizationTips: PersonalizationTip[];
}


// IndexedDB Models for Local Storage (AfterTheUpgradeDB)
export interface PledgeRecord {
  id: string;
  pledgeVersion: string;
  completed: boolean;
  completedAt: string;
}

export interface ActionProgressRecord {
  id: string;
  actionId: string;
  completed: boolean;
  updatedAt: string;
}

export interface DeviceDecisionRecord {
  id: string;
  deviceType: string;
  recommendation: string;
  completedAt: string;
}

// Take Action Checklist Types
export type TakeActionCategory =
  | "cleanup-challenge"
  | "digital-declutter"
  | "repair-commitment"
  | "donation-preparation";

export interface TakeActionItem {
  id: string;
  category: TakeActionCategory;
  categoryLabel: string;
  title: string;
  description: string;
  impact: string;
  timeEstimate: string;
}

// Legacy local storage types for backward compatibility
export interface LocalDeviceRecord {
  id: string;
  deviceType: string;
  brandModel: string;
  yearAcquired?: number;
  status: "active" | "needs-repair" | "ready-for-reuse" | "ready-for-donation" | "ready-for-recycling" | "recycled";
  notes?: string;
  dataWiped: boolean;
  dateLogged: string;
  lastUpdated: string;
}

export interface LocalPledgeRecord {
  id: string;
  audienceCategory: TargetAudience;
  pledgedActions: string[];
  pledgedAt: string;
  nameOrAlias?: string;
}

export interface LocalChecklistProgress {
  actionId: string;
  completed: boolean;
  completedAt?: string;
}

