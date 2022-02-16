import React from 'react'
import Keyboard from 'packages/keyboard'

const defaultStep = 0.1 //. pass in options.defaultInputStep
const defaultDecimals = 3 //. pass in options


// note: value is a string

export default function GetNumber({ value, setValue, constraint, readonly, setIsValid }) {

  const [appending, setAppending] = React.useState(false)

  const [valueMin, valueMax] = constraint.value
  
  const step = constraint.step || defaultStep
  const valueNum = Number(value) // note: Number('')=0
  const enablePlus = !constraint || (valueNum + step <= valueMax)
  const enableMinus = !constraint || (valueNum - step >= valueMin)
  const isValid = value.length>0 && !isNaN(valueNum) && (valueNum >= valueMin) && (valueNum <= valueMax)
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

  function clickPlus() {
    if (enablePlus) {
      setValue(value => String((Number(value) + step).toFixed(defaultDecimals)))
    }
  }
  function clickMinus() {
    if (enableMinus) {
      setValue(value => String((Number(value) - step).toFixed(defaultDecimals)))
    }
  }

  return (
    <div className="getValue-number">
      <div className="getValue-range">
        Range: {valueMin} to {valueMax}
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={readonly}
      />
      {!readonly && <span>
        <button onClick={clickMinus} disabled={!enableMinus}>-</button>
        <button onClick={clickPlus} disabled={!enablePlus}>+</button>
      </span>}
      {/* <div className="getValue-slider">
        <span>{valueMin}</span>
        <input
          type="range"
          value={value}
          min={valueMin}
          max={valueMax}
          onChange={onChange}
          autoFocus
          onFocus={onFocus}
          disabled={readonly}
        />
        <span>{valueMax}</span>
      </div> */}
      {!readonly && <Keyboard
        value={value}
        setValue={setValue}
        isString={false}
        appending={appending}
      />}
        {/* initialValue={initialValue} */}
        {/* appending={appending} */}
    </div>
  )
}
