package ncc.java.opentalk.service;

import ncc.java.opentalk.dto.IOpenTalkRegistration;
import ncc.java.opentalk.dto.OpenTalkRegistrationDTO;

import java.util.List;

public interface OpenTalkRegistrationService {
    public void registerOpenTalk(OpenTalkRegistrationDTO registrationDTO);
    public List<OpenTalkRegistrationDTO> findByOpenTalkTopicId(Long topicId);
    public List<OpenTalkRegistrationDTO> findByOpenTalkTopicIdWithNativeQuery(Long topicId);
    public List<OpenTalkRegistrationDTO> findByOpenTalkTopicIdWithInterfaceProjection(Long topicId);
}
