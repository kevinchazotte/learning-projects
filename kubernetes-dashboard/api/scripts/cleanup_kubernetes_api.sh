#!/bin/bash

set -e

echo "Deleting Kubernetes manifests..."
kubectl delete -f kubernetes/api-deployment.yaml || true
kubectl delete -f kubernetes/api-service.yaml || true

echo "Stopping Minikube..."
minikube stop

echo "Cleanup complete!"
