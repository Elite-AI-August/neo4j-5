// list of items

import React from 'react'

//. how subscribe to data changes?
// neomem obj should have some standard way to handle polling/subscribing

//. make this generic so could store an outline also
// in which case it would be a subset of the table editor

export default function List({ neomem }) {
  React.useEffect(() => {
    async function fetchData() {
      const { items } = await neomem.get()
      setItems(items)
    }
    fetchData()
  }, [neomem])

  const [items, setItems] = React.useState([])

  return (
    <div className="list-pane">
      {items.map(item => (
        <div key={item.id}>{item.data.name}</div>
      ))}
    </div>
  )
}
