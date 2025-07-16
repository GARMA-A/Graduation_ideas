# Use Node base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Copy .env file (optional for local dev; Railway injects env vars at runtime)
COPY .env . 

# Copy the rest of the app
COPY src ./src

# Install dependencies
RUN npm install

# Build the app (e.g. if using TypeScript)
RUN npm run build

# Set environment variable for production
ENV NODE_ENV=production

# Expose the correct port
EXPOSE 5000

# Start the app
CMD ["node", "dist/index.js"]
