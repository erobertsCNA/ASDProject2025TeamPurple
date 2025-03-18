# This has not confirmed to run as of yet. Sample code may need work.

#!/bin/bash

echo "Setting up the project..."

# Step 1: Install dependencies
npm install express mongoose cors dotenv

# Step 2: Prompt the user for MongoDB URI, database name, and port number
read -p "Enter your MongoDB connection string: " mongo_uri
read -p "Enter your database name: " db_name
read -p "Enter the port number for your app (default: 3000): " port

# Use default port 3000 if user leaves it blank
port=${port:-3000}

# Step 3: Create .env file with the provided credentials
echo "Creating .env file..."
cat <<EOT > .env
MONGO_URI=$mongo_uri
DB_NAME=$db_name
PORT=$port
EOT

echo ".env file created with your MongoDB credentials, database name, and port number!"

echo "Setup complete! You can now run the project with:"
echo "  npm start"
