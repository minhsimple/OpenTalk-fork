package ncc.java.opentalk.service;

import ncc.java.opentalk.dto.OpenTalkSlideDto;
import ncc.java.opentalk.exception.AppException;
import org.springframework.web.multipart.MultipartFile;

import java.util.concurrent.ExecutionException;

public interface OpenTalkSlideService {
    public void saveSlide(OpenTalkSlideDto openTalkSlideDTO, MultipartFile file) throws AppException, ExecutionException, InterruptedException;
}
