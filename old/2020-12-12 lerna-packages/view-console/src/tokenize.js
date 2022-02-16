// tokenize a string
// input: a string, eg "look at plecy"
// output: a list of token objects

const rules = {
  string: /".*?"[ ]*/, // *? = greedy match
  word: /[^" ]+[ ]*/,
}

export default function tokenize(s) {
  const tokens = []
  let str = s
  while (str.length > 0) {
    let found = false
    for (const rule of Object.keys(rules)) {
      const regex = rules[rule]
      const match = str.match(regex)
      if (match) {
        const text = match[0].trim()
        const token = { rule, text }
        tokens.push(token)
        str = str.slice(match[0].length)
        found = true
      }
    }
    if (!found) {
      const token = ['error', str]
      tokens.push(token)
      str = ''
    }
  }
  return tokens
}
