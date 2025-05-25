package ncc.java.opentalk.event.handle;

import lombok.RequiredArgsConstructor;
import ncc.java.opentalk.dto.OpenTalkTopicDTO;
import ncc.java.opentalk.dto.UserDTO;
import ncc.java.opentalk.enums.OpenTalkRegistrationStatus;
import ncc.java.opentalk.event.OpenTalkRegistrationEvent;
import ncc.java.opentalk.model.Mail.Mail;
import ncc.java.opentalk.service.MailService;
import ncc.java.opentalk.service.UserService;
import org.springframework.context.MessageSource;
import org.springframework.context.event.EventListener;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Locale;

@Component
@RequiredArgsConstructor
public class OpenTalkRegistrationEventListener {
    private final MailService mailService;
    private final UserService userService;
    private final MessageSource messageSource;

    @Async
    @EventListener
    public void handleOpenTalkRegistrationEvent(OpenTalkRegistrationEvent event) {
        UserDTO user = event.getUser();
        OpenTalkTopicDTO topic = event.getTopic();
        Locale locale = LocaleContextHolder.getLocale();
        Mail mail = new Mail();

        if (event.getStatus().equals(OpenTalkRegistrationStatus.APPROVED)) {
            mail.setMailSubject(messageSource.getMessage("mail.subject.registration.approved", null, locale));
            mail.setMailContent(messageSource.getMessage("mail.content.registration.approved",
                    new Object[]{user.getFullName(), topic.getTopicName(), topic.getScheduledDate()}, locale));
            mail.setMailTo(new String[]{user.getEmail()});
        } else if (event.getStatus().equals(OpenTalkRegistrationStatus.REJECTED)) {
            mail.setMailSubject(messageSource.getMessage("mail.subject.registration.rejected", null, locale));
            mail.setMailContent(messageSource.getMessage("mail.content.registration.rejected",
                    new Object[]{user.getFullName(), topic.getTopicName(), topic.getScheduledDate()}, locale));
            mail.setMailTo(new String[]{user.getEmail()});
        } else {
            mail.setMailSubject("OpenTalk Registration Announcement");
            List<UserDTO> admins = userService.getAllAdmin();
            mail.setMailTo(admins.stream()
                    .map(UserDTO::getEmail)
                    .toArray(String[]::new));
            mail.setMailContent("Please check " + topic.getTopicName() + " - ID: " + topic.getId() +
                                "to confirm request to be Host of " + user.getFullName() + " -ID: " + user.getId());
        }
        mailService.sendMail(mail);
    }
}
