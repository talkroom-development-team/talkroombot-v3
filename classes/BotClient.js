const { Client } = require('discord.js')
const Collector = require('./Collector')

class BotClient extends Client {
  constructor () {
    super()
    const collector = new Collector()
    this.login(collector.token)
    this.on('ready', this.onready)
  }

  onready () {
    this.user.setActivity(':)')
  }
}

module.exports = BotClient
