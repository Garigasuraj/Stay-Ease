# StayEase – Server-Side Rendered Web Application
## Overview
This project is a full-stack, server-side rendered web application replicating the core functionalities of Airbnb. It enables hosts to list properties and customers to browse, book, and manage reservations.

The application follows the Model-View-Controller (MVC) architecture, ensuring structured, maintainable, and scalable code organization. It includes user authentication, property listing management, booking functionality, secure session handling, media storage, and RESTful API integration.

## Features
### User Authentication & Role-Based Access:
- Secure user & host login system with session-based authentication.
- Role-based access: hosts manage listings, users book properties.
- Password encryption for security.

### 🏡 Property Listings & Management:
- Hosts can create, update, and delete listings.
- Users can browse properties, filter by location, price, and availability.
- Responsive listing pages with property details, images, and reviews.

### 🛒 Booking System:
- Users can book accommodations and view reservations.
- Real-time availability tracking to prevent double bookings.
- Hosts can view and manage their bookings via a host dashboard.

### 🌐 Server-Side Rendering with EJS:
- Fast initial page loads & SEO optimization.
- Dynamic templates for listings, bookings, and user dashboards.
- Bootstrap-based UI for a clean and responsive design.

### 🖼 Image Uploads with Cloudinary:
- Seamless media storage for property images.
- Automatic optimization and compression.

### 🔒 Security & Middleware Enhancements:
- Custom middleware for error handling & authentication checks.
- Session-based authentication with role-based access control.

### ⚡ Performance Optimizations:
- Lazy loading for images to reduce load times.
- Efficient database queries for fast data retrieval.
- Caching static assets for improved performance.

# Tech Stack
## Backend:
- Node.js
- Express.js
- MongoDB & Mongoose

## Frontend:
- EJS (Server-Side Rendering)
- Bootstrap
- JavaScript

## Authentication & Security:
- Passport.js
- Express-Session
- Custom Middleware

## Storage & Hosting:
- Cloudinary (Image & Video Storage)
- Environment Variables (dotenv)

# Project Setup
## Prerequisites
Ensure you have the following installed:

- Node.js (v14 or later)
- MongoDB (local or cloud-based)
- Cloudinary Account (for image storage)
## Installation Steps
Clone the Repository:

bash
``` javascript
https://github.com/Garigasuraj/Stay-Ease.git
cd Stay-Ease
```
### Install Dependencies:

``` javascript
npm install
```
### Set Up Environment Variables:
Create a .env file and add:

### Start the Server:

``` javascript
nodemon index.js
```
🚀 Your server is now running on http://localhost:4000

# Project Structure:
```

├── Controller/          # Handles application logic and business logic  
├── Routes/              # Express.js route handlers  
├── Models/              # Mongoose schemas and database models  
├── MongoDB/             # Database connection and configurations  
├── middleware/          # Custom middleware functions  
├── ErrorClass/          # Custom error-handling classes  
├── Public/              # Static assets (CSS, JavaScript, images)  
│   ├── images/          # Property and user images  
│   ├── javascript/      # Client-side JavaScript files  
│   ├── Styles/          # CSS stylesheets  
├── Ejs_template/        # Server-side rendering templates (EJS)  
│   ├── Host/            # Host-specific EJS templates  
│   ├── Listing/         # Listing-related EJS templates  
│   ├── Login/           # User authentication templates  
│   ├── includes/        # Reusable partials (navbar, footer, etc.)  
│   ├── layouts/         # Layout templates for consistent UI  
├── util/                # Utility functions (error handling, validations)  
├── SQL/                 # SQL-related configurations (if applicable)  
├── serverValidation/    # Validation logic for forms and data  
├── Cloudinary.js        # Cloudinary configuration for media uploads  
├── passport.js          # Passport.js authentication configuration  
├── index.js             # Main server file (Express entry point)  
├── .env                 # Environment variables  
├── .gitignore           # Git ignore file  
├── package.json         # Project dependencies and scripts  
├── package-lock.json    # Lock file for npm dependencies  
└── README.md            # Project documentation  

```

# API Endpoints:
## Authentication Routes
Method	Endpoint	Description
- POST	/api/login	(User login)
- POST	/api/logout	(User logout)
- POST	/api/host/login	(Host login)
## Listing Routes
Method	Endpoint	Description
- GET	/api/listings	(Fetch all listings)
- POST	/api/listings	Create a new listing (Host only)
- PUT	/api/listings/:id	Update listing (Host only)
- DELETE	/api/listings/:id	Delete listing (Host only)
## Booking Routes
Method	Endpoint	Description
- POST	/api/bookings	(Create a new booking)
- GET	/api/bookings/:id	(Fetch booking details)
- DELETE	/api/bookings/:id	(Cancel a booking)
# Future Improvements
- Implement a React frontend for better client-side experience.
- Add payment integration (Stripe or PayPal) for secure transactions.
- Introduce search & filtering options for more refined property browsing.
- Implement real-time notifications for booking confirmations.

# Contributing
Contributions are welcome! Feel free to fork this repository, submit issues, or create pull requests.

# Steps to Contribute:
- Fork the project
- Create a new branch (feature-xyz)
- Commit changes and push to GitHub
- Submit a pull request

# License
📜 This project is open-source and licensed under the MIT License.

