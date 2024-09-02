# Use Node.js LTS (Long Term Support) as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json /app/

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . /app

EXPOSE 3000

# Serve the application with Vite
CMD ["npm", "run", "dev"]
