import { Auth } from '@supabase/ui'
import { supabase } from '../lib/supabase' //. ditch!
import '../styles/globals.css'
import '../styles/checkbox.css'
import '../styles/table.css'
import Head from 'next/head'
import { initializeIcons } from '@fluentui/react/lib-commonjs/Icons'

// for available icons see https://uifabricicons.azurewebsites.net/
initializeIcons()

export default function MyApp({ Component, pageProps }) {
  return (
    // <main className={'dark'}>
    <>
      <Head>
        <title>Neomem</title>
        <meta
          name="description"
          content="Connect to all your data sources in one app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Auth.UserContextProvider supabaseClient={supabase}>
        <Component {...pageProps} />
      </Auth.UserContextProvider>
    </>
  )
}
