import React from 'react'
import "./Person.css";

export default function Person(props) {
  return (
    <div className='person' onClick = {()=>props.setPeername(props.peername)}>{props.peername}</div>
  )
}
