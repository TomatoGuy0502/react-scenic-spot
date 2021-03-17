import React from 'react'
import SearchInput from './SearchInput'
import CitiesSelect from './CitiesSelect'

function Navbar(props) {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <div className="row">
          <div className="col">
            <CitiesSelect />
          </div>
          <div className="col">
            <SearchInput searchTerm={props.searchTerm} setSearchTerm={props.setSearchTerm} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
