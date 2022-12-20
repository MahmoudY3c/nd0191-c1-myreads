import React, {useState} from 'react'
import {update} from '../API/BooksAPI'

function dropDownOptions({
  shelfs, 
  dropdownState, setDropdown, 
  chevron, setChevron, 
  updateState
}) {
  let dropdownMenu;
  dropdownMenu = (
    <div className="dropdown-menu-container">
      <div className="dropdown-menu">
        <div className="dropdown-item" onClick={() => updateState('read')}>
          <span>Read</span>
          {/*check icon*/}
          {shelfs.read}
        </div>
        <div className="dropdown-item" onClick={() => updateState('currentlyReading')}>
          <span>Currently Read</span>
          {shelfs.currentlyReading}
        </div>
        <div className="dropdown-item" onClick={() => updateState('wantToRead')}>
          <span>Want To Read</span>
          {/*check icon*/}
          {shelfs.wantToRead}
        </div>
        <div className="dropdown-item" onClick={() => updateState('none')}>
          <span>None</span>
          {/*check icon*/}
          {shelfs.none}
        </div>
      </div>
    </div>
  )
  //handling dropdown menu state
  //set and remove dropdown menu
  if (!dropdownState) {
    setDropdown(dropdownMenu)
  } else {
    setDropdown('')
  }
  //console.log(setChevron)
  //handling chevron icon state to up or down wjem click
  if(chevron.indexOf('up') === -1) setChevron('fa fa-chevron-up')
  else setChevron('fa fa-chevron-down')
}

function DropDown ({
  shelf, getBooks, data, query, setOverlayState, bookItem, setBookItem
}) {
  //use state to add and remove dropdown menu
  let [dropdownExist, setDropdown] = useState('');
  //handling check icon state
  let [chevron, setChevron] = useState('fa fa-chevron-down') 
  //update state then get all book and display them
  function updateState(newShelf, dropdownMenu) {
    update(data, newShelf).then(up => {
      //handling display search results, updating item state
      if(query) getBooks(query, [bookItem, setBookItem], setOverlayState)
      else getBooks(bookItem, setBookItem, setOverlayState)
      //hide please wait overlay after apply changes
      setOverlayState({display: 'flex'})
      //remove dropdown menu of selected book
      setDropdown(null)
      setChevron('fa fa-chevron-down')
    })
  }
  return (
    <div className='dropdown-btn-container'>
      <button className='dropdown-btn' onClick={() => dropDownOptions({
        shelfs: shelf,
        setDropdown: setDropdown,
        chevron: chevron,
        setChevron: setChevron,
        updateState: updateState,
        dropdownState: dropdownExist
      })}>
        <i className={chevron}></i>
      </button>
      {dropdownExist}
    </div>
  )
}

export default ({
  //components data
  pic, caption, desc, 
  //app data mostly uses for DropDown component
  shelf, arr, getBooks, data, query
}) => {
  let bookItem, setBookItem;
  let ico = <i 
    className='fa fa-check' 
    style={{marginRight: '5px'}} 
    title={Object.keys(shelf)[0]}
  ></i>;
  //setting check icon to selected shelf
  shelf= {[Object.keys(shelf)[0]]: ico}
  //getting update state methods to apply changes
  if(arr) [bookItem, setBookItem] = arr
  //init (please wait.....) overlay display
  let [overlayState, setOverlayState] = useState({display: 'none'})
  //returning reading item
  return (
    <div className='reading-item-container'>
      <div className="overlay" style={overlayState}>
        <h2>Please Wait...</h2>
      </div>
      <div className="reading-items-container search-item-container">
        <div className="reading-items-top">
          <div className='reading-item-pic-container'>
            <img src={pic} className="reading-item-pic" alt={caption} />
          </div>
        </div>
        <div className="reading-items-bottom">
          <DropDown 
            shelf={shelf} 
            getBooks={getBooks}
            data={data} 
            query={query} 
            setOverlayState={setOverlayState} 
            bookItem={bookItem} 
            setBookItem={setBookItem}
          />
          <h4 className='reading-item-cap'>
            {caption}
          </h4>
          <div className='reading-item-desc'>
            {desc}
          </div>
        </div>
      </div>
    </div>
  )
}