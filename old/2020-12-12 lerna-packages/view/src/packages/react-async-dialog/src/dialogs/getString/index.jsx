import React from 'react'
import { openDialog, closeDialog } from '../..'
import './styles.css'


export default function getString(title, message, defaultValue) {
  return new Promise(resolve => {
    openDialog(GetString, { title, message, defaultValue, resolve })
  })
}


function GetString({ title, message, defaultValue, resolve }) {
  const [value, setValue] = React.useState(defaultValue)
  const clickOK = () => {
    // const el = document.getElementById("getString-input")
    // const s = el.value
    closeDialog()
    resolve({ ok: true, value })
  }
  const clickCancel = () => {
    closeDialog()
    resolve({ ok: false })
  }
  function handleKeyDown(evt) {
    if (evt.key === "Enter") {
      clickOK()
    } else if (evt.key === "Escape") {
      clickCancel()
    }
  }
  function changeInput(evt) {
    setValue(evt.target.value)
  }
  return (
    <div className='getString'>
      <h3>{title}</h3>
      <p>{message}</p>
      <div>
        <input autoFocus value={value} onChange={changeInput} type="text" id="getString-input" onKeyDown={handleKeyDown} />
      </div>
      <div className="getString-buttons">
        <button id="cancel" onClick={clickCancel}>Cancel</button>
        <button id="ok" onClick={clickOK}>OK</button>
      </div>
    </div>
  )
}
