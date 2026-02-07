live link

https://rent-and-lease-marketplace-for-house-hold-items.vercel.app/

# Rent & Lease Marketplace for Household Items

A full-stack MERN application that facilitates the renting and leasing of household items. This platform connects owners with individuals looking to rent items, featuring secure payments, interactive maps, and a comprehensive review system.

[![Live Demo](https://img.shields.io/badge/Live-Demo-green)](https://rent-and-lease-market-place-for-hou-sigma.vercel.app/)

## 🚀 Data Flow & Tech Stack

### Frontend (Client)
- **Framework:** [React 19](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Routing:** [React Router V7](https://reactrouter.com/)
- **Styling:** CSS Modules / Custom CSS
- **Maps:** [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
- **Payments:** [Stripe Elements](https://stripe.com/docs/stripe-js/react)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Utilities:** [Appwrite](https://appwrite.io/) (Storage/Auth), [Axios](https://axios-http.com/), [React Hot Toast](https://react-hot-toast.com/)

### Backend (Server)
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication:** JWT (JSON Web Tokens) & Cookies
- **Validation:** [Zod](https://zod.dev/)
- **Payments:** Stripe API

## ✨ Key Features
- **User Authentication:** Secure signup/login using JWT.
- **Product Management:** Listing items for rent or lease with detailed descriptions and images.
- **Search & Discovery:** Browse products with location-based features using Leaflet maps.
- **Wishlist:** Save favorite items for later.
- **Reviews & Ratings:** Leave feedback on products and transactions.
- **Secure Payments:** Integrated Stripe payment gateway for seamless transactions.
- **Order Management:** Track rental orders and history.

## 🛠️ Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas)

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository_url>
cd Rent_And_Lease_MarketPlace_For_House_Hold_Items
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
# Stripe Secret Key (if exact name is different in controller, verify)
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the client directory and install dependencies:
```bash
cd client
npm install
```

Create a `.env` (or `.env.local` if configured) file in the `client` directory:
```env
# Stripe
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key

# Appwrite Configuration
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_BUCKET_ID=your_appwrite_bucket_id
```

Start the frontend development server:
```bash
npm run dev
```

## 📜 Usage
1.  Ensure backend is running on `http://localhost:4000` (or your configured port).
2.  Ensure frontend is running (usually `http://localhost:5173` with Vite).
3.  Navigate to the frontend URL to access the application.

## 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements.
