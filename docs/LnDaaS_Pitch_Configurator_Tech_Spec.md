# Technical Specification
## L&DaaS Choose-Your-Own Pitch Configurator

**Internal Tool for Custom Sales Proposal Generation**

Version 1.0  
November 12, 2025

---

## Executive Summary

This document outlines the technical requirements for developing an internal web-based configurator tool that enables clients to create customized Learning & Development as a Service (L&DaaS) sales proposals. The tool guides users through a multi-step selection process and generates tailored pitch materials including an AI-generated executive narrative and a comprehensive PDF proposal.

### Key Features

- 6-step configuration wizard with live preview
- Dynamic selection of GCC maturity stage, ambition, and program recipes
- AI-powered executive narrative generation using Google Gemini
- Automated PDF proposal export with branding and formatting
- Real-time storyboard that updates with user selections

### Target Users

Sales teams, client success managers, and business development professionals who need to quickly create customized L&DaaS proposals for prospective clients.

---

## Product Overview

### Purpose

The L&DaaS Choose-Your-Own Pitch Configurator streamlines the sales proposal creation process by providing a guided interface where users select relevant components based on client needs. The system automatically generates professional, customized materials including an AI-powered executive narrative and a formatted PDF proposal.

### User Flow

1. **Stage Selection:** User selects the client's GCC (Global Capability Center) maturity stage
2. **Ambition Selection:** User identifies the site head's primary business ambition
3. **Recipe Selection:** User adds up to 4 program recipes (training/development offerings)
4. **Case Studies:** System displays relevant pre-populated case study tiles with metrics
5. **Path & Delivery:** User configures certification path, facilitation model, and delivery modality
6. **Export:** User generates AI narrative, copies pitch outline, and exports final PDF proposal

---

## System Architecture

### High-Level Architecture

The application follows a modern three-tier architecture:

| Layer | Components |
|-------|-----------|
| **Presentation Layer** | React SPA with responsive UI, multi-step wizard, live storyboard sidebar |
| **Business Logic Layer** | Node.js/Express API, configuration state management, proposal generation logic |
| **Data Layer** | Static JSON configuration files for stages/recipes/case studies, session storage for user state |
| **External Services** | Google Gemini API for narrative generation, PDF generation library |

**Architecture Flow:**
```
Browser → React UI → REST API → Business Logic → Gemini API / PDF Generator → Response → Browser
```

---

## Data Models

### Configuration State Object

This represents the user's complete configuration throughout the wizard flow:

```json
{
  "stage": {
    "id": "design-setup",
    "name": "Design-Setup (IDS)",
    "description": "Define what from HQ onboarding can be repurposed..."
  },
  "ambition": {
    "id": "capability-hub",
    "name": "Capability Hub"
  },
  "recipes": [
    {
      "id": "onboarding-programs",
      "name": "Onboarding Programs",
      "stage": "design-setup"
    },
    {
      "id": "leadership-alignment",
      "name": "Leadership Alignment",
      "stage": "design-setup"
    }
  ],
  "caseTiles": [
    {
      "id": "onboarding",
      "title": "Onboarding",
      "metric": "Time-to-productivity ↓ 35%",
      "icon": "monitor"
    }
  ],
  "path": {
    "type": "certification",
    "partners": ["ISPI", "Arizona State University"]
  },
  "facilitation": "mixed",
  "modality": "hybrid",
  "cta": "Book a 45-minute working session to co-draft the 90-day plan.",
  "notes": ""
}
```

### Master Data Schemas

#### Stage Schema
```json
{
  "id": "string",
  "name": "string",
  "description": "string"
}
```

#### Ambition Schema
```json
{
  "id": "string",
  "name": "string"
}
```

#### Recipe Schema
```json
{
  "id": "string",
  "name": "string",
  "stage": "string",  // Associated stage ID
  "description": "string"
}
```

