import readline from 'readline' // https://nodejs.org/api/readline.html


class Ui {

  open() {

    this.prompt = '> '

    this.readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
      prompt: this.prompt,
    })
    
    // this.readline.on('line', this.onInput) // repeat on each line of input received
    // this.readline.on('close', this.close)
  }
  
  print(s) {
    console.log(s)
  }

  on(event, callback) {
    this.readline.on(event, callback)
  }
  
  // onInput(s) {
  //   //. do nothing - override by user
  //   console.log("this needs to be overridden")
  // }

  confirm(msg) {
    return new Promise(resolve => {
      this.readline.question(msg, answer => resolve(answer.match(/^y(es)?$/i)))
    })
  }
  
  question(msg) {
    this.readline.question.bind(this.readline)(msg)
  }
  
  showPrompt() {
    this.readline.prompt()
  }

  showTable(nodes) {

  }
  
  showProps(nodes) {
    // const childNames = location._children ? 
    //   location._children.map(child=>child.name).join(', ') : ''
    // const rows = []
    // rows.push({ name: 'name', value: location.name })
    // rows.push({ name: 'type', value: location.type })
    // rows.push({ name: 'children', value: childNames })
  }

  quit() {
    this.readline.close()
  }

}


// factory
// export default function makeUi() {
//   return new Ui()
// }

// singleton
return new Ui()
