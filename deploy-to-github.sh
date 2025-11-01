#!/bin/bash

# GitHub Pages Deployment Script
# Run this script to deploy your app to GitHub Pages

echo "🚀 GitHub Pages Deployment Script"
echo "================================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - @upendra.manike packages demo app"
    echo "✅ Git repository initialized"
    echo ""
    echo "⚠️  IMPORTANT: Create a GitHub repository first, then run:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/JSLibUseage.git"
    echo "   git push -u origin main"
    echo ""
    read -p "Have you created the GitHub repository and added the remote? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Please create a GitHub repository first, then run this script again."
        exit 1
    fi
fi

# Check if remote exists
if ! git remote | grep -q origin; then
    echo "⚠️  No remote 'origin' found."
    echo "Please add your GitHub remote:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/JSLibUseage.git"
    exit 1
fi

echo "📦 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors and try again."
    exit 1
fi

echo ""
echo "🚀 Deploying to GitHub Pages..."
npm run deploy

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "📍 Next steps:"
    echo "1. Go to your GitHub repository"
    echo "2. Click Settings → Pages"
    echo "3. Select source: 'gh-pages' branch, '/ (root)' folder"
    echo "4. Save and wait 1-2 minutes"
    echo ""
    echo "🌐 Your site will be live at:"
    echo "   https://YOUR_USERNAME.github.io/JSLibUseage/"
else
    echo "❌ Deployment failed! Check the error messages above."
    exit 1
fi

