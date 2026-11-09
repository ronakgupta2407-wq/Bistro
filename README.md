# Bistro 57

A responsive, immersive cafe website for Bistro 57 in Gwalior, built with Vite, React, GSAP ScrollTrigger, Lenis, React Three Fiber, Framer Motion, Lucide icons, and Tailwind CSS utilities.

The experience follows a day at the cafe, from the first morning coffee through lunch, golden hour, and the 11 PM close. It includes a pinned story, horizontally scrolling menu, dish spotlight, draggable gallery, reservation request, and location information.

## Requirements

- Node.js 18 or newer
- npm

## Install and run

```bash
npm install
npm run dev
```

Vite prints the local development URL after startup.

## Motion and device support

- GSAP ScrollTrigger powers the pinned story and horizontal desktop menu. Lenis provides smooth scrolling.
- The coffee and dish illustrations use React Three Fiber and Drei on devices with adequate graphics and hardware support. A static image is used as the fallback.
- On small screens and for reduced-motion preferences, the story becomes a normal vertical sequence, the menu becomes a touch-scrollable row, and nonessential motion is reduced.
- The animated reservation form validates in the browser and hands off confirmation to phone or WhatsApp. It is not connected to a booking backend.

## Production build

```bash
npm run build
npm run preview
```

The optimized static site is generated in `dist/`.

## Deploy

### Vercel

Import the project into Vercel. Use `npm run build` as the build command and `dist` as the output directory. Vercel detects Vite automatically.

### Netlify

Import the project into Netlify. Set the build command to `npm run build` and the publish directory to `dist`.

## Customize

- **Menu:** Edit the item records and category labels in `src/data/menu.js`. Each record supports a name, category, short description, price, image URL, and optional `popular` marker.
- **Images:** Replace the Unsplash URLs in `src/data/menu.js` and the hero/about image URLs in `src/components/Sections.jsx` with Bistro 57 photography. Keep descriptive alt text on each image.
- **Colors and day/night transition:** Edit the `moodPalettes` in `src/App.jsx` and the experience styles in `src/experience.css`.
- **Business details:** Update structured data in `src/App.jsx` and contact details, links, and opening hours in `src/components/Immersive.jsx`.
- **Story scenes and gallery:** Edit the `stories` and `galleryPhotos` data near the top of `src/components/Immersive.jsx`.
- **3D fallback:** The low-end-device and reduced-motion checks are in `canRender3d` in `src/components/Immersive.jsx`; the scene components are in `src/components/CupScene.jsx`.

Replace the Unsplash sample photos with Bistro 57 photography before launch. The reservation form does not submit to a booking backend; connect it to a reservation service before relying on it for confirmed bookings.
