// site/blog generator

// wip

import fs from 'fs' // node lib for filesystem
import path from 'path' // node lib for path ops
import { marked } from 'marked'

const sourceFolder = './site/pages/'
const templatePath = `./site/templates/index.html`

const warning = `<!-- warning: generated file - do not edit -->`

const filenames = fs.readdirSync(sourceFolder)

// get list of sources = ["# this is markdown...", ...]
const sources = filenames.map(filename =>
  fs.readFileSync(sourceFolder + filename).toString()
)
console.log(sources)

// get list of pages = [{ header, text }, ...]
const pages = sources.map(source => {
  if (source.startsWith('---')) {
    const n = source.indexOf('---', 3)
    const header = source.slice(4, n)
    const text = source.slice(n + 4)
    return { header, text }
  }
  return { header: '', text: source }
})
console.log(pages)

const about = pages.find(page => page.header.includes('About'))

//. make page.html template
function getHtml(post) {
  return `<div class='post'>
<div class='name'>${post.name}</div>
<div class='created'>${post.created.slice(0, 10)}</div>
<div class='notes'>${marked(post.props.notes)}</div>
</div>
<hr/>`
}

//. get nodes via edges from the main blog node
// const posts = pages
//   .filter(node => node.props.type === 'post' && node.props.public)
//   .sort((a, b) => -a.created.localeCompare(b.created))

//. make body.html template
const body = `
<body>
<div class='page'>
<div class='title'>Neomem.io</div>
<div class='subtitle'>An open-source information manager</div>
<div class='about'>
${marked(about.text)}
</div>
<div class='blog'>
${pages.map(getHtml).join('\n')}
</div>
</div>
</body>
`.trim()

const template = String(fs.readFileSync(templatePath))
const output = template
  .replace('{{body}}', body)
  .replace('{{warning}}', warning)

console.log(output)