#### Case Tile Schema
```json
{
  "id": "string",
  "title": "string",
  "metric": "string",
  "icon": "string",
  "relatedRecipes": ["string"]  // Recipe IDs
}
```

---

## Technology Stack

| Category | Technology |
|----------|-----------|
| **Frontend Framework** | React 18+ with TypeScript |
| **State Management** | React Context API / Zustand |
| **Styling** | Tailwind CSS / CSS Modules |
| **Backend** | Node.js 18+ with Express.js |
| **API Communication** | REST API with Axios |
| **AI Generation** | Google Gemini API (gemini-1.5-pro) |
| **PDF Generation** | jsPDF or Puppeteer (HTML to PDF) |
| **Build Tool** | Vite |
| **Hosting** | Vercel / Netlify (frontend), Railway / Render (backend) |

---

## Feature Requirements

### 1. Navigation & Progress Tracking

1. Display horizontal progress stepper showing all 6 steps
2. Highlight current step, show completed steps with checkmark indicator
3. Provide Back/Next buttons for navigation
4. Validate required selections before allowing Next button click

### 2. Step 1: GCC Maturity Stage Selection

1. Display 4 stage options: Design-Setup (IDS), Stabilize, Scale, Transform
2. Each stage card shows name and description
3. User can select exactly ONE stage (radio button behavior)
4. Visual indication (border highlight) for selected stage

### 3. Step 2: Site Head Ambition Selection

1. Display 3 ambition options: Capability Hub, Talent Differentiator, Innovation Center
2. Each option has toggle switch for selection
3. User can select exactly ONE ambition

### 4. Step 3: Recipe Selection

1. Display all available recipes grouped by stage (Design-Setup, Stabilize, Scale, Transform)
2. Each recipe card shows name with Add toggle button
3. User can select UP TO 4 recipes (enforce maximum limit)
4. Disable additional selections once 4 recipes are chosen

#### Available Recipes by Stage

**Design-Setup:**
- Onboarding Programs
- Leadership Alignment
- Cross-Cultural Communication
- Compliance & Risk Awareness
- Knowledge Transfer & Process Transition
- Employer Value Proposition
- Policy & Process Localization

**Stabilize:**
- Navigating Matrix
- Retention & Engagement
- Manager Enablement
- Productivity & Quality Enablement
- Building Growth Mindset
- Culture Anchoring

### 5. Step 4: Case Studies Display

1. Display 6 pre-populated case study tiles in grid layout
2. Each tile shows: icon, title, and key metric
3. Tiles are display-only (no interaction required)

#### Pre-populated Case Tiles

- **Onboarding:** Time-to-productivity ↓ 35%
- **Emerging Leaders:** Manager-ready talent ↑ 2.4x
- **Fast Leap:** Critical skills in 12 weeks
- **Individual Contributor:** QA escapes ↓ 28%
- **Domain Knowledge:** Ticket deflection ↑ 22%
- **Stepping Up:** Internal fill rate ↑ 31%

### 6. Step 5: Path & Delivery Configuration

#### Path Selection
1. Two options: Standard Certification or Tailored Path
2. Standard Certification displays partner logos (ISPI, Arizona State University)
3. Tailored Path shows description of custom blended approach

#### Facilitation Model
1. Radio button selection: internal / external / mixed
2. Default to 'mixed'

#### Modality
1. Radio button selection: Digital / Hybrid / In-person
2. Default to 'hybrid'

### 7. Step 6: Narrative & Export

#### Executive Narrative Generation
1. Generate Narrative button triggers Gemini API call
2. Display loading state during API call
3. Display generated narrative in text area (editable)
4. Copy button to copy narrative to clipboard

#### Pitch Outline
1. Display structured outline with all user selections
2. Copy Outline button to copy formatted text to clipboard

#### PDF Export
1. Export Proposal button triggers PDF generation
2. PDF includes: cover page, executive narrative, stage/ambition/recipes, case studies, delivery details
3. Apply branding: logo, color scheme, fonts
4. Automatically download PDF to user's device

