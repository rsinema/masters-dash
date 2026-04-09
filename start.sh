#!/usr/bin/env bash
# Build and start only the app container, mapping localhost:8080 -> container:80
docker compose build app
docker compose run -d --name masters-dash-app -p 8080:80 app
echo "App available at http://localhost:8080"
