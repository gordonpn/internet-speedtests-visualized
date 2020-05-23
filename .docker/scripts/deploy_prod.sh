#!/usr/bin/env bash
set -euo pipefail
docker-compose -f /drone/src/docker-compose.yml -f /drone/src/docker-compose.prod.yml up --detach --build
