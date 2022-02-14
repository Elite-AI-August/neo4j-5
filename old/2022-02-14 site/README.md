convert markdown posts to html

wip

currently just uses pandoc to generate html -

will try https://marked.js.org/

    "site-build": "pandoc -s site/content/index.md -f gfm --metadata title=\"Neomem\" -o site/build/index.html",
    "site-show": "open site/build/index.html",
    "site-deploy": "firebase deploy"
