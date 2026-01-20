import { create } from 'zustand';
import type { ConfigurationState, Stage, Ambition, Recipe, CaseTile, Path, FacilitationModel, Modality, Pricing } from '../types';

interface ConfigStore extends ConfigurationState {
  setClientName: (clientName: string) => void;
  setStage: (stage: Stage) => void;
  setAmbition: (ambition: Ambition) => void;
  addRecipe: (recipe: Recipe) => void;
  removeRecipe: (recipeId: string) => void;
  addCaseTile: (caseTile: CaseTile) => void;
  removeCaseTile: (caseTileId: string) => void;
  setPath: (path: Path) => void;
  setFacilitation: (facilitation: FacilitationModel) => void;
  setModality: (modality: Modality) => void;
  setCta: (cta: string) => void;
  setNotes: (notes: string) => void;
  setNarrative: (narrative: string) => void;
  setPricing: (pricing: Pricing) => void;
  reset: () => void;
}

const initialState: ConfigurationState = {
  clientName: '',
  stage: null,
  ambition: null,
  recipes: [],
  caseTiles: [],
  path: null,
  facilitation: 'mixed',
  modality: 'hybrid',
  cta: 'Book a 45-minute working session to co-draft the 90-day plan.',
  notes: '',
  narrative: undefined,
  pricing: null,
};

export const useConfigStore = create<ConfigStore>((set) => ({
  ...initialState,

  setClientName: (clientName) => set({ clientName }),

  setStage: (stage) => set({ stage }),

  setAmbition: (ambition) => set({ ambition }),

  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [...state.recipes, recipe],
    })),

  removeRecipe: (recipeId) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== recipeId),
    })),

  addCaseTile: (caseTile) =>
    set((state) => ({
      caseTiles: [...state.caseTiles, caseTile],
    })),

  removeCaseTile: (caseTileId) =>
    set((state) => ({
      caseTiles: state.caseTiles.filter((c) => c.id !== caseTileId),
    })),

  setPath: (path) => set({ path }),

  setFacilitation: (facilitation) => set({ facilitation }),

  setModality: (modality) => set({ modality }),

  setCta: (cta) => set({ cta }),

  setNotes: (notes) => set({ notes }),

  setNarrative: (narrative) => set({ narrative }),

  setPricing: (pricing) => set({ pricing }),

  reset: () => set(initialState),
}));
