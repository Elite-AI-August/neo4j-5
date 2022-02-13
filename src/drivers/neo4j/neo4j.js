// neo4j driver

import neo4j from 'neo4j-driver'

// wait, we want to try the postgres fdw...

export class Neo4j {
  // constructor() {
  //   this.supabase = null
  // }
  // start({ url, key }) {
  //   // this.supabase = createClient(url, key)
  //   this.driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
  // }
  // async get(query = {}) {
  //   console.log('get', query)
  //   //. add query filters etc here
  //   // By default, Supabase projects will return a maximum of 1,000 rows. This setting can be changed in Project API Settings. It's recommended that you keep it low to limit the payload size of accidental or malicious requests. You can use range() queries to paginate through your data.
  //   // see https://supabase.com/docs/reference/javascript/using-filters#conditional-chaining
  //   let getter = this.supabase.from('nodes').select('id, data')
  //   if (query.id) {
  //     getter = getter.eq('id', query.id)
  //   }
  //   const { data, error, status } = await getter
  //   return data
  // }
  // async add(items) {
  //   // const item = { data: { [prop]: value } }
  //   const { data, error, status } = await this.supabase
  //     .from('nodes')
  //     .insert(items)
  //   return data
  // }
  // async set({ id, prop, value }) {
  //   console.log('set', id, prop, value)
  //   let items = await this.get({ id })
  //   // const item = { data: { [prop]: value } }
  //   const item = items[0] || { data: {} }
  //   item.data[prop] = value
  //   console.log('item', item)
  //   const { data, error, status } = await this.supabase
  //     .from('nodes')
  //     .update(item)
  //     .eq('id', id)
  //   return data
  // }
}
