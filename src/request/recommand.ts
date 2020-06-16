import { uInstance } from './instance'
import Recommend from './types/Recommend'

const data = {
  req_0: {
    module: 'MvService.MvInfoProServer',
    method: 'GetNewMv',
    param: { style: 0, tag: 0, start: 0, size: 8 },
  },
  req_1: { module: 'music.musicHall.MusicHallPlatform', method: 'GetFocus', param: {} },
  req_2: {
    module: 'playlist.HotRecommendServer',
    method: 'get_new_hot_recommend',
    param: { cmd: 0, page: 0, daily_page: 0, size: 12 },
  },
  req_3: { module: 'newsong.NewSongServer', method: 'get_new_song_info', param: { type: 5 } },
  comm: { g_tk: 5381, uin: 0, format: 'json', ct: 6, cv: 0, platform: 'wk_v17' },
}

export const GET_RECOMMEND = (): Promise<Recommend> =>
  uInstance.post('cgi-bin/musics.fcg', data, {
    params: { _: Date.now(), sign: 'zzayp976bs1zyqz5dau302e43c3499a2e80149d2c3e8b07427c' },
  })
