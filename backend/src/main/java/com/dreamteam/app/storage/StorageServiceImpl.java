package com.dreamteam.app.storage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;

@Service
public class StorageServiceImpl implements StorageService {
    private final Path audioLocation;
    private final Path imgLocation;

    @Autowired
    public StorageServiceImpl(StorageProperties properties) {
        this.audioLocation = Paths.get(properties.getLocationAudio());
        this.imgLocation = Paths.get(properties.getLocationImg());
    }

    @Override
    public void store(MultipartFile file) throws IOException, IllegalArgumentException {
        if (file.isEmpty()) {
            throw new StorageException("Failed to store empty file.");
        }

        Path rootLocation = null;
        if (file.getOriginalFilename().matches("((.*).png|(.*).jpg|(.*).jpeg)")){
            rootLocation = this.imgLocation;
        } else if (file.getOriginalFilename().matches("((.*).mp3|(.*).wav)")){
            rootLocation = this.audioLocation;
        } else {
            throw new IllegalArgumentException("Invalid file format");
        }

        Path destinationFile = rootLocation.resolve(Paths.get(file.getOriginalFilename())).normalize().toAbsolutePath();
        if (!destinationFile.getParent().equals(rootLocation.toAbsolutePath())) {
            // This is a security check
            throw new StorageException("Cannot store file outside current directory.");
        }
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
        }

    }

    @Override
    public Stream<Path> loadAll() {
        /* To do with both audioLocation and imgLocation*/
        /*try {
            return Files.walk(this.audioLocation, 1)
                    .filter(path -> !path.equals(this.audioLocation))
                    .map(this.audioLocation::relativize);
        }
        catch (IOException e) {
            throw new StorageException("Failed to read stored files", e);
        }*/
        return null;
    }

    @Override
    public Path load(String filename) {
        if (filename.matches("((.*).png|(.*).jpg|(.*).jpeg)")) {
            return imgLocation.resolve(filename);
        }
        return audioLocation.resolve(filename);
    }

    @Override
    public Resource loadAsResource(String filename) {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            }
            else {
                throw new StorageFileNotFoundException("Could not read file: " + filename);

            }
        }
        catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Could not read file: " + filename, e);
        }
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(audioLocation.toFile());
        FileSystemUtils.deleteRecursively(imgLocation.toFile());
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