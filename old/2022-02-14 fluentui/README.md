# Neomem

A combination table and document editor.

See also neomem-console in this repo, which will be merged into src eventually.

---

<!-- ## Backend (Docker containers)

### Setup

add a `stardog-license-key.bin` to `setups/test/volumes/stardog`

### Running

    ./start [service names]

eg

    ./start postgres

--- -->

## Frontend (React client)

### Installing

    npm install

### Setup

make `.env.local` with supabase url and key, for now.

This will be built into the React app, but keep it out of the repo anyway for now.

### Running

Run the React app

    npm run start

view at http://localhost:3000

### Building

    npm run build

### Deploying

Deploy React app to Netlify

    npm run deploy

view at https://neomem.netlify.app