#### Notes Field
1. Freeform text area for client context, names, domain problems
2. Notes included in PDF export but not in narrative generation prompt

### 8. Live Storyboard Sidebar

1. Fixed sidebar on right side of screen
2. Auto-updates in real-time as user makes selections
3. Displays: current stage, ambition, recipes list, case tiles, path, facilitation, modality, CTA
4. Compact, scannable format with clear section labels
5. Remains visible throughout all steps for reference

---

## API Requirements

### Backend REST API Endpoints

#### 1. GET /api/stages

- **Purpose:** Retrieve all available GCC maturity stages
- **Response:** Array of stage objects with id, name, description
- **Status Codes:** 200 OK, 500 Internal Server Error

#### 2. GET /api/ambitions

- **Purpose:** Retrieve all available ambitions
- **Response:** Array of ambition objects with id, name
- **Status Codes:** 200 OK, 500 Internal Server Error

#### 3. GET /api/recipes

- **Purpose:** Retrieve all available recipes
- **Response:** Array of recipe objects with id, name, stage, description
- **Status Codes:** 200 OK, 500 Internal Server Error

#### 4. GET /api/case-tiles

- **Purpose:** Retrieve all case study tiles
- **Response:** Array of case tile objects with id, title, metric, icon
- **Status Codes:** 200 OK, 500 Internal Server Error

#### 5. POST /api/generate-narrative

- **Purpose:** Generate executive narrative using Gemini AI
- **Request Body:** Complete configuration state object (stage, ambition, recipes, path, facilitation, modality)
- **Response:** `{ "narrative": "string" }`
- **Status Codes:** 200 OK, 400 Bad Request, 500 Internal Server Error, 503 Service Unavailable

#### 6. POST /api/generate-pdf

- **Purpose:** Generate PDF proposal
- **Request Body:** Complete configuration state + generated narrative
- **Response:** PDF file (application/pdf)
- **Status Codes:** 200 OK, 400 Bad Request, 500 Internal Server Error

---

## Google Gemini API Integration

### API Configuration

1. **Model:** gemini-1.5-pro (latest stable version)
2. **Authentication:** API key stored in environment variable
3. **Temperature:** 0.7 (balanced creativity and coherence)
4. **Max Output Tokens:** 2000

### Prompt Template Structure

The prompt sent to Gemini should include the following context:

```
You are an expert L&D sales strategist writing an executive narrative for a
prospective client. Create a compelling, professional 3-4 paragraph narrative
that positions our L&DaaS solution.

Client Context:
- GCC Maturity Stage: {stage.name} - {stage.description}
- Site Head Ambition: {ambition.name}
- Selected Programs: {recipes[].name}
- Delivery Model: {path.type}, {facilitation} facilitation, {modality} modality

Guidelines:
- Focus on business outcomes and transformation
- Reference the specific stage challenges
- Weave in selected programs naturally
- End with the value proposition
- Professional, confident tone
```

### Error Handling

1. **Rate Limiting:** Implement exponential backoff retry logic
2. **API Failures:** Display user-friendly error message with retry button
3. **Timeout:** Set 30-second timeout, notify user if exceeded
4. **Invalid Response:** Validate response format, fallback to template if malformed

---

## PDF Generation Specifications

### PDF Structure

1. **Cover Page:** L&DaaS logo, title, client name (if provided), date
2. **Executive Summary:** AI-generated narrative
3. **Transformation Plan:** Stage, ambition, selected recipes with descriptions
4. **Proven Results:** Case study tiles with metrics
5. **Delivery Approach:** Path, facilitation, modality details
6. **Next Steps:** CTA and contact information

### Branding & Design

- **Color Scheme:** Match L&DaaS brand guidelines (primary, secondary, accent colors)
- **Typography:** Professional sans-serif font (Arial, Helvetica, or custom brand font)
- **Layout:** Clean, modern design with ample white space
- **Graphics:** Icons for case studies, stage diagrams if applicable
- **Footer:** Page numbers, company info on each page

