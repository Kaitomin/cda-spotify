import { useState, useEffect, useMemo } from "react"

import SearchForm from "../components/SearchForm"
import MusicService from "../service/MusicService"
import Pagination from "../components/Pagination"
import SearchFilter from "../components/SearchFilter"
import SearchResult from "../components/SearchResult"

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
    MusicService.getAll().then((res) => setMusicList(res.data))
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
      <SearchFilter handleFilter={handleFilter} itemPerPage={+itemPerPage} setItemPerPage={setItemPerPage} />
      <hr />
      <div className="text-center">
        {musicList.length > 0 && (
          <h2 className="mb-3">
            {musicList.length == 1 ? "Résultat" : "Résultats"} (
            {musicList.length})
          </h2>
        )}
        <SearchResult currentSearchPage={currentSearchPage} />
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
