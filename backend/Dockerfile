# Use a base image with Java and Maven installed
FROM openjdk:19-jdk-slim-buster

# Set the working directory inside the container
WORKDIR /backend

# Copy the packaged Spring Boot application to the container
COPY target/budgetboss-0.0.1-SNAPSHOT.jar .

# Expose the port that your Spring Boot application listens on
EXPOSE 8080

RUN apt-get update && apt-get install -y wget unzip

# Download and install ngrok
RUN wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.zip
RUN unzip ngrok-v3-stable-linux-amd64.zip
RUN mv ngrok /usr/local/bin

COPY entrypoint.sh .

# Grant execute permissions to the entrypoint script
RUN chmod +x entrypoint.sh

# Set the entrypoint script as the entrypoint for the container
ENTRYPOINT ["./entrypoint.sh"]

#CMD ["java", "-jar", "budgetboss-0.0.1-SNAPSHOT.jar"]
