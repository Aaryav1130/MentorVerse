# Seniorly: brand and logo spec (for implementation)

Use the files in this folder exactly as provided. Do not redraw or recreate the logo in code.

## Files
| File | Use |
|---|---|
| seniorly-logo.svg | Main logo (icon + wordmark) on light backgrounds. Use in navbar, login, landing page. |
| seniorly-logo-on-dark.svg | Same logo for dark backgrounds. |
| seniorly-icon.svg | Icon only (indigo square). Favicon, sidebar when collapsed, app icon. |
| seniorly-icon-white.svg | Icon on dark or indigo backgrounds. |
| seniorly-icon-1024.png / 512 / 192 | App store icon, PWA manifest icons. |
| seniorly-logo@4x.png, seniorly-logo-on-dark@4x.png | Raster fallback (emails, social, OG image). |

The wordmark text is already converted to outlines, so it renders identically everywhere with no font needed.

## Colors (design tokens)
- brand-primary:   #4F46E5  (indigo, icon background, buttons, links)
- brand-light:     #6366F1  ("ly" in wordmark, hover states)
- brand-accent:    #FBBF24  (amber, mentor dot, highlights, badges)
- brand-deep:      #1E1B4B  (dark backgrounds)
- text-primary:    #0F172A
- on-dark-accent:  #A5B4FC

## Typography
- Wordmark font: Poppins Medium (500), already baked into the SVG.
- Suggested UI font for the app: Poppins (headings) + Inter or Poppins (body), both on Google Fonts.

## Icon construction (for reference only, use the SVG)
80x80 canvas, corner radius 20. Three white bars (rx 3, width 14):
x=16,y=48,h=16 / x=33,y=38,h=26 / x=50,y=28,h=36. Amber circle cx=57, cy=17, r=6.

## Usage rules
- Logo aspect ratio is 4:1 (320x80). Set height only, e.g. navbar height 32px, width auto.
- Minimum logo height 24px. Minimum icon size 16px.
- Keep clear space around the logo equal to half the icon height.
- Do not stretch, recolor, rotate, add shadows, or change the amber dot.

## Quick snippets
HTML:  <img src="/brand/seniorly-logo.svg" alt="Seniorly" height="32" />
Favicon: <link rel="icon" type="image/svg+xml" href="/brand/seniorly-icon.svg" />
Tailwind colors: primary '#4F46E5', primaryLight '#6366F1', accent '#FBBF24', deep '#1E1B4B'
