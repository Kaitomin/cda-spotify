import { useState, useEffect, useMemo } from "react"
import { Link } from "react-router-dom"

import SearchForm from "../components/SearchForm"
import MusicService from "../service/MusicService"
import Pagination from "../components/Pagination"

const Search = () => {
  const [musicList, setMusicList] = useState([])
  const [checkedFilters, setCheckedFilters] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [itemPerPage, setItemPerPage] = useState(5)
  const [debouncedItemPerPage, setDebouncedItemPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)

  const currentSearchPage = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * debouncedItemPerPage
    const lastPageIndex = firstPageIndex + +debouncedItemPerPage

    return musicList.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, musicList, debouncedItemPerPage])

  useEffect(() => {
    if (musicList.length) {
      setCurrentPage(prev => prev > Math.ceil(musicList.length / itemPerPage) ? Math.ceil(musicList.length / itemPerPage) : prev)
    }
  }, [debouncedItemPerPage])

  useEffect(() => setRefresh(!refresh), [checkedFilters])

  useEffect(() => {
    MusicService.getAll().then((res) => setMusicList(res.data))
  }, [])

  // Debouncer
  useEffect(() => {
    const debouncedId = setTimeout(() => {
      setDebouncedItemPerPage(itemPerPage)
    }, 1000)

    return () => {
      clearTimeout(debouncedId)
    }
  }, [itemPerPage])

  const getResult = (searchKey) => {
    if (searchKey == "") {
      MusicService.getAll().then((res) => setMusicList(res.data))
    } else if (searchKey) {
      if (
        (checkedFilters.includes("title") &&
          checkedFilters.includes("artist")) ||
        (!checkedFilters.includes("title") &&
          !checkedFilters.includes("artist"))
      ) {
        MusicService.searchBy(searchKey).then((res) => setMusicList(res.data))
      } else if (checkedFilters.includes("title")) {
        MusicService.searchByTitle(searchKey).then((res) =>
          setMusicList(res.data)
        )
      } else if (checkedFilters.includes("artist")) {
        MusicService.searchByArtist(searchKey).then((res) =>
          setMusicList(res.data)
        )
      }
    }
  }

  const handleFilter = (e) => {
    if (e.target.checked) {
      setCheckedFilters([...checkedFilters, e.target.value])
    } else {
      setCheckedFilters(checkedFilters.filter((el) => el != e.target.value))
    }
  }

  return (
    <div className="search-page px-3 mt-4 flex-grow-1">
      <SearchForm getResult={getResult} refresh={refresh} />
      <div className="filters d-flex justify-content-around my-3">
        <div className="position-relative input d-flex flex-column justify-content-center align-items-center">
          <label htmlFor="paginate-btn" className="mb-2 fw-bolder">Musiques par page</label>
          <input type="number" id="paginate-btn" name="paginate-btn" min='1' value={itemPerPage} onChange={(e) => setItemPerPage(e.target.value <= 0 ? 1 : e.target.value)} />
        </div>
        <div className="position-relative input d-flex flex-column align-items-center">
          <label htmlFor="title" className="toggle mb-2">
            Titre
          </label>
          <input
            type="checkbox"
            id="title"
            name="title"
            value="title"
            className="toggle__input"
            onChange={handleFilter}
          />
          <span className="toggle-track">
            <span className="toggle-indicator"></span>
          </span>
        </div>
        <div className="position-relative input d-flex flex-column align-items-center">
          <label htmlFor="artist" className="toggle mb-2">
            Artiste
          </label>
          <input
            type="checkbox"
            id="artist"
            name="artist"
            value="artist"
            className="toggle__input"
            onChange={handleFilter}
          />
          <span className="toggle-track">
            <span className="toggle-indicator"></span>
          </span>
        </div>
      </div>
      <hr />
      <div className="text-center">
        {musicList.length > 0 && (
          <h2 className="mb-3">
            {musicList.length == 1 ? "Résultat" : "Résultats"} (
            {musicList.length})
          </h2>
        )}

        <div className="result-grid">
          {currentSearchPage.map(({id, title, artist, imgUri}, index) => (
            <Link
                to={`/music/${id}`}
                key={id}
                className="text-decoration-none text-black"
              >
              <div className="h-100 bg-white rounded">
                <img
                  src={`${import.meta.env.VITE_RESOURCE_IMG_URL}/${
                    imgUri
                  }`}
                  alt={title}
                  loading={index > 6 ? "lazy" : "eager"}
                  className="rounded-top object-fit-cover"
                  width={100 + "%"}
                  height={150}
                />
                <h2
                  className="fw-bold mt-2"
                  title={title}
                >
                  {title}
                </h2>
                <h3 title={artist}>
                  {artist}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={musicList.length}
          itemPerPage={+debouncedItemPerPage}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>
    </div>
  )
}

export default Search
