#!/bin/bash

# Default Envs
VERSION="latest"

# Parse command line arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --version=*) VERSION="${1#*=}" ;;
    esac
    shift
done

echo "======================================= Current Envs ============================================="
printf "[VERSION]\t: \t%s\n" "$VERSION"
echo "==================================================================================================="

# 사용자에게 y 또는 n을 입력받음
read -p "Continue Build and Deploy? (y/n): " user_input

if [ "$user_input" != "y" ]; then
    exit
fi

# Write version to env file
echo "VERSION=$VERSION" 

# Export VERSION for Docker Compose to use
export VERSION

# Build the Docker image with the provided or default version
sudo docker build -t "localhost/ai-chip-mock-server:$VERSION" .

# Start the containers using docker-compose
sudo VERSION=$VERSION docker compose up -d
