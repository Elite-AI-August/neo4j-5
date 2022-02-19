// main app

// uses fluentui from microsoft
// https://developer.microsoft.com/en-us/fluentui#/controls/web

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
const views = [
  { id: 'all', data: { name: 'All', query: {} } },
  { id: 'inbox', data: { name: 'Inbox' } },
  { id: 'recent', data: { name: 'Recent' } },
  { id: 'trash', data: { name: 'Trash' } },
]

// const query = {
//   source: { name: 'meta', driver: 'json', book: '', chapter: '' },
//   fields: [{ name: 'name' }],
//   filters: [{}],
//   groups: [],
//   sorts: [],
//   panes: [],
// }

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Header />
      <Stack horizontal className="desktop-pane">
        <Views views={views} />
        <Table neomem={neomem} />
      </Stack>
      <Mobile neomem={neomem} />
    </ThemeProvider>
  )
}

export default App
