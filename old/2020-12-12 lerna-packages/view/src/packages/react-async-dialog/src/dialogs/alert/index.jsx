import React from 'react'
import { openDialog, closeDialog } from '../..'
import './styles.css'


//. to match normal alert behavior, should block

export default function alert(message) {
  return new Promise(resolve => {
    openDialog(Alert, { message, resolve })
  })
}


function Alert({ message, resolve }) {

  function clickOK() {
    closeDialog()
    resolve()
  }
  
  return (
    <div className="alert">
      <div className="alert-message">{message}</div>
      <button onClick={clickOK}>OK</button>
    </div>
  )
}
