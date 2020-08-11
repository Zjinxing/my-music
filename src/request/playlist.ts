import { Playlist } from './types/Playlist'
import { lInstance } from './instance'
import { MusicVkey } from './types/MusicVkey'

export const GET_LIST_DETAIL = (disstid: string): Promise<Playlist> =>
  lInstance.get('getSongListDetail', { params: { disstid } })

/**
 * 获取 vkey
 * @param songmid 歌曲mid
 */
export const GET_VKEY = (songmid: string): Promise<MusicVkey> =>
  lInstance.get('getMusicVkey', { params: { songmid } })
