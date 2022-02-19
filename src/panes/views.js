import React from 'react'
// import List from '../panes/list'

export default function Views({ views }) {
  const [viewId, setViewId] = React.useState('all')

  const clickView = React.useCallback(event => {
    const id = event.target.id
    const view = views.find(view => view.id === id)
    console.log(view)
    setViewId(id)
  }, [])

  return (
    <div className="views-pane">
      {views.map(view => {
        return (
          <div
            className={'view' + (view.id === viewId ? ' selected' : '')}
            key={view.id}
            id={view.id}
            onClick={clickView}
          >
            {view.data.name}
          </div>
        )
      })}
    </div>
  )
}
