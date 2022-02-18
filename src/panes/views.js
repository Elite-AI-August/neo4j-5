import React from 'react'
import List from '../panes/list'
// import { Pivot as Tabs, PivotItem as Tab } from '@fluentui/react' // actually a Tab control

const query = {
  source: 'meta',
  fields: ['name'],
  filters: [{}],
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
