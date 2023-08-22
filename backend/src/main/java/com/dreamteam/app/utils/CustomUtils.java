package com.dreamteam.app.utils;

import jakarta.servlet.http.Cookie;
import org.apache.commons.io.FilenameUtils;
import org.jaudiotagger.audio.AudioFile;
import org.jaudiotagger.audio.AudioFileIO;
import org.jaudiotagger.audio.exceptions.CannotReadException;
import org.jaudiotagger.audio.exceptions.InvalidAudioFrameException;
import org.jaudiotagger.audio.exceptions.ReadOnlyFileException;
import org.jaudiotagger.tag.TagException;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.Locale;

public class CustomUtils {
    /**
     * @param file
     * @return duration in mm:ss format
     * @throws IOException
     * @throws CannotReadException
     * @throws TagException
     * @throws InvalidAudioFrameException
     * @throws ReadOnlyFileException
     * @throws ParseException
     */
    public static String getDuration(MultipartFile file) throws IOException, CannotReadException, TagException, InvalidAudioFrameException, ReadOnlyFileException, ParseException {
        SimpleDateFormat timeInFormat = new SimpleDateFormat("ss", Locale.FRANCE);
        SimpleDateFormat timeOutFormat = new SimpleDateFormat("mm:ss", Locale.FRANCE);
        SimpleDateFormat timeOutOverAnHourFormat = new SimpleDateFormat("kk:mm:ss", Locale.FRANCE);
        String duration;

        Path pathFile = Paths.get(System.getProperty("java.io.tmpdir") + file.getOriginalFilename());
        // Get file from path
        File f = new File(pathFile.toUri());

        // Convert 'Multipart file' to 'File'
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, pathFile, StandardCopyOption.REPLACE_EXISTING);
        }

        AudioFile af = AudioFileIO.read(f);
        int trackLength = af.getAudioHeader().getTrackLength();

        Date timeIn;
        // Get track duration compared to "Thu Jan 01 00:00:00 CET 1970"
        // e.g 3:45 duration track will be "Thu Jan 01 00:03:45 CET 1970
        synchronized (timeInFormat) {
            timeIn = timeInFormat.parse(String.valueOf(trackLength));
        }

        // Convert to corresponding time format
        if (trackLength < 3600) { // Duration under 1 hour
            synchronized (timeOutFormat) {
                duration = timeOutFormat.format(timeIn);
            }
        } else {
            synchronized (timeOutOverAnHourFormat) {
                duration = timeOutOverAnHourFormat.format(timeIn);
            }
        }

        // Delete temp file
        Files.deleteIfExists(pathFile);

        return duration;
    }

    /**
     * @param filename
     * @return boolean whether file is an image type or not
     */
    public static boolean isImageType(String filename) {
        return FilenameUtils.getExtension(filename).matches("(png|jpg|jpeg|webp|jfif)");
    }

    public static boolean isAudioType(String filename) {
        return FilenameUtils.getExtension(filename).matches("(mp3|wav)");
    }

    public static String getCookie(Cookie[] cookies, String name) {
        if (cookies == null) return null;
        return Arrays.stream(cookies)
                .filter(cookie -> name.equals(cookie.getName()))
                .map(Cookie::getValue)
                .findAny().orElse(null);
    }
}
