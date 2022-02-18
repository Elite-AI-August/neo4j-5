// main app

// uses fluentui from microsoft
// https://developer.microsoft.com/en-us/fluentui#/controls/web

// note: need to use lib-commonjs because otherwise nextjs complains
import { ThemeProvider } from '@fluentui/react/lib-commonjs'
import Table from '../panes/table'
import Views from '../panes/views'
import Mobile from '../panes/mobile'
import Header from '../components/header'
import { Neomem } from '../neomem'
import SplitPane from 'react-split-pane'

const appTheme = {
  palette: {
    // themePrimary: 'red',
  },
}

const neomem = new Neomem()
neomem.start()

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Header />
      {/* . put Bar and Subbar here */}
      <div className="desktop-pane">
        <SplitPane split="vertical" defaultSize={140}>
          <Views neomem={neomem} />
          <Table neomem={neomem} />
        </SplitPane>
      </div>
      <Mobile neomem={neomem} />
    </ThemeProvider>
  )
}

export default App
