// supabase driver

import { createClient } from '@supabase/supabase-js'

export class Supabase {
  constructor() {
    this.supabase = null
  }

  start({ url, key }) {
    this.supabase = createClient(url, key)
  }

  async get({ query } = { query: {}}) {
    console.log('get', query)
    //. add query filters etc here
    const { data, error, status } = await this.supabase
      .from('nodes')
      .select(`id, data`)
    return data
  }

  async add({ prop, value }) {
    const item = { data: { [prop]: value } }
    const { data, error, status } = await this.supabase
      .from('nodes')
      .insert([item])
  }

  async update({ id, prop, value }) {
    const item = { data: { [prop]: value } }
    // const { data, error, status } = await this.supabase
    //   .from('nodes')
    //   .where(id=id)
    //   .update([item])
  }
}
