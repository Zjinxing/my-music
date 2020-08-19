/**
 * 专辑相关
 */
import { lInstance } from './instance'
import { AlbumInfo } from './types/Album'

export const GET_ALBUMINFO = (mid: string): Promise<AlbumInfo> =>
  lInstance.get('getAlbumInfo', { params: { albummid: mid } })
