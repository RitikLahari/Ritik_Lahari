#!/bin/bash
# Run this script to automatically set up the portfolio backend

echo "==============================================="
echo "Portfolio Backend Setup Script"
echo "==============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed!"
    echo "Please download it from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Change to server directory
cd server || exit

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "==============================================="
echo "Setup Complete!"
echo "==============================================="
echo ""
echo "Next steps:"
echo "1. Create .env file from .env.example"
echo "2. Add your MongoDB connection string"
echo "3. Run: npm start"
echo ""
echo "Then open: file:///path/to/new_portfolio/myself/index.html"
echo ""
