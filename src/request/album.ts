import { generateSign } from 'common/utils'
/**
 * 专辑相关
 */
import { cInstance, uInstance } from './instance'
import { GetAlbumDetail, GetAlbumlist } from './types/Album'

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

export const GET_ALBUM_LIST = (): Promise<GetAlbumlist> =>
  cInstance.get('v8/fcg-bin/musicmall.fcg', {
    params: {
      _: Date.now(),
      g_tk_new_20200303: 359249670,
      g_tk: 359249670,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'pc',
      needNewCode: 1,
      cmd: 'pc_index_new',
    },
  })