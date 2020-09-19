import { generateSign } from 'common/utils'
/**
 * 专辑相关
 */
import { uInstance } from './instance'
import { GetAlbumDetail } from './types/Album'

export const GET_ALBUM_DETAIL = (albumMid: string): Promise<GetAlbumDetail> => {
  const data = {
    req_0: {
      module: 'music.musichallAlbum.OtherAlbumList',
      method: 'OtherAlbumList',
      param: { albumMid, order: 0, num: 6 },
    },
    req_1: {
      module: 'music.musichallAlbum.AlbumInfoServer',
      method: 'GetAlbumDetail',
      param: { albumMid },
    },
    req_2: {
      module: 'music.musichallAlbum.AlbumSongList',
      method: 'GetAlbumSongList',
      param: { albumMid, begin: 0, num: 60, order: 2 },
    },
    req_3: {
      module: 'music.musicasset.AlbumFavRead',
      method: 'IsAlbumFan',
      param: { v_albumMid: [albumMid] },
    },
    req_4: {
      method: 'QueryAlbumDetail',
      param: { albummid: albumMid },
      module: 'mall.MusicMallSvr',
    },
    comm: { g_tk: 5381, uin: 0, format: 'json', ct: 6, cv: 1770, platform: 'wk_v17' },
  }
  const sign = generateSign(data)
  const _ = Date.now()
  return uInstance.post('cgi-bin/musics.fcg', data, { params: { sign, _ } })
}
