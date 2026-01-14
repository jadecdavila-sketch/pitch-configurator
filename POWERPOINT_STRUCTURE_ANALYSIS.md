# PowerPoint Template Structure Analysis

**File:** `/Users/rebecca.davila/Documents/L&D-pitch-configurator/ppt/Jade 2025-12-18_ANSR template - 1 pagers.pptx`

**Analysis Date:** January 12, 2026

---

## Executive Summary

- **Total Slides:** 27
- **Slide Types:** Cover (1), Category Headers (3), Recipe/Content Slides (23)
- **Categories:** 3 main categories (Individual Contributor, Manager, Executive Courses)
- **No Placeholders:** This template uses named text boxes and shapes instead of PowerPoint placeholders

---

## 1. Overall Structure

### Category Distribution

```
Slide 1: COVER PAGE
│
├─ Slide 2: CATEGORY - Individual Contributor Courses
│  ├─ Slide 3: Recipe - Day 1 Onboarding
│  ├─ Slide 4: Recipe - 30-60-90 Structure
│  ├─ Slide 5: Recipe - Critical Thinking
│  ├─ Slide 6: Recipe - Navigating the Matrix
│  └─ Slide 7: Recipe - Decoding the Business
│
├─ Slide 8: CATEGORY - Manager Courses
│  ├─ Slide 9: Recipe - ASCEND: Leadership Alignment Program
│  ├─ Slide 10: Recipe - Guiding Performance
│  ├─ Slide 11: Recipe - Delegation & Stakeholder Alignment
│  ├─ Slide 12: Recipe - ASCEND+ Advanced Manager Program
│  ├─ Slide 13: Recipe - Conflict & Performance Conversations
│  ├─ Slide 14: Recipe - People Leader Academy
│  ├─ Slide 15: Recipe - Coaching Next Line Leaders
│  └─ Slide 16: Recipe - Leading Change at Scale
│
└─ Slide 17: CATEGORY - Executive Courses
   ├─ Slide 18: Recipe - One Voice, One Message, One Direction
   ├─ Slide 19: Recipe - Enterprise Thinking and Ownership
   ├─ Slide 20: Recipe - Building a High-Performance Culture
   ├─ Slide 21: Recipe - Change Leadership & Transformation
   ├─ Slide 22: Recipe - Leadership Coaching for Cross-border Impact
   ├─ Slide 23: Recipe - Enterprise Mindset & Business Strategy
   ├─ Slide 24: Recipe - Global Mobility Readiness
   ├─ Slide 25: Recipe - SUMMIT: Building Growth and Innovation Mindset
   ├─ Slide 26: Recipe - Miscellaneous
   └─ Slide 27: Recipe - Global Perspectives
```

---

## 2. Slide-by-Slide Breakdown

### SLIDE 1: COVER PAGE

**Type:** Cover
**Purpose:** Presentation title and metadata

**Text Elements (Named Shapes):**
- `Document Title`: "Learning as a Service: A Growth Multiplier"
- `TextBox 2`: "An Embedded Learning Partner — Enabling Readiness That Scales"
- `Rectangle 3`: "November 2025" (date field)

**Key Finding:** No placeholders used; uses specifically named text boxes

---

### SLIDE 2: CATEGORY HEADER (Individual Contributor Courses)

**Type:** Category Header
**Purpose:** Section divider

**Text Elements:**
- `TextBox 1`: "Individual Contributor Courses"

**Pattern:** Simple, single text element for category name

---

### SLIDES 3-7: RECIPE SLIDES (Individual Contributor Category)

#### Example: Slide 3 - Day 1 Onboarding

**Text Elements (Named Shapes):**
- `Text 7`: Main tagline/hook
- `Rectangle 1`: Course title
- `Text 1`: Subtitle/description
- Multiple `Shape 2` and `Text 7`: Content sections
- Various `Rectangle` shapes: Layout elements
- `Shape 5` + `Text 5` pairs: Structured content blocks

