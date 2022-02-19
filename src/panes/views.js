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

//. these could be defined in a yaml file?
// read them with the yaml file driver?
// or in a sqlite db for all the meta stuff?
// or in supabase for use across computers and mobile? yah?
// but... when user first tries it out, want to have some defaults,
// without creating a user in the db, or a whole db for them.
// and also, these should be fixed at the top. no intermixing with user's views.
// maybe could use localstorage to keep their data until they signup? yah.
//. a view has source, fields, groups, sorts, filters, panes
const views = [
  { id: 'all', data: { name: 'All', query: {} } },
  { id: 'inbox', data: { name: 'Inbox' } },
  { id: 'recent', data: { name: 'Recent' } },
  { id: 'trash', data: { name: 'Trash' } },
]

function clickView(event) {
  const id = event.target.id
  const view = views.find(view => view.id === id)
  console.log(view)
}

export default function Views({ neomem }) {
  return (
    <div className="views-pane">
      {/* <List neomem={neomem} query={query} /> */}
      {views.map(view => {
        return (
          <div className="view" key={view.id} id={view.id} onClick={clickView}>
            {view.data.name}
          </div>
        )
      })}
    </div>
  )
}
