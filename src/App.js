import './App.css';
import './lib/font-awesome/5.15.3/css/all.min.css';
import Section from './components/section'
import React, {useState, useEffect} from 'react'
import {getAllBooks} from './API/Methods.js'
import {Link} from 'react-router-dom'

function App() {
  let spinner = <i className="fa fa-spinner" key="sections-spinner"></i>
  let [bookItem, setBookItem] = useState({
    curr: [spinner],
    want: [spinner],
    read: [spinner]
  })
  //calling useEffect with empty array to executed just one time 
  useEffect(() => {
    getAllBooks(bookItem, setBookItem)
  }, [])
  return (
    <div className="App">
      <header>
        <h1>MyReads</h1>
      </header>
      <div className='app-body'>
        <Section caption="Currently Reading" style={(bookItem.curr.length >= 1) ? {} : {display: 'none'}} key="curr">
          {bookItem.curr}
        </Section>
        <Section caption="Want To Read" style={(bookItem.want.length >= 1) ? {} : {display: 'none'}} key="want">
          {bookItem.want}
        </Section>
        <Section caption="Read" style={(bookItem.read.length >= 1) ? {} : {display: 'none'}} key="read">
          {bookItem.read}
        </Section>
        <Link className='add-btn-container' to='/search'>
          <button className='add-btn'>
            <i className='fa fa-plus'></i>
          </button>
        </Link>
      </div>
    </div>
  );
}


export default App;
