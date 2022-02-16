import React from 'react'

export default function GetChoiceList({ value, setValue, constraint, readonly }) {
  const choices = constraint.value // array of strings
  // const choices = "pok,lkmdaa,rerwwt,kjn,oij,iuh,hbbm,gvhgvhgv,uywgr,sdhfb,werwer".split(',')
  function clickItem(evt) {
    const id = evt.target.id
    setValue(id)
  }
  return (
    <div className="getValue-list">
      {choices.map(choice => (
        <div onClick={clickItem} key={choice} id={choice} className={"getValue-list-item" + (choice===value ? " selected" : "")}>
          {choice}
        </div>
      ))}
    </div>
  )
}
