# 🪵 Rustik Plank — MERN Stack + Next.js eCommerce App

**Lab 12 — Full Stack Programming | BSSE-VI-B & A**  
**Instructor: Mr. Sharif Hussain**

A complete, dynamic eCommerce application for handcrafted wooden furniture, built with the MERN stack (MongoDB, Express.js, React/Next.js, Node.js) and styled with Tailwind CSS — matching the *Rustik Plank* design template.

---

## 📁 Project Structure

```
rustik-plank/
├── backend/                  # Node.js + Express.js + MongoDB API
│   ├── models/               # Mongoose schemas
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── User.js
│   │   └── Order.js
│   ├── routes/               # Express route handlers
│   │   ├── products.js       # CRUD + reviews
│   │   ├── categories.js
│   │   ├── auth.js           # Register / Login / JWT
│   │   ├── users.js          # Profile, wishlist
│   │   ├── orders.js         # Create, pay, track
│   │   └── cart.js           # Cart validation
│   ├── middleware/
│   │   └── auth.js           # JWT protect + adminOnly
│   ├── server.js             # Express app entry point
│   ├── seed.js               # DB seed script
│   ├── .env.example
│   └── package.json
│
└── frontend/                 # Next.js 14 App Router + Tailwind CSS
    ├── app/
    │   ├── layout.js         # Root layout (Navbar, Footer, Cart)
    │   ├── page.js           # Home page (Hero, Collections, Products)
    │   ├── products/
    │   │   ├── page.js       # Products listing with filters
    │   │   └── [id]/page.js  # Product detail + reviews
    │   ├── auth/page.js      # Login / Register
    │   ├── checkout/page.js  # Multi-step checkout
    │   ├── account/page.js   # Orders, profile, addresses
    │   ├── admin/page.js     # Admin dashboard (CRUD)
    │   ├── about/page.js
    │   ├── contact/page.js
    │   ├── blog/page.js
    │   └── wishlist/page.js
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.js     # Responsive nav with cart badge
    │   │   └── Footer.js
    │   └── ui/
    │       ├── ProductCard.js
    │       ├── CartDrawer.js  # Slide-out cart
    │       └── HeroSlider.js  # Auto-advancing hero
    ├── lib/
    │   ├── api.js            # Axios instance + API helpers
    │   ├── store.js          # Zustand cart store (persisted)
    │   └── AuthContext.js    # React auth context
    └── package.json
```

---

## ⚙️ Prerequisites

- **Node.js** v18+ (LTS)
- **MongoDB** (local via MongoDB Compass, or MongoDB Atlas)
- **Git**

---

## 🚀 Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/Full-Stack-Programming-Lab.git
cd Full-Stack-Programming-Lab/Lab_12_MERN_Stack_Nextjs_Dynamic_App_Lab/rustik-plank
```

### 2. Backend Setup

```bash
cd backend
npm install

# Copy and configure environment variables
cp .env.example .env
# Edit .env — set your MONGODB_URI and JWT_SECRET

# Seed the database (creates categories, products, users)
npm run seed

# Start the backend server
npm run dev       # development (nodemon)
# or
npm start         # production
```

Backend runs on: **http://localhost:5000**

### 3. Frontend Setup

```bash
cd ../frontend
npm install

# Create .env.local (optional — defaults to localhost:5000)
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# Start development server
npm run dev
```

Frontend runs on: **http://localhost:3000**

---

## 🌐 Pages & Routes

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero slider, featured/special/popular products, collections |
| Products | `/products` | Filterable, sortable product grid |
| Product Detail | `/products/[id]` | Images, add to cart, reviews |
| Login/Register | `/auth` | JWT-based authentication |
| Cart | Drawer | Slide-out cart with qty controls |
| Checkout | `/checkout` | 2-step: shipping + payment |
| Account | `/account` | Order history, profile, addresses |
| Admin | `/admin` | Product CRUD, categories (admin only) |
| About | `/about` | Brand story |
| Blog | `/blog` | Articles & tips |
| Contact | `/contact` | Contact form |

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/auth/me` | Get current user |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List with filters, pagination, sort |
| GET | `/api/products/:id` | Single product |
| GET | `/api/products/slug/:slug` | By slug |
| POST | `/api/products` | Create (admin) |
| PUT | `/api/products/:id` | Update (admin) |
| DELETE | `/api/products/:id` | Delete (admin) |
| POST | `/api/products/:id/reviews` | Add review (auth) |

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | All categories |
| POST | `/api/categories` | Create (admin) |
| PUT | `/api/categories/:id` | Update (admin) |
| DELETE | `/api/categories/:id` | Delete (admin) |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create order (auth) |
| GET | `/api/orders/my` | User's orders (auth) |
| GET | `/api/orders/:id` | Order detail (auth) |
| PUT | `/api/orders/:id/pay` | Mark as paid (auth) |
| GET | `/api/orders` | All orders (admin) |
| PUT | `/api/orders/:id/status` | Update status (admin) |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get profile (auth) |
| PUT | `/api/users/profile` | Update profile (auth) |
| POST | `/api/users/wishlist/:id` | Toggle wishlist (auth) |
| GET | `/api/users` | All users (admin) |

---

## 🔐 Demo Accounts (after seeding)

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@rustikplank.com` | `admin123` |
| User | `user@rustikplank.com` | `user123` |

---

## ✨ Features

### Frontend
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Auto-advancing hero slider
- ✅ Product grid with filtering, sorting, pagination
- ✅ Product detail with image gallery and reviews
- ✅ Slide-out cart drawer with quantity controls
- ✅ Persistent cart (localStorage via Zustand)
- ✅ Multi-step checkout (shipping + payment)
- ✅ User authentication (login/register)
- ✅ Order history in account dashboard
- ✅ Admin CRUD dashboard
- ✅ Matching Rustik Plank orange & wood design

### Backend
- ✅ RESTful API with Express.js
- ✅ MongoDB + Mongoose ODM
- ✅ JWT authentication with protected routes
- ✅ Role-based access control (user/admin)
- ✅ Product reviews with rating aggregation
- ✅ Order management with status tracking
- ✅ Database seeding with sample data
- ✅ Error handling middleware

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | Next.js 14 (App Router) |
| UI Styling | Tailwind CSS |
| State Management | Zustand (cart) + React Context (auth) |
| HTTP Client | Axios + SWR |
| Backend Framework | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT (jsonwebtoken) + bcryptjs |
| Notifications | react-hot-toast |

---

## 📸 Screenshots

> *(Add screenshots of the running app here)*

---

## 📝 GitHub Submission

- Repository: `Full-Stack-Programming-Lab`
- Folder: `Lab_12_MERN_Stack_Nextjs_Dynamic_App_Lab`
- Collaborator: `sharifali.aulecturer@gmail.com`

---

*© 2024 Rustik Plank Furniture — Lab Project*
