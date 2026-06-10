# Tech Spec — Kosh Portfolio

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.0 | UI framework |
| `react-dom` | ^19.0 | DOM renderer |
| `three` | ^0.172.0 | WebGPU TSL sphere rendering |
| `gsap` | ^3.12.7 | Animation engine + ScrollTrigger |
| `lenis` | ^1.3.0 | Smooth scroll with inertia |

**Fonts** (Google Fonts CDN, no npm): DM Sans, Source Serif 4, JetBrains Mono.

**Dev**: `vite`, `@vitejs/plugin-react`, `typescript`, `tailwindcss`, `@tailwindcss/vite` (all from template).

---

## Component Inventory

### Layout

| Component | Source | Notes |
|-----------|--------|-------|
| **Navigation** | Custom | Fixed transparent nav. Full-screen overlay on mobile. Active section highlighting via IntersectionObserver. |
| **Footer** | Custom | Static, no logic. |
| **CustomCursor** | Custom | Global `position: fixed` div. Lerp-tracked mouse follower. Touch-device detection to hide. |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| **Hero** | Custom | Composes `WebGPUSphere` (absolutely positioned behind) + text block + CTAs + scroll indicator. Owns GSAP timeline orchestrating child animations. |
| **About** | Custom | Two-column layout. Contains `TerminalCard`. Stats count-up logic local. |
| **Work** | Custom | 2-col grid of work cards. ScrollReveal wrapper per card. |
| **Skills** | Custom | 4-col grid of skill cards with accent borders. |
| **Tools** | Custom | Flex-wrap badge grid. Center-outward stagger animation. |
| **Blog** | Custom | Horizontal scroll container (`overflow-x: auto`). Scroll-snap. |
| **Services** | Custom | 3 service cards on gradient background. |
| **Contact** | Custom | Two-column: left (email + socials), right (form). Copy-to-clipboard for email. |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| **WebGPUSphere** | Custom | Hero only. Isolated canvas, own render loop, WebGPU fallback detection. Must expose pause/resume via ref for IntersectionObserver. |
| **Typewriter** | Custom | Hero (subtitle), About (terminal text). Accepts `text`, `speed`, `delay`, `onComplete`. |
| **ScrollReveal** | Custom | Wraps every section's content elements. GSAP ScrollTrigger entrance (fade + translate). Configurable direction, stagger, delay. |
| **TerminalCard** | Custom | About section only. Styled chrome + `Typewriter` for content. |

**No shadcn/ui components used** — the design is fully custom with no standard UI patterns (dialogs, tables, forms, etc.).

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| **WebGPU TSL sphere** (gold iridescent, noise displacement, bloom) | Three.js (WebGPU renderer + TSL) | Procedural node material: thin-film interference, 2-octave noise displacement, breathing pulse. Post-processing bloom. Manual rotation instead of OrbitControls. | **High 🔒** |
| **Hero text entrance sequence** (multi-step: pre-title → name → typewriter → bio → CTAs → scroll indicator) | GSAP timeline | Single `gsap.timeline()` with absolute position offsets. `document.fonts.ready` gates start. Typewriter step integrated as timeline callback. | **High 🔒** |
| **Typewriter effect** (hero subtitle, terminal card) | Custom hook (`useTypewriter`) | `setInterval` per-character append. Blinking cursor via CSS keyframe after completion. Handles `onComplete` callback for timeline coordination. | Medium |
| **Scroll-triggered section entrances** | GSAP + ScrollTrigger | `ScrollReveal` wrapper: each element gets a ScrollTrigger (start: `"top 80%"`, once: true). Fade + translateY/X. Stagger on card grids. | Medium |
| **Custom cursor** (lerp follower, hover scale/glow) | CSS transitions + rAF | `requestAnimationFrame` loop with lerp (0.15 factor). Event delegation for hover detection (links/buttons). CSS handles scale/glow transition. | Medium |
| **Smooth scroll** | Lenis | Global instance. Integrated with GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`. | Low |
| **Nav scroll spy** | IntersectionObserver | One observer per section (threshold 0.3). Updates active nav link state. | Low |
| **Stat count-up** | GSAP | `gsap.to` on a proxy object, `onUpdate` sets React state. Triggered by ScrollTrigger. | Low |
| **Noise/grain overlay** | CSS only | Fixed `::after` pseudo-element with inline SVG data URI. No JS. | Low |
| **Scroll indicator bounce** | CSS only | `@keyframes` translateY oscillation, infinite. | Low |
| **Blog horizontal scroll** | CSS only | `overflow-x: auto` + `scroll-snap-type: x mandatory`. Hidden scrollbar. | Low |
| **Page load fade-in** | CSS only | Body `opacity: 0 → 1` transition, gated by `document.fonts.ready`. | Low |
| **WebGPU fallback** | CSS only | `navigator.gpu` check. CSS gradient orb + fade-out message. No Three.js loaded if unsupported. | Low |
| **Button/card hover effects** | CSS only | `transition` on transform, box-shadow, border-color. No JS. | Low |

---

## State & Logic Plan

### WebGPU Render Loop Lifecycle

The sphere's render loop (`requestAnimationFrame`) must **pause when the hero is not visible** to free GPU resources. Use an `IntersectionObserver` on the hero section container. The `WebGPUSphere` component exposes `pause()` and `resume()` methods via `useImperativeHandle`. The observer calls these based on visibility.

### Hero Animation Timeline Orchestration

The hero has a tightly sequenced GSAP timeline (7 steps, ~4s). The typewriter step is asynchronous — the timeline must wait for it to complete before continuing. Implement this by:

1. Gating the entire timeline on `document.fonts.ready`.
2. Adding the typewriter as a timeline callback with `.addCallback()` at the correct position.
3. The typewriter's `onComplete` resumes the timeline (or the timeline uses a sufficient delay based on character count × speed).

The `WebGPUSphere` canvas fade-in (opacity 0→1, 1s) is a separate animation that starts at the 400ms mark of the timeline — do not block the text sequence on canvas readiness.

### Lenis ↔ GSAP ScrollTrigger Integration

Lenis owns scroll; GSAP ScrollTrigger must read Lenis's scroll position. Connect them:

```javascript
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

This must be set up once at app mount in a global scroll provider.
