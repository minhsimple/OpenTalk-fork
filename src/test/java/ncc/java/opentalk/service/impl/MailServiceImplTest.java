package ncc.java.opentalk.service.impl;

import ncc.java.opentalk.model.Mail.Mail;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;

@SpringBootTest
class MailServiceImplTest {
    @Autowired
    private MailServiceImpl mailService;

    @MockitoBean
    private JavaMailSender mailSender;

    @Test
    void testSendMail() {
        Mail mail = new Mail();
        mail.setMailTo(new String[]{"test@example.com"});
        mail.setMailSubject("Test Subject");
        mail.setMailContent("Test Content");

        ArgumentCaptor<SimpleMailMessage> mailCaptor = ArgumentCaptor.forClass(SimpleMailMessage.class);

        mailService.sendMail(mail);

        verify(mailSender).send(mailCaptor.capture());
        SimpleMailMessage capturedMail = mailCaptor.getValue();

        assertEquals("test@example.com", Objects.requireNonNull(capturedMail.getTo())[0]);
        assertEquals("Test Subject", capturedMail.getSubject());
        assertEquals("Test Content", capturedMail.getText());
    }
}