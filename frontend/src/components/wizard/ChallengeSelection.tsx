import { useConfigStore } from '../../store/useConfigStore';
import { Card, CardContent } from '../ui';
import type { OrganizationalChallenge } from '../../types';

interface ChallengeOption {
  id: OrganizationalChallenge;
  name: string;
  percentage: string;
  description: string;
}

const CHALLENGES: ChallengeOption[] = [
  {
    id: 'engagement',
    name: 'Engagement',
    percentage: '27%',
    description: 'Motivation Techniques & Recognition Programs',
  },
  {
    id: 'attrition',
    name: 'Attrition',
    percentage: '51%',
    description: 'Retention Strategies & Onboarding Programs',
  },
  {
    id: 'internal-mobility',
    name: 'Internal Mobility',
    percentage: '41%',
    description: "Career Paths, IDP's & Mobility Policies",
  },
  {
    id: 'knowledge-transfer',
    name: 'Knowledge Transfer',
    percentage: 'Early KT',
    description: 'Collaboration Tools & Knowledge Management',
  },
  {
    id: 'innovation-ownership',
    name: 'Innovation Ownership',
    percentage: '08%',
    description: 'Empowerment Strategies & Innovation Platforms',
  },
  {
    id: 'leadership-pipeline',
    name: 'Leadership Pipeline',
    percentage: '68%',
    description: 'Leadership Development & Succession Planning',
  },
  {
    id: 'skill-redundancy',
    name: 'Skill Redundancy',
    percentage: '94%',
    description: 'Upskilling Initiatives & Training Programs',
  },
  {
    id: 'culture-misalignment',
    name: 'Culture Misalignment',
    percentage: '18%',
    description: 'Cultural Integration & Communication Strategies',
  },
];

export function ChallengeSelection() {
  const { challenges, toggleChallenge } = useConfigStore();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-secondary-dark mb-3">
          Organizational Challenges
        </h2>
        <p className="text-lg text-neutral-charcoal">
          Across GCC's, the hurdles to future-ready look the same
        </p>
        <p className="text-sm text-neutral-charcoal/70 mt-2">
          5-Year Trend Analysis, 100+ Leaders Interviewed, Critical Challenges Identified
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {CHALLENGES.map((challenge) => {
          const isSelected = challenges.includes(challenge.id);
          return (
            <Card
              key={challenge.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                isSelected
                  ? 'ring-2 ring-primary border-primary bg-primary/5'
                  : 'border-neutral-light-gray hover:border-primary/50'
              }`}
              onClick={() => toggleChallenge(challenge.id)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div
                    className={`px-3 py-1 rounded text-sm font-bold ${
                      isSelected
                        ? 'bg-primary text-white'
                        : 'bg-secondary-dark text-white'
                    }`}
                  >
                    {challenge.percentage}
                  </div>
                  {isSelected && (
                    <svg
                      className="w-6 h-6 text-primary flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <h3 className="font-bold text-secondary-dark text-lg mb-2">
                  {challenge.name}
                </h3>
                <p className="text-sm text-black/80 font-medium">
                  {challenge.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {challenges.length > 0 && (
        <div className="bg-primary/5 rounded-lg p-4">
          <p className="text-sm font-medium text-neutral-charcoal">
            <span className="text-primary font-bold">{challenges.length}</span> challenge
            {challenges.length !== 1 ? 's' : ''} selected. Recipes will be filtered to address
            these challenges.
          </p>
        </div>
      )}
    </div>
  );
}
