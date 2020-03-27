const { MessageEmbed } = require('discord.js')

function fnc (client, msg) {
  const embed = new MessageEmbed({ color: 0x000000 })
  client.commands.forEach((cmd) => {
    embed.addField(client.prefix + cmd.alias[0], cmd.description, true)
  })

  msg.channel.send(embed)
}

module.exports = fnc
module.exports.alias = ['help', '도움']
module.exports.description = '그냥 도움말 보라고 있는거'
