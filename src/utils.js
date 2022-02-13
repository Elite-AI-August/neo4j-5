import Table from 'easy-table' // console table

// return array of [name,type] parts from a path string
//. handle ``, spaces, etc
export function getPathParts(pathString = '') {
  const parts = pathString.split('/').map(part => part.split(':'))
  return parts
}

// export async function getChildItem(node, parts) {
//   const first = parts[0]
//   const rest = parts.slice(1)
//   // if (first[0]===)
// }

//. handle ``, escaped chars / and : etc
export function getLastNameTypeFromPath(path) {
  const parts = path.split('/')
  const pair = parts[parts.length - 1].split(':') // [name, type]
  return pair
}

export function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1)
}

//. wrap name and type in `` if have space or slash or colon etc
export function escape(s) {
  return s
}

// substitute #varname# with params.varname etc
export function fillInTemplate(template, params) {
  for (const key of Object.keys(params)) {
    const value = params[key]
    //. do global replace
    template = template.replace('#' + key + '#', value)
  }
  return template
}

// this is used by neomem console and datasource tests
export function printOutput(output) {
  if (output === undefined) {
    console.log(`Command returned nothing.`)
  } else if (Array.isArray(output)) {
    printTable(output)
  } else {
    console.log(output)
  }
}

// this is used by neomem console and datasource tests
export function printTable(rowsInit, colsInit) {
  if (!rowsInit || rowsInit.length === 0) return
  const rows = flatten(rowsInit, '_children')
  let cols
  if (colsInit) {
    cols = colsInit
  } else {
    cols = 'name,type,size,value,notes'.split(',')
    const usedCols = Object.keys(rows[0])
    cols = cols.filter(col => usedCols.includes(col))
  }
  const t = new Table()
  for (const row of rows) {
    for (const col of cols) {
      t.cell(col, row[col])
    }
    t.newRow()
  }
  console.log(t.toString().trim())
}

// flatten a hierarchy of rows, indending the name column each level.
// child rows are in the _children property.
// this is used by printTable
export function flatten(rows, prop, accum = [], prefix = '') {
  for (const row of rows) {
    const rowCopy = { ...row }
    rowCopy.name = prefix + rowCopy.name
    accum.push(rowCopy)
    if (rowCopy._children) {
      flatten(rowCopy._children, prop, accum, prefix + '  ') // recurse and indent more
    }
  }
  return accum
}

export function getOptionalType(type) {
  const optionalType = type ? ':`' + capitalize(type) + '`' : ''
  return optionalType
}
