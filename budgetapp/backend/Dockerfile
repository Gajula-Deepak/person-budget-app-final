# Use a Node.js base image
FROM node:latest

# Create and set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the backend source code to the container
COPY . .

# Expose the port that your Node.js app is running on
EXPOSE 5000

# Command to start your Node.js app
CMD ["npm", "start"]
