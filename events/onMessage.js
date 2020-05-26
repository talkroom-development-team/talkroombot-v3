const Query = require('../classes/Query')

/**
 * @param {import('../classes/Client')} client
 * @param {import('discord.js').Message} msg
 */
function onMessage (client, msg, extensions) {
  const query = new Query(client, msg)
  const find = client.commands.find((c) => c.aliases.includes(query.command))
  if (find) find.run(client, msg, extensions || {})
}

module.exports = onMessage