### Technical Implementation

**Recommended Approach:** Puppeteer (HTML to PDF)

- **Rationale:** Allows use of HTML/CSS for layout, easy to maintain branding, supports complex designs
- **Process:** Generate HTML template with data → Puppeteer renders to PDF → Return file to client

**Alternative:** jsPDF with jsPDF-AutoTable

- **Use Case:** If Puppeteer is too resource-intensive, jsPDF offers lightweight PDF generation

---

## UI/UX Requirements

### Responsive Design

- Desktop-first design (primary use case)
- Minimum supported resolution: 1366x768
- Tablet support (1024px+) with sidebar collapsible

### Visual Design

- Modern, clean interface with clear visual hierarchy
- Card-based layout for options (stages, ambitions, recipes)
- Consistent spacing, padding, and alignment
- Hover states for interactive elements

### Accessibility

- WCAG 2.1 AA compliance for color contrast
- Keyboard navigation support (Tab, Enter, Arrow keys)
- Screen reader compatibility with proper ARIA labels
- Focus indicators on interactive elements

### Loading States & Feedback

- Spinner/skeleton screens during API calls
- Success/error toast notifications for actions
- Progress indicator showing generation status
- Disabled state for buttons during processing

### Validation & Error Messages

- Inline validation for required selections
- Clear error messages explaining what went wrong
- Prevent navigation to next step if current step incomplete

---

## Security & Performance

### Security Considerations

- **API Key Management:** Store Gemini API key in environment variables, never expose in frontend
- **Input Sanitization:** Sanitize user inputs (especially notes field) to prevent injection attacks
- **HTTPS:** All API communication over HTTPS
- **Rate Limiting:** Implement rate limiting on backend endpoints to prevent abuse

### Performance Optimization

- **Lazy Loading:** Load recipe data on-demand if large dataset
- **Caching:** Cache static data (stages, recipes) on frontend
- **Debouncing:** Debounce text input for notes field
- **Code Splitting:** Split React components by route for faster initial load
- **Asset Optimization:** Compress images, minify CSS/JS

### Browser Support

- Chrome 90+ (recommended)
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Development Timeline

Estimated timeline for MVP delivery:

| Phase | Tasks | Duration |
|-------|-------|----------|
| **Phase 1: Setup & Infrastructure** | Project setup, repo creation, environment configuration, design system/component library | 3-5 days |
| **Phase 2: Frontend UI** | Build wizard steps, navigation, live storyboard, form components, validation | 7-10 days |
| **Phase 3: Backend API** | Build REST endpoints, integrate Gemini API, implement prompt engineering, error handling | 5-7 days |
| **Phase 4: PDF Generation** | Design PDF template, implement generation logic, apply branding | 4-6 days |
| **Phase 5: Testing & QA** | Unit tests, integration tests, E2E testing, bug fixes, cross-browser testing | 5-7 days |
| **Phase 6: Deployment** | Set up hosting, CI/CD pipeline, environment variables, staging/production deployment | 2-3 days |
| **Total MVP Timeline** | End-to-end delivery | **4-6 weeks** |



## Appendix A: Glossary

| Term | Definition |
|------|------------|
| **L&DaaS** | Learning & Development as a Service - outsourced training and development solutions |
| **GCC** | Global Capability Center - offshore/nearshore service delivery centers |
| **Recipe** | Pre-packaged training program or development offering (e.g., Onboarding Programs, Leadership Alignment) |
| **Case Tile** | Success story showcasing client results with quantifiable metrics |
| **ISPI** | International Society for Performance Improvement - certification partner |
| **Facilitation Model** | How training is delivered - by internal team, external consultants, or mixed approach |
| **Modality** | Format of training delivery - digital (online), hybrid (blended), or in-person |

---

