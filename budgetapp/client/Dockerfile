# Use a Node.js base image
FROM node:latest

# Create and set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the frontend source code to the container
COPY . .

# Build the React app
RUN npm run build

# Expose the port that your React app will run on (if needed, e.g., for local testing)
EXPOSE 3000

# Command to serve the built React app
CMD ["npm", "start"]
