#!/bin/bash
set -e

echo "Setting up the project..."

# Step 1: Check if Node.js is installed
if ! command -v node >/dev/null 2>&1; then
    echo "Error: Node.js is not installed. Please install it from https://nodejs.org/"
    exit 1
fi
echo "[SUCCESS] Node.js is installed!"

# Step 2: Ask for MongoDB connection string, database name, and port number
read -p "Enter your MongoDB connection string: " MONGO_URI
read -p "Enter your database name: " DB_NAME
read -p "Enter the port number for your app (default: 3000): " PORT

# Use default port 3000 if left blank
PORT=${PORT:-3000}

# Step 3: Create .env file with user-provided values
cat <<EOF > .env
MONGO_URI=$MONGO_URI
DB_NAME=$DB_NAME
PORT=$PORT
EOF

echo ".env file created successfully!"

# Step 4: Install dependencies from package.json
echo "Installing dependencies..."
npm install

echo "=================================="
echo "Setup complete! You can now run:"
echo "  npm run dev  (for nodemon)"
echo "  npm start    (for normal node)"
echo "  npm test     (to test dependencies by running hello.js)"
echo "=================================="
