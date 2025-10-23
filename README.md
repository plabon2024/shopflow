
# 🛒 ShopFlow

ShopFlow is a modern e-commerce web application built with **Next.js**, featuring authentication, image upload, product management, and a clean UI powered by **shadcn/ui**.

---

Live : https://shopflow-green.vercel.app

## 🚀 Features

- 🔐 Authentication with **NextAuth** (Google, GitHub, Credentials)
- 📦 Product management (create, view, edit, delete)
- 🖼️ Image upload with **Cloudinary**
- 🎨 UI components with **shadcn/ui**
- ⚡ Fast & SEO-friendly with **Next.js 15**
- 🍪 Secure session handling with MongoDB
- ✅ Form validation using React Hook Form
- 🔔 Toast notifications (sonner)

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TailwindCSS, shadcn/ui
- **Backend**: Next.js API routes, MongoDB
- **Authentication**: NextAuth (Google, GitHub, Credentials)
- **Image Hosting**: Cloudinary
- **State Management**: React Query / TanStack Query (optional)

---

## 📂 Project Structure
```

/src
├── app # Next.js App Router pages
├── components # Reusable UI components
├── lib # Utils, configs, db connections
├── hooks # Custom React hooks
└── styles # Global styles

````



1. **Clone repo**

```bash
git clone https://github.com/your-username/shopflow.git
cd shopflow
````

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Setup environment variables**
   Create a `.env.local` file in the root and add:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key

# MongoDB
MONGODB_URI=your_mongodb_connection

# Google Provider
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub Provider
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
```

4. **Run project**

```bash
npm run dev
```

App will be available at [http://localhost:3000](http://localhost:3000)

---

## 📸 Screenshots

---




## 📍 Route Summary

### Public Routes

- `/` → Home page
- `/products` → All products listing
- `/products/[id]` → Product details page
- `/auth/login` → Login page
- `/auth/register` → Register page

### Dashboard (Authenticated Users)

- `/dashboard` → User dashboard overview
- `/dashboard/profile` → View & edit profile
- `/dashboard/add-product` → Add a new product (with Cloudinary upload)


### API Routes

- `/api/products`

  - `GET` → Fetch all products
  - `POST` → Add new product

- `/api/products/[id]`

  - `GET` → Fetch product by ID

- `/api/auth/[...nextauth]` → NextAuth authentication handler

---



