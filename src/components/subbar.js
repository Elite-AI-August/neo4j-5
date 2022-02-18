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
      // disabled: true,
    },
  ]

  return (
    <CommandBar
      items={items}
      styles={{ root: { paddingLeft: '0' } }}
    ></CommandBar>
  )
}
