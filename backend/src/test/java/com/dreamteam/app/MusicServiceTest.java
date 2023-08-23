package com.dreamteam.app;

import static org.hamcrest.MatcherAssert.assertThat;

import static org.mockito.ArgumentMatchers.any;

/*
@ExtendWith(MockitoExtension.class)
public class MusicServiceTest {

    @Mock
    private ModelMapper musicMapper;
    @Mock
    private MusicRepository repository;
    @Mock
    private StorageLocalService storageService;
    private MusicService service;

    @BeforeEach
    public void setup(){
        service = new MusicService(repository, musicMapper, storageService);
    }

    @Test
    @Disabled
    public void findById_shouldReturnMusic() {
        Music m = new Music(25, "Waka Waka","shakira","2,25", LocalDate.of(1985,6,15),"/pas las","/pas la", Arrays.asList(Tag.POP, Tag.ROCK));


        when(repository.findById(25L)).thenReturn(Optional.of(m));
        assertEquals(musicMapper.map(m, MusicDTO.class), service.getById(25L));
    }

    @Test
    @Disabled
    public void findByIdNotFound_shouldReturnNull() {

        when(repository.findById(8L)).thenReturn(Optional.empty());
        assertNull(service.getById(8L));
    }

    @Test
    @Disabled
    public void deleteById_shouldCallRepository() {
            service.delete(any());
            verify(repository).deleteById(any());

        }

    @Test
    @Disabled
    public void findAll_shouldReturnMusic() {
        Music m = new Music(25, "Waka Waka","shakira","2,25", LocalDate.of(1985,6,15),"/pas las","/pas la", Arrays.asList(Tag.POP, Tag.ADRIEN));
        List<Music> ml = new ArrayList<>();
        ml.add(m);
        when(repository.findAll()).thenReturn(ml);

        assertEquals(ml.stream().map(music -> musicMapper.map(music, MusicDTO.class)).toList(), service.findAll());
        verify(repository,times(1) ).findAll();
    }

    @Test
    @Disabled
    public void addMusic_shouldReturnMusic(){
        Music m = new Music(25, "Waka Waka", "shakira", "2,25", LocalDate.of(1985, 6, 15), "imgFile", "audioFile", Arrays.asList(Tag.POP, Tag.ADRIEN));
        MockMultipartFile imgFile = new MockMultipartFile("imgFile", "imgFile", null, "img".getBytes());
        MockMultipartFile audioFile = new MockMultipartFile("audioFile", "audioFile", null, "audio".getBytes());

        when(musicMapper.map(m, MusicDTO.class)).thenReturn(new MusicDTO());
        when(repository.save(any())).thenReturn(m);

        MusicDTO mDto = musicMapper.map(m, MusicDTO.class);
        mDto.setId(m.getId());
        mDto.setTitle(m.getTitle());
        mDto.setArtist(m.getArtist());
        mDto.setDuration(m.getDuration());
        mDto.setReleasedAt(m.getReleasedAt());
        mDto.setImgUri(m.getImgUri());
        mDto.setAudioUri(m.getAudioUri());
        mDto.setTags(m.getTags());

        assertEquals(mDto, service.add(musicMapper.map(m, MusicDTO.class), imgFile, audioFile, null));

        verify(repository, times(1)).save(any());

    }
}
*/

































