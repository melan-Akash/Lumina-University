# Lumina University 🎓

A full-stack, production-ready university website and administrative dashboard built with the **MERN** stack (MongoDB, Express, React, Node.js) and styled with **Tailwind CSS**.

![Lumina University Preview](https://via.placeholder.com/1200x600?text=Lumina+University+Portal)

## Features

- **Public Website:**
  - Modern, responsive landing page with dynamic mega-menus.
  - Browse available courses, view detailed curriculum and requirements.
  - Student life and campus information.
  - Interactive Contact and Enquiry system.
- **Student Portal:**
  - Secure Student Registration and Login (JWT Authentication).
  - Student dashboard access.
- **Admin Dashboard:**
  - Secure Admin Authentication (Role-based access).
  - **Full CRUD Management** with live MongoDB connection:
    - **Courses Management**
    - **Events Management**
    - **Enquiries/Inbox**
    - **Staff Directory** (with image uploads)
    - **News & Announcements** (with thumbnail uploads)
    - **Campus Gallery** (with dynamic image uploads)
- **Cloud Storage:** Native integration with Cloudinary for handling media uploads via `multer`.

---

## Tech Stack

### Frontend (Client)
- **React.js** (Vite)
- **Tailwind CSS** (for styling)
- **React Router** (for navigation)
- **Axios** (for API requests)
- **Heroicons** (for iconography)

### Backend (Server)
- **Node.js** & **Express.js** (REST API)
- **MongoDB** & **Mongoose** (Database)
- **JSON Web Tokens (JWT)** (Authentication)
- **Bcrypt.js** (Password Hashing)
- **Cloudinary** & **Multer** (Image Storage)
- **Nodemailer** (Email notifications)

---

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine. You will also need a MongoDB database cluster and a Cloudinary account.

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd "Lumina University"
```

### 2. Install Dependencies

You need to install dependencies for both the frontend and backend.

**For the Backend:**
```bash
cd server
npm install
```

**For the Frontend:**
```bash
cd ../client
npm install
```

### 3. Environment Variables

Create a `.env` file in the **`server`** directory with the following keys:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/uni
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development

# Cloudinary Setup
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Setup (for Enquiries/Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

### 4. Seed the Database

Before starting, you should generate an initial Super Admin account to access the dashboard. 

From the `server` directory, run:
```bash
node seed.js
```
*This will create an admin with the email `admin@lumina.ac.uk` and password `Admin@1234` (unless configured otherwise).*

### 5. Run the Application

You will need two terminal windows open to run the client and server concurrently.

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

The app will be accessible at: `http://localhost:5173`

---

## Folder Structure

```
Lumina University/
├── client/                 # React Frontend
│   ├── public/             # Static assets (logos, etc)
│   ├── src/
│   │   ├── components/     # Reusable UI components & Layouts
│   │   ├── context/        # React Context (AuthContext)
│   │   ├── pages/          # Page views (Admin & Public)
│   │   ├── utils/          # Axios interceptors (api.js)
│   │   └── App.jsx         # Main router
│   └── package.json
│
└── server/                 # Node.js Backend
    ├── config/             # DB & Cloudinary config
    ├── controllers/        # Route controllers logic
    ├── middleware/         # Auth & Upload middlewares
    ├── models/             # Mongoose schemas
    ├── routes/             # API routes
    ├── index.js            # Entry point
    └── seed.js             # DB seeding script
```

---

## License
&copy; 2026 Lumina University. All rights reserved.
