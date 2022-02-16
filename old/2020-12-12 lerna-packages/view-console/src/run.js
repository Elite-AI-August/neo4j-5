#!/usr/bin/env node

// import makeNeomem from '@neomem/neomem'
// import makeParser from './parser.js'
// import makeShell from './index.js'
// import makeUi from './ui.js'

// const neomem = makeNeomem()
// const ui = makeUi()
// const parser = makeParser()
// const shell = makeShell()

import neomem from '@neomem/neomem'
import parser from './parser.js'
import shell from './index.js'
import ui from './ui.js'

await ui.open()
await neomem.open()
await parser.open({ neomem })
await shell.open({ neomem, parser })

await shell.run()
