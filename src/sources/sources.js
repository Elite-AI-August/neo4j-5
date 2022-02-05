// this will aggregate diff data sources
//. for now just wraps a supabase source
//. or replace this with stardog, sooner rather than later

import { Supabase } from '../drivers/supabase/supabase'

const url = process.env.REACT_APP_SUPABASE_URL
const key = process.env.REACT_APP_SUPABASE_KEY

export class Sources {
  constructor() {
    this.supabase = new Supabase()
  }

  async start() {
    this.supabase.start({ url, key })
  }

  async get(query) {
    return this.supabase.get(query)
  }

  async add(items) {
    return await this.supabase.add(items)
  }

  async set({ id, prop, value }) {
    return await this.supabase.set({ id, prop, value })
  }

  //. delete
  //. upsert?
}
