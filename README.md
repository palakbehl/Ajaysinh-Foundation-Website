# Ajaysinh Foundation NGO Website

A premium, modern, and emotionally engaging web platform built for **Ajaysinh Foundation**. This application is designed using a modern humanitarian aesthetic, combining clean typography, fluid layout systems, organic decorative accents, and premium animations.

---

## 🚀 Tech Stack

- **Core Framework**: React.js + Vite
- **Styling**: Tailwind CSS + Custom Vanilla CSS Variables
- **Animations**: Framer Motion (for springy hover-lifts, timeline reveals, page transitions, and floating vector badges)
- **Icons**: React Icons (`fi` prefix)
- **Form Controls & Validation**: React Hook Form + Zod validation schemas
- **Interactive Map**: Google Maps Embed API
- **Dynamic Payments**: UPI QR Code payload builder with reactive amount integration

---

## 🏗️ Project Architecture & Key Pages

The project features a modular routing setup comprising 10 primary pages and dynamic templates:

1. **Home Page (`/`)**: Features active campaigns grids, testimonials, newsletter forms, and emotional video narratives.
2. **About Page (`/about`)**: Chronicles the foundation's history, ground-level vision, key volunteers, and advisory board.
3. **Campaigns Page (`/campaigns`)**: Showcases our active causes with dynamic progress bars and target allocations.
4. **Campaign Detail Page (`/campaigns/:id`)**: An active dynamic template that parses campaign profiles, milestones, budget allocations, FAQs, and quotes using the React Router `useParams()` hook.
5. **Blogs Page (`/blogs`)**: An editorial storytelling board featuring dynamic categories, cinematic video diaries, and beneficiary profiles.
6. **Blog Detail Page (`/blogs/:id`)**: High-fidelity dynamic template rendering full article stories.
7. **CSR Partnership Page (`/csr`)**: 12-section layout targeting corporate alliances, detailing compliance registrations, offering PDF document downloads, and capturing inbound corporate leads.
8. **Become a Volunteer (`/volunteer`)**: Simple 5-step onboarding timeline alongside a stateful application form validated with React Hook Form & Zod.
9. **Contact Us (`/contact`)**: Split view hosting key contact details, a stateful contact form, a responsive Google Map panel, and quick links.
10. **Donate Now Page (`/donate`)**: Conversion-focused fundraising center containing animated impact cards, preset amount selectors, a donor form, payment gateway options, and a dynamic **UPI QR Code payment module**.

---

## ⚙️ How to Get Started

### 1. Installation
Clone or pull this repository and install all node dependencies:
```bash
npm install
```

### 2. Run Development Server
Start the Vite hot module replacement (HMR) server locally:
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) (or the port specified in console) inside your browser.

### 3. Build for Production
Bundle the project into optimized HTML, JS, and CSS files under `/dist`:
```bash
npm run build
```

### 4. Preview Build
Spin up a local node server to preview the built code:
```bash
npm run preview
```

---

## 📂 Codebase Directory Structure

```text
src/
├── components/          # Reusable UI component blocks
│   ├── about/           # About page visuals
│   ├── blogs/           # Card decks & categories
│   ├── campaign-detail/ # Dynamic story sections, sidebars
│   ├── campaigns/       # Cause grids & feature cards
│   ├── csr/             # Timeline & document cards
│   ├── donate/          # Amount selectors & QR payment blocks
│   ├── home/            # Featured sections & CTA grids
│   ├── volunteer/       # Accordions & application forms
│   └── ui/              # Buttons, floating vector vectors
├── data/                # Static data stores (blogs.js, campaigns.js)
├── layouts/             # Router shell containers (MainLayout.jsx)
├── pages/               # Main page routing components
├── App.jsx              # Routes configuration & ScrollToTop setup
└── main.jsx             # Entry point mount
```

---

## 🔒 Security & Verification Details
* All form validation checks are implemented client-side using robust **Zod** models to guarantee clean data input (phone number digit checks, email validation patterns, and required UTR validations for QR code payments).
* Iframe and external assets are configured with standard SSL security practices.
