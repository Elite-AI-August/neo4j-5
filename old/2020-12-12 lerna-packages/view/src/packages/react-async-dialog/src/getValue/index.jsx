// getValue
// get a value from the user with a dialog and virtual keyboard
// can be number, choice, string, file

// example:
//   const constraint = { type: 'choice', value: ['trailing', 'leading']}
//   const ret = await getValue({ title, description, initialValue, constraint, readonly })
//   if (ret.ok) {
//     const newValue = ret.value
//   }

// constraint can be
// {"type": "range", "value": [0.000, 2.000]} //. type integer vs float?, step?
// {"type": "choice", "value": ["trailing", "leading"]}
// {"type": "choice", "value": [0, 1]} //. type boolean?
// {"type": "string"}
// {"type": "file"}


import React from 'react'
import { openDialog, closeDialog } from '..'
import GetString from './getString'
import GetNumber from './getNumber'
import GetChoiceList from './getChoiceList'
// import GetChoiceDropdown from './getChoiceDropdown'
import GetFile from './getFile'
import './styles.css'


export function getValue({ title, description, buttonName, initialValue, constraint, readonly }) {
  return new Promise(resolve => {
    openDialog(GetValue, { title, description, buttonName, initialValue, constraint, readonly, resolve })
  })
}


// GetValue is a wrapper dialog with OK and Cancel buttons -
// subdialogs implement the different data types.
function GetValue({ title, description, buttonName="Set", initialValue,
  constraint, readonly, resolve }) {

  const isString = constraint.type === "string"
  const isNumber = constraint.type === "range"
  const isChoice = constraint.type === "choice"
  const isFile = constraint.type === "file"

  const [value, setValue] = React.useState(isNumber ? String(initialValue) : initialValue)
  const [isValid, setIsValid] = React.useState(true)
  // const [appending, setAppending] = React.useState(false)
  // const [appending, setAppending] = React.useState(true) //. for now

  function clickOK() {
    closeDialog()
    resolve({ ok: true, value: isNumber ? Number(value) : value })
  }

  function clickCancel() {
    closeDialog()
    resolve({ ok: false })
  }

  return (
    <div className="getValue">

      <div className="getValue-title">{title}</div>
      <div className="getValue-description">{description}</div>

      {readonly && <div className="getValue-readonly">
        This value is read-only.
      </div>}

      {isString && <GetString value={value} setValue={setValue} constraint={constraint} readonly={readonly} setIsValid={setIsValid} />}
      {isNumber && <GetNumber value={value} setValue={setValue} constraint={constraint} readonly={readonly} setIsValid={setIsValid} />}
      {isChoice && <GetChoiceList value={value} setValue={setValue} constraint={constraint} readonly={readonly} />}
      {/* {isChoice && <GetChoiceDropdown value={value} setValue={setValue} constraint={constraint} readonly={readonly} />} */}
      {isFile && <GetFile value={value} setValue={setValue} setIsValid={setIsValid} />}

      <div className="getValue-okcancel">
        <button id="cancel" onClick={clickCancel}>Cancel</button>
        <button id="okay" onClick={clickOK} disabled={!isValid || readonly}>{buttonName}</button>
      </div>

    </div>
  )
}
