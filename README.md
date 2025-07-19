# Nine

<p align="center">
  <img src="https://github.com/Jyotiraditya077/Nine/blob/main/client/src/assets/logo3.png" alt="Nine Logo" width="170px" />
</p>

**Nine** is a modern e-commerce shopping web application with a clean and intuitive user interface. It allows users to browse products, add items to their cart, and checkout. The app supports user authentication with protected routes and a seamless shopping experience.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Contact](#contact)

---

## Features

✔️ Browse products with category filters and search  
✔️ User authentication with login and registration pages  
✔️ Access shopping views without login; login required only to add items to cart  
✔️ Cart management with item quantity and checkout flow  
✔️ Admin dashboard for managing products, orders, and features  
✔️ Responsive UI built with React, Tailwind CSS, and Radix UI components  
✔️ Smooth loading animations with SVG preloaders  
✔️ Role-based access control for admin and regular users

---

## Demo

🔗 **Live App**: [Nine](https://n9ne.onrender.com)

---

## Tech Stack

**Frontend:**

- React 18 with React Router DOM
- Redux Toolkit for state management
- Tailwind CSS for styling
- Radix UI and Lucide Icons for UI components
- Vite as the build tool

**Backend:**

- Node.js with Express.js
- MongoDB with Mongoose ODM
- RESTful API design
- Cloudinary for image uploads
- Razorpay integration for payments

---

## Project Structure

```
client/
├── public/                  # Static assets and public files
├── src/
│   ├── assets/              # Images and icons
│   ├── components/          # Reusable UI components and layouts
│   ├── pages/               # Route pages (auth, shopping, admin, etc.)
│   ├── store/               # Redux slices and store setup
│   ├── App.jsx              # Main app and routing
│   └── main.jsx             # React app entry point
├── package.json             # Frontend dependencies and scripts
└── vite.config.js           # Vite configuration

server/
├── controllers/             # Express route controllers
├── helpers/                 # Utility helpers (cloudinary, razorpay, etc.)
├── models/                  # Mongoose models
├── routes/                  # Express route definitions
├── server.js                # Express app entry point
├── package.json             # Backend dependencies and scripts
└── .env                    # Environment variables

```

---

## Contact

👤 **Jyotiraditya Swain**  
📍 **GitHub**: [Jyotiraditya077](https://github.com/Jyotiraditya077)  
📧 **Email**: jyotiradityaswain123@gmail.com  
🌐 **Portfolio**: [Know more](https://jyotiradityaportfolio.netlify.app/)
