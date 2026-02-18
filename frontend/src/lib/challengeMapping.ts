import type { OrganizationalChallenge } from '../types';

// Maps recipe IDs to the challenges they address
export const RECIPE_CHALLENGE_MAP: Record<string, OrganizationalChallenge[]> = {
  // Day 1 Onboarding Delivery (30-60-90) - covers both onboarding recipes
  'day1-onboarding': ['engagement', 'attrition', 'knowledge-transfer', 'skill-redundancy', 'culture-misalignment'],
  '30-60-90-onboarding': ['engagement', 'attrition', 'knowledge-transfer', 'skill-redundancy', 'culture-misalignment'],

  // Critical Thinking
  'critical-thinking': ['engagement', 'innovation-ownership', 'leadership-pipeline', 'skill-redundancy'],

  // Navigating the Matrix
  'navigating-matrix': ['engagement', 'innovation-ownership', 'leadership-pipeline', 'culture-misalignment'],

  // Decoding the Business
  'decoding-business': ['engagement', 'internal-mobility', 'innovation-ownership', 'leadership-pipeline', 'skill-redundancy'],

  // ASCEND (New Manager Alignment)
  'ascend-leadership': ['engagement', 'attrition', 'leadership-pipeline', 'culture-misalignment'],

  // Guiding Performance (GROW Coaching)
  'guiding-performance': ['engagement', 'attrition', 'leadership-pipeline', 'culture-misalignment'],

  // Delegation & Stakeholder Alignment
  'delegation-stakeholder': ['internal-mobility', 'innovation-ownership', 'leadership-pipeline', 'skill-redundancy'],

  // ASCEND+ Advanced Manager
  'ascend-plus': ['engagement', 'attrition', 'internal-mobility', 'innovation-ownership', 'leadership-pipeline', 'skill-redundancy'],

  // Conflict & Performance Conversations (Lead with Courage)
  'conflict-performance': ['engagement', 'attrition', 'leadership-pipeline', 'culture-misalignment'],

  // People Leader Academy
  'people-leader-academy': ['attrition', 'internal-mobility', 'leadership-pipeline'],

  // Coaching Next Line Leaders
  'coaching-next-line': ['internal-mobility', 'leadership-pipeline'],

  // Leading Change at Scale
  'leading-change-scale': ['engagement', 'innovation-ownership', 'leadership-pipeline', 'culture-misalignment'],

  // One Voice, One Message
  'one-voice': ['engagement', 'leadership-pipeline', 'culture-misalignment'],

  // Enterprise Thinking
  'enterprise-thinking': ['internal-mobility', 'innovation-ownership'],

  // Building High-Performance Culture
  'high-performance-culture': ['engagement', 'attrition', 'innovation-ownership', 'leadership-pipeline', 'culture-misalignment'],

  // Change Leadership & Transformation
  'change-leadership-transformation': ['engagement', 'innovation-ownership', 'leadership-pipeline', 'culture-misalignment'],

  // Executive 1:1 Coaching (Cross-Border Impact)
  'leadership-coaching-cross-border': ['engagement', 'internal-mobility', 'innovation-ownership', 'leadership-pipeline', 'culture-misalignment'],

  // Enterprise Mindset & Business Strategy
  'enterprise-mindset-strategy': ['engagement', 'internal-mobility', 'innovation-ownership', 'leadership-pipeline', 'skill-redundancy'],

  // Global Mobility Readiness
  'global-mobility': ['engagement', 'attrition', 'internal-mobility', 'leadership-pipeline', 'culture-misalignment'],

  // Growth & Innovation Mindset (SUMMIT)
  'summit-innovation': ['engagement', 'innovation-ownership', 'leadership-pipeline'],

  // Global Perspectives (Cross-Cultural Onboarding)
  'global-perspectives': ['engagement', 'attrition', 'knowledge-transfer', 'culture-misalignment'],
};

// Helper function to check if a recipe addresses any of the selected challenges
export function recipeMatchesChallenges(
  recipeId: string,
  selectedChallenges: OrganizationalChallenge[]
): boolean {
  const recipeChallenges = RECIPE_CHALLENGE_MAP[recipeId] || [];
  return selectedChallenges.some((challenge) => recipeChallenges.includes(challenge));
}

// Helper function to get all challenges a recipe addresses
export function getRecipeChallenges(recipeId: string): OrganizationalChallenge[] {
  return RECIPE_CHALLENGE_MAP[recipeId] || [];
}
