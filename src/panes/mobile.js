import React from 'react'
import Add from '../panes/add'
import List from '../panes/list'
import { Pivot as Tabs, PivotItem as Tab } from '@fluentui/react' // actually a Tab control

export default function Mobile({ sources }) {
  return (
    <div className="mobile-pane">
      <Tabs>
        <Tab headerText="Add">
          <Add sources={sources} />
        </Tab>
        <Tab headerText="Recent">
          <List sources={sources} />
        </Tab>
      </Tabs>
    </div>
  )
}
