import React from 'react'
import { openDialog, closeDialog } from '../..'
import './styles.css'


export default function getText(title, message, defaultValue) {
  return new Promise(resolve => {
    openDialog(GetText, { title, message, defaultValue, resolve })
  })
}


function GetText({ title, message, defaultValue, resolve }) {

  const [dirty, setDirty] = React.useState(false)

  function clickOK() {
    const textarea = document.querySelector('.getText-input')
    const value = textarea.value
    closeDialog()
    resolve({ ok: true, value })
  }

  function clickCancel() {
    if (dirty) {
      if (!window.confirm("Discard changes to notes?")) {
        return
      }
    }
    closeDialog()
    resolve({ ok: false })
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && (event.metaKey || event.altKey)) {
      clickOK()
    } else if (event.key === "Escape") {
      clickCancel()
    }
  }

  function changeInput() {
    setDirty(true)
  }

  return (
    <div className="getText">
      <h3>{title}</h3>
      <p>{message}</p>
      <textarea 
        className="getText-input" 
        autoFocus 
        defaultValue={defaultValue}
        onChange={changeInput} 
        onKeyDown={handleKeyDown} 
      />
      <div className="getText-buttons">
        <button id="cancel" onClick={clickCancel}>Cancel (Esc)</button>
        <button id="ok" onClick={clickOK}>OK (cmd-Enter)</button>
      </div>
    </div>
  )
}
