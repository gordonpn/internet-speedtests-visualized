#!/bin/sh
echo "$DOCKER_TOKEN" | docker login -u gordonpn --password-stdin
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
docker buildx rm builder || true
docker buildx create --name builder --driver docker-container --use
docker buildx inspect --bootstrap
DOCKER_TAG=${DOCKER_TAG:-latest}
cd /drone/src/frontend || exit 1
docker buildx build -t gordonpn/speedtest-frontend:"$DOCKER_TAG" --platform linux/amd64,linux/arm64 --push .
cd /drone/src/backend || exit 1
docker buildx build -t gordonpn/speedtest-backend:"$DOCKER_TAG" --platform linux/amd64,linux/arm64 --push .
cd /drone/src/scraper || exit 1
docker buildx build -t gordonpn/speedtest-scraper:"$DOCKER_TAG" --platform linux/amd64,linux/arm64 --push .
