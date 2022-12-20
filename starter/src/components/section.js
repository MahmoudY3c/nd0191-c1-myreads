import React, {useState} from 'react'
import {update} from '../src/BooksAPI'

export default function Section(props) {
  return (
  <section className="reading-section" style={(props.style) ? props.style : {}}>
    <fieldset>
      <legend>
        {/* section title */}
        {props.caption}
      </legend>
    </fieldset>
    <div className='reading-section-items-container'>
      {/*display section children here*/}
      {props.children}
    </div>
  </section>
  )
}


