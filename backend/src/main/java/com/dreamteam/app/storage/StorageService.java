package com.dreamteam.app.storage;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;


public interface StorageService {
    void init();

    String store(MultipartFile file) throws IOException;

    void deleteAll();

    void deleteFile(String filename, String format) throws IOException;
}
