import test from 'ava'
import makeUi from '../src/ui.js'


const ui = makeUi()

test(`print`, async t => {
  // ui.print("hello")
  t.assert(ui.print)
})
