.DEFAULT_GOAL := help
.PHONY: up help

up: ## Bring up dev stack with docker compose
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

deps: ## Check dependencies with ncu
	(cd ./backend && ncu) && (cd ./frontend && ncu)

deps-minor: ## Upgrade dependencies to latest minor versions with ncu
	(cd ./backend && ncu -t minor -u && npm install) && (cd ./frontend && ncu -t minor -u && npm install)

help: ## Show this help
	@egrep -h '\s##\s' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[33m%-20s\033[0m %s\n", $$1, $$2}'
