# Neo4j-5

Connect to all your data sources in one app.

Will have plugins for different views and data sources. Open source, web-based, work in progress.

[![Github Issues](https://img.shields.io/github/issues/bburns/Neomem.svg)](https://github.com/bburns/Neomem/issues)
[![License](https://img.shields.io/github/license/bburns/Neomem.svg)]()
[![Follow me on Twitter](https://img.shields.io/twitter/follow/bburnskm.svg?label=Twitter&style=flat&color=blue)](https://twitter.com/bburnskm)

<!-- <a href="https://gitter.im/bburns/Neomem"><img alt="Chat on Gitter" src="https://img.shields.io/gitter/room/bburns/prettier.svg"></a> -->
<!-- [![Formatted with Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) -->

- [Neomem](#neomem)
  - [About](#about)
  - [Goals](#goals)
  - [Use Cases](#use-cases)
  - [Inspiration](#inspiration)
  - [Features](#features)
  - [Setup](#setup)
  - [Running](#running)
  - [Deploy](#deploy)
  - [Links](#links)
  - [License](#license)

## About

Spreadsheets are good for tabular information, while documents are good for free-form notes and outlines. Neomem makes it easy to switch between the two, allowing different views of the same information.

For example, tasks can have short properties like name, timeframe, order, estimate, which fit well in a table - while also having longer properties like notes. Switching between table and document views allows you to focus on one or the other as needed.

Data can be filtered, grouped, and sorted as required.

Other views are possible for the same underlying information - chart, map, calendar, kanban, graph. Multiple views could be visible at the same time. A console view could allow exploration and manipulation of items in a text console.

All views will be developed as plugins. The backend can connect to multiple data sources, which will also be supported with plugins. Different overlapping domains can be modelled. A plugin ecosystem will allow sharing and development.

<!-- ## Current Status

See the list of issues in the current milestone [here](https://github.com/bburns/Neomem/milestone/1). -->

## Goals

- clutter-free ui that gets out of the way, leaves room for editing
- different views of same information - document, table, outline, map, calendar, kanban, chart, graph, timeline, console
- handle different data sources - neo4j graph database, xml, filesystem, email, github, calendar
- handle different overlapping domains with simple and extensible datamodels - task management, collection management
- different ui's could be implemented - a pure console ui, a web ui, an electron (desktop) ui, etc
- open source with paid hosting plans
- online plugin ecosystem/marketplace for views, sources, domains, and ui's - free/paid

## Use Cases

Some use cases to test the app and database structure -

- task manager - projects, tasks, goals, timeframe, estimate, actual, recurring tasks - switch between table, document, kanban, calendar, timeline views
- comparison shopping - make quick tables for comparison between items, with free-form notes
- artwork database - location (continent/country/state/city/museum), artist, date, name, rating, source, size, images - switch between table, map views
- biographical timelines - subject, event, date, age, location - switch between table, document, map views

## Inspiration

- [Lotus Symphony (1990)](<https://en.wikipedia.org/wiki/Lotus_Symphony_(MS-DOS)>) - spreadsheet, chart, form, and document views of same information
- Apple II, Zork, Linux cli, IPython - for console interface
- Airtable - advanced table editor
- [The Inform Designer's Manual](https://www.amazon.com/Inform-Designers-Manual-Graham-Nelson/dp/0971311900) by Graham Nelson - the language and parser of Zork

## Features

- select text in notes, promote to item(s) with alt-m command
- move text and items easily to other items with alt-m command
- create new items quickly with alt-n command, put in an inbox
- go to item quickly with alt-g command, start typing to filter list
- clipboard monitor - paste contents when it changes

## Setup

Note: Neomem is under heavy development.

Install nodejs, then clone this repo and install the dependencies

    git clone https://github.com/bburns/Neomem
    cd Neomem
    npm install

## Running

    npm run dev

Open http://localhost:3000 with your browser to see the result.

## Deploy

Neomem uses Vercel for hosting - push changes to 'main' branch to deploy. Starting from 'develop' branch -

    git push
    git checkout main
    git merge develop
    git push
    git checkout develop
    git merge main

(better way?)


## License

Apache 2.0
