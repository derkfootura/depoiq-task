# DepoIQ Task Project

This is a Next.js 14 project that utilizes the new app router inside the `src` folder. The project is styled using Tailwind CSS and Ant Design (antd) for the user interface. For database management, it connects to MongoDB using Mongoose. The project also utilizes Apollo Server and Apollo Client for GraphQL API handling, Clerk for authentication, and AES for encryption. It is fully dockerized for easy deployment and environment management.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later)
- Docker (if you want to use Docker for running the project)
- MongoDB (if not using Docker or a Cloud instance, make sure MongoDB is installed and running locally)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/derkfootura/depoiq-task.git
   cd depoiq-task

2. **Install dependencies:**

   Run the following command to install the necessary packages:

   ```bash
   npm install

3. **Create a .env file:**

   Copy the .env.sample file to .env and set your environment variables.

   Then, put your actual values.

## Running the Project
### With Docker
Start the development server:

  To run the project locally without Docker, use the following command:

   ```bash
   npm run dev
   ```
   The project will be available at http://localhost:3000

### With Docker
1. Build and run the Docker containers:

   If you prefer to run the project inside Docker containers, use the following command:

   ```bash
   npm run docker:run
   ```
   The project will be available at http://localhost:3000.

2. Stopping the Docker containers:

   To stop the running Docker containers, use the following command:

   ```bash
   docker compose down
   ```

## Folder Structure
The project is organized as follows:

    ├── src
    │   ├── app             # Next.js app router components
    │   │   ├── api         # Next.js serving api
    │   │   ├── layout.tsx  # Page Layout
    │   │   ├── page.tsx    # Page Main Content
    │   │   └── globals.css # Global styles (Tailwind CSS)
    │   ├── components      # Reusable UI components
    │   ├── libs            # Utility functions and helpers
    │   ├── models          # MongoDB schemas
    │   └── middleware.ts   # Middleware for authenticate routes using Clerk
    ├── public              # Static files
    ├── .env                # Environment variables
    ├── docker-compose.yml
    ├── Dockerfile
    ├── tailwind.config.js
    ├── next.config.js
    └── package.json

## Technologies Used
This project utilizes the following technologies:

- **Next.js 14**: The React framework for production.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Ant Design (antd)**: A popular UI component library.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **MongoDB**: A NoSQL database for storing data.
- **Apollo Server**: A fully-featured GraphQL server.
- **Apollo Client**: A comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL.
- **Docker**: A platform to develop, ship, and run applications inside containers.
