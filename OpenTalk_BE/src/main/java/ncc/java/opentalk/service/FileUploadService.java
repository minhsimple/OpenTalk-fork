package ncc.java.opentalk.service;

import ncc.java.opentalk.exception.AppException;
import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {
    public String saveFile(MultipartFile file) throws AppException;
}
