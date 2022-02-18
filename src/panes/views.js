import React from 'react'
import List from '../panes/list'
// import { Pivot as Tabs, PivotItem as Tab } from '@fluentui/react' // actually a Tab control

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
      {/* <Tabs>
        <Tab headerText="Add">
          <Add neomem={neomem} />
        </Tab>
        <Tab headerText="Recent"> */}
      <List neomem={neomem} query={query} />
      {/* </Tab> */}
      {/* </Tabs> */}
    </div>
  )
}
