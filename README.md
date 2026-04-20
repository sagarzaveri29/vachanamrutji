# Vachanamrut Ji

A quiet, elegant reader for the words of Shrimad Rajchandra. Built with React + Vite.

![Paper-warm · Apple-Books-inspired](https://img.shields.io/badge/style-paper--warm-9B5A2A) ![React 18](https://img.shields.io/badge/react-18-61DAFB) ![Vite](https://img.shields.io/badge/vite-5-646CFF)

---

## What it is

A light, reverent app to read the Vachanamrut and (eventually) a growing library of related spiritual texts. The first book included is the **Shrimad Rajchandra Vachanamrut** — the complete 992-page Agas Ashram edition — rendered as a PDF, since the publisher's PDF uses legacy non-Unicode fonts. Future Unicode-typeset texts (Atmasiddhi, Apurva Avasar, etc.) can be added as they become available.

### Features

- **Google Sign-In** via `@react-oauth/google`
- **Library shelf** listing available books
- **PDF reader** with zoom, keyboard navigation, and per-book bookmark auto-save
- **Five themes** — Paper, Sepia, Light, Dark, Saffron
- **Four Gujarati fonts** — Noto Serif Gujarati, Hind Vadodara, Mukta Vaani, Rasa
- **Persistent user preferences** via localStorage
- **Responsive** — works well on desktop and tablet

---

## Quick start

Three commands get you running locally.

```bash
npm install
cp .env.example .env          # then open .env and paste your Google Client ID
npm run dev
```

The app opens at `http://localhost:5173`.

---

## Set up Google Sign-In

You need a Google OAuth Client ID for the sign-in button to work.

1. Go to the [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials)
2. Create a new project (or use an existing one)
3. Click **Create Credentials → OAuth client ID**
4. Application type: **Web application**
5. Under **Authorized JavaScript origins**, add:
   - `http://localhost:5173` (for local development)
   - Your production domain (when you deploy)
6. Click **Create**, copy the Client ID
7. Paste it into your `.env` file:

   ```env
   VITE_GOOGLE_CLIENT_ID=1234567890-abc...xyz.apps.googleusercontent.com
   ```

8. Restart `npm run dev`

> If you open the app without a Client ID, the login screen shows setup instructions instead of the Google button — you can still see the design, just not sign in.

---

## Project structure

```
vachanamrutji/
├── public/
│   ├── books/
│   │   └── Vachanamrut-shrimad-mark.pdf      # the included book
│   └── favicon.svg
├── src/
│   ├── App.jsx                                # main orchestrator
│   ├── main.jsx                               # mount + OAuth provider
│   ├── index.css                              # global styles
│   ├── theme/
│   │   └── tokens.js                          # 5 themes + 4 Gujarati fonts
│   ├── data/
│   │   └── books.js                           # library catalog
│   ├── screens/
│   │   ├── LoginScreen.jsx                    # Google sign-in
│   │   ├── LibraryScreen.jsx                  # book shelf
│   │   └── PdfReaderScreen.jsx                # react-pdf reader
│   ├── components/
│   │   ├── Icon.jsx                           # thin-stroke icon set
│   │   ├── PlaceholderCover.jsx               # book covers
│   │   └── SettingsModal.jsx                  # theme / font / size panel
│   └── lib/
│       ├── auth.jsx                           # AuthProvider, useAuth
│       └── settings.js                        # useSettings hook
├── index.html
├── package.json
├── vite.config.js
├── .env.example
└── .gitignore
```

---

## Adding more books

Open `src/data/books.js` and add a new entry. Two shapes are supported.

**PDF book** (like the included Vachanamrut):

```js
{
  id: 'my-book',
  title: 'My Book',
  titleGu: 'મારી પુસ્તક',
  author: 'Author Name',
  type: 'pdf',
  file: '/books/my-book.pdf',   // drop the PDF in public/books/
  pages: 200,
  cover: { label: 'My\nBook', tone: 'sepia' },
  description: '…',
}
```

**Typeset book** — for future Unicode content. The `typeset` type is scaffolded but the corresponding screen is not yet implemented. Add the content as a JS/JSON module under `src/data/` and wire up a reader screen when ready.

---

## Theming

Themes are defined in `src/theme/tokens.js`. Each theme is a set of color tokens (background, page, ink, accent, highlight, etc.) used throughout the UI. To add a new theme, duplicate an existing entry in `THEMES` and give it a new `id` and `name` — it appears automatically in the Settings modal.

---

## About the included book

The **Shrimad Rajchandra Vachanamrut** PDF is the Agas Ashram publication. It is:

- DRM-encrypted by the publisher (copy/print/modify disabled)
- Typeset in legacy non-Unicode Gujarati fonts

The app renders it as a page viewer — you see the original typography exactly as printed, but text selection and in-app search are not possible. For Unicode-searchable content, future releases will add hand-typed or OCR'd Unicode texts (beginning with short canonical works like *Apurva Avasar* and *Atmasiddhi*, which are in the public domain).

---

## Build for production

```bash
npm run build
npm run preview     # preview the production build locally
```

Deploy the `dist/` folder to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, Firebase Hosting). Remember to add your production domain to the Google OAuth "Authorized JavaScript origins."

---

## Tech

- **React 18** with function components and hooks
- **Vite 5** for dev server + build
- **react-pdf** (wrapping pdfjs-dist) for PDF rendering
- **@react-oauth/google** for Google Sign-In
- **jwt-decode** for parsing the Google ID token

No state manager, no component library, no CSS-in-JS framework — just React, inline styles, and design tokens. Kept deliberately simple.

---

## Future ideas

Scaffolding for these is already in the data model; each needs a dedicated reader screen or view:

- Unicode-typeset "clean" reader for short texts (Apurva Avasar, Atmasiddhi verses, Bhavna Bodh)
- Inline word lookup (glossary overlay on tap)
- Cross-letter search (once Unicode content exists)
- Notes & highlights
- Audio companions for chanted / sung texts
- Study companion — videos, connected notes, uploads per letter

---

## License

Code: MIT.
The included PDF is © Shrimad Rajchandra Ashram, Agas — used here for personal study.
