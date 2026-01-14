import { useState } from 'react';
import { RECIPES } from '../../lib/data';
import { useConfigStore } from '../../store/useConfigStore';
import { getRecipeContent } from '../../lib/recipeContent';
import type { Recipe } from '../../types';

export function RecipeSelection() {
  const { recipes, addRecipe, removeRecipe } = useConfigStore();
  const [expandedRecipes, setExpandedRecipes] = useState<Set<string>>(new Set());

  const isRecipeSelected = (recipeId: string) => {
    return recipes.some(r => r.id === recipeId);
  };

  const handleRecipeToggle = (recipe: Recipe) => {
    if (isRecipeSelected(recipe.id)) {
      removeRecipe(recipe.id);
    } else {
      addRecipe(recipe);
    }
  };

  const toggleExpanded = (recipeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedRecipes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(recipeId)) {
        newSet.delete(recipeId);
      } else {
        newSet.add(recipeId);
      }
      return newSet;
    });
  };

  // Group recipes by category (matching PowerPoint template structure)
  const recipesByCategory = {
    'individual-contributor': RECIPES.filter(r => ['day1-onboarding', '30-60-90-onboarding', 'critical-thinking', 'navigating-matrix', 'decoding-business'].includes(r.id)),
    'manager': RECIPES.filter(r => ['ascend-leadership', 'guiding-performance', 'delegation-stakeholder', 'ascend-plus', 'conflict-performance', 'people-leader-academy', 'coaching-next-line', 'leading-change-scale'].includes(r.id)),
    'executive': RECIPES.filter(r => ['one-voice', 'enterprise-thinking', 'high-performance-culture', 'change-leadership-transformation', 'leadership-coaching-cross-border', 'enterprise-mindset-strategy', 'global-mobility', 'summit-innovation', 'miscellaneous', 'global-perspectives'].includes(r.id)),
  };

  const categoryLabels = {
    'individual-contributor': 'Individual Contributor Courses',
    'manager': 'Manager Courses',
    'executive': 'Executive Courses',
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-secondary-dark mb-3">
          Select Training Recipes
        </h2>
        <p className="text-lg text-neutral-charcoal">
          Choose training programs from any stage (we recommend 4)
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
          <span className="text-sm font-bold text-primary">
            {recipes.length} selected
          </span>
          {recipes.length > 4 && (
            <span className="text-xs text-warning font-medium">
              (4 recommended)
            </span>
          )}
        </div>
      </div>

      {Object.entries(recipesByCategory).map(([categoryId, categoryRecipes]) => (
        <div key={categoryId} className="space-y-3">
          <h3 className="text-xl font-bold text-secondary-dark">{categoryLabels[categoryId as keyof typeof categoryLabels]}</h3>
          <div className="space-y-2">
            {categoryRecipes.map((recipe) => {
              const selected = isRecipeSelected(recipe.id);
              const isExpanded = expandedRecipes.has(recipe.id);
              const content = getRecipeContent(recipe.id);

              return (
                <div
                  key={recipe.id}
                  className={`rounded-lg border-2 transition-all duration-200 ${
                    selected
                      ? 'border-primary bg-primary/10 shadow-sm'
                      : 'border-neutral-light-gray hover:border-primary hover:bg-primary/5'
                  }`}
                >
                  <div
                    onClick={() => handleRecipeToggle(recipe)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleRecipeToggle(recipe);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={selected}
                    className="flex items-start gap-4 p-4 cursor-pointer"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        selected
                          ? 'border-primary bg-primary'
                          : 'border-neutral-light-gray'
                      }`}>
                        {selected && (
                          <span className="text-white text-xs font-bold">✓</span>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-bold text-neutral-charcoal mb-1">
                        {recipe.name}
                      </h4>
                      <p className="text-sm text-neutral-charcoal font-medium">
                        {recipe.description}
                      </p>
                      {content && (
                        <button
                          onClick={(e) => toggleExpanded(recipe.id, e)}
                          className="mt-2 text-sm text-primary font-bold hover:text-primary/80 transition-colors"
                          aria-expanded={isExpanded}
                        >
                          {isExpanded ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </div>
                  </div>
                  {isExpanded && content && (
                    <div className="px-4 pb-4 pt-0 ml-9">
                      <div className="text-sm text-neutral-charcoal font-medium leading-relaxed whitespace-pre-wrap border-t border-neutral-light-gray pt-3">
                        {content.fullDescription}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
