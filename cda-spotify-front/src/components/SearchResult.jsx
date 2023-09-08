import PropTypes from "prop-types"
import SearchResultCard from "./SearchResultCard"

const SearchResult = ({ currentSearchPage }) => {
  return (
    <div className="result-grid">
      {currentSearchPage.map(({ id, title, artist, imgUri }, index) => (
        <SearchResultCard
          key={id}
          id={id}
          title={title}
          artist={artist}
          imgUri={imgUri}
          index={index}
        />
      ))}
    </div>
  )
}

SearchResult.propTypes = {
  currentSearchPage: PropTypes.array,
}

export default SearchResult
