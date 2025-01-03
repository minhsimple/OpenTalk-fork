package ncc.java.opentalk.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ncc.java.opentalk.dto.IOpenTalkRegistration;
import ncc.java.opentalk.dto.OpenTalkRegistrationDTO;
import ncc.java.opentalk.entity.OpenTalkRegistration;
import ncc.java.opentalk.entity.OpenTalkTopic;
import ncc.java.opentalk.entity.User;
import ncc.java.opentalk.event.OpenTalkRegistrationEvent;
import ncc.java.opentalk.mapper.OpenTalkTopicMapper;
import ncc.java.opentalk.mapper.UserMapper;
import ncc.java.opentalk.repository.OpenTalkRegistrationRepository;
import ncc.java.opentalk.repository.OpenTalkTopicRepository;
import ncc.java.opentalk.repository.UserRepository;
import ncc.java.opentalk.service.OpenTalkRegistrationService;
import org.modelmapper.ModelMapper;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class OpenTalkRegistrationServiceImpl implements OpenTalkRegistrationService {
    private final OpenTalkRegistrationRepository registrationRepository;
    private final UserRepository userRepository;
    private final OpenTalkTopicRepository topicRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Override
    public void registerOpenTalk(OpenTalkRegistrationDTO registrationDTO) {
        User user = userRepository.findById(registrationDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        OpenTalkTopic topic = topicRepository.findById(registrationDTO.getOpenTalkTopicId())
                .orElseThrow(() -> new RuntimeException("Topic Not Found"));

        if (registrationRepository.existsByUserIdAndOpenTalkTopicId(registrationDTO.getUserId(), registrationDTO.getOpenTalkTopicId())) {
            throw new RuntimeException("User has registered this OpenTalk Topic");
        }

        OpenTalkRegistration registration = new OpenTalkRegistration();
        registration.setUser(user);
        registration.setOpenTalkTopic(topic);
        registration.setStatus(registrationDTO.getStatus());

        registrationRepository.save(registration);

        eventPublisher.publishEvent(new OpenTalkRegistrationEvent(this, UserMapper.INSTANCE.userToUserDTO(user), OpenTalkTopicMapper.INSTANCE.toDto(topic), registrationDTO.getStatus()));
    }

    @Override
    public List<OpenTalkRegistrationDTO> findByOpenTalkTopicId(Long topicId) {
        ModelMapper modelMapper = new ModelMapper();
        log.info("===========*Starting Query*===========");
        List<OpenTalkRegistration> openTalkRegistrations = registrationRepository.findByOpenTalkTopicId(topicId);
        log.info("===========*Ending Query*===========");
        return openTalkRegistrations.stream().map(openTalkRegistration -> modelMapper.map(openTalkRegistration, OpenTalkRegistrationDTO.class)).toList();
    }

    @Override
    public List<OpenTalkRegistrationDTO> findByOpenTalkTopicIdWithNativeQuery(Long topicId) {
        log.info("===========*Starting Native Query*===========");
        List<OpenTalkRegistration> dtos = registrationRepository.findByOpenTalkTopicIdWithNativeQuery(topicId);
        log.info("===========*Ending Native Query*===========");
        ModelMapper modelMapper = new ModelMapper();
        return dtos.stream().map(openTalkRegistration -> modelMapper.map(openTalkRegistration, OpenTalkRegistrationDTO.class)).toList();
    }

    @Override
    public List<OpenTalkRegistrationDTO> findByOpenTalkTopicIdWithInterfaceProjection(Long topicId) {
        log.info("===========*Starting Interface Query*===========");
        List<IOpenTalkRegistration> iOpenTalkRegistrations = registrationRepository.findRegistrationsByTopicId(topicId);
        log.info("===========*Starting Interface Query*===========");
        return iOpenTalkRegistrations.stream()
                .map(registration -> {
                    OpenTalkRegistrationDTO dto = new OpenTalkRegistrationDTO();
                    dto.setId(registration.getId());
                    dto.setCreatedAt(registration.getCreatedAt());
                    dto.setUpdatedAt(registration.getUpdatedAt());
                    dto.setUserId(registration.getUserId());
                    dto.setOpenTalkTopicId(registration.getOpenTalkTopicId());
                    dto.setStatus(registration.getStatus());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}