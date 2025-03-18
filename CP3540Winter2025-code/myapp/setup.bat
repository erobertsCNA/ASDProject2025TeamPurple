@echo off
echo Setting up the project...

:: Step 1: Install dependencies
call npm install express mongoose cors dotenv

:: Step 2: Ask the user for MongoDB connection string, database name, and port number
set /p MONGO_URI=Enter your MongoDB connection string:
set /p DB_NAME=Enter your database name:
set /p PORT=Enter the port number for your app (default: 3000):

:: Use default port 3000 if the user leaves it blank
if "%PORT%"=="" set PORT=3000

:: Step 3: Create .env file with the provided credentials
(
    echo MONGO_URI=%MONGO_URI%
    echo DB_NAME=%DB_NAME%
    echo PORT=%PORT%
) > .env

echo .env file created with your MongoDB credentials, database name, and port number!

echo Setup complete! You can now run the project with:
echo   node app.js (or nodemon if you prefer)

pause
