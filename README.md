# BookBounty

A full-stack e-commerce platform for buying and selling used books with an integrated recommendation system. **BookBounty** connects book sellers and buyers in a seamless, user-friendly marketplace.

## 📋 Project Overview

BookBounty is a modern e-commerce application built with:
- **Backend**: Django REST Framework (Python)
- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Database**: SQLite (with migration support)
- **ML Component**: Book recommendation system using Python

The platform allows users to:
- Register and manage their profiles
- List books for sale with detailed information
- Browse and purchase books
- Track orders and transactions
- Receive personalized book recommendations

## 🛠️ Tech Stack

### Backend
- **Framework**: Django 5.0.4
- **API**: Django REST Framework 3.15.1
- **Database**: SQLite3
- **Authentication**: JWT (PyJWT 2.8.0)
- **CORS**: django-cors-headers 4.3.1
- **Python**: 3.12

### Frontend
- **Framework**: Next.js 14.2.2
- **UI Library**: React 18
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.1
- **Component Library**: Radix UI
- **Icons**: Lucide React
- **State**: React Context API

### Development Tools
- **Code Quality**: ESLint
- **CSS Processing**: PostCSS
- **Node Package Manager**: npm/yarn

### Machine Learning
- Python-based recommendation system
- Data processing with Pandas/NumPy
- Jupyter Notebook for experimentation

## 📡 API Endpoints

### Authentication
- `POST /api/register/` - User registration
- `POST /api/login/` - User login
- `POST /api/logout/` - User logout

### Books
- `GET /api/books/` - List all books
- `GET /api/books/{id}/` - Get book details
- `POST /api/books/` - Create new book listing
- `PUT /api/books/{id}/` - Update book listing
- `DELETE /api/books/{id}/` - Delete book listing

### Users
- `GET /api/users/{id}/` - Get user profile
- `PUT /api/users/{id}/` - Update user profile

### Transactions
- `GET /api/transactions/` - Get user transactions
- `POST /api/transactions/` - Create transaction


## 🎯 Key Features

✅ **User Authentication**
- Secure registration and login
- JWT-based session management

✅ **Book Management**
- List books with detailed information
- Book condition tracking (New, Like New, Good, Fair, Poor)
- Inventory status management (Available, Order Received, Sold)

✅ **E-commerce Functionality**
- Book purchasing
- Transaction tracking
- Order management

✅ **Personalized Recommendations**
- ML-based book recommendation system
- User rating-based suggestions

✅ **Responsive UI**
- Mobile-friendly design with Tailwind CSS
- Modern component architecture
- Intuitive navigation

