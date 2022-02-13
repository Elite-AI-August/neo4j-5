// sources
// this will aggregate diff data sources

// we're in react now, so harder to do dynamic driver loads.
// so just load them all here.
import { Driver as Supabase } from '../drivers/supabase'
import { Driver as Neo4j } from '../drivers/neo4j'

const sources = [
  {
    name: 'supabase',
    Driver: Supabase,
    connect: {
      url: process.env.REACT_APP_SUPABASE_URL,
      key: process.env.REACT_APP_SUPABASE_KEY,
    },
  },
  {
    name: 'neo4j',
    Driver: Neo4j,
    connect: {
      uri: process.env.REACT_APP_NEO4J_URI, //. on localhost - no pw?
      user: process.env.REACT_APP_NEO4J_USER,
      password: process.env.REACT_APP_NEO4J_PASSWORD, //. yeah... will need a server to hide this stuff
    },
  },
]

export class Sources {
  constructor() {
    // root will be an array or dict or tree or graph of instantiated sources
    this.root = null
  }

  async start() {
    this.root = []
    for (let source of sources) {
      const driver = new source.Driver()
      await driver.start(source.connect)
      this.root.push(driver)
    }
  }

  async get(query) {
    //. pass query on to correct source
    return this.root[0].get(query)
  }

  async add(items) {
    //. pass query on to correct source
    return await this.root[0].add(items)
  }

  async set({ id, prop, value }) {
    //. pass query on to correct source
    return await this.root[0].set({ id, prop, value })
  }

  //. delete
  //. upsert?
}
