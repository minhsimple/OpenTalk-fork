package ncc.java.opentalk.mapper;

import ncc.java.opentalk.dto.OpenTalkRegistrationDTO;
import ncc.java.opentalk.entity.OpenTalkRegistration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface OpenTalkRegistrationMapper {
    OpenTalkRegistrationMapper INSTANCE = Mappers.getMapper(OpenTalkRegistrationMapper.class);

    @Mapping(source = "user.id", target = "userId")
    OpenTalkRegistrationDTO toDto(OpenTalkRegistration openTalkRegistration);
}
