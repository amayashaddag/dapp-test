#!/bin/bash

# PS : We can create a more sophisticated script to run tests and better deployment.

blockchain_folder="blockchain"
client_folder="client"

# Go to blockchain folder
cd "$blockchain_folder"

# Install dependencies if needed
npm install

# Compile contracts
npx hardhat compile

# Start Hardhat node in background
npx hardhat node &

# Wait a moment to ensure node is ready
sleep 2

# Deploy to local node
npx hardhat run scripts/deploy.ts --network localhost

# Go to React client
cd "../$client_folder"

# Install frontend dependencies
npm install

# Start React app
npm start
