// main app

// uses fluentui from microsoft
// https://developer.microsoft.com/en-us/fluentui#/controls/web

import React from 'react'
// note: need to use lib-commonjs because otherwise nextjs complains
import { ThemeProvider, Stack } from '@fluentui/react/lib-commonjs'
import Table from '../panes/table'
import Views from '../panes/views'
import Mobile from '../panes/mobile'
import Header from '../components/header'
import { Neomem } from '../neomem'
// import SplitPane from 'react-split-pane' // nowork? https://github.com/tomkp/react-split-pane/issues/713

const appTheme = {
  palette: {
    // themePrimary: 'red',
  },
}

const neomem = new Neomem()
neomem.start()

//. these could be defined in a yaml file?
// read them with the yaml file driver?
// or in a sqlite db for all the meta stuff?
// or in supabase for use across computers and mobile? yah?
// but... when user first tries it out, want to have some defaults,
// without creating a user in the db, or a whole db for them.
// and also, these should be fixed at the top. no intermixing with user's views.
// maybe could use localstorage to keep their data until they signup? yah.
//. a view has source, fields, groups, sorts, filters, panes

const defaultView = {
  id: 'default',
  hidden: true,
  source: {
    name: 'supabase', //. not used yet
    options: {},
  },
  fields: [
    // { name: 'type' },
    { name: 'tags' },
    { name: 'name' },
    { name: 'when' },
    { name: 'notes' }, //. this could be huge so don't include in default views?
    { name: 'id', readonly: true, field: 'id' }, // debug
    // { name: 'data', readonly: true, field: 'data' }, // debug
  ],
  filters: [{ field: 'name', operator: 'contains', value: 'g' }],
  groups: [{ field: 'when' }],
  sorts: [{ field: 'name', order: 'ascending' }],
  pane: {
    name: 'table',
    options: {},
  },
}

//. make this a tree eventually - views.js should recurse down it
const views = [
  defaultView,
  //. better way than specifying fields manually here?
  // {
  //   id: 'system',
  //   name: 'System',
  //   views: [
  { id: 'all', fields: defaultView.fields },
  {
    id: 'inbox',
    fields: defaultView.fields,
    filters: [
      {
        tags: { none: true },
      },
    ],
  },
  // { id: 'recent', fields: defaultView.fields },
  {
    id: 'trash',
    fields: defaultView.fields,
    filters: [
      {
        tags: { like: 'trash' },
      },
    ],
  },
  //   ],
  // },
  // {
  //   id: 'personal',
  //   name: 'User',
  //   views: [
  { id: 'separator', fields: [] },
  {
    id: 'tasks',
    fields: [
      // { name: 'type' },
      // { name: 'project' },
      { name: 'tags' },
      { name: 'name' },
      { name: 'when' },
      { name: 'order' },
      { name: 'status' },
      { name: 'id', readonly: true, field: 'id', hidden: true }, // need this in results
    ],
    filters: [
      {
        tags: { like: 'task' },
      },
    ],
  },
  {
    id: 'fish',
    fields: defaultView.fields,
    filters: [
      {
        tags: { like: 'fish' },
      },
    ],
  },
  //   ],
  // },
]

function App() {
  const [viewId, setViewId] = React.useState('default')
  return (
    <ThemeProvider theme={appTheme}>
      <Header />
      <Stack horizontal className="desktop-pane">
        <Stack.Item styles={{ root: { flexBasis: '10em', flexShrink: 0 } }}>
          <Views views={views} viewId={viewId} setViewId={setViewId} />
        </Stack.Item>
        <Stack.Item>
          <Table neomem={neomem} views={views} viewId={viewId} />
        </Stack.Item>
      </Stack>
      <Mobile neomem={neomem} />
    </ThemeProvider>
  )
}

export default App
