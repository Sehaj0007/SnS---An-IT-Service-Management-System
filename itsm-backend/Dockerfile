# backend/Dockerfile
# Stage 1: Build the jar with Maven
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
# Copy only what Maven needs for caching
COPY pom.xml .
COPY src ./src
RUN mvn -B -f pom.xml clean package -DskipTests

# Stage 2: Runtime image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# copy jar from builder (use wildcard to pick versioned name)
COPY --from=build /app/target/*.jar app.jar

# Expose the app port (match your Spring Boot port)
EXPOSE 8081

# Run the jar
ENTRYPOINT ["java","-jar","/app/app.jar"]
