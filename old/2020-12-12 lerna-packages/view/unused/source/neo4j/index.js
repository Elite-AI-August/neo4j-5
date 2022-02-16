// neomem neo4j datasource

//. merge all this code into neomem-source-neo4j
//. use this to evolve a universalish data api

import neo4j from 'neo4j-driver'


const uri = process.env.REACT_APP_NEO4J_URI
const user = process.env.REACT_APP_NEO4J_USER
const password = process.env.REACT_APP_NEO4J_PASSWORD

// get driver
// note: neo4j stores 64-bit ints, js only goes up to 53-bits (9e16)
// see https://github.com/neo4j/neo4j-javascript-driver#enabling-native-numbers
const driver = neo4j.driver(uri, 
  neo4j.auth.basic(user, password), 
  { disableLosslessIntegers: true },
)

// get neo4j session - be sure to call session.close() when done
export function getSession({ readOnly=false }={}) {
  if (readOnly) {
    const session = driver.session({ defaultAccessMode: neo4j.session.READ })
    return session
  }
  const session = driver.session()
  return session
}

// run a query with error handling and logging
export async function run(query, params) {
  console.log('run', query, params)
  const session = getSession()
  try {
    //. handle recursion here?
    const result = await session.run(query, params)
    session.close()  
    // console.log('result', result)
    return result
  } catch(error) {
    console.error(error)
    session.close()  
  }
}



export async function listAll() {
  const query = `
  MATCH (n) 
  OPTIONAL MATCH (n)<-[]-(p:Project)
  OPTIONAL MATCH (n)-[]->(t:Timeframe)
  OPTIONAL MATCH (n)-[]->(place:Place)
  WITH n, labels(n) as type, collect(p.name) as project, collect(t) as timeframe, id(n) as id,
  collect(place.name) as place
  RETURN n { .*, type, project, timeframe, id, place }
  ` 
}


//. translate a generic query object into a neo4j cypher query,
// run it, and return results. 
export async function list(queryObject) {
  const query = `
  MATCH (n) 
  OPTIONAL MATCH (n)<-[]-(p:Project)
  OPTIONAL MATCH (n)-[]->(t:Timeframe)
  OPTIONAL MATCH (n)-[]->(place:Place)
  WITH n, labels(n) as type, collect(p.name) as project, 
    collect(t) as timeframe, id(n) as id, collect(place.name) as place
  RETURN n { .*, type, project, timeframe, id, place }
  `
  const params = {}
  const result = await run(query, params)

  const rows = []
  for (const record of result.records) {
    const row = record.get("n")
    // join any array fields into a comma-separated string
    Object.keys(row).forEach((key) => {
      if (key === "timeframe") { //. make generic
        row[key] = row[key][0]
          ? row[key][0].properties // this includes { name, order, notes, ... }
          : { name: "", order: 10 } //.
      } else if (Array.isArray(row[key])) {
        row[key] = row[key].join(", ")
      }
    })
    // // recurse if item has children
    // //. generalize more
    // if (row.hasChildren) {
    //   row._children = await getChildren(query, {parentId:row.id})
    // }
    rows.push(row)
  }

  return rows
}




// pass a name like 'labelsAdded' - will obtain from the hidden property _stats.
// the Java interface has methods to obtain these values, 
// but they're not (currently) exposed in js -
// https://neo4j.com/docs/java-reference/current/javadocs/org/neo4j/graphdb/QueryStatistics.html
// so this might break in future.
// one of -
// constraintsAdded
// constraintsRemoved
// indexesAdded
// indexesRemoved
// labelsAdded
// labelsRemoved
// nodesCreated
// nodesDeleted
// propertiesSet
// relationshipsCreated
// relationshipsDeleted
function getStats(result, name) {
  const value = result && result.summary.updateStatistics._stats[name]
  return value
}

function checkStats(result, name, expectedValue) {
  const value = getStats(result, name)
  return value === expectedValue
}

// function expectStats(result, name, expectedValue) {
//   const value = getStats(result, name)
//   if (value !== expectedValue) throw new Error(`Expected ${name} to be ${expectedValue}`)
// }

function getRecord(result, name) {
  const record = result.records && result.records[0]
  const value = record && record.get(name)
  return value
}

function getRecords(result, name) {
  const values = result.records.map(record => record.get(name))
  return values
}


export async function getTypes() {
  const query = "call db.labels()" // or MATCH (n) RETURN DISTINCT labels(n)
  const result = await run(query)
  const types = getRecords(result, 'label').sort()
  return types
}



