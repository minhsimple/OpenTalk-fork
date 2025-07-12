package sba301.java.opentalk.controller;

import lombok.RequiredArgsConstructor;
import sba301.java.opentalk.dto.HostRegistrationDTO;
import sba301.java.opentalk.dto.OpenTalkMeetingDTO;
import sba301.java.opentalk.dto.OpenTalkRegistrationDTO;
import sba301.java.opentalk.enums.HostRegistrationStatus;
import sba301.java.opentalk.enums.OpenTalkRegistrationStatus;
import sba301.java.opentalk.model.request.OpenTalkCompletedRequest;
import sba301.java.opentalk.service.HostRegistrationService;
import sba301.java.opentalk.service.OpenTalkMeetingService;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Locale;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/opentalk-meeting")
public class OpenTalkMeetingController {
    private final OpenTalkMeetingService openTalkMeetingService;
    private final HostRegistrationService hostRegistrationService;

    @GetMapping
    public ResponseEntity<List<OpenTalkMeetingDTO>> getMeetings() {
        List<OpenTalkMeetingDTO> dtos = openTalkMeetingService.getAllMeetings();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{userId}/registered")
    public ResponseEntity<Page<OpenTalkMeetingDTO>> getRegisteredOpenTalks(
            @PathVariable Long userId,
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<OpenTalkMeetingDTO> dtos = openTalkMeetingService.getRegisteredOpenTalks(userId, startDate, endDate, page, size);
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/completed")
    public ResponseEntity<Page<OpenTalkMeetingDTO>> getCompletedMeetings(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @RequestParam(required = false) Long companyBranchId,
            @RequestParam(required = false) String hostName,
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate,
            @RequestParam(required = false) boolean enableOfHost,
            @RequestParam(required = false) boolean isOrganized) {

        OpenTalkCompletedRequest request = new OpenTalkCompletedRequest(
                page, size, companyBranchId, hostName, isOrganized, enableOfHost, startDate, endDate
        );
        Page<OpenTalkMeetingDTO> dtos = openTalkMeetingService.getMeetingsCompleted(request);
        return ResponseEntity.ok(dtos);
    }


    @PostMapping
    public ResponseEntity<OpenTalkMeetingDTO> createOpenTalkMeeting(@RequestBody OpenTalkMeetingDTO dto) {
        OpenTalkMeetingDTO openTalkMeetingDTO = openTalkMeetingService.createMeeting(dto);
        return ResponseEntity.ok(openTalkMeetingDTO);
    }

    @PostMapping("/completedOpenTalk/create")
    public ResponseEntity<String> createCompletedOpenTalkMeeting() {
        openTalkMeetingService.createScheduledOpenTalk();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/employee/{openTalkMeetingId}/register")
    public ResponseEntity<OpenTalkMeetingDTO> registerOpenTalkMeetingByEmployee(@RequestBody HostRegistrationDTO hostRegistrationDTO) {
        hostRegistrationDTO.setStatus(HostRegistrationStatus.PENDING);
        hostRegistrationService.registerOpenTalk(hostRegistrationDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/admin/{openTalkMeetingId}/register")
    public ResponseEntity<OpenTalkMeetingDTO> registerOpenTalkMeetingByAdmin(@RequestBody HostRegistrationDTO registrationDTO) {
        registrationDTO.setStatus(HostRegistrationStatus.APPROVED);
//        Locale locale = LocaleContextHolder.getLocale();
        hostRegistrationService.registerOpenTalk(registrationDTO);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{openTalkMeetingId}")
    public ResponseEntity<OpenTalkMeetingDTO> updateOpenTalkMeeting(@RequestBody OpenTalkMeetingDTO dto) {
        OpenTalkMeetingDTO openTalkMeetingDTO = openTalkMeetingService.updateMeeting(dto);
        return ResponseEntity.ok(openTalkMeetingDTO);
    }

    @DeleteMapping("/{openTalkMeetingId}")
    public ResponseEntity<Void> deleteOpenTalkMeeting(@PathVariable Long openTalkMeetingId) {
        return openTalkMeetingService.deleteMeeting(openTalkMeetingId) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/register/{openTalkMeetingId}")
    public ResponseEntity<List<HostRegistrationDTO>> getRegisteredOpenTalks(@PathVariable Long openTalkMeetingId) {
        return ResponseEntity.ok().body(hostRegistrationService.findByOpenTalkMeetingId(openTalkMeetingId));
    }

    @GetMapping("/register/native-query/{openTalkMeetingId}")
    public ResponseEntity<List<HostRegistrationDTO>> getRegisteredOpenTalksWithNativeQuery(@PathVariable Long openTalkMeetingId) {
        return ResponseEntity.ok().body(hostRegistrationService.findByOpenTalkMeetingIdWithNativeQuery(openTalkMeetingId));
    }

    @GetMapping("/register/interface-projection/{openTalkMeetingId}")
    public ResponseEntity<List<HostRegistrationDTO>> getRegisteredOpenTalksWithInterfaceProjection(@PathVariable Long openTalkMeetingId) {
        return ResponseEntity.ok().body(hostRegistrationService.findByOpenTalkMeetingIdWithInterfaceProjection(openTalkMeetingId));
    }

    @GetMapping("mail/remind/{openTalkMeetingId}")
    public ResponseEntity<String> sendRemindEmail(@PathVariable Long openTalkMeetingId) {
        openTalkMeetingService.sendMailRemind(openTalkMeetingId);
        return ResponseEntity.ok().build();
    }
}
