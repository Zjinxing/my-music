import { cInstance } from './instance'
import { VoicesHome } from './types/Voices'

export const GET_VOICES = (): Promise<VoicesHome> => {
  const params = {
    page: 'index',
    format: 'json',
    tpl: 'wk',
    newsong: 1,
    _: Date.now(),
    g_tk_new_20200303: 5381,
    g_tk: 5381,
    uin: 0,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'wk_v17',
    needNewCode: 1,
  }
  return cInstance.get('v8/fcg-bin/fcg_v8_audio.fcg', { params })
}
