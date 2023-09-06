import PropTypes from 'prop-types'

const ModalMessage = ({ message, loader }) => {
  return (
    <div className='modal-message position-fixed top-50 start-50'>
      <p className="m-0">{message}</p>
      {/* Loader */}
      { loader && <div className="lds-ring"><div></div><div></div></div> }
    </div>
  )
}

ModalMessage.propTypes = {
  message: PropTypes.string,
  loader: PropTypes.bool
}

export default ModalMessage