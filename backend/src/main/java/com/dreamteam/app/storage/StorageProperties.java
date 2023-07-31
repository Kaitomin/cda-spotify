package com.dreamteam.app.storage;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("storage")
public class StorageProperties {

    /**
     * Folder location for storing files
     */
    private String locationAudio = "src/main/resources/static/audio";
    private String locationImg = "src/main/resources/static/img";

    public String getLocationAudio() {
        return locationAudio;
    }

    public void setLocationAudio(String locationAudio) {
        this.locationAudio = locationAudio;
    }

    public String getLocationImg() {
        return locationImg;
    }

    public void setLocationImg(String locationImg) {
        this.locationImg = locationImg;
    }

}