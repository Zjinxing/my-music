import { Playlist } from './types/Playlist'
import { lInstance } from './instance'

export const GET_LIST_DETAIL = (disstid: string): Promise<Playlist> => lInstance.get('getSongListDetail', { params: { disstid } })
