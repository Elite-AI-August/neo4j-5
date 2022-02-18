import React from 'react'
import Add from '../panes/add'
import List from '../panes/list'
// import { Pivot as Tabs, PivotItem as Tab } from '@fluentui/react' // actually a Tab control

//. fluentui tabs don't work well with vercel - causing errors
//  so find another implementation

export default function Mobile({ neomem }) {
  return (
    <div className="mobile-pane">
      {/* <Tabs> */}
      {/* <Tab headerText="Add"> */}
      <Add neomem={neomem} />
      {/* </Tab> */}
      {/* <Tab headerText="Recent"> */}
      {/* <List neomem={neomem} query={{}} /> */}
      {/* </Tab> */}
      {/* </Tabs> */}
    </div>
  )
}
