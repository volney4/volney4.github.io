#!/bin/bash

# Build Angular app for production
echo 'Building Angular app for production...'

ng build --prod --base-href ./

# Navigate to the 'docs' directory
cd docs

# Copy 'index.html' to '404.html'
echo 'Copying index into 404...'
cp index.html 404.html

