
import React from 'react'
//import {BookItem} from '../components/section'
import BookItem from '../components/book-item'
import {getAll, search} from './BooksAPI'

//A function to return BookItemComponent depending on book data
function setArraysData({book, shelf, state, query, updataMethod}) {
  return (
    <BookItem 
      //if image thumbnail undefined use image not found link
      pic={(!book.imageLinks?.thumbnail) ? 'http://books.google.com/books/content?id=1yx1tgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api': book.imageLinks.thumbnail} 
      caption={book.title} 
      desc={book.description}
      //setting selected shelf to true to move check icon on it
      shelf={{[shelf]: true}}
      arr={state} 
      getBooks={updataMethod}
      key={book.id}
      data={book}
      //if query is empty text set query as null
      query={(query) ? query : null}
    /> 
  )
}


function getAllBooks(state, setState, setOverlay) {
  //sections data holders
  let curr = [], want = [], read = []
    getAll().then(books => {
      //hide (please wait...) overlay of any book item before display results
      if(setOverlay) setOverlay({display: 'none'})
      //loop through result
      books.forEach(book => {
        let shelf = book.shelf
        //setting the required data for setArraysData method to return the book item
        let data = {
          book: book, 
          shelf: shelf, 
          state: [state, setState],
          updataMethod: getAllBooks
        }
        //checking shelfs and pushing data to shelf array
        if (shelf === 'currentlyReading') {
          curr.push(setArraysData(data))
        } else if(shelf === 'wantToRead') {
          want.push(setArraysData(data))
        } else if(shelf === 'read') {
          read.push(setArraysData(data))
        }
      })
      //returning object with sections items
      return {curr: curr, want: want, read: read, none: null}
    }).then((sections) => {
      setState(sections)
    }).catch(err => {
      //handling errors when error occure like (failed to fetch)
      let ErrMessage = (props) => <h2>{err.message}</h2>
      setState({
        curr: [<ErrMessage key="curr"/>],
        want: [<ErrMessage key="want"/>],
        read: [<ErrMessage key="read"/>], 
        none: null
      })
    })
  }
  function displaySearchResults(query, [state, setState], setOverlay) {
    if(query) {
      //trim query
      query = query.trim()
      //componenets holder
      let arr = []
      //selected books holder
      let existBooksId = [], existBooksData = [];

      (async () => {
        try {
          //fetch search source
          let results = await search(query)
          if(results.error) {
            return setState(<h1>Sorry {query} Isn't Exist Try Something Like React</h1>)
          }
          //get all selected books
          let AllBooks = await  getAll()
          //extract selected books data
          existBooksData = AllBooks.map(book => {
            existBooksId.push(book.id)
            return {
              id: book.id,
              shelf: book.shelf,
              data: book
            }
          })
          //Hide (please wait ..) overlay
          if(setOverlay) setOverlay({display: 'none'})
          //mark selected items to section and others to none
          for(let book of results) {
            //getting book index
            let index = existBooksId.indexOf(book.id)
            let data = {
              book: book, 
              state: [state, setState],
              updataMethod: displaySearchResults,
              query: query
            }
            //check if match selected book
            if(index >= 0) {
              //setting shelf to selected shelf
              data.shelf = existBooksData[index].shelf
              //convert objects to jsx conponent
              arr.push(setArraysData(data))
            }
            else {
              //mark shelf as none
              data.shelf = 'none'
              //convert objects to jsx conponent
              arr.push(setArraysData(data))
            }
          }
          return setState(arr)
        } catch (err) {
          setState(<h1>{err.message}</h1>)
        }
      })();
    } else setState([])
  }


  export {
    getAllBooks,
    setArraysData,
    displaySearchResults
  }
