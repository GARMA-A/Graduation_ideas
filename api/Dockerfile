FROM node:20-alpine

WORKDIR /app

# Copy package files and configs
COPY package*.json ./
COPY tsconfig.json ./
COPY .env .   

# Copy source code
COPY src ./src

# Install dependencies
RUN npm install

# Build project
RUN npm run build

# Start the application
CMD ["node", "dist/index.js"]
