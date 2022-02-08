# Neomem

A combination table and document editor.

See also https://github.com/bburns/neomem-console, which will be merged into here eventually.

---

## Backend (Docker containers)

### Setup

add a `stardog-license-key.bin` to `setups/test/volumes/stardog`

### Running

    ./start

---

## Frontend (React client)

### Installing

    npm install

### Setup

make `.env.local` with supabase url and key

This will be built into the React app, but still, keep it out of the repo.

### Running

Run the React app

    npm run start

view at http://localhost:3000

### Building

    npm run build

### Deploying

Deploy React app to Netlify

    npm run deploy
