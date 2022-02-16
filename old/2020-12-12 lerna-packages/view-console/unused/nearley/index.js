// parse input string to a command object

// import { Parser } from 'nearley'

//. parse line to ast/parse tree - use nearleyjs
// then walk over cmds in parse tree and execute them
// import require from 'requirejs'
// const nearley = require("nearley");
// const grammar = require("./grammar");
// const window = {}
// import nearley from 'nearley'
// import * as grammar from './grammar'
// create a Parser object from our grammar
// const nearleyParser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar))


class Parser {

  open({ neomem }) {
    this._neomem = neomem
  }

  // input: a string
  // output: command object with { name, execute, undo }
  // needs neomem with ui so can ask user for clarification if necessary.
  async parse(s='') {
    // parser.feed("foo\n");
    // parser.feed(s)
    // parser.results is an array of possible parsings.
    // console.log(parser.results) // [[[[ "foo" ],"\n" ]]]
    // const rows = [{name:'pokpok'},{name:'lkmlkm'}]
    // return rows
  }
}


export default function makeParser() {
  return new Parser()
}
