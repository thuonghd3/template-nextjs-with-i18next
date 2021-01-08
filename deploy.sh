#!/bin/bash

set -e

env=$1
if [ -z "$1" ]
  then
    echo "Param :env is required as $1"
    exit 1
fi

branch=$2
if [ -z "$2" ]
  then
    echo "Param :branch is required as $2"
    exit 1
fi

echo "Deploying $2 branch to $1"
git fetch origin && git checkout $2 && git merge origin/$2

echo "Overwriting .env with .env-$1"
cp ".env-$1" .env
# cp .env.local.example .env

echo "Rebuild docker"
# docker-compose down && docker-compose build && docker-compose up -d
CONTAINER_NAME="viewpals_web_$1"; docker stop $CONTAINER_NAME && docker rm $CONTAINER_NAME
docker-compose -p "viewpals_web_$1" -f docker-compose.yml -f "docker-compose.$1.yml" up -d --build --remove-orphans

echo "Deployed viewpals app from branch $2 to $1"

exit 0
