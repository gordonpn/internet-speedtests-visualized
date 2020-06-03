#!/bin/sh
echo "$DOCKER_TOKEN" | docker login -u gordonpn --password-stdin
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
docker buildx rm builder || true
docker buildx create --name builder --driver docker-container --use
docker buildx inspect --bootstrap
cd /drone/src/frontend || exit
docker buildx build -t gordonpn/speedtest-frontend:latest --platform linux/amd64,linux/arm64 --push .
cd /drone/src/backend || exit
docker buildx build -t gordonpn/speedtest-backend:latest --platform linux/amd64,linux/arm64 --push .
cd /drone/src/scraper || exit
docker buildx build -t gordonpn/speedtest-scraper:latest --platform linux/amd64,linux/arm64 --push .
