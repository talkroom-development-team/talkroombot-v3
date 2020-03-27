const { Client } = require('discord.js')
const Collector = require('./Collector')
const Querys = require('./Querys')

class BotClient extends Client {
  constructor () {
    super()
    const collector = new Collector()
    this.prefix = collector.prefix
    this.commands = collector.commands
    this.login(collector.token)
    this.on('ready', this.onready)
    this.on('message', this.onmessage)
  }

  onready () {
    this.user.setActivity(':)')
  }

  onmessage (msg) {
    if (msg.author.bot) return
    if (!msg.content.startsWith(this.prefix)) return

    const query = new Querys(this, msg.content)
    if (!query.target) return

    query.target(this, msg)
  }
}

module.exports = BotClient
