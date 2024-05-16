#!/bin/bash

# Install Node.js and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts

# Navigate to the project directory
cd /var/www/hrsms/

# Install project dependencies
npm install
