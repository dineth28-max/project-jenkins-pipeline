# Use the latest official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy all files from the local "nodeapp" folder into the container's root directory (/)
COPY . .

# Install all required dependencies listed in package.json
RUN npm install

# Expose port 4000 so it can be accessed outside the container
EXPOSE 4000

# Start the Node.js application using npm
CMD ["npm", "start"]
