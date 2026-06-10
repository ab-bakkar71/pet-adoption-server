# Pet Adoption Server

A RESTful backend API for the Pet Adoption Platform. This server handles authentication, pet management, adoption requests, and database operations to support the complete pet adoption workflow.

## Purpose

The purpose of this backend service is to provide secure and efficient APIs for managing pets, adoption requests, user-specific resources, and adoption workflows. It serves as the core data management layer of the Pet Adoption Platform.

## Live URL

🌐 Live Server: https://pet-adoption-server-beta.vercel.app/pets

## Server Repository

🔗 GitHub Repository: https://github.com/ab-bakkar71/pet-adoption-server

## Features

* RESTful API built with Express.js.
* MongoDB database integration for storing pets and adoption requests.
* Search pets by name, breed, and location.
* Filter pets by species.
* Create, update, and delete pet listings.
* Submit adoption requests for available pets.
* Prevent pet owners from submitting adoption requests for their own pets.
* Accept, reject, and cancel adoption requests.
* Automatically update pet status to adopted when a request is accepted.
* Secure API access using token-based authentication.
* CORS support for frontend-backend communication.
* Environment variable management using dotenv.

## Technologies Used

* Node.js
* Express.js
* MongoDB

## NPM Packages Used

### Core Packages

* express
* mongodb

### Authentication & Security

* jose-cjs

### Middleware

* cors
* dotenv

## API Highlights

### Pet Management

* Get all pets
* Get pet details by ID
* Add new pet
* Update pet information
* Delete pet listing
* Search pets
* Filter pets by species

### Adoption Requests

* Create adoption request
* View adoption requests
* Accept adoption request
* Reject adoption request
* Cancel adoption request
* Update pet adoption status automatically

## Future Improvements

* Rate limiting for API protection.
* Email notifications for adoption updates.
* Advanced filtering and pagination.
* API documentation with Swagger.
* Admin dashboard support.

## Author

**Abu Bakkar Siddique**