**Pattern Observed:**
- Recipe slides have complex layouts with 20-40+ named elements
- Mix of rectangles, text boxes, and shapes
- Consistent naming patterns (e.g., "Text 7", "Shape 5", "Rectangle 1")
- Content organized in blocks/sections

---

### SLIDE 8: CATEGORY HEADER (Manager Courses)

**Type:** Category Header
**Purpose:** Section divider

**Text Elements:**
- `TextBox 1`: "Manager Courses"

**Pattern:** Identical structure to Slide 2

---

### SLIDES 9-16: RECIPE SLIDES (Manager Category)

#### Example: Slide 10 - Guiding Performance

**Text Elements (Named Shapes):**
- `Rectangle 1`: Course title ("Guiding Performance")
- `Text 1`: Subtitle ("Practical GROW Coaching for GCC Leaders")
- `Text 8`: Description/value proposition
- `Shape 22` + `Text 18`: Quote/testimonial section
- Multiple `Shape 2` + `Text 4` pairs: Feature sections
- `Text 5` elements: Detail descriptions and statistics
- Visual elements: `Oval`, `Freeform: Shape`, `Pic` (images)

**Pattern Observed:**
- 30-40+ elements per slide
- Structured sections with headers and descriptions
- Statistics and metrics included (e.g., "70%", "85%", "90%")
- Visual elements for emphasis
- Testimonials/quotes in specific shapes

---

### SLIDE 17: CATEGORY HEADER (Executive Courses)

**Type:** Category Header
**Purpose:** Section divider

**Text Elements:**
- `TextBox 1`: "Executive Courses"

**Pattern:** Identical structure to Slides 2 and 8

---

### SLIDES 18-27: RECIPE SLIDES (Executive Category)

**Pattern:** Similar to Manager recipe slides with varying complexity

---

## 3. Key Structural Patterns

### A. Slide Type Identification

| Slide Type | Characteristics | Element Count |
|------------|-----------------|---------------|
| **Cover** | 1-3 text elements, simple layout | 3 elements |
| **Category** | Single text box with category name | 1 element |
| **Recipe** | Complex layout, 20-40+ elements | 20-40+ elements |

### B. Naming Conventions

**Common Named Elements:**
- `Rectangle [number]`: Background shapes, title containers
- `Text [number]`: Text content blocks
- `Shape [number]`: Various content shapes
- `TextBox [number]`: Text containers
- `Oval [number]`: Circular visual elements
- `Freeform: Shape [number]`: Custom shapes
- `Pic`: Image placeholders

### C. Content Structure in Recipe Slides

**Typical Layout:**
1. **Header Section**
   - Main title (usually in `Rectangle 1`)
   - Subtitle/tagline (`Text 1` or similar)
   - Description/value proposition (`Text 8` or similar)

2. **Body Content**
   - Feature blocks (`Shape 2` + `Text 4` pairs)
   - Descriptions (`Text 5` elements)
   - Statistics/metrics (text elements with percentages)

3. **Supporting Elements**
   - Quotes/testimonials (in shaped boxes)
   - Visual dividers (rectangles, lines)
   - Images/icons (`Pic` elements)

---

## 4. Important Findings

### No Traditional Placeholders

**Critical:** This template does NOT use PowerPoint's placeholder system. All content is in named shapes and text boxes.

**Implication for Programmatic Population:**
- Cannot use standard placeholder APIs
- Must target elements by name or position
- Need to parse shape names to identify content areas
- May need to analyze text content to determine which element to modify

### Inconsistent Naming

- Shape numbers are not sequential
- Similar elements have different names across slides
- No standardized template structure

### Recipe Slide Variability

- Not all recipe slides have identical structure
- Some have 20 elements, others have 40+
- Content layout varies by course type and information density

---

## 5. Recommendations for Programmatic Population

### A. Slide Type Detection

Use content and element count to classify:
```
- Slide 1 → Cover (always)
- Element count = 1 → Category
- Element count > 15 → Recipe
```

### B. Content Targeting Strategy

**For Category Slides:**
- Target: `TextBox 1`
- Replace with: Category name

