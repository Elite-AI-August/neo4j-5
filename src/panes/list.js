import React from 'react'

export default function List({ neomem }) {
  //. how subscribe to data changes?
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
