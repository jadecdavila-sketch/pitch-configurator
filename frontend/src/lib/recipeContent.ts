export interface RecipeContent {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
}

export const RECIPE_CONTENT: Record<string, RecipeContent> = {
  'day1-onboarding': {
    id: 'day1-onboarding',
    name: 'Day 1 Onboarding',
    shortDescription: 'Ensure every new joiner arrives fully ready—operationally and culturally—from the moment they walk through the door.',
    fullDescription: `Launching a GCC is a high-stakes endeavor—retention, culture, and productivity are shaped long before employees write their first line of code or support their first customer. That's why Day 1 cannot be left to chance. It must be seamless, consistent, and confidence-building.

Our Day 1 Onboarding Delivery ensures that every new joiner arrives fully ready—operationally and culturally—from the moment they walk through the door. Leveraging a proven, structured flow (Pre-Day 1 Prep → Welcome → Tech & Access → Company Introduction → Confidence Check), we handle everything that typically strains HRBPs, IT, and business teams.

Your employees start with the essentials already in place:
• Access, assets, and tech readiness—laptops, logins, and badges set up without delays
• A warm, brand-aligned welcome experience that reflects your global identity
• Clear understanding of your purpose, values, and ways of working, ensuring alignment from Day One
• A first-day confidence pulse that helps your teams identify and address early risks immediately

For you, this means:
• Faster ramp-up and fewer early failures
• A consistent, high-quality experience across cohorts
• Reduced operational burden on managers and support teams
• A stronger cultural bridge between HQ expectations and the GCC environment
• More time for your leaders to focus on Day 2 and beyond

We don't just deliver a smooth Day 1—we ensure your people start strong, feel connected, and are ready to contribute. A world-class GCC begins with a world-class Day 1.`
  },

  '30-60-90-onboarding': {
    id: '30-60-90-onboarding',
    name: '30-60-90 Day Onboarding',
    shortDescription: 'A structured, performance-oriented experience that enables every new hire to become a confident, contributing team member within their first 90 days.',
    fullDescription: `Most onboarding programs handle HR formalities and tool setup but fail to deliver what GCCs need most: fast ramp-up, cultural alignment, and early value creation.

ANSR's 30-60-90 Onboarding Framework provides a structured, performance-oriented experience that enables every new hire to become a confident, contributing team member within their first 90 days.

Day 30 – Onboard & Understand
New hires develop clarity on the business, products, processes, and policies. They gain full system access, understand how work flows across global teams, and complete early deliverables with growing confidence.

Day 60 – Contribute & Apply
They deliver independently with reduced handholding, integrate into sprint cycles, collaborate across teams, apply AI tools responsibly, and build peer credibility.

Day 90 – Own & Impact
They independently deliver scoped outcomes, enhance processes, influence communication norms, and prepare for full performance ownership.

The GCC Advantage
With this model, your GCC gains:
• Faster time-to-productivity
• Higher early retention
• Stronger manager confidence
• Cross-border collaboration readiness
• Consistent, scalable onboarding for rapid GCC growth

ANSR's 30-60-90 model strengthens capability, accelerates contribution, and builds a reliable pipeline of talent ready to operate at global standards from the very start.`
  },

  'functional-onboarding': {
    id: 'functional-onboarding',
    name: 'Functional Onboarding',
    shortDescription: 'A GCC-specific accelerator built to reduce errors, strengthen communication between HQ and India, and make delivery predictable.',
    fullDescription: `When your GCC is scaling fast, the biggest risk isn't technical skill—it's functional readiness. Even highly experienced hires struggle when product knowledge is scattered, workflows differ from HQ, and escalation expectations aren't explicitly taught. The result? Slow ramp-up, early-cycle rework, and avoidable delivery delays that erode confidence across geographies.

Our Functional Onboarding program solves that.

We deliver a structured, repeatable, and culturally attuned onboarding pathway that equips every new hire with the clarity, confidence, and cross-functional understanding needed to perform within 45–60 days.

This is not generic onboarding. It is a GCC-specific accelerator built to reduce errors, strengthen communication between HQ and India, and make delivery predictable—even during rapid growth.

What you gain:
• 35% faster speed to productivity across technical and functional roles
• 40% fewer early-cycle errors and rework, improving delivery quality
• Consistent understanding of your product ecosystem, tools, and workflows
• Clear escalation pathways that reduce ambiguity and eliminate bottlenecks
• A scalable, repeatable model that supports future hiring waves with confidence

Functional onboarding transforms your GCC from "new talent finding its way" to a high-performing engine that delivers value from day one. It aligns culture, processes, and expectations—so your new hires aren't just joining the organization… they're contributing at full strength, faster.

If your ambition is operational excellence, predictable delivery, and sustainable scale, functional onboarding is the foundation you cannot afford to overlook.`
  },

  'navigating-matrix': {
    id: 'navigating-matrix',
    name: 'Navigating the Matrix',
    shortDescription: 'Build the capabilities your teams need to thrive in a matrixed enterprise with clarity in roles, confident stakeholder alignment, and effective negotiation.',
    fullDescription: `In today's global operating model, success isn't defined by hierarchy—it's defined by the ability of teams to navigate complexity, influence without authority, and drive alignment across functions, regions, and HQ. For GCC talent, this capability is no longer optional. It's the difference between delayed decisions and accelerated outcomes; between local execution and global impact.

Navigating the Matrix is a practical, hybrid learning experience designed specifically for GCC employees 6–18 months in role. Delivered across six weeks in three facilitated sessions, it builds the capabilities your teams need to thrive in a matrixed enterprise: clarity in roles and decision rights, confident stakeholder alignment, effective negotiation and prioritization, and the ability to move work forward without waiting for positional authority.

This program is not abstract theory. It is built around the real friction points GCC teams face daily—conflicting priorities from HQ and regions, unclear ownership, slow alignment cycles, and the hidden influencers who shape decisions. Participants leave with a repeatable toolkit they can apply immediately, improving collaboration, reducing escalations, and accelerating project delivery.

For Site Heads and HQ leaders, this means:
• Faster, cleaner decisions through better role clarity and alignment
• Improved stakeholder relationships between GCC teams and global partners
• Higher productivity with fewer bottlenecks and escalations
• More self-sufficient teams who can manage ambiguity and complexity with confidence
• A stronger talent pipeline prepared for cross-functional and global roles

As your GCC scales, matrix proficiency becomes a high-leverage capability—one that directly improves execution, collaboration, and the quality of global delivery. Navigating the Matrix provides that edge.`
  },

  'global-perspectives': {
    id: 'global-perspectives',
    name: 'Global Perspectives',
    shortDescription: 'Give your teams a unified way of communicating that honors cultural differences while establishing common standards for clarity and collaboration.',
    fullDescription: `In today's global operating model, your GCC is expected to deliver with speed, precision, and seamless alignment to headquarters. But even when teams speak the same language, subtle differences in communication styles, context levels, and word connotations create hidden friction. These misunderstandings slow down decisions, create rework, and erode trust between sites.

Global Perspectives gives your teams a unified way of communicating—one that honors cultural differences while establishing common standards for clarity, accountability, and collaboration. This program helps new hires and existing teams understand why communication breaks down across cultures and equips them with practical tools to prevent misalignment before it happens.

With Global Perspectives, your GCC will:
• Accelerate decision-making and reduce rework through shared communication norms
• Strengthen alignment with HQ by eliminating ambiguity in language, expectations, and feedback
• Enhance employee confidence and psychological safety, especially for teams navigating high- and low-context cultures
• Build a globally consistent experience that supports scale, quality, and operational excellence

Global Perspectives turns cultural differences into a strategic advantage, giving your GCC the communication discipline, shared language, and cross-site trust needed to perform as one global enterprise. Let's help your teams communicate with clarity—so they can deliver with impact.`
  },

  'ascend-leadership': {
    id: 'ascend-leadership',
    name: 'ASCEND Leadership',
    shortDescription: 'A purpose-built leadership framework designed to equip new frontline managers with the mindsets and capabilities required to stabilize, scale, and sustain a high-performing GCC.',
    fullDescription: `ASCEND is a purpose-built leadership framework designed to equip new frontline managers with the mindsets and capabilities required to stabilize, scale, and sustain a high-performing GCC from Day 1. Built around six essential dimensions—Align, Strategize, Cultivate, Engage, Nurture, and Drive—ASCEND provides managers with a clear roadmap for leading people, processes, and global partnerships in a complex, rapidly evolving environment.

What makes ASCEND different is its integration of proven team-development science with GCC-specific execution. Leaders are guided through Forming, Storming, Norming, and Performing as they build new teams, establish operating rhythms, embed cultural alignment with HQ, and create predictable, high-quality delivery. The result is faster ramp-up, stronger collaboration across borders, and a leadership bench that can scale with the business.

ASCEND gives your Site Head and frontline managers a shared, practical model for building trust, driving accountability, reducing risk, and accelerating performance—exactly what a growing GCC needs to operate with confidence from the start.`
  },

  'critical-thinking': {
    id: 'critical-thinking',
    name: 'Critical Thinking',
    shortDescription: 'Strengthen your managers\' ability to think clearly, question assumptions, and navigate complexity with discipline and confidence.',
    fullDescription: `In high-growth GCC environments, your managers make hundreds of decisions each week—many under pressure, across functions, and often with incomplete information. The difference between operational drag and operational excellence is their ability to think clearly, question assumptions, and navigate complexity with discipline and confidence.

Our Critical Thinking for GCC Leaders program strengthens this capability through a practical, framework-driven experience designed specifically for mid-level and senior managers in global operations. Participants learn to recognize cognitive biases, break down complex problems using proven models like the RED framework, and apply systems thinking to see the broader business impact of their decisions. Every module connects directly back to real GCC scenarios—cross-functional alignment, stakeholder management, risk evaluation, and decision quality.

This is a hands-on, experiential workshop built around simulations, case studies, guided reflection, and immediate application. Leaders walk away with repeatable tools, a clearer mental model for judgment, and the ability to make faster, more consistent, and more strategic decisions.

For a GCC, the impact shows up quickly:
• Fewer errors caused by bias or misalignment
• More structured thinking in meetings, escalations, and client conversations
• Stronger cross-functional collaboration and decision ownership
• Higher leadership maturity as the site scales

We offer to reinforce the learning with micro-courses, monthly peer meetups, and leadership reflection tools to ensure that behaviors stick long after the workshop ends.

If your goal is a leadership bench that is sharper, more self-aware, and equipped to handle complex global work—this is the program that builds it.`
  },

  'advanced-stakeholder-alignment': {
    id: 'advanced-stakeholder-alignment',
    name: 'Advanced Stakeholder Alignment',
    shortDescription: 'Equip employees with 2+ years of experience to communicate with global leaders in a way that is clear, direct, and strategically aligned.',
    fullDescription: `This course strengthens one of the biggest capability gaps in early-stage GCCs: the ability to communicate like strategic equals to global leaders. This course equips employees with 2+ years of experience to communicate with global leaders in a way that is clear, direct, and strategically aligned—without losing cultural respect. Participants learn how to escalate risks early, frame messages with business context, and present information with the confidence expected in global corporate environments.

Why this matters for your GCC:

Faster, clearer decision-making
Leaders hear what they need to hear—at the right altitude, with the right urgency. Teams learn how to structure updates, flag risks early, and avoid misinterpretation. Stakeholders view your GCC as a strategic extension of their business, not a delivery center.

Stronger internal leadership pipelines
Employees become more capable of managing cross-functional expectations.`
  },

  'coaching-for-performance': {
    id: 'coaching-for-performance',
    name: 'Coaching for Performance',
    shortDescription: 'Build the capabilities your managers need to run structured coaching conversations that drive ownership, clarity, and accountability.',
    fullDescription: `As your GCC scales, your managers become the engine that protects quality, accelerates delivery, and strengthens alignment with global stakeholders. Yet many managers struggle to run structured coaching conversations that drive ownership, clarity, and accountability.

Guiding Performance: Practical GROW Coaching for Emerging GCC Leaders is a high-impact, in-person workshop designed to build exactly those capabilities.

Through a rigorously structured, practice-based format, managers learn the GROW framework one step at a time—Goal, Reality, Options, and Way Forward—building the muscle memory needed to coach confidently in day-to-day interactions. Participants rotate through triads (Coach–Coachee–Observer), applying the full process to real scenarios from your GCC environment, ensuring the learning translates directly to performance on the floor.

The program also integrates cross-cultural communication skills essential for Indian teams working with U.S. and European counterparts: making expectations explicit, reducing ambiguity, delivering timely escalations, and communicating in a way that creates trust and transparency up the chain.

The result?
• Stronger decision-making
• Faster problem resolution
• More independent team members
• Better stakeholder alignment
• Consistent performance follow-through
• Fewer escalations to senior leadership

This course equips your managers with a simple, repeatable coaching framework that improves productivity and deepens leadership maturity across your GCC—exactly what you need as you grow and integrate more closely with global operations.

Let us help your managers coach with clarity, confidence, and consistency from day one.`
  }
};

export function getRecipeContent(id: string): RecipeContent | undefined {
  return RECIPE_CONTENT[id];
}
