# Use Node.js LTS image
FROM node:18

# Create working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Start the compiled app
CMD ["npm", "start"]
