# Use a base image with Java and Maven installed
FROM openjdk:19-jdk

# Set the working directory inside the container
WORKDIR /backend

# Copy the packaged Spring Boot application to the container
COPY target/budgetboss-0.0.1-SNAPSHOT.jar .

# Expose the port that your Spring Boot application listens on
EXPOSE 8080

# Define the command to run your application
CMD ["java", "-jar", "budgetboss-0.0.1-SNAPSHOT.jar"]