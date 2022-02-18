import React from 'react'
import List from '../panes/list'

const query = {
  source: { name: 'meta', driver: 'json', book: '', chapter: '' },
  fields: [{ name: 'name' }],
  filters: [{}],
  groups: [],
  sorts: [],
  panes: [],
}

export default function Views({ neomem }) {
  return (
    <div className="views-pane">
      <List neomem={neomem} query={query} />
    </div>
  )
}
