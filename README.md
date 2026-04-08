# A2Z Items – Store Frontend

A production-ready Vue 3 e-commerce store frontend for **A2Z Items** (used electronics), with a modular architecture, API service layer, and fallback mock data strategy.

---

## Project Description

This application is the frontend for **A2Z Items** (used electronics • A to Z). It includes:

- **Homepage** with hero carousel, category navigation, product filters (price, availability, subcategories, brands), and product grid
- **Product detail** page with full description and a “same category” product grid
- **Static pages:** About Us, Privacy Policy, Terms & Conditions, Contact Us
- **Cart** (state only; checkout not implemented)
- **Footer** with contact strip, company info, policies, distributorship/membership placeholders, payment partners, and floating action buttons (Chat, Compare, Cart)

The UI is responsive, and all list/banner/filter data is loaded via an API with automatic fallback to local mock JSON when the API fails, times out, or returns invalid data.

---

## Tech Stack

- **Vue 3** – Composition API, `<script setup>`
- **Vite** – Build tool and dev server
- **TailwindCSS** – Utility-first styling
- **Vue Router** – Client-side routing with layout and lazy-loaded pages
- **Pinia** – State management (cart, products, filters, categories, banners)
- **Axios** – HTTP client; all API access goes through a central `apiClient` and service modules

---

## Project Setup Instructions

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Installation

```bash
# Install dependencies
npm install

# Start development server (default: http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Environment (optional)

Copy `.env.example` to `.env` and set:

- `VITE_API_BASE_URL` – Base URL for the backend API (e.g. `http://localhost:3000/api`). If unset or unreachable, the app uses mock data.

---

## reset your changes after last commit
```
git reset --hard
```

## Project Folder Structure

```
src/
  assets/           # Global styles (e.g. main.css with Tailwind directives)
  components/       # Reusable UI components
    AppHeader/      # Top bar, default pages nav, category nav, header actions
    AppFooter/      # Footer strip, columns, payment partners, copyright, floating actions
    HeroBanner/     # Carousel and slide
    ProductFiltersSidebar/  # Price range, availability, subcategories, brands
    ProductListing/ # Toolbar, grid, product card
  layouts/          # DefaultLayout (header + main + footer)
  pages/            # Route-level views (Home, Product Detail, Cart, About, etc.)
  router/           # Vue Router config (index.js)
  stores/           # Pinia stores (cart, products, filters, categories, banners)
  services/         # API layer (apiClient + product, banner, category, filter services)
  composables/      # useApiWithFallback, useProductDetail, useRelatedProducts
  utils/            # formatters (e.g. formatPrice), validators (response validation)
  mock/             # JSON fallback data (products, banners, categories, filters)
public/             # Static assets (e.g. favicon)
```

---

## Component Architecture

- **Pages** only compose components and wire stores/composables; they do not hold large blocks of markup or business logic.
- **Layout** (`DefaultLayout`) renders the global header and footer and a `<main>` slot for the router view.
- **Header** is split into: TopBar (contact strip), DefaultPagesNav (Home, About, Privacy, Terms, Contact), NavLinks (categories from store), HeaderActions (compare, wishlist, cart, account). Mobile uses a hamburger and drawer for categories and a collapsible area for page links.
- **Product listing** is split into: ProductListing (orchestrator), ProductGridToolbar (sort, show, compare), ProductGrid (list or loading skeleton), ProductCard (image, name, price, View Details, Compare). The same ProductGrid and ProductCard are used on the homepage and on the product detail page for “same category” products.
- **Filters** are in ProductFiltersSidebar with reusable FilterSection (radio/checkbox) and PriceRangeSlider.
- **Footer** is split into strip, four columns (company + social, About Us links, policy links, distributorship/membership), payment partners row, copyright, and floating action buttons.

Reusable building blocks (e.g. FilterSection, ProductCard, BannerSlide) keep the UI consistent and avoid duplicated layout code.

---

## API Integration Strategy

