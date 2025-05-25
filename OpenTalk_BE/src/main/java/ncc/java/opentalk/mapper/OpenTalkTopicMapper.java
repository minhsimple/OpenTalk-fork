package ncc.java.opentalk.mapper;

import ncc.java.opentalk.dto.OpenTalkTopicDTO;
import ncc.java.opentalk.entity.CompanyBranch;
import ncc.java.opentalk.entity.OpenTalkTopic;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper
public interface OpenTalkTopicMapper {
    OpenTalkTopicMapper INSTANCE = Mappers.getMapper(OpenTalkTopicMapper.class);

    @Mapping(source = "companyBranch.id", target = "companyBranch")
    OpenTalkTopicDTO toDto(OpenTalkTopic topic);

    @Mapping(target = "companyBranch", source = "companyBranch", qualifiedByName = "idToCompanyBranch")
    OpenTalkTopic toEntity(OpenTalkTopicDTO dto);

    @Named("idToCompanyBranch")
    default CompanyBranch idToCompanyBranch(Long id) {
        if (id == null) return null;
        return new CompanyBranch(id);
    }
}
