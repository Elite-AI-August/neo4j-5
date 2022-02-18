// neomem
// this aggregates different data sources

// we're in react now, so harder to do dynamic driver loads.
// so just load them all here.
import { Driver as Json } from '../drivers/json'
import { Driver as Supabase } from '../drivers/supabase'
// import { Driver as Neo4j } from '../drivers/neo4j'

//. put this into a setup yaml? or store in a local sqlite db?
// so start with a blank canvas?
//. make/use a map from driver name to Driver class
//. should this be a flat list or tree or graph?
const sourceDefs = [
  {
    name: 'json',
    Driver: Json,
    connect: {},
  },
  {
    name: 'supabase',
    Driver: Supabase,
    connect: {},
  },
  // {
  //   name: 'sqlite',
  //   Driver: Sqlite,
  //   connect: {},
  // },
  // {
  //   name: 'neo4j',
  //   Driver: Neo4j,
  //   connect: {
  //     uri: process.env.REACT_APP_NEO4J_URI, //. on localhost - no pw?
  //     user: process.env.REACT_APP_NEO4J_USER,
  //     password: process.env.REACT_APP_NEO4J_PASSWORD, //. yeah... will need a server to hide this stuff
  //   },
  // },
]

//. how will client request diff sources?
// const isource = 0
const isource = 1
// const isource = 2

export class Neomem {
  constructor() {
    //. sources will be an array or dict or tree or graph of instantiated sources
    this.sources = null
  }

  // initialize data sources
  async start() {
    this.sources = []
    for (let sourceDef of sourceDefs) {
      const driver = new sourceDef.Driver()
      console.log(sourceDef)
      // @ts-ignore - ts gets confused with the diff connect props
      await driver.start(sourceDef.connect)
      this.sources.push(driver)
    }
    // this.sources = sourceDefs.map(async source => {
    //   const driver = new source.Driver()
    //   // @ts-ignore
    //   await driver.start(source.connect)
    //   return driver
    // })
  }

  async get(query) {
    //. pass query on to correct source - how do?
    return this.sources[isource].get(query)
  }

  async add(items) {
    return await this.sources[isource].add(items)
  }

  async set({ id, prop, value }) {
    return await this.sources[isource].set({ id, prop, value })
  }

  async delete({ id }) {
    return await this.sources[isource].delete({ id })
  }
}
