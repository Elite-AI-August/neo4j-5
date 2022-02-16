// main app

// uses fluentui from microsoft
// https://developer.microsoft.com/en-us/fluentui#/controls/web

// note: need to use lib-commonjs because otherwise nextjs complains
import { ThemeProvider } from '@fluentui/react/lib-commonjs'
import { initializeIcons } from '@fluentui/react/lib-commonjs/Icons'
// import { Pivot as Tab, PivotItem as TabItem } from '@fluentui/react' // actually a Tab control
// import Scheduler from './views/scheduler/scheduler'
import Table from '../panes/table'
import Header from '../components/header'
import { Sources } from '../sources'
// import './app.css'

import { foo } from '../drivers/google-calendar'

// for available icons see https://uifabricicons.azurewebsites.net/
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
      {/* . add Bar */}
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
      <button onClick={foo}>calendar</button>
    </ThemeProvider>
  )
}

export default App
