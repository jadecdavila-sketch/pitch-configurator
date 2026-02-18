export interface Stage {
  id: string;
  name: string;
  description: string;
}

export interface Ambition {
  id: string;
  name: string;
}

export interface Recipe {
  id: string;
  name: string;
  stage: string;
  description: string;
}

export interface CaseTile {
  id: string;
  title: string;
  description: string;
  metric: string;
  icon: string;
  relatedRecipes?: string[];
}

export interface Path {
  type: 'certification' | 'tailored';
  partners?: string[];
}

export type FacilitationModel = 'internal' | 'external' | 'mixed';
export type Modality = 'digital' | 'hybrid' | 'in-person';

export type OrganizationalChallenge =
  | 'engagement'
  | 'attrition'
  | 'internal-mobility'
  | 'knowledge-transfer'
  | 'innovation-ownership'
  | 'leadership-pipeline'
  | 'skill-redundancy'
  | 'culture-misalignment';

export interface FixedPricing {
  type: 'fixed';
  amount: number;
}

export interface PerHeadPricing {
  type: 'per-head';
  pricePerHead: number;
  minimumEmployees: number;
}

export type PricingTier = 'base-ops' | 'base-plus' | 'enterprise';

export interface TierPricing {
  type: 'tier';
  tier: PricingTier;
  name: string;
  amount: number;
}

export type Pricing = FixedPricing | PerHeadPricing | TierPricing | null;

export interface ConfigurationState {
  clientName: string;
  stage: Stage | null;
  ambition: Ambition | null;
  challenges: OrganizationalChallenge[];
  recipes: Recipe[];
  caseTiles: CaseTile[];
  path: Path | null;
  facilitation: FacilitationModel;
  modality: Modality;
  cta: string;
  notes: string;
  narrative?: string;
  pricing?: Pricing;
}
