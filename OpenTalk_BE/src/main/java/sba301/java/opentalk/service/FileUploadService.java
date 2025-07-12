package sba301.java.opentalk.service;

import sba301.java.opentalk.exception.AppException;
import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {
    public String saveFile(MultipartFile file) throws AppException;
}
