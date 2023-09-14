import { Link } from "react-router-dom"

const Page404 = () => {
  return (
    <div className="d-flex flex-column flex-grow-1 justify-content-center align-items-center">
      <h1>Page not found</h1>
      <Link to='/'>Return to homepage</Link>
    </div>
  )
}

export default Page404