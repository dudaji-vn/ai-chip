# Stage 1: Building the app
FROM node:18.17.0 as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn

# Copy the rest of the application code
COPY . .

# Build the app
RUN yarn build

# Stage 2: Serve the app
FROM node:18.17.0

# Set the working directory
WORKDIR /app

# Copy from the builder stage
COPY --from=builder /app ./

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["yarn", "start"]
