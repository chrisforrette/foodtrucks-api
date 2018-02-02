#!/bin/bash

# Heroku container service deployment script

echo "${HEROKU_AUTH_TOKEN}" | docker login --username "${HEROKU_EMAIL}" --password-stdin registry.heroku.com;
docker build --rm=false -t food-trucks-api/${TAG} .;
docker tag food-trucks-api/${TAG} registry.heroku.com/${ENV}-food-trucks-api/web;
docker push registry.heroku.com/${ENV}-food-trucks-api/web;
