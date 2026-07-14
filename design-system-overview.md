# Design System Overview

## Architecture

**Tailwind CSS v4** (via @tailwindcss/vite plugin) integrated directly into Vite
- Design tokens defined as CSS variables in @theme block in index.css
- Utilities layer (@layer utilities) for semantic class names and card variants
- Component-scoped styling — components use Tailwind classes + custom utilities

## Token Structure

```css
@theme {
  --color-background: #191B24;
  --color-card: #1F202E;
  --color-accent: #7C80EF;
  --font-sans: "Barlow", sans-serif;
  --radius-card: 4px;
}
```

Then referenced via utilities:

```css
.bg-background { @apply bg-[#191B24]; }
.text-accent { @apply text-[#7C80EF]; }
```

## Current System Strengths

- **Centralized color palette** (7 semantic colors + component variants)
- **Card system** with 3 variants (glass, hover-glow, base)
- **List item patterns** (text vs. row)
- **Animation library** (shimmer, gemini-fade, rainbow-sweep)
- **Consistent spacing + radius standards**

## Gaps / Friction Points

- **Tokens scattered** — defined in CSS, no standalone token file (JSON/TS)
- **Hardcoded hex values mixed with CSS variables** (e.g., bg-[#1F202E] duplicates --color-card)
- **Utilities are rigid** — card-glass, list-row-item are prescriptive, hard to compose
- **No prop system** — tokens can't be programmatically accessed from components
- **Magic-button, generate-ideas-btn** — specific components baked into utilities layer (not reusable primitives)
- **Border opacities scattered** across multiple utilities (.border-subtle, .border-default, .border-hover)

## Would Storybook Help?

**Value: Moderate / Conditional**

### It would surface:
- Which utilities actually compose together
- Token misuse (hardcoded hex vs. semantic names)
- Opacity/color contrast issues across variants
- Animation consistency (where shimmer doesn't match gemini-fade rhythm)
- Over-specificity in utilities (magic-button is too bespoke)

### It wouldn't solve:
- The duplication (CSS variables + hardcoded hex)
- Lack of token versioning
- No programmatic token access for component props
- Documentation gap for token decisions

### Real value comes only if you:
1. **Export tokens to JSON/TS first** (separate token file)
2. **Strip out bespoke utilities** (magic-button, generate-ideas-btn)
3. **Focus Storybook on primitives only** (cards, buttons, list items, text styles)

Without that work first, Storybook is mostly visual documentation of what's already in CSS—low ROI.
