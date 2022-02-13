// this will aggregate diff data sources
//. for now just wraps a supabase source
//. or replace this with stardog, sooner rather than later

// we're in react now, so harder to do dynamic driver loads.
// so just load them all here.
import { Driver as Supabase } from '../drivers/supabase'
// import { Driver as Neo4j } from '../drivers/neo4j'

const sources = [
  {
    name: 'supabase',
    Driver: Supabase,
    connect: {
      url: process.env.REACT_APP_SUPABASE_URL,
      key: process.env.REACT_APP_SUPABASE_KEY,
    },
  },
]

export class Sources {
  constructor() {
    // this.supabase = new Supabase()
    // root will be an array or dict or ? of instantiated sources
    this.root = null
  }

  async start() {
    // this.supabase.start({ url, key })
    this.root = []
    for (let source of sources) {
      const driver = new source.Driver()
      await driver.start(source.connect)
      this.root.push(driver)
    }
  }

  async get(query) {
    // return this.supabase.get(query)
    //. pass query on to correct source
    return this.root[0].get(query)
  }

  async add(items) {
    // return await this.supabase.add(items)
    return await this.root[0].add(items)
  }

  async set({ id, prop, value }) {
    // return await this.supabase.set({ id, prop, value })
    return await this.root[0].set({ id, prop, value })
  }

  //. delete
  //. upsert?
}
