// use this to experiment with datamodel - use for testing also.
// store nodes, edges, history.

// consider this the serialized form - the db would read them
// and instantiate the indexes, or store those separately.
// so... maybe for serialization could store name, created etc in props?
// does it matter? would just be more consistent.

export const data = {
  nodes: [
    {
      _id: 1,
      name: 'plecy',
      created: '2021-04-25T04:25:00',
      modified: null,
      props: {
        alias: 'plecostomus',
        notes: 'a catfish',
        type: 'fish',
        public: true,
      },
    },
    {
      _id: 2,
      name: 'fish',
      created: '2021-04-25T04:25:00',
      props: {
        type: 'folder',
      },
    },
    {
      _id: 3,
      name: 'zoey',
      created: '2021-04-25T04:25:00',
      props: {
        type: 'cat',
      },
    },
    {
      _id: 4,
      name: 'default view',
      created: '2021-04-25T04:25:00',
      props: {
        type: 'view',
        columns: [5],
      },
    },
    {
      _id: 5,
      name: 'name',
      created: '2021-04-25T04:25:00',
      props: {
        type: 'column',
      },
    },
    {
      _id: 6,
      name: 'type',
      created: '2021-04-25T04:25:00',
      props: {
        type: 'column',
      },
    },
    {
      _id: 7,
      name: 'description',
      created: '2021-04-25T04:25:00',
      props: {
        type: 'column',
      },
    },
    {
      _id: 8,
      name: 'name',
      created: '2021-04-25T04:25:00',
      props: {
        type: 'field',
        display: 'Name',
      },
    },
    {
      _id: 9,
      name: 'type',
      created: '2021-04-25T04:25:00',
      props: {
        type: 'field',
        display: 'Type',
      },
    },
    {
      _id: 10,
      name: 'description',
      created: '2021-04-25T04:25:00',
      props: {
        type: 'field',
        display: 'Description',
      },
    },
    {
      _id: 11,
      name: 'Neomem blog',
      created: '2021-04-25T10:25:00',
      props: {
        type: 'blog',
        notes: `
Neomem is a combination table and document editor, with free and paid hosting plans and a marketplace for plugins.

You can filter, sort, group, and edit data from different sources in the same way - files, bookmarks, email, database, etc.

It's open source and cross-platform. More information at https://github.com/bburns/Neomem.

Development is ongoing, with a launch planned for August 2021.

Follow along on Twitter - https://twitter.com/bburnskm.

Note: this site is generated in Neomem - will make it look nicer later...

----
`,
        public: true,
      },
    },
    {
      _id: 13,
      name: 'notes',
      created: '2021-04-25T14:25:00',
      props: {
        type: 'column',
      },
    },
    {
      _id: 14,
      name: 'forest',
      created: '2021-05-08T14:25:00',
      props: {
        type: 'place',
        notes: 'a dreary forest with faint light filtering from above',
      },
    },
    {
      _id: 15,
      name: 'field',
      created: '2021-05-08T14:25:00',
      props: {
        type: 'place',
        notes: 'a grassy field stretches out, covered in wildflowers',
      },
    },
    {
      _id: 16,
      name: 'trees',
      created: '2021-05-08T14:25:00',
      props: {},
    },
    {
      _id: 17,
      name: 'leaves',
      created: '2021-05-08T14:25:00',
      props: {},
    },
    {
      _id: 18,
      name: 'A new blog, using GitHub Pages / Jekyll',
      created: '2021-05-15T14:25:00',
      props: {
        type: 'post',
        public: true,
        notes: `
Here is my new blog, stored in / generated by Neomem and GitHub Pages with Jekyll. I'll try to make it look nicer later.

I'm hoping that writing a blog in Neomem will get me to make it functional faster. 

I've been spending weekends lately working on it, but every time I come back to it I think - this is too complex - and try again. Maybe eventually it'll settle on a good architecture. 

Last week I found ArangoDB, which is faster and uses less memory than Neo4j, and I like the query language a bit better. So I'm going to try that for the main storage.

But for now, this is stored in a json file along with other test data.`,
      },
    },
    {
      _id: 19,
      name: `ArangoDB`,
      created: '2021-05-16T23:14:00',
      props: {
        modified: null,
        type: 'post',
        // public: true,
        notes: `
I'm trying out ArangoDB in another project - it took a while to figure out how to initialize the database. But both of these projects will help with the design of the other.`,
      },
    },
    {
      _id: 20,
      name: `PostgreSQL and A Graph Extension (AGE)`,
      created: '2021-05-22T06:18:53',
      props: {
        modified: null,
        type: 'post',
        public: true,
        notes: `
I think I'll try PostgreSQL for the main backend - there is a graph extension for it, a time-series extension, a GIS extension, and you can store JSON/JSONB data in fields. So it seems to have the best of everything.`,
      },
    },
    {
      _id: 21,
      name: `A new blog, using Hugo`,
      created: '2021-02-07',
      props: {
        type: 'post',
        public: true,
        notes: `
I looked at a few static site generators -

- Eleventy (11ty) - JavaScript
- Gatsby - React/JavaScript/GraphQL
- Hugo - Go

I tried Eleventy but wasn't crazy about the architecture and documentation. Gatsby seemed interesting and well-designed, but was terribly slow. Hugo is fast, and seems well planned out and organized.
`,
      },
    },
    {
      _id: 22,
      name: `Types`,
      created: '2021-02-08',
      props: {
        type: 'post',
        public: true,
        notes: `
I'm trying to figure out how to handle types - Neomem needs to understand a set of basic types, and to translate between those and each datasource's types.

e.g. Chrome Bookmarks have a 'date_added' field, which is based on the year 1601. We'll need to translate that to the 'created' field, which is an ISO datestring like '2021-02-08', and vice-versa.

We could store a library of these datatypes, usable by different datasources. e.g. 'date1601', in case some other datasource needed it also.

Put this in neomem-util? neomem-types? neomem-data?

Types need to be dynamic, as with neo4j - user will be able to define new types/labels as needed, and they can contain fields, or relations with other nodes.
`,
      },
    },
    {
      _id: 23,
      name: `Back to Hugo, and Stardog Knowledge Graph`,
      created: '2021-05-23T19:21:53',
      props: {
        type: 'post',
        public: true,
        notes: `
I'm putting this blog back to Hugo to try to make it look nicer...
      
The gateway needs to be able to consolidate different datasources. I Googled around and wound up at Stardog Knowledge Graph - it's a free platform for building knowledge graphs on different datasources. Will investigate.`,
      },
    },
    {
      _id: 24,
      name: `Postgres plans and new new new blog`,
      created: '2021-05-30T06:11:00',
      props: {
        type: 'post',
        public: true,
        notes: `
My plan at the moment is to use Postgres for the main datastore - it'll have nodes, edges, and history tables - the latter will be a TimescaleDB table, so it can archive and drop off data as needed.

This structure should work with the other project as well, so they can feed off each other. Later, when need to integrate different datasources, could try Stardog to link them together.

I'm going to make a simpler blog - I'm not crazy about Hugo - it's a bit complex for what I need, and I spent too much time trying to adapt a template to what I needed. I just want a page with little blurbs and links to articles. So going back to a simple html generator.
`,
      },
    },
  ],

  edges: [
    {
      _from: 1,
      _to: 2,
      created: '2021-04-25T04:25:00',
      props: {
        type: 'contains',
      },
    },
    { _from: 5, _to: 8, props: { type: 'shows' } },
    { _from: 6, _to: 9, props: { type: 'shows' } },
    { _from: 7, _to: 10, props: { type: 'shows' } },
    { _from: 14, _to: 16, props: { type: 'contains' } },
    { _from: 14, _to: 17, props: { type: 'contains' } },
  ],

  history: [
    { _id: 1, time: '2021-05-29T23:19:00', props: { size: '3in' } },
    { _id: 1, time: '2021-05-31T00:14:00', props: { size: '4in' } },
  ],
}
