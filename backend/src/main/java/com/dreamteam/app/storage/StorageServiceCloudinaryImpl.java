package com.dreamteam.app.storage;

import com.cloudinary.utils.ObjectUtils;
import com.dreamteam.app.utils.CustomUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import com.cloudinary.Cloudinary;

@Service
@Profile("prod")
public class StorageServiceCloudinaryImpl implements StorageService {

    @Autowired
    private Cloudinary cloudinary;

    @Override
    public void init() {}

    @Override
    public void deleteAll() {}

    public String store(MultipartFile file) throws IOException, IllegalArgumentException {
        // Extract file extension
        String ext = FilenameUtils.getExtension(file.getOriginalFilename());
        // Set temp file path
        Path pathFile = Paths.get(System.getProperty("java.io.tmpdir") + "/tmp." + ext);
        // Get file from path
        File f = new File(pathFile.toUri());
        // Convert Multipart to File
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, pathFile, StandardCopyOption.REPLACE_EXISTING);
        }

        // Set upload folder location
        String uploadFolder = CustomUtils.isImageType(file.getOriginalFilename()) ?
                "cda-spotify/img" :
                "cda-spotify/audio";

        // Upload to Cloudinary
        Map uploadResult = cloudinary.uploader().upload(f, ObjectUtils.asMap("resource_type", "auto", "folder", uploadFolder));

        // Delete temp file
        Files.deleteIfExists(pathFile);

        return uploadResult.get("public_id").toString();
    }


    public void deleteFile(String filename, String format) throws IOException {
        if (format.equals("img")) cloudinary.uploader().destroy(filename, ObjectUtils.emptyMap());
        else cloudinary.uploader().destroy(filename, ObjectUtils.asMap("resource_type", "video"));
    }

}