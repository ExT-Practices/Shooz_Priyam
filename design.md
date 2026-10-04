# Qx Shooz ( Password : 1 )

## Context and Goals
Create implementation-ready, token-driven UI guidance for Qx Shooz that is optimized for consistency, accessibility, and fast delivery across the e-commerce storefront. The design must be clean, functional, and implementation-oriented.

## Design Tokens and Foundations

### Typography
- **Primary Font**: `Manrope`
- **Font Stack**: `Manrope, sans-serif`
- **Base Size**: `16px`
- **Base Weight**: `400`
- **Base Line Height**: `25.6px`

#### Typography Scale
- `font.size.xs`: `0px`
- `font.size.sm`: `12px`
- `font.size.md`: `12.8px`
- `font.size.lg`: `14px`
- `font.size.xl`: `16px`
- `font.size.2xl`: `18px`
- `font.size.3xl`: `20px`
- `font.size.4xl`: `22px`

### Color Palette
- `color.text.primary`: `#333333`
- `color.text.tertiary`: `#ffffff`
- `color.surface.base`: `#000000`
- `color.surface.raised`: `#ae3f4f`
- `color.surface.strong`: `#4e4991`

### Spacing Scale
- `space.1`: `1px`
- `space.2`: `2px`
- `space.3`: `3px`
- `space.4`: `4px`
- `space.5`: `6px`
- `space.6`: `8px`
- `space.7`: `10px`
- `space.8`: `12px`

### Radius, Shadow, & Motion
- **Radius**: `radius.xs`: `4px`, `radius.sm`: `50px`
- **Motion (Duration)**: 
  - `instant`: `150ms`
  - `fast`: `200ms`
  - `normal`: `250ms`
  - `slow`: `300ms`
  - `slower`: `400ms`
  - `step6`: `500ms`
  - `step7`: `600ms`
  - `step8`: `700ms`

## Component-Level Rules

### Navbar
- **Anatomy**: Top promotional banner, secondary navigation bar (delivery, login, social), and primary navigation bar (logo, main links, utility icons).
- **Variants**: Default (desktop), Mobile (hamburger menu).
- **States**:
  - **Default**: Links use `color.text.primary`.
  - **Hover**: Links should display an underline or color shift. `motion.duration.fast` for transitions.
  - **Focus-Visible**: Must show a clear focus ring (e.g., 2px solid `#4e4991` with 2px offset).
  - **Active**: Indicates current page (e.g., "Home" with red underline).
- **Responsive Behavior**: 
  - Desktop: Full width, horizontal links.
  - Mobile: Links collapse into a hamburger menu. Top banners stack if necessary.
- **Interactions**:
  - **Keyboard**: Users must be able to Tab through all interactive elements (links, buttons, dismiss icons) in a logical order (left-to-right, top-to-bottom).
  - **Pointer**: Cursors must change to pointer on interactive elements.
  - **Touch**: Tap targets must be at least 44x44px equivalent on mobile devices.

## Accessibility Requirements
- **Target**: WCAG 2.2 AA.
- **Contrast Constraints Required**: All text must have a minimum contrast ratio of 4.5:1 against its background.
- **Keyboard-first Interactions Required**: All menus and dismiss buttons must be fully operable via keyboard.
- **Focus-Visible Rules Required**: Every interactive element MUST have a visible focus indicator.

## Content and Tone Standards
- **Tone**: Concise, confident, implementation-focused.
- **Examples**:
  - *Do*: "Shop Now", "Login"
  - *Don't*: "Click here to see our products", "Enter your credentials"

## Anti-Patterns and Prohibited Implementations
- **Don't** allow low-contrast text or hidden focus indicators.
- **Don't** introduce one-off spacing or typography exceptions. Stick to the defined scales.
- **Don't** use ambiguous labels or non-descriptive actions.
- **Don't** ship component guidance without explicit state rules.

## QA Checklist
- [ ] Are semantic tokens used instead of raw hex values in CSS?
- [ ] Do all components have defined states (default, hover, focus-visible, active, disabled)?
- [ ] Is the interface fully operable using only a keyboard?
- [ ] Do all text elements meet the 4.5:1 minimum contrast ratio?
- [ ] Are touch targets large enough on mobile?
- [ ] Are responsive breakpoints and edge-cases (like long content) handled?
