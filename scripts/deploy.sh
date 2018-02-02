#!/bin/bash

# Heroku container service deployment script

docker login --username="${HEROKU_EMAIL}" --email="${HEROKU_EMAIL}" --password="${HEROKU_AUTH_TOKEN}" registry.heroku.com
docker build --rm=false --build-arg RELEASE="${TAG}" -t food-trucks-api/${TAG} .;
docker tag food-trucks-api/${TAG} registry.heroku.com/${HEROKU_APP}/web;
docker push registry.heroku.com/${HEROKU_APP}/web;
