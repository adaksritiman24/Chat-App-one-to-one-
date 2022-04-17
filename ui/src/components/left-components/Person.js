import React from 'react'
import "./Person.css";

export default function Person(props) {

  const handlePerson = ()=> {
    props.setPersonToChatBox(props.peername);
  }
  return (
    <div className='person' 
    onClick = {handlePerson}
    >
      <div><i class="fa-solid fa-circle-user"></i> {props.peername}</div>
      {props.notification ? <i class="fa-solid fa-circle"></i> : <></>}
    </div>
  )
}
