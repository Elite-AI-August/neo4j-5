// use like so -
// import { supabase } from '../lib/supabase'
// const { data, error } = await supabase
//   .from('posts')
//   .select()

import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
)