package com.dreamteam.app.storage;

import com.cloudinary.utils.ObjectUtils;
import com.dreamteam.app.utils.CustomUtils;
import io.github.cdimascio.dotenv.Dotenv;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.util.stream.Stream;
import com.cloudinary.Cloudinary;

@Service
public class StorageServiceImpl implements StorageService {
    private final Path audioLocation;
    private final Path imgLocation;

    Dotenv dotenv = Dotenv.load();
    Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
            "cloud_name", dotenv.get("CLOUDINARY_CLOUD_NAME"),
            "api_key", dotenv.get("CLOUDINARY_API_KEY"),
            "api_secret", dotenv.get("CLOUDINARY_API_SECRET"),
            "secure", true));

    @Autowired
    public StorageServiceImpl(StorageProperties properties) {
        this.audioLocation = Paths.get(properties.getLocationAudio());
        this.imgLocation = Paths.get(properties.getLocationImg());
    }

    @Override
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

        String uploadFolder = CustomUtils.isImageType(file.getOriginalFilename()) ?
                "cda-spotify/img" :
                "cda-spotify/audio";
        System.out.println(uploadFolder);
        System.out.println(file.getOriginalFilename());
        Map uploadResult = cloudinary.uploader().upload(f, ObjectUtils.asMap("resource_type", "auto", "folder", uploadFolder));

        // Delete temp file
        Files.deleteIfExists(pathFile);

        return uploadResult.get("public_id").toString();
    }

    @Override
    public void deleteFile(String filename, String format) throws IOException {
        if (format.equals("img")) cloudinary.uploader().destroy(filename, ObjectUtils.emptyMap());
        else cloudinary.uploader().destroy(filename, ObjectUtils.asMap("resource_type", "video"));
    }

}