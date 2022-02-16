import React from 'react'


export default function GetFile({ setValue, setIsValid }) {

  React.useEffect(() => {
    const el = document.getElementById("getValue-file")
    const files = el.files
    const isValid = files.length>0
    setIsValid(isValid)
  })

  function onChange(evt) {
    const files = evt.target.files
    if (files.length > 0) {
      const file = files[0]
      setValue(file) // file is a file Blob, to be read by lib.getFileContents()
    }
  }

  return (
    <div className="getValue-file">
      <input type="file" id="getValue-file" onChange={onChange}></input>
    </div>
  )

}
