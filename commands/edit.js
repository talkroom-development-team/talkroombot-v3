async function run(client, msg) {
  if(!client.setting.owner.includes(msg.author.id) && !msg.member.permissions.has('ADMINISTRATOR')) return

  const args = msg.content.split(' ').slice(1)
  // tr>edit (userid) (type) (value)

  if(args.length !== 3) return msg.reply('사용법: `' + client.setting.prefix + 'edit (유저 아이디) (데이터 종류) (변경할 값)`')

  const [id, type, value] = args
  const types = ['msp', 'level']
  if(!types.includes(type)) return msg.reply('사용할 수 있는 데이터 종류: ' + types.join(', '))

  const userchk = await client.knex('users').select('id').where('id', id)
  if(userchk.length < 1) return msg.reply('가입하지 않은 유저입니다.')

  const d = {}
  Object.defineProperty(d, type, { value, enumerable: true })

  await client.knex('users').update(d).where('id', id)
  return msg.reply('완료')
}

module.exports = {
  run,
  aliases: ['edit', '수정'],
  description: '(관리자전용) 데이터 수동 수정 명령어'
}
