class Query {
  constructor ({ setting }, { content }) {
    this.content = content
    this.noPrefix = this.content.replace(setting.prefix, '')
    this.splited = this.noPrefix.split(' ')
    this.command = this.splited[0]
    this.args = this.splited.slice(1)
  }
}

module.exports = Query
