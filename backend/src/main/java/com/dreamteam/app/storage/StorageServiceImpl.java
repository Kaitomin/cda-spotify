package com.dreamteam.app.storage;

import com.dreamteam.app.utils.CustomUtils;
import jakarta.persistence.Id;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
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
    public String store(MultipartFile file) throws IOException, IllegalArgumentException {
        if (file.isEmpty()) throw new StorageException("Failed to store empty file.");

        // Assign folder directory
        Path rootLocation = null;
        if (file.getOriginalFilename().matches("((.*).png|(.*).jpg|(.*).jpeg)")){
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
        Path destinationFile = rootLocation.equals(this.audioLocation) ?
            rootLocation.resolve(Paths.get(file.getOriginalFilename())).normalize().toAbsolutePath() :
            rootLocation.resolve(Paths.get(uuidFilename)).normalize().toAbsolutePath();

        // This is a security check
        if (!destinationFile.getParent().equals(rootLocation.toAbsolutePath())) {
            throw new StorageException("Cannot store file outside current directory.");
        }

        // Copy file to folder
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
        }
        return  rootLocation.equals(this.audioLocation) ? file.getOriginalFilename() : uuidFilename;
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
        if (filename.matches("((.*).mp3|(.*).wav)")) {
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
    public void deleteFile(String filename) {
        // Assign file path
        File f = CustomUtils.isImageType(filename) ?
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