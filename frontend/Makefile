.DEFAULT_GOAL := help
.PHONY: help run

help: ## show this help
	@egrep -h '\s##\s' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[33m%-20s\033[0m %s\n", $$1, $$2}'

run: ## build and run frontend docker image
	docker build -t speedtest-frontend . && docker run -it --rm -p 3000:3000 speedtest-frontend
