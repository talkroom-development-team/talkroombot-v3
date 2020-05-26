/**
 * @param {import('../classes/Client')} client
 * @param {import('discord.js').Message} msg
 */
function run (_, msg) {
  msg.channel.send('pong')
}

module.exports.run = run
module.exports.aliases = ['ping']
module.exports.description = '핑핑, 시진핑'