- **Single client:** `services/apiClient.js` creates one Axios instance with `baseURL` (from `VITE_API_BASE_URL`), `timeout`, and default headers. Request interceptor adds `Authorization: Bearer <token>` when a token exists in `localStorage`. Response interceptor returns `response.data` and rejects with `{ message, status, original }`.
- **Service modules:** `productService`, `bannerService`, `categoryService`, `filterService` expose functions that call `apiClient.get(...)`. No component or store imports Axios directly; all HTTP goes through these services.
- **Who calls the API:** Pinia stores (products, categories, banners) and composables (e.g. ProductFiltersSidebar uses `useApiWithFallback` with `getFilterOptions`) invoke service functions. Components never call `apiClient` or service methods directly for fetching; they use stores or composables that wrap the service calls.
- **Error handling:** Failures are handled in the composable (fallback to mock) or in the store/composable (e.g. useProductDetail sets an `error` ref). There is no global HTTP error handler yet; adding one (e.g. for 401/5xx) is recommended.

---

## Fallback Mock Data Strategy

- **When fallback is used:** If the API call fails (network/timeout), or the response fails validation (e.g. non-200, missing or empty data), the app loads data from local mock JSON instead.
- **Where it lives:** The logic is in `composables/useApiWithFallback.js`. Services stay as pure HTTP; the composable runs “try API → validate → on failure load mock”.
- **Validation:** `utils/validators.js` provides validators (e.g. `isValidProductResponse`, `isValidBannerResponse`). They check for presence and shape of data (e.g. non-empty arrays, required fields). Invalid or empty responses trigger fallback.
- **Mock files:** Under `src/mock/`: `products.json`, `banners.json`, `categories.json`, `filters.json`. Their structure matches what the UI and stores expect (e.g. `data` array, optional `total`). Adding a new feature that needs fallback means: add a validator, add a mock JSON file, and register the mock in `useApiWithFallback`’s `mockModules` map.
- **Flow:** `useApiWithFallback(apiCall, mockPath, validate)` runs `apiCall()`, then `validate(response)`. If validation passes, it returns the response. Otherwise (or on throw), it dynamically imports the corresponding mock file and returns its default export. Stores and components use the returned data the same way whether it came from the API or mock.

---

## Responsive Design Approach

- **Breakpoints:** Tailwind defaults: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px. Used for layout, visibility, and spacing.
- **Header:** On large screens, full nav and page links; on smaller, hamburger and drawer for categories, and stacked or toggled page links. Search was replaced by default page links; no separate search bar in current design.
- **Sidebar:** On `lg` and up, filters are in a left column (`w-64`). Below `lg`, a “Filters” button opens an off-canvas drawer; main content is full width.
- **Product grid:** 1 column (default), 2 at `sm`, 3 at `md`, 4 at `lg`/`xl`. Cards use `flex-col sm:flex-row` for buttons where needed.
- **Footer:** Strip and columns use grid with responsive column counts; floating actions stay fixed on the right. No horizontal table scroll is required for current views; if tables are added later, they should be wrapped in `overflow-x-auto` on small screens.

---

## Development Guidelines

- Use **Composition API** and **`<script setup>`** for all Vue components.
- Keep **components** presentational where possible; put data fetching and side effects in **stores** or **composables**.
- Add new **API endpoints** as functions in the appropriate **service** under `services/`. Use the shared `apiClient`; do not create new Axios instances for app logic.
- For features that must work offline or with a failing API, use **useApiWithFallback** with a **validator** and a **mock JSON** file; register the mock in `useApiWithFallback.js`.
- Use **Tailwind** for layout and styling; avoid inline styles and one-off CSS unless necessary. Use theme extensions in `tailwind.config.js` for shared colors (e.g. `header-blue`, `banner-orange`).
- Name **components** in PascalCase; use **kebab-case** for multi-word components in templates. Name **composables** with a `use` prefix (e.g. `useApiWithFallback`).
- Prefer **router-link** for in-app navigation; use **Pinia** for shared state (cart, filters, product list, etc.).

---

## Future Improvements

- Implement **product compare** (store + wiring to ProductCard and footer floating Compare button) or remove the compare UI.
- Add a **global API error handler** (e.g. 401 → login, 5xx → user message or retry).
- Move **filter options** loading into a dedicated store and load once at app/layout level so filters can stay presentational.
- Extract **footer link columns** into a single config-driven component to reduce duplication.
- Introduce **constants** (or env) for default perPage, price limits, and API timeout.
- Remove or repurpose **SearchBar.vue** if search is not planned; otherwise add search route and wire to store/API.
- Consider **lazy-loading** heavy footer or floating actions if they grow.
- Add **E2E or integration tests** for critical flows (e.g. product list, detail, cart, fallback behavior).
