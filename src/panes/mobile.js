import React from 'react'

export default function Mobile({ sources }) {
  const clickAdd = React.useCallback(
    async event => {
      // console.log(event.target.value)
      const name = document.querySelector('#mobile-text').value
      console.log(name)
      // add to database
      const item = { data: { name } }
      const rows = await sources.add([item]) //. add to db
    },
    [sources]
  )

  return (
    <div>
      <textarea
        id="mobile-text"
        defaultValue=""
        placeholder="Enter item text"
      />
      <button onClick={clickAdd}>Add</button>
    </div>
  )
}
