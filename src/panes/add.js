import React from 'react'

export default function Add({ neomem }) {
  const clickAdd = React.useCallback(
    async event => {
      const textarea = document.querySelector('#mobile-text')
      // @ts-ignore - says value not avail but it is
      const name = textarea.value
      // add to database
      const item = { data: { name } }
      const { error } = await neomem.add([item]) //. add to db
      if (!error) {
        alert(`Added item!`)
        // @ts-ignore - says value not avail but it is
        textarea.value = ''
      }
    },
    [neomem]
  )

  return (
    <div className="add-pane">
      <textarea
        id="mobile-text"
        defaultValue=""
        placeholder="Enter item text"
      />
      <button onClick={clickAdd}>Add</button>
    </div>
  )
}
