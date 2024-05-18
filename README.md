# PMS
Publication Management System
Create a folder called resources under "pms-backend/src/main/resources" and add the file application.properties
The contents of the application.properties file:

spring.data.mongodb.uri= <enter your mongodb uri>
spring.servlet.multipart.max-file-size=100MB
spring.servlet.multipart.max-request-size=100MB
spring.mail.host=smtp.mailgun.org
spring.mail.port=587
spring.mail.username= <enter your mailgun username>
spring.mail.password= <enter your mailgun password>
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
