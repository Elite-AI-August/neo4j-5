// supabase driver (postgres in cloud service)

import { createClient } from '@supabase/supabase-js'

//. how will handle multiple users? one db per user? row-level security?
//. think about future collaborations also - share a tag with someone,
// a trip plan, etc.

// when running locally, these come from .env.local in root folder.
// when running on vercel, these need to be set in neomem settings.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
)

export class Driver {
  constructor() {
    this.db = null
  }

  // start({ url, key }) {
  //   this.db = createClient(url, key)
  // }
  start() {
    this.db = supabase
  }

  // get an array of items
  // nodes is like [{ id: '12385843', data: { name: 'plecy' } }, ...]
  async get(query = {}) {
    console.log('get', query)
    //. add query filters etc here
    //. handle pagination
    // By default, Supabase projects will return a maximum of 1,000 rows.
    // This setting can be changed in Project API Settings. It's recommended
    // that you keep it low to limit the payload size of accidental or malicious
    // requests. You can use range() queries to paginate through your data.
    // see https://supabase.com/docs/reference/javascript/using-filters#conditional-chaining
    //. filter to fields wanted? minimize data and time
    //. what if looking at a table view and it includes notes field, which has 1mb text?
    let getter = this.db.from('nodes').select('id, data')
    if (query.id) {
      getter = getter.eq('id', query.id)
    }
    // const { data, error, status } = await getter
    const { data } = await getter
    // return data
    //. call these items? with fields?
    return { nodes: data }
  }

  // items is like [{ data: { name: 'plecy' } }]
  async add(items) {
    const { data } = await this.db.from('nodes').insert(items)
    return data
    //. return { items: data }
  }

  // set a property value on an item
  // item is like { id: '18372983', data: { name: 'plecy', size: 'sm-lrg' } }
  async set({ id, prop, value }) {
    console.log('set', id, prop, value)
    let items = await this.get({ id })
    console.log('items', items)
    // const item = { data: { [prop]: value } }
    const item = items[0] || { data: {} }
    console.log('item', item)
    item.data[prop] = value
    console.log('item', item)
    const { data } = await this.db.from('nodes').update(item).eq('id', id)
    return data
    //. return { items: data }
  }
}
