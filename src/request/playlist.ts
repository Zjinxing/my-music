import dayjs from 'dayjs'
import { Playlist, GetPlaylistByTab } from './types/Playlist'
import { lInstance, uInstance } from './instance'
import { MusicVkey } from './types/MusicVkey'
import { generateSign } from 'common/utils'
import { commonConfig } from './commonConfig'
import { ToplistDetail } from './types/Toplist'

const weekOfYear = require('dayjs/plugin/weekOfYear')

export const GET_LIST_DETAIL = (disstid: string): Promise<Playlist> =>
  lInstance.get('getSongListDetail', { params: { disstid } })

/**
 * 获取 vkey
 * @param songmid 歌曲mid
 */
export const GET_VKEY = (songmid: string): Promise<MusicVkey> =>
  lInstance.get('getMusicVkey', { params: { songmid } })

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
