FROM node:20-alpine
WORKDIR /app
COPY package*.json tsconfig.json ./
COPY src ./src
RUN npm install
RUN npm run build
ENV NODE_ENV development
CMD ["node","dist/index.js"]
