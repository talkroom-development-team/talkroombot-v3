class Querys {
  constructor (client, content) {
    this.client = client
    this.raw = content
    this.splits = this.raw.split(' ')
    this.cmd = this.splits[0].replace(client.prefix, '')
    this.args = this.splits.slice(1)
  }

  get target () {
    if (this.cmd.length < 1) this.cmd = 'intro'
    this.filter = (c) => c.alias.includes(this.cmd)
    return this.client.commands.find(this.filter)
  }
}

module.exports = Querys
