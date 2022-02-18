// simple json driver
// use for testing and development

// const rows = [{ id: 'pokpok', data: { name: 'plecy' } }]
const rows = [
  { id: 'all', data: { name: 'All' } },
  { id: 'inbox', data: { name: 'Inbox' } },
  { id: 'recent', data: { name: 'Recent' } },
  { id: 'trash', data: { name: 'Trash' } },
]

export class Driver {
  async start() {
    this.db = rows
  }

  // get data differently depending on initial node and traversal method.
  // can pass eg { parentPath: 'home:folder' } to get children of home folder.
  //. explain traversals
  //. and what does this return?
  //. handle recursion
  async get(params = { maxDepth: 1 }) {
    return { nodes: this.db }
  }
}
