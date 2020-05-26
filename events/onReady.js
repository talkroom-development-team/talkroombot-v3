/**
 * @param {import('../classes/Client')} client
 */
function onReady (client) {
  console.log(client.user.username + ' is now online!')
  client.user.setActivity(client.setting.prefix + 'help')
}

module.exports = onReady
