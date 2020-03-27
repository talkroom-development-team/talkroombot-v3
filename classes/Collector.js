const path = require('path').resolve()
const { existsSync, readdirSync } = require('fs')

class Collector {
  constructor () {
    this.path = { main: path, commands: path + '/commands/' }
    this.settings = existsSync(path + '/settings.json') ? require(path + '/settings.json') : null
  }

  get token () {
    return this.settings
      ? this.settings.token
      : process.env.TalkroomToken
  }

  get prefix () {
    return this.settings
      ? this.settings.prefix || 'tr>'
      : process.env.TalkroomPrefix || 'tr>'
  }

  get commands () {
    const origins = readdirSync(path + '/commands/')
    const requires = []

    origins.forEach((v) => {
      requires.push(require(this.path.commands + v))
    })

    return requires
  }
}

module.exports = Collector
