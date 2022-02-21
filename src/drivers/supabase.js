// driver for supabase (postgres in cloud service)

import { createClient } from '@supabase/supabase-js'

//. how will handle multiple users? one db per user? row-level security?
//. think about future collaborations also - share a tag with someone,
// a trip plan, etc. so maybe a shared db would be needed?

// when running locally, these come from .env.local in root folder.
// when running on vercel, these need to be set in vercel settings -
//   https://vercel.com/bburns/neomem/settings/environment-variables
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
  async get(view = {}) {
    console.log(`get`, view)
    //. filter to fields wanted - minimize data and time
    //  eg what if looking at a table view and it includes notes field, which has 1mb text?
    //. handle pagination
    // By default, Supabase projects will return a maximum of 1,000 rows.
    // You can use range() queries to paginate through your data.
    // see https://supabase.com/docs/reference/javascript/using-filters#conditional-chaining
    let getter = this.db
      .from('nodes')
      .select('id, data, created_at, modified_at')
    //. make tree of filter operations
    for (let filter of view.filters || []) {
      console.log('filter', filter)
      if (filter.id) {
        getter = getter.eq('id', filter.id)
      }
      if (filter.tags) {
        if (filter.tags.like) {
          getter = getter.like(`data->>tags`, `%${filter.tags.like}%`)
        }
        if (filter.tags.none) {
          getter = getter.is(`data->>tags`, null)
        }
        if (filter.tags.eq !== undefined) {
          getter = getter.eq(`data->>tags`, filter.tags.eq)
        }
        if (filter.tags.neq !== undefined) {
          getter = getter.neq(`data->>tags`, filter.tags.neq)
        }
      }
    }
    // getter.order('modified_at', { ascending: false })
    for (let sort of view.sorts || []) {
      console.log('sort', sort)
      getter.order(sort.field, { ascending: sort.order === 'ascending' })
    }
    const { data, error, status } = await getter
    console.log(status) // eg 200
    console.log(data)
    return { items: data || [], error }
  }

  // items is like [{ data: { name: 'plecy' } }]
  async add(items) {
    console.log(`add`, items)
    const { data, error, status } = await this.db.from('nodes').insert(items)
    console.log(status)
    return { items: data, error }
  }

  // set a property value on an item
  // item is like { id: '18372983', data: { name: 'plecy', size: 'sm-lrg' } }
  async set({ id, prop, value }) {
    console.log(`set`, id, prop, value)
    if (id) {
      const { items } = await this.get({ filters: [{ id }] })
      const item = items[0] || { data: {} }
      item.data[prop] = value
      console.log('item', item)
      const { data, error, status } = await this.db
        .from('nodes')
        .update(item)
        .eq('id', id)
      console.log('status', status)
      return { items: data, error }
    }
    // add new item
    const items = [{ data: { [prop]: value } }]
    return await this.add(items)
  }

  // delete an item
  //. pass list of ids?
  async delete({ id }) {
    console.log(`delete`, id)
    const { data, error, status } = await this.db
      .from('nodes')
      .delete()
      .eq('id', id)
    console.log('status', status)
    return { items: data, error }
  }
}
