# Use node:16 as base image
FROM node:16

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for layer caching
COPY package*.json ./

# Install dependencies (only re-runs if package.json changes)
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Ensure scripts have correct permissions if needed
# RUN chmod +x /app/node_modules/.bin/ts-node

# Expose the API port
EXPOSE 3000

# Default command for development (can be overridden in docker-compose)
CMD ["npm", "run", "dev"]
