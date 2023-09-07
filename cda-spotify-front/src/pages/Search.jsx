import { useState, useEffect, useMemo } from "react"

import SearchForm from "../components/SearchForm"
import Pagination from "../components/Pagination"
import SearchFilter from "../components/SearchFilter"
import SearchResult from "../components/SearchResult"
import MusicService from "../service/MusicService"
import Loader from "../components/Loader"

const Search = () => {
  const [musicList, setMusicList] = useState([])
  const [checkedFilters, setCheckedFilters] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [itemPerPage, setItemPerPage] = useState(10)
  const [debouncedItemPerPage, setDebouncedItemPerPage] = useState(itemPerPage)
  const [currentPage, setCurrentPage] = useState(1)

  const currentSearchPage = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * debouncedItemPerPage
    const lastPageIndex = firstPageIndex + +debouncedItemPerPage

    return musicList.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, musicList, debouncedItemPerPage])

  useEffect(() => {
    setIsLoading(true)

    MusicService.getAll().then((res) => {
      setMusicList(res.data)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => setRefresh(!refresh), [checkedFilters])

  // Debouncer
  useEffect(() => {
    const debouncedId = setTimeout(() => {
      setDebouncedItemPerPage(itemPerPage)
    }, 1000)

    return () => {
      clearTimeout(debouncedId)
    }
  }, [itemPerPage])

  useEffect(() => {
    if (musicList.length) {
      setCurrentPage(prev => prev > Math.ceil(musicList.length / itemPerPage) ? Math.ceil(musicList.length / itemPerPage) : prev)
    }
  }, [debouncedItemPerPage, musicList])

  const getResult = (searchKey) => {
    setIsLoading(true)

    if (searchKey == "") {
      MusicService.getAll()
        .then((res) => {
          setMusicList(res.data)
          setIsLoading(false)
      })
    } else if (searchKey) {
      if (
        (checkedFilters.includes("title") && checkedFilters.includes("artist")) ||
        (!checkedFilters.includes("title") && !checkedFilters.includes("artist"))
      ) {
        MusicService.searchBy(searchKey)
          .then((res) => {
            setMusicList(res.data)
            setIsLoading(false)
        })
      } else if (checkedFilters.includes("title")) {
        MusicService.searchByTitle(searchKey)
          .then((res) => {
            setMusicList(res.data)
            setIsLoading(false)
        })
      } else if (checkedFilters.includes("artist")) {
        MusicService.searchByArtist(searchKey)
          .then((res) => {
            setMusicList(res.data)
            setIsLoading(false)
        })
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
      <SearchFilter handleFilter={handleFilter} itemPerPage={+itemPerPage} setItemPerPage={setItemPerPage} />
      <hr />
      <div className="text-center">
        {musicList.length > 0 && (
          <h2 className="mb-3">
            {musicList.length == 1 ? "Résultat" : "Résultats"} (
            {musicList.length})
          </h2>
        )}
        {isLoading && musicList.length == 0 && (
          <div className="d-flex flex-column align-items-center">
            <Loader />
            <span>Fetching data...</span>
          </div>
        )}
        {musicList && <SearchResult currentSearchPage={currentSearchPage} />}
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
