#!/bin/bash

echo "Starting local PostgreSQL database..."
docker compose up -d db

if [ $? -eq 0 ]; then
  echo "PostgreSQL database started successfully."
else
  echo "Error starting PostgreSQL database."
  exit 1
fi
