package com.dreamteam.app.utils;

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
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class CustomUtils {
    public static String getDuration(MultipartFile multFile) throws IOException, CannotReadException, TagException, InvalidAudioFrameException, ReadOnlyFileException, ParseException {
        SimpleDateFormat timeInFormat = new SimpleDateFormat("ss", Locale.FRANCE);
        SimpleDateFormat timeOutFormat = new SimpleDateFormat("mm:ss", Locale.FRANCE);
        SimpleDateFormat timeOutOverAnHourFormat = new SimpleDateFormat("kk:mm:ss", Locale.FRANCE);
        String duration;

        // Convert 'Multipart file' to 'File'
        File file = new File(System.getProperty("java.io.tmpdir") + "/" + multFile.getOriginalFilename());
        multFile.transferTo(file);

        AudioFile af = AudioFileIO.read(file);
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

        // Delete temp file from Temp folder
        file.deleteOnExit();

        return duration;
    }

    public static boolean isImageType(String filename) {
        return FilenameUtils.getExtension(filename).matches("(png|jpg|jpeg)");
    }
}
