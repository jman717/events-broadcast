const assert = require('assert'),
    jsonHasDifferences = require('compare-json-difference'),
    packagejson = require('../package.json')

const packageMock = {
  "author": {
    "name": "jim manton"
  },
  "bundleDependencies": false,
  "dependencies": {
    "chai": "^4.3.4",
    "colors": "^1.4.0",
    "log4js-tagline": "^2.3.8",
    "mocha": "^8.3.2"
  },
  "scripts": {
    "start": "node app.js",
    "local_test": "node test.js",
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
  "start": "node app.js",
  "version": "1.0.23"
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
