const { resolve: path } = require('path')
const { existsSync: exist, readdirSync: readdir } = require('fs')
const { Client: DiscordClient } = require('discord.js')

class Client extends DiscordClient {
  constructor () {
    super()

    // Check Settings
    this.setting = { location: path() + '/settings.json' }
    this.setting.exist = exist(this.setting.location)

    if (this.setting.exist) this.setting.raw = require(this.setting.location)

    this.setting.prefix =
      this.setting.exist
        ? this.setting.raw.prefix || 'tr>'
        : process.env.trPrefix || 'tr>'

    this.setting.token =
      this.setting.exist
        ? this.setting.raw.token
        : process.env.trPrefix ||
          (() => { throw new Error('no token provied') })()

    this.login(this.setting.token)

    // Check Commands
    if (!exist(path() + '/commands')) return
    this._commands = readdir(path() + '/commands')
    this.commands = []

    this._commands.forEach((c) => {
      if (!c.endsWith('.js')) return
      c = c.replace('.js', '')
      c = require(path() + '/commands/' + c)
      this.commands.push(c)
    })

    // Check Extensions
    if (!exist(path() + '/extensions')) return
    this._extensions = readdir(path() + '/extensions')
    this.extensions = {}

    this._extensions.forEach((e) => {
      if (!exist(path() + '/extensions/' + e + '/index.js')) return
      this.extensions[e] = require(path() + '/extensions/' + e + '/index')
    })

    // Database Setup
    this.knex = require('knex')({
      client: 'mysql',
      connection: this.setting.raw.db
    })
  }

  // Overriding 'on' method causes collector error
  registEvent (event, method) {
    this.on(event, (...args) => method(this, ...args, this.extensions || {}))
  }
}

module.exports = Client
