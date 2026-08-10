# 🏛️ Cofradia Panel - Management System

A Full-Stack administrative management software designed for brotherhoods and religious associations. It enables comprehensive census administration, statistical quota control, inventory management, and event tracking through a modern, centralized interface.

## 🚀 Technologies Used

* **Frontend:** Angular, TypeScript, HTML5/CSS3, Angular Material.
* **Backend:** Java, Spring Boot, Spring Data JPA, REST APIs.
* **Database:** PostgreSQL (Relational production engine).
* **Tools:** Maven, IntelliJ IDEA, WebStorm.

## ✨ Core Features

* **Census Management:** Full CRUD operations for managing members and brotherhood data.
* **Treasury:** Quota control with dynamic state selectors (Pending/Paid).
* **History & Biography:** Rich text editing module for historical milestones.
* **Responsive Design:** Clean UI built with Angular Material components.

<img width="2560" height="1336" alt="imagen" src="https://github.com/user-attachments/assets/98ec9c77-494d-4769-88ed-b9b7334c7d5c" />

## ⚙️ Prerequisites

To run this project locally, you need to have the following installed:
* Java 17 or higher.
* Node.js and npm.
* PostgreSQL (with an empty database named `cofradia_db`).

## 🛠️ Deployment Instructions

### 1. Database Configuration
In the `src/main/resources/application.properties` file, configure your PostgreSQL credentials:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/cofradia_db
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
