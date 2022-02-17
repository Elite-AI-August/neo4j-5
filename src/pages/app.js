// main app

// uses fluentui from microsoft
// https://developer.microsoft.com/en-us/fluentui#/controls/web

// note: need to use lib-commonjs because otherwise nextjs complains
import { ThemeProvider } from '@fluentui/react/lib-commonjs'
import Table from '../panes/table'
import Mobile from '../panes/mobile'
import Header from '../components/header'
import { Sources } from '../sources'

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
      {/* . put Bar here */}
      <Table sources={sources} />
      <Mobile sources={sources} />
    </ThemeProvider>
  )
}

export default App
