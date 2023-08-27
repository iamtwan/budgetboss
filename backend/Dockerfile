FROM maven:3.8.7-openjdk-18-slim as builder
COPY . .
RUN mvn clean install -DskipTests

FROM openjdk:19-jdk-slim-buster
COPY --from=builder /target/budgetboss-0.0.1-SNAPSHOT.jar demo.jar

EXPOSE 8080

RUN apt-get update && apt-get install -y wget unzip

RUN wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.zip
RUN unzip ngrok-v3-stable-linux-amd64.zip
RUN mv ngrok /usr/local/bin

RUN apt-get install -y rabbitmq-server

COPY entrypoint.sh .

# Grant execute permissions to the entrypoint script
RUN chmod +x entrypoint.sh

# Set the entrypoint script as the entrypoint for the container
ENTRYPOINT ["./entrypoint.sh"]

#CMD ["java", "-jar", "budgetboss-0.0.1-SNAPSHOT.jar"]
