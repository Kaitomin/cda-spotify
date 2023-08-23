package com.dreamteam.app.storage;

import com.dreamteam.app.exceptions.StorageException;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
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
import java.util.UUID;

@Service
@Profile("dev")
public class StorageServiceLocalImpl implements StorageService {
    private final Path audioLocation;
    private final Path imgLocation;

    @Autowired
    public StorageServiceLocalImpl(StorageProperties properties) {
        this.audioLocation = Paths.get(properties.getLocationAudio());
        this.imgLocation = Paths.get(properties.getLocationImg());
    }

    @Override
    public String store(MultipartFile file) throws IOException, IllegalArgumentException {
        if (file.isEmpty()) throw new StorageException("Failed to store empty file.");

        // Assign folder directory
        Path rootLocation = null;
        if (file.getOriginalFilename().matches("((.*).png|(.*).jpg|(.*).jpeg|(.*).webp|(.*).jfif)")){
            rootLocation = this.imgLocation;
        } else if (file.getOriginalFilename().matches("((.*).mp3|(.*).wav)")){
            rootLocation = this.audioLocation;
        } else {
            throw new IllegalArgumentException("Invalid file format");
        }

        // Extract file extension
        String ext = FilenameUtils.getExtension(file.getOriginalFilename());

        // Generate uuid & concatenate file extension
        UUID uuid = UUID.randomUUID();
        String uuidFilename = uuid + "." + ext;

        // Assign uuidFilename
        Path destinationFile = rootLocation.resolve(Paths.get(uuidFilename)).normalize().toAbsolutePath();

        // This is a security check
        if (!destinationFile.getParent().equals(rootLocation.toAbsolutePath())) {
            throw new StorageException("Cannot store file outside current directory.");
        }

        // Copy file to folder
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
        }
        return uuidFilename;
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(audioLocation.toFile());
        FileSystemUtils.deleteRecursively(imgLocation.toFile());
    }

    @Override
    public void deleteFile(String filename, String format) {
        // Assign file path
        File f = format == "img" ?
                new File(this.imgLocation + "/" + filename) :
                new File(this.audioLocation + "/" + filename);

        if (f.delete()) {
            System.out.println("File deleted : " + f.getName());
        }
    }

    @Override
    public void init() {
        try {
            Files.createDirectories(audioLocation);
            Files.createDirectories(imgLocation);
        }
        catch (IOException e) {
            throw new StorageException("Could not initialize storage", e);
        }
    }

}