# PrepaidGo (MobiComm)

## Overview
PrepaidGo (MobiComm) is a **Prepaid Mobile Web Application** that allows users to manage prepaid mobile services, recharge plans, and transactions seamlessly. The application is built using **Spring Boot for the backend and HTML , CSS , JS for frontend**, ensuring a robust and scalable architecture. It also incorporates role-based authentication and security mechanisms.

## Features
- **Subscriber & Admin Roles**: JWT-based authentication for different user roles.
- **Recharge & Transaction History**: Tracks subscriber recharges, including third-party recharges.
- **Quick Recharge**: Allows non-logged-in users to recharge without creating an account.
- **Plan Management**: Admin can add, edit, delete, and view prepaid plans category-wise.
- **Secure Authentication**: Uses Spring Security and Redis for OTP storage and verification.
- **Email Notifications**: Sends recharge confirmation emails via SMTP.
- **Session & Local Storage**: Used for user session handling.
- **Exception Handling**: Implemented on both frontend and backend for smooth user experience.

## Tech Stack
### Backend:
- **Spring Boot** (REST API, Maven-based)
- **Spring Security** (JWT-based role authentication)
- **Hibernate** (ORM framework)
- **MySQL** (Database storage)
- **Redis** (OTP handling)
- **SMTP & JavaMailSender** (Email service)

### Frontend: 
- **HTML, CSS, Bootstrap, JavaScript**
- **Fetch API** (For API communication)
- **Figma** (UI design and prototyping)

### Prerequisites:
- Java 17+
- MySQL Server
- Redis Server
- Maven

## Future Enhancements
- **User Registration & Profile Management**
- **Support & Help Desk Module**

## Contributors
- Nanthene R E

## Contact
For any inquiries, contact: `nanthene05@gmail.com`

