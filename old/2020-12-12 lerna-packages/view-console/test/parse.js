import test from 'ava'
import tokenize from '../src/tokenize.js'
import parse from '../src/parse.js'
import neomem from '@neomem/neomem'


test(`parse look`, async t => {
  const tokens = tokenize('look')
  const cmd = await parse(tokens, neomem)
  t.log(cmd)
  t.assert(cmd)
})

// test(`look fish`, async t => {
//   const cmd = await parser.parse("look fish")
//   t.assert(cmd)
//   // t.log(cmd)
//   t.is(cmd.name, 'look')
// })

// test(`add fish plecy`, async t => {
//   const cmd = await parser.parse("add fish plecy")
//   t.assert(cmd)
//   t.log(cmd)
//   t.is(cmd.name, 'add')
// })
