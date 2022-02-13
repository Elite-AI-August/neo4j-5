// supabase driver (postgres in cloud service)

import { createClient } from '@supabase/supabase-js'

export class Driver {
  constructor() {
    this.db = null
  }

  start({ url, key }) {
    this.db = createClient(url, key)
  }

  async get(query = {}) {
    console.log('get', query)
    //. add query filters etc here
    // By default, Supabase projects will return a maximum of 1,000 rows. This setting can be changed in Project API Settings. It's recommended that you keep it low to limit the payload size of accidental or malicious requests. You can use range() queries to paginate through your data.
    // see https://supabase.com/docs/reference/javascript/using-filters#conditional-chaining
    let getter = this.db.from('nodes').select('id, data')
    if (query.id) {
      getter = getter.eq('id', query.id)
    }
    const { data, error, status } = await getter
    return data
  }

  async add(items) {
    // const item = { data: { [prop]: value } }
    const { data, error, status } = await this.db.from('nodes').insert(items)
    return data
  }

  async set({ id, prop, value }) {
    console.log('set', id, prop, value)
    let items = await this.get({ id })
    // const item = { data: { [prop]: value } }
    const item = items[0] || { data: {} }
    item.data[prop] = value
    console.log('item', item)
    const { data, error, status } = await this.db
      .from('nodes')
      .update(item)
      .eq('id', id)
    return data
  }
}
