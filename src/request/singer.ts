import { uInstance } from './instance'
import { commonConfig } from './commonConfig'
import { generateSign } from 'common/utils'
import { HotSingerRes, SingerDetail } from './types/Singer'

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

export const GET_SINGERSONG = (singerid: string): Promise<SingerDetail> =>
  uInstance.get(
    `https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_detail_cp.fcg?newsong=1&tpl=wk&singerid=${singerid}&g_tk=5381&platform=mac&g_tk_new_20200303=5381&loginUin=0&hostUin=0&format=json&inCharset=GB2312&outCharset=utf-8&notice=0&platform=jqspaframe.json&needNewCode=0&ct=6&cv=10000`
  )
