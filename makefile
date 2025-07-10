# Makefile for Hardhat + React Web3 App

HARDHAT_DIR=blockchain
CLIENT_DIR=client
ABI_FILE=$(CLIENT_DIR)/src/abi/Lock.json
CONFIG_FILE=$(CLIENT_DIR)/src/config.js

.PHONY: start-node deploy start-client reset clear build

start-node:
	cd $(HARDHAT_DIR) && npm install && npx hardhat node

deploy-localhost:
	cd $(HARDHAT_DIR) && \
	rm -rf cache artifacts && \
	npx hardhat compile && \
	npx hardhat run scripts/deploy.ts --network localhost

deploy-testnet:
	cd $(HARDHAT_DIR) && \
	rm -rf cache artifacts && \
	npx hardhat compile && \
	npx hardhat run scripts/deploy.ts --network testnet


start-client:
	cd $(CLIENT_DIR) && npm install && npm start

reset:
	rm -rf $(HARDHAT_DIR)/cache $(HARDHAT_DIR)/artifacts
	rm -f $(ABI_FILE) $(CONFIG_FILE)
	cd $(CLIENT_DIR) && rm -rf node_modules .vite

clear: reset

build:
	cd $(HARDHAT_DIR) && npx hardhat compile
