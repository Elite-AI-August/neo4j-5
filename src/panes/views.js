// views pane
// show tree of available views - fixed and user-defined
// views are currently defined in app.js

import React from 'react'
import { SearchBox } from '@fluentui/react/lib-commonjs'

//.
function doSearch(s) {
  alert(s)
}

export default function Views({ views, viewId, setViewId }) {
  //.
  const clickView = React.useCallback(
    event => {
      const id = event.target.id
      const view = views.find(view => view.id === id)
      console.log(view)
      setViewId(id)
    },
    [views, setViewId]
  )

  return (
    <div className="views-pane">
      {views
        .filter(view => !view.hidden)
        .map(view => {
          if (view.id === 'separator') {
            return <hr />
          } else if (view.id === 'search') {
            return (
              <SearchBox
                placeholder="Search"
                onSearch={doSearch}
                showIcon
              ></SearchBox>
            )
          }
          return (
            <div
              className={'view' + (view.id === viewId ? ' selected' : '')}
              key={view.id}
              id={view.id}
              onClick={clickView}
            >
              {view.name || view.id}
            </div>
          )
        })}
    </div>
  )
}
