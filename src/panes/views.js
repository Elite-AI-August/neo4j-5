import React from 'react'
import List from '../panes/list'

// const query = {
//   source: { name: 'meta', driver: 'json', book: '', chapter: '' },
//   fields: [{ name: 'name' }],
//   filters: [{}],
//   groups: [],
//   sorts: [],
//   panes: [],
// }

const views = [
  { id: 'all', data: { name: 'All' } },
  { id: 'inbox', data: { name: 'Inbox' } },
  { id: 'recent', data: { name: 'Recent' } },
  { id: 'trash', data: { name: 'Trash' } },
]

export default function Views({ neomem }) {
  return (
    <div className="views-pane">
      {views.map(view => {
        return <div key={view.id}>{view.data.name}</div>
      })}
      {/* <List neomem={neomem} query={query} /> */}
    </div>
  )
}
