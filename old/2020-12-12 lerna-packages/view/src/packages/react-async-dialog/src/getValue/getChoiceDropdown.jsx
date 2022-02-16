import React from 'react'

export default function GetChoiceDropdown({ value, setValue, constraint, readonly }) {
  const choices = constraint.value // array of strings
  function onChange(evt) {
    const value = evt.target.value
    setValue(value)
  }
  return (
    <select className="getValue-choice" value={value} disabled={readonly} onChange={onChange}>
      {choices.map(choice => <option value={choice} key={choice}>{choice}</option>)}
    </select>
  )
}
