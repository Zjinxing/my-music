import { uInstance } from './instance'
import { commonConfig } from './commonConfig'
import { generateSign } from 'common/utils'
import { HotSingerRes } from './types/Singer'

export const GET_SINGERS = (args?: {
  area: number
  sex: number
  genre: number
  index: number
  sin: number
  cur_page: number
}): Promise<HotSingerRes> => {
  const param = {
    area: -100,
    sex: -100,
    genre: -100,
    index: -100,
    sin: 0,
    cur_page: 1,
  }
  const data = {
    comm: { ct: 24, cv: 0 },
    singerList: {
      module: 'Music.SingerListServer',
      method: 'get_singer_list',
      param: { ...param, ...args },
    },
  }
  const sign = generateSign(data)
  const params = { ...commonConfig, sign, data }
  return uInstance.get('cgi-bin/musics.fcg', { params })
}
