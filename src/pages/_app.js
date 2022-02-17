import { Auth } from '@supabase/ui'
import { supabase } from '../lib/supabase'
import '../styles/globals.css'
import '../styles/table.css'
import { initializeIcons } from '@fluentui/react/lib-commonjs/Icons'

// for available icons see https://uifabricicons.azurewebsites.net/
initializeIcons()

export default function MyApp({ Component, pageProps }) {
  return (
    // <main className={'dark'}>
    <main>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Component {...pageProps} />
      </Auth.UserContextProvider>
    </main>
  )
}
