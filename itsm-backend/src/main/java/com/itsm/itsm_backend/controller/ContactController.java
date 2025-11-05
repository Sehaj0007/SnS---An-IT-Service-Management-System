package com.itsm.itsm_backend.controller;

import com.itsm.itsm_backend.dto.ContactMessageDto;
import com.itsm.itsm_backend.entity.ContactMessage;
import com.itsm.itsm_backend.repository.ContactMessageRepository;
// For sending email:
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Match your frontend port!
public class ContactController {
    @Autowired
    private ContactMessageRepository messageRepository;

    // If you want to send a notification email too:
    @Autowired(required = false)
    private JavaMailSender javaMailSender;

    @PostMapping("/contact")
    public ResponseEntity<String> handleContact(@RequestBody ContactMessageDto contact) {
        ContactMessage message = new ContactMessage();
        message.setEmail(contact.getEmail());
        message.setSubject(contact.getSubject());
        message.setMessage(contact.getMessage());
        messageRepository.save(message);

        if (javaMailSender != null) {
            try {
                // 1. Notify Admin
                SimpleMailMessage mail = new SimpleMailMessage();
                mail.setTo("contact@sns-solutions.com");
                mail.setSubject("Contact/Enquiry: " + contact.getSubject());
                mail.setText(
                    "From: " + contact.getEmail() + "\n\nMessage:\n" + contact.getMessage()
                );
                javaMailSender.send(mail);

                // 2. Confirmation to sender (user)
                SimpleMailMessage confirmation = new SimpleMailMessage();
                confirmation.setTo(contact.getEmail());
                confirmation.setSubject("Thank you for contacting SNS Solutions");
                confirmation.setText(
                    "Dear user,\n\nThank you for contacting SNS Solutions. We have received your message and will get back to you soon.\n\nYour message:\n"
                    + contact.getMessage() +
                    "\n\nRegards,\nSNS Solutions Team"
                );
                javaMailSender.send(confirmation);

            } catch (Exception e) {
                System.out.println("Email send error: " + e.getMessage());
            }
        }

        return ResponseEntity.ok("Message received.");
    }

}