**For Recipe Slides:**
- **Option 1:** Target by name pattern
  - Find `Rectangle 1` → Course title
  - Find `Text 1` → Subtitle
  - Find `Text 8` → Description

- **Option 2:** Target by position/order
  - First text element → Title
  - Second text element → Subtitle
  - Third text element → Description

- **Option 3:** Duplicate entire slide template
  - Keep existing slide as template
  - Duplicate for each recipe
  - Replace text content in duplicates

### C. Recommended Approach

**Best Strategy:** Clone existing recipe slides and modify text

1. Keep Slide 1 (cover) as-is or with minor modifications
2. For each category:
   - Insert a category slide (clone Slide 2/8/17)
   - Update category name
   - For each recipe in category:
     - Clone an existing recipe slide from same category
     - Find and replace text elements by name or position
     - Preserve all formatting and layout

---

## 6. Text Element Mapping for Recipe Slides

### Common Patterns Observed

| Element Name Pattern | Likely Content | Example |
|---------------------|----------------|---------|
| `Rectangle 1` | Main course title | "Guiding Performance" |
| `Text 1` | Course subtitle | "Practical GROW Coaching..." |
| `Text 7`, `Text 8` | Value proposition | "Build muscle memory..." |
| `Shape 2` + `Text 4` | Section headers | "Full-Day Workshop" |
| `Text 5` | Descriptions | "In-person, hands-on..." |
| `Text 18`, `Shape 22` | Quotes/testimonials | "This isn't theory..." |

---

## 7. Summary Statistics

### Category Breakdown

| Category | Slides | Percentage |
|----------|--------|------------|
| Cover | 1 | 3.7% |
| Individual Contributor | 6 (1 header + 5 recipes) | 22.2% |
| Manager | 9 (1 header + 8 recipes) | 33.3% |
| Executive | 11 (1 header + 10 recipes) | 40.7% |

### Content Distribution

- **Total Recipe Slides:** 23
- **Average Recipes per Category:** 7-8
- **Most Recipes:** Executive Courses (10)
- **Fewest Recipes:** Individual Contributor Courses (5)

---

## 8. Next Steps for Implementation

1. **Library Selection:**
   - Evaluate `python-pptx` (Python) or `pptxgenjs` (JavaScript/Node)
   - Both can manipulate shapes by name

2. **Slide Template Strategy:**
   - Export representative slides (one of each type)
   - Create mapping of shape names to content fields
   - Build content injection system

3. **Testing Approach:**
   - Start with single recipe slide
   - Verify all text replacements work
   - Test with full category
   - Generate complete presentation

4. **Dynamic Generation:**
   - Parse recipe data from source (JSON/database)
   - Map recipe fields to shape names
   - Clone appropriate template slide
   - Inject content
   - Maintain formatting

---

## Appendix: Complete Slide List

1. Cover - "Learning as a Service"
2. Category - "Individual Contributor Courses"
3. Recipe - "Day 1 Onboarding"
4. Recipe - "30-60-90 Structure"
5. Recipe - "Critical Thinking"
6. Recipe - "Navigating the Matrix"
7. Recipe - "Decoding the Business"
8. Category - "Manager Courses"
9. Recipe - "ASCEND: Leadership Alignment"
10. Recipe - "Guiding Performance"
11. Recipe - "Delegation & Stakeholder Alignment"
12. Recipe - "ASCEND+ Advanced Manager"
13. Recipe - "Conflict & Performance Conversations"
14. Recipe - "People Leader Academy"
15. Recipe - "Coaching Next Line Leaders"
16. Recipe - "Leading Change at Scale"
17. Category - "Executive Courses"
18. Recipe - "One Voice, One Message"
19. Recipe - "Enterprise Thinking and Ownership"
20. Recipe - "Building High-Performance Culture"
21. Recipe - "Change Leadership"
22. Recipe - "Leadership Coaching"
23. Recipe - "Enterprise Mindset & Business Strategy"
24. Recipe - "Global Mobility Readiness"
25. Recipe - "SUMMIT"
26. Recipe - "Miscellaneous"
27. Recipe - "Global Perspectives"
