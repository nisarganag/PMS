FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY . /app
RUN apk update \
    && apk add --no-cache python3 py3-pip \
    && ln -sf /usr/bin/python3 /usr/bin/python \
    && ln -sf /usr/bin/pip3 /usr/bin/pip
RUN pip3 install --upgrade pip
RUN pip3 install nltk==3.8.1
USER root
RUN if [ -f /app/publications.json ]; then chmod 644 /app/publications.json; fi
RUN if [ -f /app/user_publication.json ]; then chmod 644 /app/user_publication.json; fi
EXPOSE 8080
CMD ["java", "-jar", "target/pms-backend-0.0.1.jar"]
