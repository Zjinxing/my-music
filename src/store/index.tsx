import { useLocalStore } from 'mobx-react'
import React, { createContext, useContext } from 'react'
import { PlaylistSong } from 'request/types/Playlist'
import Recommend, { AlbumDetail } from 'request/types/Recommend'
import { HotSinger } from 'request/types/Singer'

export interface State {
  recommend: Recommend
  currentSonglistId: string // 当前歌单Id
  currentSongmid: string // 当前正在播放歌曲mid
  currentRadioId: string // 当前播放电台Id
  currentSongUrl: string // 当前播放歌曲地址
  currentSongName: string // 当前播放歌曲的名称
  currentPlaylistId: number // 当前播放列表 id
  currentSong: PlaylistSong | null // 当前播放歌曲
  playlist: PlaylistSong[] // 当前播放列表详情
  albumList: AlbumDetail[] // 首页新专辑
  albumArea: 1 | 2 | 3 | 4 | 5 | 6 // 当前专辑地区
  playMode: 'loop' | 'random' | 'singleLoop' // 播放模式
  isPlaying: boolean // 是否正在播放
  hotSinger: HotSinger[]
  effect: string
  [propName: string]: any
}

export const createStore = (): State => {
  const recommend = {} as Recommend
  return {
    recommend,
    currentSonglistId: '',
    currentSongmid: '',
    currentRadioId: '',
    currentSongUrl: '',
    currentSongName: '',
    currentPlaylistId: 0,
    currentSong: null,
    playlist: [],
    albumList: [],
    albumArea: 1,
    playMode: 'loop',
    isPlaying: false,
    hotSinger: [],
    effect: '',
  }
}

type StoreState = ReturnType<typeof createStore>

export const StoreContext = createContext<StoreState | null>(null)

export const StoreProvider: React.FC = ({ children }) => {
  const store = useLocalStore(createStore)
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const store = useContext(StoreContext)
  if (!store) throw new Error('You have forgot to use StoreProvider, shame on you.')
  return store
}
