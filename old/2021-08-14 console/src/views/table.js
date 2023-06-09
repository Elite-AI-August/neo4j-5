// table view
// used by console list command

// this is a table-console lib that converts raw table data to text for the console.

//. handle tree recursion and graph traversal - eg use source.meta.axis for traversal.

//. createTable would be better?
//. what is source?
//. just export the class?
export function table({ source }) {
  const view = new TableView(source)
  return view
}

class TableView {
  constructor(source) {
    this.source = source
  }

  // get rows of text
  //. not getLines?
  async *getRows(start, count) {
    const { columns } = this.source.meta
    const header = columns.join('  |  ')
    let n = 0
    yield { n, header }
    n++
    const line = `-----------------------------------------------`
    yield { n, line }
    n++
    const objs = await this.source.getObjs(start, count) // get projections for each node
    for await (let obj of objs) {
      // convert obj to row string
      const str = columns.map(column => obj[column]).join('  |  ')
      yield { n, str }
      n++
    }
  }
}

// //. objs -> nodes? ie do we want to process a list/tree/graph of nodes here?
// // or expect plainer json objs? ie guess json - cmds could easily pipe json around.
// export async function table({ objs, meta }) {
//   let { columns } = meta
//   columns = ['n', ...columns]
//   const rows = [columns]
//   for (const [n, obj] of objs.entries()) {
//     // for (const obj of objs) {
//     //.
//     // const row = columns.map(column => obj[column])
//     const row = columns.map(column => {
//       if (column === 'n') {
//         return n
//       }
//       return typeof obj[column] === 'object' ? obj[column].name : obj[column]
//     })
//     rows.push(row)
//   }
//   // for (let [n,row] of rows.entries()) {
//   //   if (n === 0) {
//   //   }
//   // }
//   return rows
// }

// export async function table({ node, meta, axis = null }) {
//   const subnodes = [node]
//   if (axis) {
//     const keys = await node.get(axis) // eg get('contents') -> array of itemkeys
//     // const path = (await node.get('path')) || '.'
//     for (const key of keys) {
//       // const subpath = path + '/' + key //. use this
//       const subpath = key
//       const subnode = await node.datasource.get(subpath)
//       subnodes.push(subnode)
//     }
//   }
//   const { columns } = meta
//   const objs = []
//   for (const [n, subnode] of subnodes.entries()) {
//     const obj = await subnode.get(columns)
//     obj.n = n
//     objs.push(obj)
//   }
//   return objs
// }
