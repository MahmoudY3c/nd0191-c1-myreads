import React, {useState, useEffect} from 'react'
import {displaySearchResults} from './src/Methods.js'
import {Link} from 'react-router-dom'


 function Search() {
 	let [readItem, setReadItem] = useState(null)
  let [textValue, setTextValue] = useState('')

  useEffect(() => {
    let timer = setTimeout(() => {
      displaySearchResults(textValue, [readItem, setReadItem])
    },700)
    return () => {
      clearTimeout(timer)
    };
  }, [textValue])

 	function lookup(e) {
    let value = e.target.value
    //update text value to input value
    setTextValue(value)
    //display loading before display results
    setReadItem([
      <div style={{padding: '25px', fontSize: '30px'}} key="spinner">
        <i className="fa fa-spinner"></i>
      </div>
    ])
 	}
  //console.log(readItem)
  let searchPageContainer = (
    <div className='search-page-container App' key="search-main-container">
      <div className='search-container' key="search-container">
        <Link className="search-arrow" to='/'>
          <i className="fa fa-arrow-left"></i>
        </Link>
        <input 
          type="text" 
          placeholder="Search Here..." 
          className="search-field" 
          value={textValue}
          onChange={lookup}
        />
        <div className="search-btn" key="search-btn">
          <i className="fa fa-search"></i>
        </div>
      </div>
      <div className="items-wrapper" key="items-wrapper">
          {readItem}
      </div>
    </div>
  )
  return searchPageContainer
}
export default Search
