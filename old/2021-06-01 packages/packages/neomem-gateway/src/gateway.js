// run a webserver to respond to get/post etc requests

import Hapi from '@hapi/hapi' // web server https://hapi.dev/
// import { Query } from 'neomem-util'
// import { Data } from './index.js'
import { data } from './data.js'

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 4000

// ?
// process.on('unhandledRejection', err => {
//   console.log(err)
//   process.exit(1)
// })

async function init() {
  const server = Hapi.server({ host, port })

  server.route({
    // path: '/{path*}',
    path: '/',
    method: 'GET',
    handler: async (request, h) => {
      // const query = Query.makeFromRequest(request)
      // const json = await Data.get(query)

      //. just return data.js file for now
      const json = data
      return json
    },
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

init()
