# Cartsens POS Frontend: Enterprise Next.js UI

A premium, high-speed, and responsive **Next.js** (App Router) and **Redux** frontend designed for modern multi-tenant F&B and retail terminals. It integrates a persisting, sliding collapsible sidebar navigation, dynamic route guards, and permission-aware layouts.

---

## 🎨 Design Systems & UI Features

* **Sleek Glassmorphism & Animations**: Transitions and micro-animations styled natively with Vanilla CSS / TailWind for maximum responsiveness.
* **Persistent Collapsible Navigation (`GlobalSidebar`)**: Collapses down to 0 width smoothly on toggle (`isOpen`), allowing operational views like the POS and Table Maps to take 100% of screen real estate.
* **Dynamic Route Protection**: Standard Next.js route wrappers query the Redux session store and restrict access based on precise resource permissions (e.g. redirecting cashiers away from `/admin`).

---

## 🗺️ The 7 UI Navigation Journeys

Each of the 7 roles is locked into their respective page flows and dynamic sidebar item lists.

### 1. 💵 Cashier (Counter Checkout Mode)
* **Text UI Flow**:
  `Enter Org Slug -> Activate Store Terminal -> Staff PIN Pad -> POS Grid View -> Select Menu Items -> Link Customer -> Select Pay (Cash/Card/UPI) -> Place Order Popup -> Auto-Print Receipt -> View Orders (Activity Tab) -> Log Out`
* **Visible Tabs & Sidebars**:
  * `/pos` (Menu Catalog & Sticky Right-Hand Checkout Cart)
  * `/activity` (Live sales stream, receipt printer settings)
* **Hidden Tabs**: All administrative layouts `/admin/*` are strictly hidden from the sidebar.

### 2. 📋 Floor Manager (Table Service & Override Lead)
* **Text UI Flow**:
  `Activate Store Terminal -> Staff PIN Pad -> 2D Seating Layout -> Select Table -> Modify Table Cart -> Request Draft Bill Print -> Split/Complete Bill -> Change Table Seating -> Release Table -> Authorize Cashier Void -> Log Out`
* **Visible Tabs & Sidebars**:
  * `/pos/tables` (2D Table Layout with real-time dining durations)
  * `/pos` (Standard Catalog Cart)
  * `/activity` (Sales activity, void logs)
  * `/admin/tables` (Table editor, zone manager)
* **Hidden Tabs**: Staff setup `/admin/users`, global location billing `/admin/settings`.

### 3. 👑 Admin (Full Store General Manager)
* **Text UI Flow**:
  `Owner Email Login -> Analytics Dashboard -> Manage Users (Onboard Staff, Reset PINs) -> Settings (Setup printers, tax rules) -> Inventory Setup (Menu builder, custom modifiers) -> Switch to POS mode (Help peak lines) -> Return to BOH -> Log Out`
* **Visible Tabs & Sidebars**:
  * Full Master access: `/admin/dashboard`, `/admin/users`, `/admin/inventory`, `/admin/tables`, `/admin/settings`, `/pos`, `/activity`, `/kds`.

### 4. 📈 Analyst (Financial Auditor / Owner)
* **Text UI Flow**:
  `Owner Email Login -> Financial Dashboard -> Review Gross vs Net Sales Graphs -> Access Sales Ledger -> Review Void Activity -> Download Tax Ledger CSV & PDF -> Log Out`
* **Visible Tabs & Sidebars**:
  * `/admin/dashboard` (Analytics center)
  * `/activity` (Read-only transactional history stream)
* **Hidden Tabs**: POS order terminal is disabled; all "Add", "Edit", and "Delete" actions are hidden via Read-Only CSS filters.

### 5. 🍳 KDS Chef (Kitchen Display System View)
* **Text UI Flow**:
  `Activate Store -> Station Selector Popup -> Full-Screen Cooking Kanban -> Ticket Chime Alert -> View special instructions -> Tap items to mark "Cooking" -> Tap ticket to mark "Ready" -> View historic prep log -> Log Out`
* **Visible Tabs & Sidebars**:
  * `/kds` (Fullscreen station Kanban board)
* **Hidden Tabs**: Sidebar is completely removed. Standard navigation is blocked.

### 6. 🏃 Waiter / Server (Mobile Table-Side Handheld)
* **Text UI Flow**:
  `Activate Mobile Handheld -> Staff PIN Pad -> Touch-Friendly Table Map -> Tap Table -> Select Menu Items -> Choose Modifiers -> Tap "Fire Order" (Sends to kitchen) -> Swipe to "My Tables" -> Request Print Bill -> Log Out`
* **Visible Tabs & Sidebars**:
  * `/pos/mobile` (Portrait layout, large category tabs, fire-order buttons)
  * `/pos/tables` (Table status view)
* **Hidden Tabs**: Checkout options, admin menus, KDS cards.

### 7. 📦 Inventory Manager (Supply Chain & Menu Catalog)
* **Text UI Flow**:
  `Staff Credentials Login -> Menu Catalog Panel -> Add Product -> Set Modifiers -> Open Stock Ledger -> Receive delivery (Add stock counts) -> View low stock list -> Log Out`
* **Visible Tabs & Sidebars**:
  * `/admin/inventory` (Products, categories, supplier panels, cost metrics)
* **Hidden Tabs**: Seating charts, user setups, Cashier checkout, KDS display.

---

## 🚀 Installation & Launch

### 1. Configure Environment
Set your API gateway URL in `.env`:
```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api/v1"
```

### 2. Install & Start Development Server
```bash
# Install packages
pnpm install

# Run dev server with hot-reload
pnpm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view your premium POS terminal client!
