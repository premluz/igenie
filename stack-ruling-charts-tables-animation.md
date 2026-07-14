# STACK RULING: Charts / Tables / Animation

## Replacements

| Current | → | New | Rationale |
|---------|---|-----|-----------|
| Vega-Lite (canvas) | → | Recharts (SVG) | SVG integrates with semantic tokens; canvas colors disconnected |
| TanStack React Table (headless) | → | Astryx primitives (local state) | Lighter, token-aware, no abstraction tax |
| Framer Motion (JavaScript animation) | → | CSS transitions/keyframes (motion tokens) | Hardware-accelerated, token-driven, simpler reveal sequencing |
| Tailwind (dynamic classes) | → | Design tokens + CSS vars | Single source of truth for all visual attributes |

## Rejections & Reasons

### Vega-Lite rejected
- Canvas rendering bypasses design system
- Color specs hardcoded (not token-integrated)
- Spec generation on every render (wasteful)
- Not streaming-friendly (requires full spec upfront)

### Framer Motion rejected
- JavaScript animation (main thread blocking potential)
- Separate from CSS token system
- Over-engineered for simple reveal/stagger patterns
- Motion props tied to React lifecycle, not design tokens

### TanStack React Table rejected
- Headless abstraction adds complexity
- Sorting state scattered across components
- No native token integration
- Over-capable for current use cases

### Tailwind rejected
- Dynamic class generation uncheckable at build time
- Hardcoded hex values bypass tokens
- Arbitrary utility values circumvent design system
- Contradicts "no rigid component code" principle

## Token Addition: Visualization Palette

```css
/* Semantic token layer */
--viz-1: oklch(0.75 0.12 225);   /* Primary series (purple-blue) */
--viz-2: oklch(0.72 0.14 165);   /* Secondary (cyan) */
--viz-3: oklch(0.75 0.13 75);    /* Tertiary (lime) */
--viz-4: oklch(0.73 0.15 285);   /* Quaternary (violet) */
--viz-5: oklch(0.74 0.11 25);    /* Quinary (red) */
--viz-6: oklch(0.76 0.12 115);   /* Senary (yellow-green) */
```

### Theme implementations

```
theme.default.css
  └── Maps --viz-1..6 → Astryx data-viz cascade

theme.ops-dark.css (◆ Prem tuning pending)
  └── OKLCH band: L 0.70–0.78, C ≤ 0.16
      H: 225, 165, 75, 285, 25, 115

theme.glass.css (◆ Prem tuning pending)
  └── OKLCH band: L 0.70–0.78, C ≤ 0.16
      H: 225, 165, 75, 285, 25, 115
```

Implementation via theme-token skill (coordinated changeset).

## Linting

- `lint:tokens` still applies to chart/table components
- SVG stroke/fill attributes validated against token registry
- No hardcoded hex in cell components

## Next Steps (await confirmation)

- [ ] Check Astryx MCP for table primitives API
- [ ] Document Recharts + registry node wrapper pattern
- [ ] Define CSS keyframe motion tokens (stagger timing, easing)
- [ ] Author theme files (ops-dark, glass) with ◆ Prem's OKLCH tuning
