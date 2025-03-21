@echo off
echo Setting up the project...

:: Step 1: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed. Please install it from https://nodejs.org/
    exit /b
)
echo [SUCCESS] Node.js is installed!

:: Step 2: Ask for MongoDB connection string, database name, and port number
set /p MONGO_URI=Enter your MongoDB connection string:
set /p DB_NAME=Enter your database name:
set /p PORT=Enter the port number for your app (default: 3000):

:: Use default port 3000 if left blank
if "%PORT%"=="" set PORT=3000

:: Step 3: Create .env file with user-provided values
(
    echo MONGO_URI=%MONGO_URI%
    echo DB_NAME=%DB_NAME%
    echo PORT=%PORT%
) > .env

echo .env file created successfully!

:: Step 4: Install dependencies from package.json
echo Installing dependencies...
call npm install
echo.
echo ==================================
echo Setup complete! You can now run:
echo   npm run dev  (for nodemon)
echo   npm start    (for normal node)
echo   npm test     (to test dependencies by running hello.js)
echo ==================================
