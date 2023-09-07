import PropTypes from "prop-types"

const SearchFilter = ({ handleFilter, itemPerPage, setItemPerPage }) => {
  return (
    <div className="filters d-flex justify-content-around my-3">
      <div className="position-relative input d-flex flex-column justify-content-center align-items-center">
        <label htmlFor="paginate-btn" className="mb-2 fw-bolder">
          Musiques par page
        </label>
        <input
          type="number"
          id="paginate-btn"
          name="paginate-btn"
          min="1"
          value={itemPerPage}
          onChange={(e) =>
            setItemPerPage(e.target.value <= 0 ? 1 : e.target.value)
          }
        />
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
  )
}

SearchFilter.propTypes = {
  handleFilter: PropTypes.func,
  itemPerPage: PropTypes.number,
  setItemPerPage: PropTypes.func,
}

export default SearchFilter
