import PropTypes from 'prop-types'

import { usePagination } from "../hook/usePagination";

const Pagination = ({
  onPageChange,
  totalItems,
  siblingCount = 1,
  currentPage,
  itemPerPage,
  // className
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalItems,
    siblingCount,
    itemPerPage
  })
  
  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage >= Math.ceil(totalItems / itemPerPage)) {
      console.log('max overflow')
      return
    }
    onPageChange(currentPage + 1);
  }

  const onPrevious = () => {
    if (currentPage <= 1) {
      console.log('min overflow')
      return
    }
    onPageChange(currentPage - 1);
  }

  let lastPage = paginationRange[paginationRange.length - 1]
  
  return (
    <ul
      className='d-flex list-unstyled w-25 my-3 mx-auto justify-content-center column-gap-1 align-content-center pagination'
    >
       {/* Left navigation arrow */}
      <li
        className=''
        onClick={onPrevious}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </li>

      {paginationRange.map((pageNumber, index) => {
         
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === '..') {
          return <li key={index}>&#8230;</li>
        }
		
        // Render our Page Pills
        return (
          <li
            key={index}
            className={`${currentPage === pageNumber ? 'activePage' : ''} is-page`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        )
      })}

      {/*  Right Navigation arrow */}
      <li
        className=''
        onClick={onNext}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </li>
    </ul>
  )
}

Pagination.propTypes = {
  onPageChange: PropTypes.func,
  totalItems: PropTypes.number,
  siblingCount: PropTypes.number,
  currentPage: PropTypes.number,
  itemPerPage: PropTypes.number
}

export default Pagination