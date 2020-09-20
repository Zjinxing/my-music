import dayjs from 'dayjs'
import { GetPlaylistByTab, GetPlaylistDetail } from './types/Playlist'
import { uInstance } from './instance'
import { MusicVkey } from './types/MusicVkey'
import { generateSign } from 'common/utils'
import { commonConfig } from './commonConfig'
import { ToplistDetail } from './types/Toplist'

const weekOfYear = require('dayjs/plugin/weekOfYear')

export const GET_LIST_DETAIL = async (disstid: string): Promise<GetPlaylistDetail> => {
  const data = {
    req_0: {
      module: 'srf_diss_info.DissInfoServer',
      method: 'CgiGetDiss',
      param: { disstid: Number(disstid), userinfo: 1, tag: 1 },
    },
    comm: { g_tk: 359249670, uin: 0, format: 'json', ct: 6, cv: 1770, platform: 'wk_v17' },
  }
  const sign = generateSign(data)
  const _ = Date.now()
  return uInstance.post('cgi-bin/musics.fcg', data, { params: { _, sign } })
}

/**
 * 获取 vkey
 * @param songmid 歌曲mid
 */
export const GET_VKEY = async (songmid: string): Promise<MusicVkey> => {
  const data = {
    req: {
      module: 'CDN.SrfCdnDispatchServer',
      method: 'GetCdnDispatch',
      param: { guid: '1730490035', calltype: 0, userip: '' },
    },
    req_0: {
      module: 'vkey.GetVkeyServer',
      method: 'CgiGetVkey',
      param: {
        guid: '1730490035',
        songmid: [songmid],
        songtype: [0],
        uin: '',
        loginflag: 1,
        platform: '20',
      },
    },
    comm: { format: 'json', ct: 24, cv: 0 },
  }
  const sign = generateSign(data)
  const _ = Date.now()
  const result: MusicVkey = await uInstance.get('cgi-bin/musics.fcg', {
    params: { _, sign, format: 'json', ...commonConfig, data },
  })
  result.playLists = result.req_0.data.sip.map(url => url + result.req_0.data.midurlinfo[0].purl)
  return result
}

/**
 * 获取排行榜详情
 */
export const GET_RANK_DETAIL = (topId: number, num: number = 100): Promise<ToplistDetail> => {
  dayjs.extend(weekOfYear)
  // 飙升榜：topId = 26，每周四更新，
  const week = new Date().getDay() >= 4 ? (dayjs() as any).week() : (dayjs() as any).week() - 1
  const period =
    topId === 62
      ? dayjs().subtract(1, 'd').format('YYYY-MM-DD')
      : `${new Date().getFullYear()}_${week}`
  const data = {
    detail: {
      module: 'musicToplist.ToplistInfoServer',
      method: 'GetDetail',
      param: { topId, offset: 0, num, period },
    },
    comm: { ct: 24, cv: 0 },
  }
  const sign = generateSign(data)
  return uInstance.get('cgi-bin/musics.fcg', { params: { ...commonConfig, '-': '', sign, data } })
}

/**
 * 获取分类歌单
 * @param {Number} order 排序 5最新，2最热，
 * @param {Number} id 歌单id
 * @param {Number} sin 开始位置
 * @param {Number} size 获取条数
 */
export const GET_PLAYLIST_BY_TAG = (
  order = 5,
  id = 10000000,
  sin = 0,
  size = 60
): Promise<GetPlaylistByTab> => {
  const data = {
    req_0: {
      method: 'get_playlist_by_tag',
      param: { id, sin, size, order, is_parent: 0 },
      module: 'playlist.PlayListPlazaServer',
    },
    req_1: { method: 'get_category_grid', module: 'playlist.PlayListNavigateServer', param: {} },
    comm: { g_tk: 5381, uin: 0, format: 'json', ct: 6, cv: 1770, platform: 'wk_v17' },
  }
  const sign = generateSign(data)
  return uInstance.post('cgi-bin/musics.fcg', data, { params: { _: Date.now(), sign } })
}
