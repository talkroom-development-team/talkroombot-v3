function fnc (client, msg) {
  msg.channel.send('Pinging...')
    .then(sendThen)

  function sendThen (m) {
    const wsPing = 'ws: ' + Math.round(client.ws.ping) + 'ms'
    const msgPing = 'msg: ' + Math.round(m.createdTimestamp - msg.createdTimestamp) + 'ms'
    m.edit(wsPing + '\n' + msgPing)
  }
}

module.exports = fnc
module.exports.alias = ['ping', '핑']
