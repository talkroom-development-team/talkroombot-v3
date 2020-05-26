const { MessageEmbed } = require('discord.js')

async function run (client, msg) {
  const d = await client.knex('users').select('id').where('id', msg.author.id)
  if (d.length > 0) return msg.reply('이미 가입되어 있습니다!')

  const embed = new MessageEmbed()
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
    .setTitle('수다방 MSP 시스템 가입')
    .setDescription('가입하시기 전, 반드시 <#482162440730312716>(규칙)을 읽고 동의해 주세요!\n' +
      '**들낙하실 경우, 서비스 이용이 제한될 수 있습니다.**\n\n' +
      '위 사항에 동의하며, 서비스에 가입하시려면 :white_check_mark:를 눌러주세요!'
    )

  const m = await msg.channel.send(embed)
  m.react('✅')

  m.awaitReactions((reaction, user) => reaction.emoji.toString() === '✅' && user.id === msg.author.id, { time: 15000, max: 1 }).then(async (r) => {
    if (r.size < 1) return msg.reply('가입이 취소되었습니다.')

    await client.knex('users').insert({
      id: msg.author.id,
      msp: 0,
      level: 0
    })

    console.log('[Registration] ' + msg.author.tag + ' (' + msg.author.id + ')')
    msg.reply('가입 완료!')
  })
}

module.exports = {
  run,
  aliases: ['register', '가입'],
  description: '가입 명령어'
}
