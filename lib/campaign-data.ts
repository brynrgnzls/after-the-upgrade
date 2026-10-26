import {
  CampaignInfo,
  LearningTopic,
  EWasteCategory,
  EWasteMisconception,
  DisposalGuidanceItem,
  DisposalGuidanceData,
  ActionChecklistItem,
  SocialPostTemplate,
  DeviceMaintenanceTopic,
  CreativeReuseIdea,
  RetirementThresholdItem,
  DecisionRuleOutcome,
  DeviceDecisionPath,
  DataSafetyChecklistData,
  TakeActionItem,
  SocialPostsData,
} from "./types";

import campaignJson from "@/data/campaign.json";
import learningTopicsJson from "@/data/learning-topics.json";
import deviceDecisionsJson from "@/data/device-decisions.json";
import deviceMaintenanceJson from "@/data/device-maintenance.json";
import disposalGuidanceJson from "@/data/disposal-guidance.json";
import dataSafetyChecklistJson from "@/data/data-safety-checklist.json";
import actionChecklistJson from "@/data/action-checklist.json";
import takeActionItemsJson from "@/data/take-action-items.json";
import socialPostsJson from "@/data/social-posts.json";

export function getCampaignInfo(): CampaignInfo {
  return campaignJson as CampaignInfo;
}

export function getLearningTopics(): LearningTopic[] {
  return (learningTopicsJson as { topics: LearningTopic[] }).topics;
}

export function getEWasteCategories(): EWasteCategory[] {
  return (learningTopicsJson as { categories: EWasteCategory[] }).categories;
}

export function getEWasteMisconceptions(): EWasteMisconception[] {
  return (learningTopicsJson as { misconceptions: EWasteMisconception[] }).misconceptions;
}

export function getMaintenanceGuides(): DeviceMaintenanceTopic[] {
  return (deviceMaintenanceJson as { maintenanceGuides: DeviceMaintenanceTopic[] }).maintenanceGuides;
}

export function getCreativeReuseIdeas(): CreativeReuseIdea[] {
  return (deviceMaintenanceJson as { reuseIdeas: CreativeReuseIdea[] }).reuseIdeas;
}

export function getDonationSteps(): { step: string; description: string }[] {
  return (deviceMaintenanceJson as { donationSteps: { step: string; description: string }[] }).donationSteps;
}

export function getRetirementRubric(): RetirementThresholdItem[] {
  return (deviceMaintenanceJson as { retirementThreshold: RetirementThresholdItem[] }).retirementThreshold;
}

export function getDecisionRules(): DecisionRuleOutcome[] {
  return (deviceDecisionsJson as { recommendedActions: DecisionRuleOutcome[] }).recommendedActions;
}

export function getDeviceDecisions(): DeviceDecisionPath[] {
  return (deviceDecisionsJson as { decisionPaths?: DeviceDecisionPath[] }).decisionPaths || [];
}

export function getFullDisposalGuidance(): DisposalGuidanceData {
  return disposalGuidanceJson as unknown as DisposalGuidanceData;
}

export function getDataSafetyChecklist(): DataSafetyChecklistData {
  return dataSafetyChecklistJson as DataSafetyChecklistData;
}

// Fallback for legacy components if needed
export function getDisposalGuidance(): DisposalGuidanceItem[] {
  return [];
}

export function getActionChecklist(): ActionChecklistItem[] {
  return actionChecklistJson as ActionChecklistItem[];
}

export function getTakeActionItems(): TakeActionItem[] {
  return takeActionItemsJson as TakeActionItem[];
}

export function getCampaignToolkitData(): SocialPostsData {
  return socialPostsJson as unknown as SocialPostsData;
}

export function getSocialPosts(): SocialPostTemplate[] {
  const data = socialPostsJson as unknown as SocialPostsData;
  if (data && Array.isArray(data.captions)) {
    return data.captions.map((c) => ({
      id: c.id,
      platform: (c.category === "short-social"
        ? "x"
        : c.category === "long-organization"
        ? "linkedin"
        : c.category === "story-sized"
        ? "instagram"
        : "general") as SocialPostTemplate["platform"],
      topic: c.title,
      hook: c.hook,
      content: c.content,
      callToAction: c.callToAction,
      hashtags: c.hashtags.map((h) => h.replace(/^#/, "")),
    }));
  }
  return [];
}


