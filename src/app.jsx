// main app

// uses fluentui from microsoft
// https://developer.microsoft.com/en-us/fluentui#/controls/web

import { ThemeProvider } from '@fluentui/react'
// import { Pivot as Tab, PivotItem as TabItem } from '@fluentui/react' // actually a Tab control
// import Scheduler from './scheduler/scheduler'
import Table from './views/table/table'
import Header from './header/header'
import { Sources } from './sources/sources'
import './app.css'

import { initializeIcons } from '@fluentui/react/lib/Icons'

initializeIcons()

const appTheme = {
  palette: {
    // themePrimary: 'red',
  },
}

const sources = new Sources()
sources.start()

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Header />
      {/* <Tab> */}
      {/* <TabItem headerText="Table"> */}
      {/* <br /> */}
      <Table sources={sources} />
      {/* </TabItem> */}
      {/* <TabItem headerText="Scheduler"> */}
      {/* <br /> */}
      {/* <Scheduler /> */}
      {/* </TabItem> */}
      {/* </Tab> */}
    </ThemeProvider>
  )
}

export default App
