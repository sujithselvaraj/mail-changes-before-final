# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /ap

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY . .

# Build the app for production
RUN npm run build

# Specify the command to run your app
CMD ["npm", "start"]

