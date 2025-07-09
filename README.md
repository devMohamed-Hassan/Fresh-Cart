# Fresh-Cart
A modern, full-featured e-commerce web application built with React, Vite, and Tailwind CSS. This project demonstrates best practices in React development, state management, API integration, authentication, and user experience.

---

## Table of Contents
- [Features](#features)
- [Tech Stack & Libraries](#tech-stack--libraries)
- [App Overview](#app-overview)
- [Authentication & Authorization](#authentication--authorization)
- [State Management](#state-management)

---

## Features
- **User Authentication**: Register, login, logout, password reset, and protected routes.
- **Product Catalog**: Browse, filter, and view detailed product information.
- **Cart Management**: Add, update, remove, and clear items in the shopping cart.
- **Wishlist**: Add/remove products to a wishlist, move items to cart.
- **Checkout & Orders**: Secure checkout with address management and payment integration.
- **Account Management**: Update profile, change password, manage addresses.
- **Responsive Design**: Fully responsive and mobile-friendly UI.
- **Notifications**: Real-time feedback using toasts for actions and errors.
- **Brand & Category Browsing**: Filter products by brand or category.
- **Modern UI**: Clean, accessible, and visually appealing interface.

---

## Tech Stack & Libraries

### Core
- **React 19**: Main UI library.
- **Vite**: Fast development server and build tool.
- **React Router DOM**: Client-side routing and navigation.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Flowbite & Flowbite-React**: Prebuilt UI components for Tailwind.

### State & Data
- **@tanstack/react-query**: Server state management, caching, and async data fetching.
- **Context API**: Local state for cart, wishlist, and user authentication.

### Forms & Validation
- **Formik**: Form state management.
- **Yup**: Schema-based form validation.

### UI & UX
- **React Icons / FontAwesome**: Iconography.
- **React Slick / Slick Carousel**: Carousels and sliders.
- **React Spinners**: Loading indicators.
- **React Toastify**: Toast notifications.


---

## App Overview

### Authentication & Authorization
- **Register/Login:** Secure registration and login with JWT tokens stored in localStorage.
- **Protected Routes:** Only authenticated users can access cart, checkout, wishlist, and account pages.
- **Public Routes:** Registration, login, and password reset are only accessible to guests.
- **Password Reset:** Multi-step flow (request, verify code, reset password).

### Product Catalog
- **Browse Products:** View all products, filter by brand or category.
- **Product Details:** See images, description, price, ratings, and add to cart.
- **Brands & Categories:** Browse and filter products by brand or category.

### Cart & Wishlist
- **Cart:** Add, update, remove, and clear items. View total price and proceed to checkout.
- **Wishlist:** Add/remove products, move items to cart, persistent per user.

### Checkout & Orders
- **Checkout:** Enter shipping address, phone, and city. Redirects to payment gateway.
- **Order Management:** (Future scope: order history, returns, etc.)

### Account Management
- **Profile:** Update name, email, phone.
- **Change Password:** Secure password update with validation.
- **Address Book:** Add, delete, and manage multiple shipping addresses.

### UI/UX & Styling
- **Responsive Design:** Works on all devices.
- **Modern Components:** Uses Flowbite, Tailwind, and custom components.
- **Notifications:** Toasts for actions, errors, and feedback.
- **Loading States:** Spinners and skeletons for async actions.

---

## State Management
- **React Context:** Used for cart, wishlist, and user authentication state.
- **React Query:** Handles server state, caching, and async data fetching for products, brands, categories, etc.



- **Swiper**: Advanced sliders for product images.

### Utilities
- **Axios**: HTTP client for API requests.
