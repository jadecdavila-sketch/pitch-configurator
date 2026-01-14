export interface CaseStudyContent {
  id: string;
  title: string;
  subtitle: string;
  context: string;
  challenges: string[];
  solution: {
    description: string;
    components: string[];
  };
  results: {
    timeframe: string;
    metrics: string[];
  }[];
  summary: string;
}

export const CASE_STUDY_CONTENT: Record<string, CaseStudyContent> = {
  'onboarding-functional': {
    id: 'onboarding-functional',
    title: 'Accelerating Functional Readiness & Speed to Performance',
    subtitle: 'Technology Global Capability Center (GCC)',
    context: 'A rapidly growing multinational technology firm initiated a significant expansion of its GCC handling mission-critical work including engineering, product lifecycle support, customer experience enhancements, and internal automation initiatives. As demand for specialized talent increased, the organization hired a large cohort of mid-career developers, engineers, analysts, and solution designers who were unfamiliar with the company\'s complex product ecosystem, internal development practices, global workflow expectations, and escalation norms.',
    challenges: [
      'Unclear Product & Process Knowledge: New hires struggled to understand the depth and interconnectedness of the product architecture with scattered, outdated documentation',
      'Lack of Awareness of Escalation & Support Mechanisms: Absence of clear framework for seeking help led to delays, incorrect decisions, and rework',
      'Limited Cross-Functional Understanding: Cultural nuances and organization-specific language created misunderstandings that slowed collaboration',
      'Productivity Ramp-Up Too Slow: Associates taking significantly longer than expected to reach baseline productivity with early project cycles suffering from defects and rework'
    ],
    solution: {
      description: 'A Structured Functional Onboarding Program designed to standardize role-specific onboarding, strengthen understanding of products and workflows, establish clear escalation pathways, and explicitly teach cultural nuances.',
      components: [
        'Core Product & System Knowledge: Deep dives into architecture, product lifecycles, and dependencies',
        'Process, Tools & Workflow Familiarization: Hands-on tool training and simulated tasks',
        'Escalation & Support Frameworks: Clear decision maps, escalation matrices, and playbooks',
        'Cross-Functional Understanding: End-to-end process flow sessions and cultural guidance',
        'Hybrid learning experience with self-paced microlearning, live virtual sessions, and hands-on simulations'
      ]
    },
    results: [
      {
        timeframe: 'Within 45-60 days',
        metrics: [
          '35% reduction in time required to reach baseline productivity',
          '40% reduction in early-cycle errors and rework',
          'New hires consistently met performance benchmarks',
          'Managers reported stronger confidence in new hire readiness',
          'Notable improvement in accuracy and assertiveness of escalations'
        ]
      }
    ],
    summary: 'By hardwiring communication norms, cultural alignment, and functional mastery into its onboarding process, the organization created a sustainable performance engine that strengthens the global delivery ecosystem. The transformation demonstrates the tangible impact of pairing structured learning with cultural fluency.'
  },

  'onboarding-day1': {
    id: 'onboarding-day1',
    title: 'Day 1 Onboarding Excellence',
    subtitle: 'Creating Memorable First Impressions',
    context: 'Organizations recognize that the first day experience sets the tone for an employee\'s entire tenure. A well-designed Day 1 program creates immediate connection to culture, clarifies expectations, and accelerates the transition from outsider to insider.',
    challenges: [
      'Inconsistent first-day experiences across locations and teams',
      'New hires feeling overwhelmed with information overload',
      'Lack of personal connection and sense of belonging',
      'Unclear immediate expectations and priorities'
    ],
    solution: {
      description: 'A structured Day 1 experience that balances essential information with meaningful human connection and cultural immersion.',
      components: [
        'Pre-boarding digital journey to handle logistics before arrival',
        'Warm welcome rituals and team introductions',
        'Culture immersion activities and values alignment',
        'Clear 30-day roadmap with immediate priorities',
        'Buddy/mentor pairing for ongoing support'
      ]
    },
    results: [
      {
        timeframe: '30 days',
        metrics: [
          '45% increase in new hire satisfaction scores',
          '60% reduction in early turnover (first 90 days)',
          'Faster time to first contribution',
          'Higher engagement scores at 30-day mark'
        ]
      }
    ],
    summary: 'A thoughtfully designed Day 1 experience transforms new hire anxiety into excitement and confidence. By front-loading connection and clarity, organizations see immediate improvements in satisfaction, engagement, and retention.'
  },

  'onboarding-30-60-90': {
    id: 'onboarding-30-60-90',
    title: '30-60-90 Day Structured Integration',
    subtitle: 'Accelerating Time to Full Productivity',
    context: 'The first 90 days are critical for establishing habits, building relationships, and achieving early wins. A structured 30-60-90 framework provides clear milestones and support mechanisms to ensure new hires progress systematically toward full productivity.',
    challenges: [
      'Unclear expectations for each phase of onboarding',
      'Inconsistent manager involvement and feedback',
      'New hires unsure if they\'re on track',
      'Lack of structured checkpoints and course correction opportunities'
    ],
    solution: {
      description: 'A milestone-based onboarding framework with clear deliverables, regular check-ins, and progressive responsibility increases.',
      components: [
        '30-day focus: Learn the fundamentals, build key relationships, complete essential training',
        '60-day focus: Apply learning, contribute to team projects, receive structured feedback',
        '90-day focus: Demonstrate independence, own deliverables, identify growth areas',
        'Weekly manager 1:1s with structured conversation guides',
        'Peer feedback loops and cross-functional exposure'
      ]
    },
    results: [
      {
        timeframe: '90 days',
        metrics: [
          '28% improvement in retention at 6 months',
          '50% faster time to full productivity',
          'Higher manager satisfaction with new hire performance',
          'Clearer identification of high-potential talent',
          'Reduced performance management issues in first year'
        ]
      }
    ],
    summary: 'The 30-60-90 framework transforms onboarding from a passive experience to an active journey with clear milestones. New hires know exactly what success looks like at each stage, enabling faster ramp-up and better long-term retention.'
  },

  'emerging-leadership': {
    id: 'emerging-leadership',
    title: 'Lead with Intent',
    subtitle: 'Enabling New and Emerging Leaders to Bridge Intent and Impact',
    context: 'A fast-growing GCC of a Fortune 500 enterprise is scaling rapidly, promoting several high-performing individual contributors into people management roles for the first time. While technically strong, many first-time managers struggle to shift from doing to leading, resulting in over-reliance on senior direction and misalignment in communication and stakeholder engagement.',
    challenges: [
      'First-time managers struggling to shift from doing to leading',
      'Over-reliance on senior direction for people decisions',
      'Misalignment in communication and stakeholder engagement',
      'Without strong first-line leadership, teams experience inconsistent execution and frequent escalations'
    ],
    solution: {
      description: 'Lead with Intent is a two-day experiential program that helps new managers translate intent into impact through structured reflection, real-world simulations, and peer coaching.',
      components: [
        'Core Leadership Shifts: From Individual Contributor to People Enabler',
        'From Task Orientation to Outcome Orientation',
        'From Managing for Compliance to Leading for Commitment',
        'From Following Direction to Owning Direction',
        'Reinforcement nudges and leadership sponsors sustain behavior change'
      ]
    },
    results: [
      {
        timeframe: '90 days',
        metrics: [
          '86% report greater confidence in managing team issues',
          '80% provide clearer goals and actionable feedback',
          '50% reduction in teams viewing managers as "senior peers" rather than leaders'
        ]
      },
      {
        timeframe: '180 days',
        metrics: [
          '60% take on expanded responsibilities or lead cross-functional projects',
          '85% of performance discussions completed on time',
          '88% of teams report strong engagement and higher psychological safety',
          '81% achieve targets with improved team morale'
        ]
      }
    ],
    summary: 'Lead with Intent is more than a leadership program—it\'s a culture catalyst. It helps new and emerging leaders connect intent to impact, build trust and clarity, and grow into leaders who don\'t just deliver results but enable others to perform to their highest potential.'
  },

  'lms-learning-tech': {
    id: 'lms-learning-tech',
    title: 'GCC-Driven Learning Strategy to Scale Global Ways of Working',
    subtitle: 'LXP Implementation for Engineering Excellence',
    context: 'A leading construction solutions provider with 25,000 employees across 15 countries discovered a critical gap in performance. Teams were not adopting digital workflows at the speed necessary for growth ambitions. Sales teams hesitated to engage with dashboards, frontline operations struggled to apply digital processes, and managers lacked visibility to coach and make timely decisions.',
    challenges: [
      'Learning content fragmented across multiple platforms with obsolete methods',
      'LMS was compliance-heavy with low engagement',
      'No personalized learning pathways for different skill levels',
      'Slow adoption of digital workflows and rework due to inconsistent processes',
      'Under-utilization of analytics tools and incomplete data for decisions'
    ],
    solution: {
      description: 'LXP Implementation driving end-to-end initiative by piloting with engineering teams, industrializing repeatable methods, and rolling out capabilities across global tech hubs.',
      components: [
        'Accelerating Engineering & Digital Maturity with curated technical journeys',
        'Boosting Technical Execution Confidence with role-specific pathways',
        'Strengthening Technical Decision Intelligence with scenario-based microlearning',
        'Standardizing Global Engineering Practices with unified coding standards and DevOps playbooks',
        'Reinforcing High-Quality Engineering Habits with AI-driven nudges in developer tools'
      ]
    },
    results: [
      {
        timeframe: '6 months',
        metrics: [
          '20-30% reduction in rework and reopened tickets',
          '25% increase in usage of internal engineering assets',
          'Accelerated CI/CD pipeline adoption across pilot squads'
        ]
      },
      {
        timeframe: '12 months',
        metrics: [
          '30-40% improvement in cycle time and lead time for changes',
          '35% improvement in automated test coverage and pipeline reliability',
          '40-50% reduction in time-to-productivity for new engineers',
          'Global engineering hubs align to shared playbooks and best practices'
        ]
      }
    ],
    summary: 'The LXP serves as an engineering capability engine, enabling developers to adopt modern engineering habits faster, reduce rework, increase automation, and create global consistency. By embedding learning into the flow of development, the organization strengthens technical execution confidence and creates a scalable, high-performing engineering culture.'
  },

  'culture': {
    id: 'culture',
    title: 'Operation One World',
    subtitle: 'How Zentharo Systems Built a Unified Global Culture',
    context: 'Zentharo Systems, a fast-rising mid-market technology company, launched a GCC in India starting with 50 people then scaling to 500 in 12 months, with 1,500 planned by year two. Despite strong talent on both sides, language, work style, and cultural expectations often collided due to misalignment in how teams communicate, collaborate, and interpret ownership.',
    challenges: [
      'Same job title means different things: U.S. PMs expected to "step up" and "own it" while India PMs focused on process adherence and avoiding premature escalation',
      'High-context vs. low-context cultures: U.S. prefers explicit, direct communication while India uses implied meaning and nuance',
      'Risk appetite vs. risk permission: Different expectations around experimentation and risk-flagging',
      'The "Ownership Gap": U.S. expects proactive problem-solving while GCC teams default to respect and diplomacy'
    ],
    solution: {
      description: 'Operation One World—an ambitious initiative to build a shared cultural operating system that preserves local strengths while creating global alignment.',
      components: [
        'Cross-Cultural Communication Essentials: Flagship workshop series decoding high-context vs. low-context communication, power distance, and feedback styles',
        'Global Perspectives eLearning: Task-driven microlearning covering cultural values, global workstyles, and communication adaptation',
        'Culture Anchoring Labs: Co-created sessions establishing shared definitions of ownership, risk-flagging norms, and team charters',
        'Cultural Cohesion Pathways: Tailored tracks for each department emphasizing cultural fluency in specific workflows',
        'In-Flow Reinforcement: Nudges, templates, and guides surfaced in Slack, Teams, Jira, and email'
      ]
    },
    results: [
      {
        timeframe: '6 months',
        metrics: [
          'Cross-cultural communication confidence rises by 40%',
          'Risk-flagging increases, reducing project delays',
          'PM–PM (U.S.–India) alignment drastically improves, cutting rework',
          'Misinterpretation-triggered escalations drop 30%'
        ]
      },
      {
        timeframe: '12 months',
        metrics: [
          'New GCC hires integrate 50% faster',
          'Cross-functional alignment improves across procurement, HR, and engineering',
          '"Ownership behaviors" increase nearly 2x',
          'Multi-country teams report faster decision cycles'
        ]
      },
      {
        timeframe: '24 months',
        metrics: [
          '1,500-person GCC operates with unified global culture model',
          'Psychological safety improves across functions and geographies',
          'Cross-continental teams deliver projects 20-25% faster',
          'The GCC becomes center of collaboration excellence'
        ]
      }
    ],
    summary: 'Operation One World demonstrates how intentional cultural alignment can accelerate business performance, strengthen global partnerships, and ensure that rapid scaling is matched with equally rapid development of capabilities. The GCC evolved from a transactional support center into a strategic, integrated extension of the enterprise.'
  }
};

export function getCaseStudyContent(id: string): CaseStudyContent | undefined {
  return CASE_STUDY_CONTENT[id];
}
