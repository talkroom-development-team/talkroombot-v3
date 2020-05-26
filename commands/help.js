const { MessageEmbed } = require('discord.js')

/**
 * @param {import('../classes/Client')} client
 * @param {import('discord.js').Message} msg
 */
function run (client, msg) {
  const embed = new MessageEmbed()
  client.commands.forEach((c) => {
    embed.addField(client.setting.prefix + c.aliases[0], c.description)
  })

  msg.channel.send(embed)
}

module.exports.run = run
module.exports.aliases = ['도움', 'help', '도움말', '명령어', 'commands', 'command']
module.exports.description = '지금 보고 있는것'
