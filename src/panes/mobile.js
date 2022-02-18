import React from 'react'
import Add from '../panes/add'
import List from '../panes/list'
import { Pivot as Tabs, PivotItem as Tab } from '@fluentui/react' // actually a Tab control

export default function Mobile({ neomem }) {
  return (
    <div className="mobile-pane">
      <Tabs>
        <Tab headerText="Add">
          <Add neomem={neomem} />
        </Tab>
        <Tab headerText="Recent">
          <List neomem={neomem} />
        </Tab>
      </Tabs>
    </div>
  )
}
