// db sim
export const data = {
  nodes: [
    { _id: 1, name: 'forest', type: 8 },
    { _id: 2, name: 'clearing', type: 8 },
    { _id: 3, name: 'south of house', type: 8 },
    // meta db - store in separate silo - how? uuids? uids?
    // part of a domain, ie neomem timegraph db domain?
    { _id: 4, name: 'east', type: 'edge', reverse: 5, alias: ['e'] },
    { _id: 5, name: 'west', type: 'edge', reverse: 4, alias: ['w'] },
    { _id: 6, name: 'north', type: 'edge', reverse: 7, alias: ['n'] },
    { _id: 7, name: 'south', type: 'edge', reverse: 6, alias: ['s'] },
    { _id: 8, name: 'place', type: 'type' },
    { _id: 9, name: 'exit', type: 'type' },
  ],
  edges: [
    { _from: 1, _to: 2, direction: 4, type: 9 },
    { _from: 1, _to: 3, direction: 6, type: 9 },
  ],
}
