# Start from a base image with Python installed
FROM python:3.8-slim-buster as builder

# Set the working directory in the builder container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app/

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Start from the base image with Java installed
FROM sensedia/openjdk21-base

# Install Python
RUN pacman -Syu --noconfirm python

# Set the working directory in the container
WORKDIR /app

# Copy the entire application directory from the builder container
COPY --from=builder /app/ /app/

# Change the user to root and change the permissions of the publications.json and user_publication.json files
USER root
RUN if [ -f /app/publications.json ]; then chmod 644 /app/publications.json; fi
RUN if [ -f /app/user_publication.json ]; then chmod 644 /app/user_publication.json; fi

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the jar file 
ENTRYPOINT ["java", "-jar", "target/pms-backend-0.0.1.jar"]