package sba301.java.opentalk.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import sba301.java.opentalk.common.RandomOpenTalkNumberGenerator;
import sba301.java.opentalk.dto.OpenTalkRegistrationDTO;
import sba301.java.opentalk.dto.OpenTalkMeetingDTO;
import sba301.java.opentalk.dto.UserDTO;
import sba301.java.opentalk.enums.MailType;
import sba301.java.opentalk.enums.OpenTalkRegistrationStatus;
import sba301.java.opentalk.mapper.OpenTalkMeetingMapper;
import sba301.java.opentalk.mapper.OpenTalkTopicMapper;
import sba301.java.opentalk.model.Mail.Mail;
import sba301.java.opentalk.model.Mail.MailSubjectFactory;
import sba301.java.opentalk.model.request.OpenTalkCompletedRequest;
import sba301.java.opentalk.repository.OpenTalkMeetingRepository;
import sba301.java.opentalk.service.MailService;
import sba301.java.opentalk.service.OpenTalkMeetingService;
import sba301.java.opentalk.service.OpenTalkRegistrationService;
import sba301.java.opentalk.service.RedisService;
import sba301.java.opentalk.service.UserService;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class OpenTalkMeetingServiceImpl implements OpenTalkMeetingService {
    private final OpenTalkMeetingRepository meetingRepository;
    private final OpenTalkMeetingRepository openTalkMeetingRepository;
    private final RedisService redisService;
    private final UserService userService;
    private final OpenTalkRegistrationService registrationService;
    private final RandomOpenTalkNumberGenerator randomOpenTalkNumberGenerator;
    private final MailService mailService;

    @Override
    public OpenTalkMeetingDTO createMeeting(OpenTalkMeetingDTO topic) {
        meetingRepository.save(OpenTalkMeetingMapper.INSTANCE.toEntity(topic));
        return topic;
    }

    @Override
    public OpenTalkMeetingDTO updateMeeting(OpenTalkMeetingDTO topic) {
        if (meetingRepository.existsById(topic.getId())) {
            meetingRepository.save(OpenTalkMeetingMapper.INSTANCE.toEntity(topic));
            return topic;
        }
        return null;
    }

    @Override
    public List<OpenTalkMeetingDTO> getAllMeetings() {
        return meetingRepository.findAll().stream().map(OpenTalkMeetingMapper.INSTANCE::toDto).toList();
    }

    @Override
    public Page<OpenTalkMeetingDTO> getMeetingsCompleted(OpenTalkCompletedRequest request) {
        return meetingRepository.findCompletedOpenTalks(
                        request.getCompanyBranchId(), request.getHostName(),
                        request.getIsOrganized(), request.getIsEnableOfHost(),
                        request.getStartDate(), request.getEndDate(),
                        PageRequest.of(request.getPage(), request.getSize()))
                .map(OpenTalkMeetingMapper.INSTANCE::toDto);
    }

    @Override
    public Page<OpenTalkMeetingDTO> getRegisteredOpenTalks(Long userId, LocalDate startDate, LocalDate endDate, int page, int pageSize) {
        return openTalkMeetingRepository
                .findHostRegisteredOpenTalksByUser(
                        userId,
                        startDate,
                        endDate,
                        PageRequest.of(page, pageSize, Sort.by("scheduledDate").descending()))
                .map(OpenTalkMeetingMapper.INSTANCE::toDto);
    }

    @Override
    public Optional<OpenTalkMeetingDTO> getMeetingById(Long topicId) {
        return meetingRepository.findById(topicId).map(OpenTalkMeetingMapper.INSTANCE::toDto);
    }

    @Override
    public boolean deleteMeeting(Long topicId) {
        if (meetingRepository.existsById(topicId)) {
            meetingRepository.deleteById(topicId);
            return true;
        }
        return false;
    }

    @Override
    public boolean checkExistOpenTalk(LocalDate date) {
        return meetingRepository.findByScheduledDate(date).isPresent();
    }

    @Override
    public void createScheduledOpenTalk() {
        List<UserDTO> availableUsers = userService.getAvailableUsersTobeHost();

        if (availableUsers.isEmpty()) {
            return;
        }

        UserDTO randomUser = availableUsers.get((int) (randomOpenTalkNumberGenerator.generateOpenTalkNumber() * availableUsers.size()));

        LocalDate scheduledDate = LocalDate.now().plusDays(redisService.getDaysUntilOpenTalk());
        if (checkExistOpenTalk(scheduledDate)) {
            return;
        }

        OpenTalkMeetingDTO newTopic = new OpenTalkMeetingDTO();
        newTopic.setTopicName("");
        newTopic.setEnabled(true);
        newTopic.setScheduledDate(scheduledDate);
        newTopic.setCompanyBranch(randomUser.getCompanyBranch());
        createMeeting(newTopic);

        OpenTalkRegistrationDTO registrationDTO = new OpenTalkRegistrationDTO();
        registrationDTO.setUserId(randomUser.getId());
        registrationDTO.setOpenTalkTopicId(Objects.requireNonNull(meetingRepository.findByScheduledDate(scheduledDate).orElse(null)).getId());
        registrationDTO.setStatus(OpenTalkRegistrationStatus.APPROVED);
        registrationService.registerOpenTalk(registrationDTO);
    }

    @Override
    @Async
    public void sendMailRemind(Long openTalkId) {
        List<UserDTO> allUsers = userService.getUsers();
        Mail mail = new Mail();
        mail.setMailTo(allUsers.stream().map(UserDTO::getEmail).toArray(String[]::new));
        mail.setMailSubject(MailSubjectFactory.getMailSubject(MailType.REMIND).toString());
        mail.setMailContent("Remind invite the Open Talk Topic " + getMeetingById(openTalkId).get().getTopicName());
        mailService.sendMail(mail);
    }    
}
