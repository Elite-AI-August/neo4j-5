// parse input to a command object
// input: list of token objects
// output: a neomem command object


import * as verbs from './verbs.js'


// input: a list of token objects { rule, text }
// output: command object with { name, execute, undo }
// needs neomem with ui so can ask user for clarification if necessary.
export default async function parse(tokens, neomem) {

  const verb = tokens[0][1]
  const path = tokens[1] && tokens[1][1]
  
  // // find the item pointed to by path, disambiguate if necess
  // //. use neomem.home.uuid if no path specified
  // const path = words[1] || 'home:folder' //.
  // const node = await this._neomem.get({ path })
  // const uuid = node ? node.uuid : '' //.
  // // then pass that uuid to the api command
  // const maxDepth = 1 // default for console
  // const params = { source:this._neomem, uuid, maxDepth }
  // const cmd = this._neomem.getCommand(verb, params) // get command object
  // return cmd // { name, execute, undo } or undefined

  const maxDepth = 1 // default for console
  const params = { path, maxDepth }
  const cmd = neomem._getCommand(verb, params) // get command object
  return cmd // { name, execute, undo } or undefined

}
