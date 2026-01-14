/**
 * Maps recipe IDs to their corresponding slide numbers in the PowerPoint template
 * Template: /ppt/Jade 2025-12-18_ANSR template - 1 pagers.pptx
 *
 * Slide structure:
 * - Slide 1: Cover
 * - Slide 2: Individual Contributor category header
 * - Slides 3-7: Individual Contributor recipes
 * - Slide 8: Manager category header
 * - Slides 9-16: Manager recipes
 * - Slide 17: Executive category header
 * - Slides 18-27: Executive recipes
 */

export const RECIPE_TO_SLIDE_MAP: Record<string, number> = {
  // Individual Contributor Courses (slides 3-7)
  'day1-onboarding': 3,
  '30-60-90-onboarding': 4,
  'critical-thinking': 5,
  'navigating-matrix': 6,
  'decoding-business': 7,

  // Manager Courses (slides 9-16)
  'ascend-leadership': 9,
  'guiding-performance': 10,
  'delegation-stakeholder': 11,
  'ascend-plus': 12,
  'conflict-performance': 13,
  'people-leader-academy': 14,
  'coaching-next-line': 15,
  'leading-change-scale': 16,

  // Executive Courses (slides 18-27)
  'one-voice': 18,
  'enterprise-thinking': 19,
  'high-performance-culture': 20,
  'change-leadership-transformation': 21,
  'leadership-coaching-cross-border': 22,
  'enterprise-mindset-strategy': 23,
  'global-mobility': 24,
  'summit-innovation': 25,
  'miscellaneous': 26,
  'global-perspectives': 27,
};

// Category header slides
export const CATEGORY_HEADER_SLIDES = {
  'individual-contributor': 2,
  'manager': 8,
  'executive': 17,
};

// Helper function to get slide number for a recipe ID
export function getSlideNumber(recipeId: string): number | undefined {
  return RECIPE_TO_SLIDE_MAP[recipeId];
}

// Helper function to get category header slide number
export function getCategoryHeaderSlide(category: string): number | undefined {
  return CATEGORY_HEADER_SLIDES[category as keyof typeof CATEGORY_HEADER_SLIDES];
}
