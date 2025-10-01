[![npm Package](https://img.shields.io/npm/v/events-broadcast.svg)](https://www.npmjs.org/package/events-broadcast)
[![License](https://img.shields.io/npm/l/events-broadcast.svg)](https://github.com/jman717/events-broadcast/blob/master/LICENSE)
[![CodeQL](https://github.com/jman717/events-broadcast/actions/workflows/actions.yml/badge.svg)](https://github.com/jman717/events-broadcast/actions/workflows/actions.yml)
[![Node.js CI](https://github.com/jman717/events-broadcast/actions/workflows/node.js.yml/badge.svg)](https://github.com/jman717/events-broadcast/actions/workflows/node.js.yml)

[![NPM](https://nodei.co/npm/events-broadcast.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/events-broadcast/)

events-broadcast leverages events to broadcast singly, in combination, or to all selected events.

Installation
---------
```
npm install events-broadcast
```

Mocha Test
---------
```
npm test
```

General Setup Tests. 
---------
```
npm run basic
npm run functions
```


Example events-broadcast output in my.log
---------
```
[2025-09-30T19:16:54.952] [debug] myLog - (msg: start of test) lne(<anonymous>(): tests/basic.js:47:8)
[2025-09-30T19:16:54.956] [info] myLog - (msg: {"name":"group-1","event":{"event":"refresh","id":1}}) lne(callback(): tests/basic.js:62:16)
[2025-09-30T19:16:54.956] [info] myLog - (msg: {"name":"group-1","event":{"event":"two","id":2}}) lne(callback(): tests/basic.js:62:16)
[2025-09-30T19:16:54.958] [info] myLog - (msg: {"name":"group-2","event":{"event":"one","id":1}}) lne(callback(): tests/basic.js:62:16)
[2025-09-30T19:16:54.959] [info] myLog - (msg: {"name":"group-2","event":{"event":"two","id":2}}) lne(callback(): tests/basic.js:62:16)
[2025-09-30T19:16:54.960] [info] myLog - (msg: {"name":"group-2","event":{"event":"refresh","id":3}}) lne(callback(): tests/basic.js:62:16)
[2025-09-30T19:16:54.962] [info] myLog - (msg: {"name":"group-3","event":{"event":"refresh","id":1}}) lne(callback(): tests/basic.js:62:16)
[2025-09-30T19:16:54.966] [info] myLog - (msg: success done) lne(success_callback(): tests/basic.js:58:16)
```
