package com.dreamteam.app.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.stream.Stream;

public interface StorageService {
    String store(MultipartFile file) throws IOException;

    void deleteFile(String filename, String format) throws IOException;
}