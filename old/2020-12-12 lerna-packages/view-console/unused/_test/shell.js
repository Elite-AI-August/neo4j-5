import test from 'ava'
import makeShell from '../src/index.js'


const shell = makeShell()

test(`shell`, async t => {
  t.assert(shell)
})
