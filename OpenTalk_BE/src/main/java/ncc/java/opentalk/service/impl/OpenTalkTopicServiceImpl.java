package ncc.java.opentalk.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ncc.java.opentalk.common.RandomOpenTalkNumberGenerator;
import ncc.java.opentalk.dto.OpenTalkRegistrationDTO;
import ncc.java.opentalk.dto.OpenTalkTopicDTO;
import ncc.java.opentalk.dto.UserDTO;
import ncc.java.opentalk.enums.MailType;
import ncc.java.opentalk.enums.OpenTalkRegistrationStatus;
import ncc.java.opentalk.mapper.OpenTalkTopicMapper;
import ncc.java.opentalk.model.Mail.Mail;
import ncc.java.opentalk.model.Mail.MailSubjectFactory;
import ncc.java.opentalk.model.request.OpenTalkCompletedRequest;
import ncc.java.opentalk.repository.OpenTalkTopicRepository;
import ncc.java.opentalk.service.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class OpenTalkTopicServiceImpl implements OpenTalkTopicService {
    private final OpenTalkTopicRepository topicRepository;
    private final OpenTalkTopicRepository openTalkTopicRepository;
    private final RedisService redisService;
    private final UserService userService;
    private final OpenTalkRegistrationService registrationService;
    private final RandomOpenTalkNumberGenerator randomOpenTalkNumberGenerator;
    private final MailService mailService;

    @Override
    public OpenTalkTopicDTO createTopic(OpenTalkTopicDTO topic) {
        topicRepository.save(OpenTalkTopicMapper.INSTANCE.toEntity(topic));
        return topic;
    }

    @Override
    public OpenTalkTopicDTO updateTopic(OpenTalkTopicDTO topic) {
        if (topicRepository.existsById(topic.getId())) {
            topicRepository.save(OpenTalkTopicMapper.INSTANCE.toEntity(topic));
            return topic;
        }
        return null;
    }

    @Override
    public List<OpenTalkTopicDTO> getAllTopics() {
        return topicRepository.findAll().stream().map(OpenTalkTopicMapper.INSTANCE::toDto).toList();
    }

    @Override
    public Page<OpenTalkTopicDTO> getTopicsCompleted(OpenTalkCompletedRequest request) {
        return topicRepository.findCompletedOpenTalks(
                        request.getCompanyBranchId(), request.getHostName(),
                        request.getIsOrganized(), request.getIsEnableOfHost(),
                        request.getStartDate(), request.getEndDate(),
                        PageRequest.of(request.getPage(), request.getSize()))
                .map(OpenTalkTopicMapper.INSTANCE::toDto);
    }

    @Override
    public Page<OpenTalkTopicDTO> getRegisteredOpenTalks(Long userId, LocalDate startDate, LocalDate endDate, int page, int pageSize) {
        return openTalkTopicRepository
                .findRegisteredOpenTalksByUser(
                        userId,
                        startDate,
                        endDate,
                        PageRequest.of(page, pageSize, Sort.by("scheduledDate").descending()))
                .map(OpenTalkTopicMapper.INSTANCE::toDto);
    }

    @Override
    public Optional<OpenTalkTopicDTO> getTopicById(Long topicId) {
        return topicRepository.findById(topicId).map(OpenTalkTopicMapper.INSTANCE::toDto);
    }

    @Override
    public boolean deleteTopic(Long topicId) {
        if (topicRepository.existsById(topicId)) {
            topicRepository.deleteById(topicId);
            return true;
        }
        return false;
    }

    @Override
    public boolean checkExistOpenTalk(LocalDate date) {
        if (topicRepository.findByScheduledDate(date).isPresent()) {
            return true;
        }
        return false;
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

        OpenTalkTopicDTO newTopic = new OpenTalkTopicDTO();
        newTopic.setTopicName("");
        newTopic.setEnabled(true);
        newTopic.setScheduledDate(scheduledDate);
        newTopic.setCompanyBranch(randomUser.getCompanyBranch());
        createTopic(newTopic);

        OpenTalkRegistrationDTO registrationDTO = new OpenTalkRegistrationDTO();
        registrationDTO.setUserId(randomUser.getId());
        registrationDTO.setOpenTalkTopicId(Objects.requireNonNull(topicRepository.findByScheduledDate(scheduledDate).orElse(null)).getId());
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
        mail.setMailContent("Remind invite the Open Talk Topic " + getTopicById(openTalkId).get().getTopicName());
        mailService.sendMail(mail);
    }
}
