<!-- # Neomem -->

Neomem is a combination table and document editor, with free and paid hosting plans and a marketplace for plugins.

You can filter, sort, group, and edit data from different sources in the same way - files, bookmarks, email, database, etc.

It's open source and cross-platform. More information at https://github.com/bburns/Neomem.

Follow along on Twitter - https://twitter.com/bburnskm.

This page is generated using Pandoc on a Markdown file.

## Supabase vs Postgres with Foreign Data Wrappers

2022-02-09

I was trying out Supabase, which is Postgres in the cloud, but it's too slow to use for local editing. So, will try a local Postgres instance.

The trend seems to be towards open data formats like Markdown for note-taking apps, backed by a graph database of some sort. But... if I took that approach I'd have to compete with Obsidian and LogSeq. And I'd lose...

But I recently came across Postgres Foreign Data Wrappers, which let you connect all kinds of data sources to Postgres, where you can query them like any other table with SQL. Then I could connect various datasources and have a unified interface for them.

So, I'll be playing around with that for a bit.

## Architecture and transcript

2021-06-06

For the architecture, each datasource will have a driver that lets you interact with it as with a filesystem.

e.g. once you're 'inside' a markdown file, you could move about as in the filesystem, move things around, edit them, etc.

The console will be a Zork-like shell - sample transcript:

    Welcome to Neomem
    -----------------------------------------------------
    home
    type: folder
    notes: neomem skeleton
    contents: blog, filesys, forest, place2, postgres

    > go forest
    forest
    type: place
    notes: a shady forest of aspen trees
    contents: clearing, field
    exits: east, north

    > back
    > back
    > go blog
    blog
    type: folder
    contents: 2021-02-07.md, 2021-02-08.md, 2021-05-15.md, 2021-05-22.md, 2021-05-23.md, 2021-05-30.md, blog-meta.json, index.md
    exits: up

    > list
    blog
    2021-02-07.md
    2021-02-08.md
    2021-05-15.md
    2021-05-22.md
    2021-05-23.md
    2021-05-30.md
    blog-meta.json
    index.md

    > back
    > go filesys
    filesys
    type: folder
    contents: .firebase, .firebaserc, .git, .github, .gitignore, .prettierignore, .prettierrc, LICENSE, README.md, _old, design, firebase.json, node_modules, package-lock.json, package.json, packages, setups, shell, site, src, transcripts
    exits: up

    > go README.md
    README.md
    type: markdown
    notes: # Neomem

    An open-source information manager - with plugins
    contents: # Neomem, ## About, ## Current Status, ## Goals, ## Use Cases, ## Inspiration, ## Implementation, ## Architecture, ## Features, ## Packages, ## Installation, ## Running, ## Links, ## License

    > list
    README.md
    # Neomem
    ## About
    ## Current Status
    ## Goals
    ## Use Cases
    ## Inspiration
    ## Implementation
    ## Architecture
    ## Features
    ## Packages
    ## Installation
    ## Running
    ## Links
    ## License

## Postgres plans

2021-05-30

My plan at the moment is to use Postgres for the main datastore - it'll have nodes, edges, and history tables - the latter will be a TimescaleDB table, so it can archive and drop off data as needed.

Later, when need to integrate different datasources, could try Stardog to link them together.

## Stardog Knowledge Graph

2021-05-23

The gateway needs to be able to consolidate different datasources. I Googled around and wound up at Stardog Knowledge Graph - it's a free platform for building knowledge graphs on different datasources. Will investigate.

## PostgreSQL and AGE (A Graph Extension)

2021-05-22

I think I'll try PostgreSQL for the main backend - there is a graph extension for it, a time-series extension, a GIS extension, and you can store JSON/JSONB data in fields. So it seems to have the best of everything.

## ArangoDB

2021-05-15

I've been spending weekends lately working on Neomem, but every time I come back to it I think - this is too complex - and try again. Maybe eventually it'll settle on a good architecture.

Last week I found ArangoDB, which is faster and uses less memory than Neo4j, and I like the query language a bit better. So I'm going to try that for the main storage.

But for now, this is stored in a json file along with other test data.

## Types

2021-02-08

I'm trying to figure out how to handle types - Neomem needs to understand a set of basic types, and to translate between those and each datasource's types.

e.g. Chrome Bookmarks have a 'date_added' field, which is based on the year 1601. We'll need to translate that to the 'created' field, which is an ISO datestring like '2021-02-08', and vice-versa.

We could store a library of these datatypes, usable by different datasources. e.g. 'date1601', in case some other datasource needed it also.

Types need to be dynamic, as with neo4j - user will be able to define new types/labels as needed, and they can contain fields, or relations with other nodes.
