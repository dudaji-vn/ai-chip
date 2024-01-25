#!/bin/bash

# Ask for the version
read -p "Enter the version for the Docker image: " version

# Validate the input
if [[ -z "$version" ]]; then
    echo "Version is required."
    exit 1
fi

# Define the image name
IMAGE_NAME="registry.gocap.kr/npu/npu-dashboard:$version"

# Build the Docker image
echo "Building Docker image: $IMAGE_NAME"
sudo docker build -t $IMAGE_NAME .

# Push the Docker image
echo "Pushing Docker image to the registry"
sudo docker push $IMAGE_NAME

# # Update the deployment with the new image
echo "Deploying the application using kubectl"
kubectl set image deployment/npu-dashboard npu-dashboard=$IMAGE_NAME -n npu

echo "Deployment updated successfully!"
