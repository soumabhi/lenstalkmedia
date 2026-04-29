# Lenstalk Media - Full Stack Agency Platform

![Lenstalk Media](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A premium, high-performance full-stack web application designed for **Lenstalk Media**, a modern media agency. This platform features a dynamic, high-fidelity frontend and a robust administrative dashboard for end-to-end content management.

---

## 🚀 Key Features

### Frontend (Client-Facing)
- **Dynamic Split Hero**: A visually stunning landing experience with smooth transitions.
- **Service Portfolio**: Detailed showcase of agency services (Photography, Video, Branding).
- **Interactive Gallery**: Masonry-style gallery for visual assets.
- **Agency Metrics**: Animated counters for business statistics.
- **Blog Engine**: Full-featured blog with detail pages and categories.
- **Responsive Animations**: Seamless UX powered by **GSAP** and **Framer Motion**.
- **Contact System**: Direct form submission to the admin panel.

### Admin Panel (Backend-Driven)
- **Secure Authentication**: JWT-based protected routes.
- **Content Management (CMS)**: Manage Hero slides, Services, Team members, Testimonials, and Campaigns.
- **Business Logic**: Manage process steps and agency metrics.
- **Submission Tracking**: View and manage contact inquiries from potential clients.
- **File Uploads**: Integrated file management for media assets.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP, Framer Motion
- **Icons**: Lucide React
- **Smooth Scroll**: Lenis

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Auth**: JSON Web Tokens (JWT)
- **File Handling**: Multer

---

## 📂 Project Structure

```text
LENSTALKMEDIA/
├── LENSTALKBE/           # Node.js Backend
│   ├── src/
│   │   ├── models/       # Mongoose Schemas
│   │   ├── routes/       # API Endpoints
│   │   ├── controllers/  # Business Logic & CRUD Factory
│   │   ├── middleware/   # Auth & Upload guards
│   │   └── server.js     # Entry point
│   └── .env.example
├── LENSTALKFE/           # React Frontend (Vite)
│   ├── src/
│   │   ├── components/   # UI Components (Home, Admin, Common)
│   │   ├── pages/        # Route views
│   │   ├── hooks/        # Custom API hooks
│   │   └── App.tsx       # Routing & Layout
│   └── .env.example
└── README.md             # You are here
```

---

## 🚦 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### 2. Backend Setup
```bash
cd LENSTALKBE
npm install
cp .env.example .env
```
Update `.env` with your `MONGO_URI` and `JWT_SECRET`.

**Seed initial data (Admin Account):**
```bash
node src/seed.js
```

**Start the server:**
```bash
npm start # or npx nodemon
```

### 3. Frontend Setup
```bash
cd LENSTALKFE
npm install
cp .env.example .env
```
*Note: Ensure `VITE_API_URL` points to your backend (default: `http://localhost:5000/api`).*

**Start the development server:**
```bash
npm run dev
```

---

## 🔐 Admin Credentials
Default credentials (after seeding):
- **Email**: `admin@lenstalkmedia.com`
- **Password**: `Admin@123`

---

## 📄 License
This project is proprietary and built for Lenstalk Media.

---
*Built with ❤️ by the Lenstalk Team.*
