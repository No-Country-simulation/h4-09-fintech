package com.demo.demo.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class EmailService {

    private final JavaMailSender emailSender;

    public EmailService(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    public void sendHtmlEmail(String to, String subject, String templatePath, List<Map<String, String>> emailData) throws MessagingException, IOException {
        // Leer el archivo HTML desde resources
        String htmlContent = loadHtmlTemplate(templatePath, emailData);

        // Crear el objeto MimeMessage
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true); // true para indicar que es HTML

        emailSender.send(message);
    }

    private String loadHtmlTemplate(String templatePath, List<Map<String, String>> emailData) throws IOException {
        // Leer el archivo desde resources
        ClassPathResource resource = new ClassPathResource(templatePath);
        try (InputStream inputStream = resource.getInputStream();
             BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {
            // Leer el archivo completo en un String
            String content = reader.lines().collect(Collectors.joining(System.lineSeparator()));


            // Reemplazar marcadores con los valores proporcionados
            for (Map<String, String> data : emailData) {
                for (Map.Entry<String, String> entry : data.entrySet()) {
                    content = content.replace("{{" + entry.getKey() + "}}", entry.getValue());
                }
            }

            return content;
        }
    }
}