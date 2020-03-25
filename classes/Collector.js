const path = require('path').resolve()
const { existsSync } = require('fs')

class Collector {
  get token () {
    return existsSync(path + '/settings.json')
      ? require(path + '/settings.json').token
      : process.env.TalkroomToken
  }
}

module.exports = Collector
