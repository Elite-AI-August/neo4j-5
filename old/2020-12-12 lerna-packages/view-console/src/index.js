// shell - command line interface

import chalk from 'chalk'
import utils from '@neomem/utils'
import parse from './parse.js'
// import disambiguate from './disambiguate.js'


class Shell {

  open({ neomem, parser }) {
    this._neomem = neomem
    this._parser = parser
    this._ui = neomem._ui //. shortcut - dubious
    this._ui.on('line', this._onInput.bind(this)) // called on each line of input received
    this._ui.on('close', this.close.bind(this))
  }
  
  async run() {
    this._printIntro()
    await this._onInput('look')
  }

  async close() {
    console.log("Goodbye")
    console.log()
    // await this.neomem.close()
  }
  
  // handle line of input
  async _onInput(s) {
    // const cmd = await this._parser.parse(s) // get command object
    // const cmd = await disambiguate(parse(s), this._neomem) // get command object
    const cmd = await parse(s, this._neomem) // get command object
    const output = await this._neomem.executeCommand(cmd) // execute command
    utils.printOutput(output)
    console.log()
    this._printLocation(this._neomem.getLocation())
    this._neomem._ui.showPrompt()
  }
  
  _printIntro() {
    console.log()
    console.log()
    console.log(`Welcome to Neomem`)
    console.log()
  }
  
  //. print full path - recurse up .parent tree
  _printLocation(location) {
    // const source = (location && location.source && location.source.name) || '(no source)' //.
    const name = (location && location.name) || '(no location)'
    // const type = location.type // && location.type.toLowerCase()
    // console.log(`${chalk.gray('/' + source + '/')}${chalk.greenBright.bold(name)}`) 
    console.log(`${chalk.gray('/')}${chalk.greenBright.bold(name)}`) 
  }
}


export default function makeShell() {
  return new Shell()
}
