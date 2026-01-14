import type { Stage, Ambition, Recipe, CaseTile } from '../types';

export const STAGES: Stage[] = [
  {
    id: 'design-setup',
    name: 'Design-Setup (IDS)',
    description: 'Define what from HQ onboarding can be repurposed and what must be localized',
  },
  {
    id: 'stabilize',
    name: 'Stabilize',
    description: 'Build consistent processes and strengthen team performance',
  },
  {
    id: 'scale',
    name: 'Scale',
    description: 'Expand operations and optimize for growth',
  },
  {
    id: 'transform',
    name: 'Transform',
    description: 'Drive innovation and strategic transformation',
  },
];

export const AMBITIONS: Ambition[] = [
  { id: 'capability-hub', name: 'Capability Hub' },
  { id: 'talent-differentiator', name: 'Talent Differentiator' },
  { id: 'innovation-center', name: 'Innovation Center' },
];

export const RECIPES: Recipe[] = [
  // Individual Contributor Courses (5 recipes - Template slides 3-7)
  { id: 'day1-onboarding', name: 'Day 1 Onboarding Delivery for GCCs', stage: 'design-setup', description: 'We deliver Day 1 so your teams can focus on Day 2 and beyond' },
  { id: '30-60-90-onboarding', name: 'The 30-60-90 Structure', stage: 'design-setup', description: 'Onboard & Understand, Contribute & Apply, Own & Impact' },
  { id: 'critical-thinking', name: 'Critical Thinking', stage: 'stabilize', description: 'Self-Awareness, Cognitive Bias, Structured Decision-Making' },
  { id: 'navigating-matrix', name: 'Navigating the Matrix', stage: 'stabilize', description: 'Accelerating Decision-Making in a Global Matrix' },
  { id: 'decoding-business', name: 'Decoding the Business: A Practical Guide for GCC Talent', stage: 'stabilize', description: 'Hybrid Learning with optional Business Acumen Simulation' },

  // Manager Courses (8 recipes - Template slides 9-16)
  { id: 'ascend-leadership', name: 'ASCEND: Leadership Alignment Program', stage: 'scale', description: 'A Half-Day Framework for New Managers' },
  { id: 'guiding-performance', name: 'Guiding Performance', stage: 'scale', description: 'Practical GROW Coaching for GCC Leaders' },
  { id: 'delegation-stakeholder', name: 'Delegation & Stakeholder Alignment', stage: 'scale', description: 'Build delegation and stakeholder management capabilities' },
  { id: 'ascend-plus', name: 'ASCEND+ Advanced Manager Program', stage: 'scale', description: 'Advanced leadership development for experienced managers' },
  { id: 'conflict-performance', name: 'Conflict & Performance Conversations', stage: 'scale', description: 'Driving Results with Empathy' },
  { id: 'people-leader-academy', name: 'People Leader Academy (pipeline to director)', stage: 'transform', description: 'Prepare high-potential managers for director-level roles' },
  { id: 'coaching-next-line', name: 'Coaching Next Line Leaders', stage: 'transform', description: 'Enable senior leaders to develop their teams' },
  { id: 'leading-change-scale', name: 'Leading Change at Scale', stage: 'transform', description: 'Navigate organizational transformation effectively' },

  // Executive Courses (10 recipes - Template slides 18-27)
  { id: 'one-voice', name: 'One Voice, One Message, One Direction', stage: 'transform', description: 'Executive alignment for unified leadership action' },
  { id: 'enterprise-thinking', name: 'Enterprise Thinking and Ownership', stage: 'transform', description: 'Develop strategic thinking at the enterprise level' },
  { id: 'high-performance-culture', name: 'Building a High-Performance Culture', stage: 'transform', description: 'Create and sustain a culture of excellence' },
  { id: 'change-leadership-transformation', name: 'Change Leadership & Transformation', stage: 'transform', description: 'Director-Level Change Leadership in Practice' },
  { id: 'leadership-coaching-cross-border', name: 'Leadership Coaching for Cross-border Impact', stage: 'transform', description: 'Executive coaching for global leadership' },
  { id: 'enterprise-mindset-strategy', name: 'Enterprise Mindset & Business Strategy', stage: 'transform', description: 'Align leadership thinking with business strategy' },
  { id: 'global-mobility', name: 'Global Mobility Readiness', stage: 'transform', description: 'Prepare leaders for international assignments' },
  { id: 'summit-innovation', name: 'SUMMIT: Building a Growth and Innovation Mindset', stage: 'transform', description: 'Capstone for Executive Leaders' },
  { id: 'miscellaneous', name: 'Miscellaneous', stage: 'transform', description: 'Additional executive development topics' },
  { id: 'global-perspectives', name: 'Global Perspectives', stage: 'design-setup', description: 'First 30 Days Cross-Cultural Communication Onboarding' },
];

export const CASE_TILES: CaseTile[] = [
  { id: 'critical-thinking-gcc', title: 'Critical Thinking', description: 'Building Decision-Making, Ownership, and Enterprise Confidence in a GCC', metric: 'Business acumen & fluency +30 points', icon: 'monitor' },
  { id: 'time-to-productivity', title: 'Accelerating Time to Productivity', description: 'Scaling a GCC Through Structured Functional Onboarding', metric: 'Time to productivity reduced by 35%', icon: 'trending-up' },
  { id: 'granulearn-digital', title: 'Turning Digital Investment into Frontline Execution', description: 'Using GranuLearn® to Build Last-Mile Adoption at Scale', metric: '25–30% reduction in manual errors', icon: 'book' },
  { id: 'functional-onboarding', title: 'Functional Onboarding', description: 'Accelerating Time to Productivity', metric: '35% reduction in time to productivity', icon: 'calendar' },
  { id: 'change-management', title: 'Change Management', description: 'Driving Behavior Change at Scale', metric: 'Consistent adoption of new behaviors', icon: 'users' },
  { id: 'culture-behaviors', title: 'Culture', description: 'Turning Values into Daily Behaviors', metric: 'Values shift from "posters" to operating norms', icon: 'target' },
  { id: 'lead-with-intent', title: 'Lead with Intent', description: 'Enabling New Managers to Shift from Doing to Leading', metric: '86% report higher confidence in people decisions', icon: 'users' },
  { id: 'storytelling', title: 'Storytelling', description: 'Signal Shift: Building communication and storytelling as a capability', metric: 'Rework ↓ 32%', icon: 'monitor' },
];

export const WIZARD_STEPS = [
  { id: 1, label: 'Client Information' },
  { id: 2, label: 'Recipes' },
  { id: 3, label: 'Case Studies' },
  { id: 4, label: 'Delivery' },
  { id: 5, label: 'Export' },
];
