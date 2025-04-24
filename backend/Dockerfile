FROM node:18-alpine AS base

WORKDIR /app

# Copy source code
COPY . .

# Install dependencies
RUN npm install 

EXPOSE 3000

CMD ["node", "src/server.js"]
