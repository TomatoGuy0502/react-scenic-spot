import React from 'react'

function SearchInput({ searchTerm, setSearchTerm }) {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value.trim())
  }

  const handleInputReset = () => {
    setSearchTerm('')
  }

  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="篩選景點名稱"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className="btn btn-secondary" onClick={handleInputReset}>
        清除
      </button>
    </div>
  )
}

export default SearchInput
