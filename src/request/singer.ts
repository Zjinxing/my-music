import { uInstance } from './instance'
import { commonConfig } from './commonConfig'
import { generateSign } from 'common/utils'
import { HotSingerRes, SingerDetail, SimilarSinger, GetSingerSong } from './types/Singer'
import { SingerAlbumList } from './types/Album'

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

export const GET_SINGER_DETAIL = (singerid: string): Promise<SingerDetail> =>
  uInstance.get(
    `https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_detail_cp.fcg?newsong=1&tpl=wk&singerid=${singerid}&g_tk=5381&platform=mac&g_tk_new_20200303=5381&loginUin=0&hostUin=0&format=json&inCharset=GB2312&outCharset=utf-8&notice=0&platform=jqspaframe.json&needNewCode=0&ct=6&cv=10000`
  )

/**
 * 歌手详情页获取推荐专辑, order字段最热参数没查出传啥
 * @param singermid 歌手mid
 * @param begin 开始
 * @param num 数量
 * @param type 分类，不传为全部，0录音室专辑，11 EP单曲，1 现场专辑
 */
export const GET_SINGER_ALBUM = (
  singermid: string,
  begin: number = 0,
  num: number = 7,
  type?: string
): Promise<SingerAlbumList> =>
  uInstance.get(
    `https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_album.fcg?platform=mac&singermid=${singermid}&order=time&begin=${begin}&num=${num}&g_tk_new_20200303=5381&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=GB2312&outCharset=utf-8&notice=0${
      type ? '&type=' + type : ''
    }`
  )

/**
 * 获取相似歌手
 * @param singermid 歌手mid
 */
export const GET_SIM_SINGERS = (singermid: string): Promise<SimilarSinger> =>
  uInstance.get(
    `https://c.y.qq.com/v8/fcg-bin/fcg_v8_simsinger.fcg?utf8=1&singer_mid=${singermid}&start=0&num=5&g_tk_new_20200303=5381&g_tk=5381&loginUin=0&hostUin=0&inCharset=GB2312&outCharset=utf-8&notice=0&platform=mac&needNewCode=0`
  )

/**
 * 获取歌手歌曲
 */
export const GET_SINGER_SONG = (
  singermid: string,
  begin: number = 0,
  num: number = 30
): Promise<GetSingerSong> =>
  uInstance.get(
    `https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk_new_20200303=5381&g_tk=5381&loginUin=0&hostUin=0&inCharset=GB2312&outCharset=utf-8&notice=0&platform=mac&needNewCode=0&singermid=${singermid}&order=listen&begin=${begin}&num=${num}&songstatus=1&newsong=1`
  )
