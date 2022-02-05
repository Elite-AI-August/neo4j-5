// this will aggregate diff data sources
// for now just wraps a supabase source

// import { environment } from '../../environments/environment'
import { Supabase } from '../drivers/supabase/supabase'

const url = process.env.REACT_APP_SUPABASE_URL
const key = process.env.REACT_APP_SUPABASE_KEY

export class Sources {
  constructor() {
    this.supabase = new Supabase()
  }

  async start() {
    // const url = environment.supabaseUrl
    // const key = environment.supabaseKey
    this.supabase.start({ url, key })
  }

  async get({ query } = { query: {}}) {
    return this.supabase.get({ query })
  }

  async set({ id, prop, value }) {
    await this.supabase.set({ id, prop, value })
  }
}
