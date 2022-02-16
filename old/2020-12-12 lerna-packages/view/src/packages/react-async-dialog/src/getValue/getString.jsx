import React from 'react'
// import Keyboard from 'packages/keyboard'


export default function GetString({ value, setValue, readonly, setIsValid }) {

  const [appending, setAppending] = React.useState(false)

  const isValid = (value.length > 0)
  setIsValid(isValid)

  function onChange(evt) {
    const value = evt.target.value
    setValue(value)
  }

  function onFocus() {
    setAppending(true)
  }
  function onBlur() {
    setAppending(false)
  }

  function clickClear() {
    setValue("")
  }

  return (
    <div className="getValue-string">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={readonly}
      />
      {!readonly && <>
        <button onClick={clickClear}>Clear</button>
        <br />
        {/* <Keyboard
          value={value}
          setValue={setValue}
          isString
          appending={appending}
        /> */}
      </>}
    </div>
    )
}
