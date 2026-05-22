---
name: Professional Suite
colors:
  surface: '#effcfe'
  surface-dim: '#d0dcdf'
  surface-bright: '#effcfe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eaf6f8'
  surface-container: '#e4f0f2'
  surface-container-high: '#deeaed'
  surface-container-highest: '#d9e5e7'
  on-surface: '#121d1f'
  on-surface-variant: '#3d4946'
  inverse-surface: '#273234'
  inverse-on-surface: '#e7f3f5'
  outline: '#6d7a76'
  outline-variant: '#bcc9c5'
  surface-tint: '#006b5f'
  primary: '#006b5f'
  on-primary: '#ffffff'
  primary-container: '#3bae9e'
  on-primary-container: '#003c35'
  inverse-primary: '#6bd9c7'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#8df1e3'
  on-secondary-container: '#006f65'
  tertiary: '#96472f'
  on-tertiary: '#ffffff'
  tertiary-container: '#e38467'
  on-tertiary-container: '#601f0a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#89f5e3'
  primary-fixed-dim: '#6bd9c7'
  on-primary-fixed: '#00201c'
  on-primary-fixed-variant: '#005047'
  secondary-fixed: '#90f4e6'
  secondary-fixed-dim: '#73d7ca'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#ffdbd0'
  tertiary-fixed-dim: '#ffb59f'
  on-tertiary-fixed: '#3a0a00'
  on-tertiary-fixed-variant: '#78311a'
  background: '#effcfe'
  on-background: '#121d1f'
  surface-variant: '#d9e5e7'
  bg-surface: '#F8FBFA'
  bg-canvas: '#EDF4F3'
  border-subtle: '#D1E2E0'
  text-muted: '#5F7A77'
typography:
  headline-xl:
    fontFamily: Manrope
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.25'
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-desktop: 48px
  margin-mobile: 20px
  stack-unit: 8px
---

## Brand & Style

The design system is defined by a sense of clarity, efficiency, and modern professionalism. It is tailored for high-utility SaaS applications that prioritize focus and reduced cognitive load. The aesthetic sits at the intersection of **Minimalism** and **Glassmorphism**, utilizing vast whitespace and subtle translucent layers to create a sense of breathability.

The emotional response should be one of "effortless productivity." By using a palette of calming aquamarine tones against high-stability neutrals, the UI feels both innovative and dependable. Visual hierarchy is established through soft depth rather than aggressive borders, ensuring the interface feels integrated into the user's workflow.

## Colors

The color strategy for the design system revolves around a monochromatic teal core supported by "Ice-Cold" neutrals. 

- **Primary Teal:** Used for the main calls to action and primary brand touchpoints. It should be applied as a solid or a subtle linear gradient to convey depth.
- **Surface Tones:** Instead of pure grays, all neutrals are tinted with a hint of cyan to maintain a cohesive atmospheric cool.
- **Functionality:** Use the high-contrast neutral (`#1E292B`) exclusively for headings and primary body text to ensure WCAG AA accessibility against the light backgrounds.

## Typography

This design system uses **Manrope** for all text roles. Manrope’s geometric yet humanist qualities provide the "refined and modern" look necessary for a professional tool.

- **Headlines:** Use tighter letter-spacing for XL headlines to maintain visual tension. Headlines should always use the primary neutral color.
- **Body Text:** Designed with a generous line height (1.6) to facilitate long-form reading in text areas and descriptions.
- **Labels:** Use medium or semi-bold weights to differentiate interactive cues from static body content.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a maximum content width of 1280px to ensure legibility on ultra-wide monitors. 

- **The 8px Rhythm:** All spacing between elements (margins/padding) must be multiples of 8px. 
- **Responsive Behavior:** 
    - **Desktop:** A 12-column grid with 24px gutters. Content should be centered with generous outer margins.
    - **Tablet:** A 6-column grid with 16px gutters.
    - **Mobile:** A 2-column grid. Side-by-side elements (like input and button) should reflow into a vertical stack.
- **Spaciousness:** Avoid crowding. Form sections should utilize at least 32px of vertical separation to maintain the "clean" brand promise.

## Elevation & Depth

Hierarchy is communicated through **Ambient Shadows** and **Tonal Layers**. 

1. **The Canvas:** The bottom-most layer uses the `bg-canvas` tint.
2. **The Card (Level 1):** Primary interaction areas are housed in white containers with a soft, diffused shadow (`0px 10px 30px rgba(29, 52, 54, 0.08)`).
3. **Glassmorphism (Level 2):** Floating elements, such as tooltips or dropdown menus, should use a backdrop filter (`blur(12px)`) with a semi-transparent white fill (80% opacity) and a 1px white inner border to simulate a glass edge.

Avoid using heavy black shadows; instead, use the primary neutral color with very low opacity (5-10%) to keep the elevation looking natural and "airy."

## Shapes

The shape language is consistently **Rounded**. This softens the technical nature of the application and makes the UI feel more approachable.

- **Standard Elements:** Buttons, input fields, and small cards use a 0.5rem (8px) radius.
- **Large Containers:** Main content cards or layout sections use a `rounded-lg` 1rem (16px) radius to emphasize their structural importance.
- **Interactive States:** On hover, clickable cards may subtly increase their perceived lift, but the corner radius remains constant to maintain grid alignment.

## Components

### Buttons
Primary buttons feature a horizontal gradient from `primary_color_hex` to `secondary_color_hex`. They use a bold label and center-aligned text. On hover, the button should scale slightly (1.02x) and increase shadow intensity.

### Input Fields & Textareas
Fields should be styled with a subtle `bg-surface` fill and a `border-subtle` outline. Placeholders must use `text-muted`. Focus states are indicated by a 2px solid primary color border and a soft glow effect.

### Cards
Cards are the primary organizational unit. They should have a white background, the standard `rounded-lg` corner radius, and the Level 1 ambient shadow. Padding within cards should be a minimum of 24px.

### Chips & Badges
Use a light version of the primary color (10% opacity) with the primary color for the text. These should be pill-shaped (full roundedness) to contrast against the more rectangular cards and inputs.

### Lists
Lists should be borderless, using vertical spacing and subtle divider lines (`1px solid border-subtle`) only when necessary for high-density data.