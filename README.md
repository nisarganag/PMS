# PMS
## Publication Management System<br><br>
Create a folder called resources under "pms-backend/src/main/resources" and add the file application.properties<br><br>
The contents of the application.properties file:<br>

spring.data.mongodb.uri= "enter your mongodb uri"<br>
spring.servlet.multipart.max-file-size=100MB<br>
spring.servlet.multipart.max-request-size=100MB<br>
spring.mail.host=smtp.mailgun.org<br>
spring.mail.port=587<br>
spring.mail.username= "enter your mailgun username"<br>
spring.mail.password= "enter your mailgun password"<br>
spring.mail.properties.mail.smtp.auth=true<br>
spring.mail.properties.mail.smtp.starttls.enable=true<br>
