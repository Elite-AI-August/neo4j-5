import test from 'ava'
import tokenize from '../src/tokenize.js'

test(`tokenize word`, async t => {
  const tokens = tokenize('word')
  t.deepEqual(tokens,[{rule:'word', text:'word'}])
})

test(`tokenize "string"`, async t => {
  const tokens = tokenize('"string"')
  t.deepEqual(tokens,[{rule:'string',text:'"string"'}])
})

test(`tokenize look at plecy`, async t => {
  const tokens = tokenize('look at plecy')
  t.deepEqual(tokens.map(token=>token.text),['look','at','plecy'])
})

// test(`tokenize words`, async t => {
//   const tokens = await parser.tokenize("add fish plecy")
//   t.assert(tokens[0].text = 'add')
//   t.assert(tokens[1].text = 'fish')
//   t.assert(tokens[2].text = 'plecy')
// })

// test(`tokenize string`, async t => {
//   const tokens = await parser.tokenize(`add fish "black catfish"`)
//   t.assert(tokens[0].text = 'add')
//   t.assert(tokens[1].text = 'fish')
//   t.assert(tokens[2].text = 'black catfish')
// })

