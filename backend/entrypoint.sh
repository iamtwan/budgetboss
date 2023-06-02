#!/bin/bash

# Run ngrok in the background
ngrok http --scheme=http --log=stdout 8080 &

# Store the process ID of ngrok
NGROK_PID=$!

# Run the Spring Boot application in the background
java -jar budgetboss-0.0.1-SNAPSHOT.jar &

# Store the process ID of Java
JAVA_PID=$!

# Function to handle graceful shutdown
shutdown() {
  echo "Stopping container..."
  # Kill ngrok process
  kill $NGROK_PID
  # Wait for ngrok to exit
  wait $NGROK_PID
  # Kill java process
  kill $JAVA_PID
  # Wait for java to exit
  wait $JAVA_PID
  # Exit the script
  exit
}

# Trap SIGTERM and SIGINT signals and call the shutdown function
trap 'shutdown' SIGTERM SIGINT

# Keep script running
wait