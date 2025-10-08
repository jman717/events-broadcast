const assert = require('assert'),
    jsonHasDifferences = require('compare-json-difference'),
    packagejson = require('../package.json')

const packageMock = {
  "author": {
    "name": "jim manton"
  },
  "version": "3.0.103",
  "bundleDependencies": [],
  "dependencies": {
    "chai": "^5.0.0",
    "colors": "^1.4.0",
    "log4js-tagline": "^5.3.27",
    "compare-json-difference": "^0.1.3",
    "mocha": "^10.2.0"
  },
  "scripts": {
    "start": "node app.js",
    "basic": "node ./tests/basic",
    "functions": "node ./tests/run_function",
    "test": "mocha"
  },
  "keywords": [
    "logging",
    "log",
    "log4js-tagline",
    "appenders",
    "events",
    "broadcast",
    "node"
  ],
  "homepage": "https://github.com/jman717/events-broadcast",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/jman717/events-broadcast.git"
  },
  "deprecated": false,
  "description": "broadcast events",
  "email": "jrman@risebroadband.net",
  "license": "ISC",
  "main": "app.js",
  "name": "events-broadcast",
  "start": "node app.js"
}

describe('package.json', function () {
    it('should pass', function () {
        assert(!jsonHasDifferences(packagejson, packageMock, true))
    })

    it('should fail', function () {
        packageMock.version = '0'
        assert(jsonHasDifferences(packagejson, packageMock, true))
    })
})
