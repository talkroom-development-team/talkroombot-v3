const { MessageEmbed } = require('discord.js')

async function run(client, msg) {
  const arg = msg.content.split(' ').slice(1)
  let id, u
  if(arg.length < 1) {
    id = msg.author.id
    u = msg.member
  } else if(msg.mentions.members.size > 0){
    u = msg.mentions.members.first()
    id = u.id
  } else {
    id = arg[0]
    u = msg.guild.members.resolve(id)
  }

  if(!u) return msg.reply('확인할 수 없는 유저입니다.')

  const q = await client.knex('users').select().where('id', id)
  const registered = q.length > 0

  const embed = new MessageEmbed()
    .setTitle(u.user.tag + '의 유저 정보')
    .setThumbnail(u.user.displayAvatarURL({ width: 1024 }))
    .addField('MSP 시스템 가입 여부', registered ? '가입함' : '가입하지 않음')

  if(registered) {
    embed.addField('MSP', q[0].msp + ' MSP')
      .addField('레벨', q[0].level + ' 레벨')
  }

  msg.channel.send(embed)
}

module.exports = {
  run,
  aliases: ['userinfo', '유저정보'],
  description: '유저 정보를 보여주는거'
}
