'use strict'

/* eslint-disable no-new */
/**
 *
 * @name TalkroomBot-v3
 * @description 수다방에 사용되는 수다방 공식 봇
 *
 * @license MIT
 * @author Initial T / comjun04(comjun04) / minseo0388(Naesung) / PMH(pmh-only) / Ruby(devruby) / Veloster(velo64)
 *
 */

const Client = require('./classes/Client')
const client = new Client()

const onReady = require('./events/onReady')
const onMessage = require('./events/onMessage')

client.registEvent('ready', onReady)
client.registEvent('message', onMessage)
