const assert = require('assert'),
    jsonHasDifferences = require('compare-json-difference'),
    packagejson = require('../package.json')

const packageMock = {
  "author": {
    "name": "jim manton"
  },
  "bundleDependencies": false,
  "dependencies": {
    "chai": "^4.2.0",
    "colors": "*",
    "log4js-tagline": "^2.1.5",
    "mocha": "^6.1.4"
},
  "scripts": {
    "start": "node app.js",
    "local_test": "node test.js",
    "test": "mocha"
  },
  "keywords": [
    "events",
    "broadcast",
    "node",
    "log4js",
    "log4js-tagline"
  ],
  "deprecated": false,
  "description": "broadcast events",
  "email": "jrman@risebroadband.net",
  "license": "ISC",
  "main": "app.js",
  "name": "events-broadcast",
  "start": "node app.js",
  "version": "1.0.8"
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
