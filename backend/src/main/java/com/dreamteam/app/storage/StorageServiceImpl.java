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
            "api_key", "338554356678318",
            "api_secret", "hOPlTA4uswfoFJIeaP3o0HaUXlM",
            "secure", true));

    @Autowired
    public StorageServiceImpl(StorageProperties properties) {
        this.audioLocation = Paths.get(properties.getLocationAudio());
        this.imgLocation = Paths.get(properties.getLocationImg());
    }

   /* @Override
    public String store(MultipartFile file) throws IOException, IllegalArgumentException {
        if (file.isEmpty()) throw new StorageException("Failed to store empty file.");

        // Assign folder directory
        Path rootLocation = null;
        if (file.getOriginalFilename().matches("((.*).png|(.*).jpg|(.*).jpeg|(.*).jfif|(.*).webp)")) {
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
    }*/

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
    public Stream<Path> loadAll() {
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
        /*if (filename.matches("((.*).mp3|(.*).wav)")) {
            return imgLocation.resolve(filename);
        }
        return audioLocation.resolve(filename);*/
        return null;
    }

    @Override
    public Resource loadAsResource(String filename) {
        /*try {
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
        }*/
        return null;
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(audioLocation.toFile());
        FileSystemUtils.deleteRecursively(imgLocation.toFile());
    }

    @Override
    public void deleteFile(String filename, String format) throws IOException {
        if (format.equals("img")) cloudinary.uploader().destroy(filename, ObjectUtils.emptyMap());
        else cloudinary.uploader().destroy(filename, ObjectUtils.asMap("resource_type", "video"));
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