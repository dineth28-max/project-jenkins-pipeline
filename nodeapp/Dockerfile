# Use a lightweight Node.js base image for better performance
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of your application files
COPY . .

# Expose the application port
EXPOSE 4000

# Define the command to run your app
CMD ["npm", "start"]
