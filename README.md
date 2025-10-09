# Fruit Inventory Dashboard

A modern React + Firebase CRUD experience inspired by Vercel’s dashboard aesthetic. The UI layers Tailwind CSS, realtime toasts, and silky hover transitions over the existing data flow.

## ✨ Highlights

- **Tailwind-powered design system** with custom color tokens for primary/save, update, delete, and navigation actions (`tailwind.config.js`).
- **Responsive dashboard shell** featuring a gradient backdrop, glassmorphism cards, and a sticky navbar with a dark-mode toggle.
- **Realtime Firebase CRUD** with optimistic loading states, confirmation dialogs, and toast feedback for create/update/delete operations.
- **Reusable UI atoms** including `Spinner` and `ConfirmDialog` powered by Headless UI.

## 🧱 Tech Stack

- React 19 (Create React App)
- Firebase Realtime Database
- Tailwind CSS 3 + PostCSS + Autoprefixer
- Headless UI + Heroicons (navigation + dialogs)
- react-hot-toast for feedback

## 🚀 Getting Started

```powershell
npm install
npm start
```

The dev server runs on [http://localhost:3000](http://localhost:3000). Environment credentials for Firebase are read from `src/firebaseConfig.js`.

To build for production:

```powershell
npm run build
```

Unit tests (from CRA scaffolding) are available via `npm test`.

## 🎨 Design System Overview

| Token | Usage | Example |
| --- | --- | --- |
| `primary` | Create/save actions | Blue pills (`btn-primary`) |
| `update` | Edit actions | Amber pills (`btn-update`) |
| `danger` | Destructive actions | Red pills (`btn-danger`) |
| `navigate` | Navigation/support | Teal pills (`btn-navigate`) |

Additional utilities (`glass-card`, `card-title`, etc.) live in `src/index.css` and can be applied across new pages.

### Layout anatomy

- `AppLayout` wraps every route and provides the gradient background, navbar, footer, and responsive container.
- Individual CRUD screens render inside glass cards with a consistent heading hierarchy (subtitle → title → body copy).
- Grid layouts adapt from 1 column on mobile to 3 columns on wide screens for fruit cards.

### Feedback & UX

- **Toasts** announce create/update/delete success and error states.
- **Loading spinners** render while data loads from Firebase (`Spinner` component).
- **Confirmation modal** (`ConfirmDialog`) protects destructive deletes.
- **Dark mode toggle** persists preference (`fruit-inventory:dark`) and restyles the gradient/background.

## 🔧 Extending the UI

- Update theme tokens in `tailwind.config.js` to tweak accent colors or shadows.
- Add new reusable utilities in `src/index.css` under the `@layer utilities` block.
- Compose additional pages by wrapping content in the `glass-card` container and reusing the button utility classes.

## 📄 License

MIT — reuse and adapt for your own realtime dashboards.
