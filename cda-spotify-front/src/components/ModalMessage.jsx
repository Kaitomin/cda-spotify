import PropTypes from 'prop-types'
import Loader from './Loader'

const ModalMessage = ({ message, loader }) => {
  return (
    <div className='modal-message position-fixed top-50 start-50'>
      <p className="m-0">{message}</p>
      { loader && <Loader/> }
    </div>
  )
}

ModalMessage.propTypes = {
  message: PropTypes.string,
  loader: PropTypes.bool
}

export default ModalMessage