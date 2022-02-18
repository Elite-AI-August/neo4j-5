import React from 'react'
import { CommandBar } from '@fluentui/react/lib-commonjs'

export function Subbar({ clickAdd, clickDelete }) {
  const items = [
    // {
    //   key: 'add',
    //   text: 'Add',
    //   iconProps: { iconName: 'Add' },
    //   onClick: clickAdd,
    // },
    {
      key: 'delete',
      text: 'Delete',
      iconProps: { iconName: 'Delete' },
      onClick: clickDelete,
    },
  ]
  // return <div onClick={clickAdd}>Add</div>
  return <CommandBar items={items}></CommandBar>
}