// add a generic item
export async function addItem() {
  const query = `
  CREATE (node)
  SET node.created=datetime()
  SET node.modified=datetime()
  WITH node, id(node) as id
  RETURN node { .*, id }
  `
  const result = await run(query)
  const node = getRecord(result, 'node')
  //. how check results but also return the node/item?
  // checkStats(result, 'nodesCreated', 1)
  // checkStats(result, 'propertiesSet', 2)

  // ditch all this - let ui handle it?
  // const query2 = `
  // MATCH (node), (folder:Folder {name:'inbox'})
  // CREATE (node)<-[r:CHILD]-(f)
  // `
  // if (node && linkToTypeName) {
  //   //. what if setRelation took an id(number) or string for Type:name ?
  //   //. what about oldvalue? 
  //   //. append 'Of' to relation name to indicate reverse direction?
  //   //. or 
  //   // a folder has many children
  //   // setRelation(node.id, 'childOf', 'Folder:inbox')
  //   //. also consider making this something easily translatable to tests and console ui
  //   // eg it.childOf=Folder:inbox ? which would add it to the Folder:inbox.child array
  //   // or it.parent = Folder:inbox ? which would set the reverse relation
  //   // ie createItem then do that?
  //   // setRelation3('Folder:inbox', 'child', node.id) //. call it addRelation, since one to many?
  //   // setRelation3(linkToTypeName, 'child', node.id)
  // }
  return node
}


export async function deleteItem(id) {
  const query = `
  MATCH (n)
  WHERE id(n)=$id
  DETACH DELETE n
  `
  const params = { id }
  const result = await run(query, params)
  return checkStats(result, 'nodesDeleted', 1)
}


export async function setType(id, value, oldvalue) {
  const params = { id }

  // drop any existing label
  if (oldvalue) {
    const query = `
    MATCH (node)
    WHERE id(node)=$id 
    REMOVE node:\`${oldvalue}\`
    `
    const result = await run(query, params)
    if (!checkStats(result, 'labelsRemoved', 1)) return false
  }

  // add new label
  if (value) {
    const query = `
    MATCH (node)
    WHERE id(node)=$id 
    SET node:\`${value}\`
    SET node.modified=datetime()
    `
    const result = await run(query, params)
    if (!checkStats(result, 'labelsAdded', 1)) return false
  }
  return true
}


// update a string/number field value
export async function setPropertyValue(id, property, value) {
  // note: cypher can't do node.$property so use substitution.
  // backticks to handle spaces in property names.
  const query = `
  MATCH (node)
  WHERE id(node)=$id
  SET node.\`${property}\`=$value
  SET node.modified=datetime()
  `
  const params = { id, property, value }
  const result = await run(query, params)
  return checkStats(result, 'propertiesSet', 2)
}


//. merge with setRelation2
export async function setRelation(id, field, value, oldvalue) {

  const type = field[0].toUpperCase() + field.slice(1)
  const relntype = field.toUpperCase()

  const params = { id, value, oldvalue }

  // drop any existing relation
  if (oldvalue) {
    const query = `
    MATCH (n)-[r:${relntype}]->(m:${type} {name: $oldvalue})
    WHERE id(n)=$id 
    DELETE r
    `
    const result = await run(query, params)
    if (!result) return
  }

  // add new relation
  if (value) {
    const query = `
    MATCH (n), (m:${type} {name: $value}) 
    WHERE id(n)=$id 
    CREATE (n)-[:${relntype}]->(m)
    SET n.modified=datetime()
    `
    const result = await run(query, params)
    if (!result) return
  }

  return true
}


//. merge with setRelation
//. multiselect? single select for now?
// eg field='project', oldvalue='', value='neomem', destType='View'
export async function setRelation2(id, field, value, oldvalue, destType) {

  const srcType = field[0].toUpperCase() + field.slice(1) // eg 'Project'
  // const relntype = field.toUpperCase()

  // item must have a type to set this type of relationship
  if (!destType) {
    return false
  }
  // what is relntype? it depends on the type of thing being linked to
  // eg if data.type==='View' then relntype is VIEW
  //. are there exceptions?
  const RELNTYPE = destType.toUpperCase() // eg 'View' to 'VIEW'

  const params = { id, oldvalue, value }
  console.log(params)

  // drop any existing relation
  if (oldvalue) {
    const query = `
    MATCH (n)<-[r]-(m:${srcType} {name:$oldvalue})
    WHERE id(n)=$id 
    DELETE r
    `
    const result = await run(query, params)
    if (!result) return
  }

  // add link to item
  if (value) {
    const query = `
    MATCH (n), (m:${srcType} {name:$value})
    WHERE id(n)=$id
    CREATE (n)<-[r:${RELNTYPE}]-(m)
    SET n.modified=datetime()
    `
    const result = await run(query, params)
    if (!result) return
  }

  return true
}
