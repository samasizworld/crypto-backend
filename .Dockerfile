# Use the official Node.js image.
FROM node:20.11.1-alpine

# Set the working directory.
WORKDIR /usr/src/

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install dependencies.
RUN npm install && npm install -g typescript

# Copy the rest of the application.
COPY . .

# Build the TypeScript code.
RUN tsc

# Expose the port the app runs on.
EXPOSE 7000

# Run the application.
CMD ["npm", "start"]
