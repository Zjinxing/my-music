/**
 * 底部播放控制逻辑
 */

import React, { useState, useRef, SyntheticEvent, useEffect } from 'react'
import { observer } from 'mobx-react'
import Progress, { TargetInfo, MousePos } from 'components/Common/Progress'
import { useStore } from 'store'
import { PlayMode } from 'common/Enum'
import './index.scss'
import { formatSeconds } from 'common/utils'
import { GET_VKEY } from 'request/playlist'
import { PlaylistSong } from 'request/types/Playlist'
import VolumeControl from './VolumeControl'
import { AlbumSongDetail } from 'request/types/Album'

const PlayControl: React.FC = observer(() => {
  const store = useStore()
  const [currentTime, setCurrentTime] = useState(0) // 当前歌曲播放时间
  const [duration, setDuration] = useState(0) // 当前歌曲总时长
  const [percent, setPercent] = useState(0) // 播放进度
  const [isDragging, setIsDragging] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (store.isPlaying) {
      audioRef.current?.play()
    } else {
      audioRef.current?.pause()
    }
  }, [store.isPlaying])

  const loadedMetaData = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    const target = e.target as HTMLAudioElement
    console.log('准备好播放', target.duration)
    const duration = target.duration
    target.play()
    store.isPlaying = true
    setDuration(duration)
  }

  const onProgressChange = (targetInfo: TargetInfo, pos: MousePos) => {
    setIsDragging(true)
    const { left, width } = targetInfo
    const { pageX } = pos
    const compute = ((pageX - left) / width) * 100
    const percent = compute >= 100 ? 100 : compute <= 0 ? 0 : compute
    setPercent(percent)
  }

  const progressChangeEnd = (targetInfo: TargetInfo, pos: MousePos) => {
    const { left, width } = targetInfo
    const { pageX } = pos
    if (left && width) {
      const compute = ((pageX - left) / width) * 100
      const percent = compute >= 100 ? 100 : compute <= 0 ? 0 : compute
      const currentTime = (duration * percent) / 100
      console.log('----------拖动结束---------\n', currentTime, duration, percent)
      audioRef.current!.currentTime = currentTime
      setIsDragging(false)
    }
  }

  const getPlaylist = () => {
    let playlist
    switch (store.playType) {
      case 'playlist':
        playlist = store.playlist
        break
      case 'album':
        playlist = store.playlistAlbum
        break
      case 'rank':
      case 'singer':
        playlist = store.playlistRank
        break
      default:
        playlist = store.playlist
        break
    }
    return playlist
  }

  // 播放暂停
  const togglePlay = () => {
    store.isPlaying = !store.isPlaying
  }

  // 播放更新进度条
  const onProgress = (e: SyntheticEvent<HTMLAudioElement>) => {
    const target = e.target as HTMLAudioElement
    const current = target.currentTime
    const percent = duration && (current / duration) * 100
    percent && !isDragging && setPercent(percent)
    setCurrentTime(current)
  }

  // 播放下一首
  const playNext = async () => {
    if (!store.playlist.length && !store.playlistAlbum.length && !store.playlistRank.length) return
    store.isPlaying = false
    let playlist = getPlaylist()
    console.log({ playlist })

    if (store.playMode === PlayMode.SINGLE_LOOP || store.playMode === PlayMode.LOOP) {
      const currentIndex = playlist.findIndex(
        (item: any) => (item.mid || item.songmid) === store.currentSongmid
      )
      let nextSong: any
      if (currentIndex === playlist.length - 1) {
        nextSong = playlist[0]
      } else {
        nextSong = playlist[currentIndex + 1]
      }
      const vkeyDetail = await GET_VKEY(nextSong.mid || nextSong.songmid)
      const songUrl = vkeyDetail.response.playLists[0]
      store.currentSongUrl = songUrl
      store.currentSong = nextSong
      store.currentSongmid = nextSong.mid || nextSong.songmid
      store.currentSongName = nextSong.name || nextSong.songname
    } else {
      playRandom()
    }
  }

  // 播放上一首
  const playPre = async () => {
    if (!store.playlist.length && !store.playlistAlbum.length && !store.playlistRank.length) return
    store.isPlaying = false
    let playlist = getPlaylist()
    if (store.playMode === PlayMode.SINGLE_LOOP || store.playMode === PlayMode.LOOP) {
      const currentIndex = playlist.findIndex(
        (item: any) => (item.mid || item.songmid) === store.currentSongmid
      )
      let preSong
      if (currentIndex === 0) {
        preSong = playlist[playlist.length - 1]
      } else {
        preSong = playlist[currentIndex - 1]
      }
      let mid, songName
      if (store.playType === 'album') {
        mid = (preSong as AlbumSongDetail).songmid
        songName = (preSong as AlbumSongDetail).songname
      } else {
        mid = (preSong as PlaylistSong).mid
        songName = (preSong as PlaylistSong).name
      }
      const vkeyDetail = await GET_VKEY(mid)
      const songUrl = vkeyDetail.response.playLists[0]
      store.currentSongUrl = songUrl
      store.currentSong = preSong
      store.currentSongmid = mid
      store.currentSongName = songName
    } else {
      playRandom()
    }
  }

  // 随机播放
  const playRandom = async () => {
    if (!store.playlist.length && !store.playlistAlbum.length && !store.playlistRank.length) return
    let playlist = getPlaylist()

    const randomIndex = ~~(Math.random() * playlist.length)
    const nextSong = playlist[randomIndex] as any
    const vkeyDetail = await GET_VKEY(nextSong.mid || nextSong.songmid)
    const songUrl = vkeyDetail.response.playLists[0]
    store.currentSongUrl = songUrl
    store.currentSong = nextSong
    store.currentSongmid = nextSong.mid || nextSong.songmid
    store.currentSongName = nextSong.name || nextSong.songname
  }

  // 切换播放模式
  const togglePlayMode = () => {
    switch (store.playMode) {
      case PlayMode.LOOP:
        store.playMode = PlayMode.SINGLE_LOOP
        break
      case PlayMode.SINGLE_LOOP:
        store.playMode = PlayMode.RANDOM
        break
      case PlayMode.RANDOM:
        store.playMode = PlayMode.LOOP
        break
      default:
        break
    }
  }

  // 播放结束处理
  const onEnded = (e: SyntheticEvent<HTMLAudioElement>) => {
    const target = e.target as HTMLAudioElement
    switch (store.playMode) {
      case PlayMode.SINGLE_LOOP:
        target.play()
        break
      case PlayMode.LOOP:
        playNext()
        break
      case PlayMode.RANDOM:
        playRandom()
        break
      default:
        break
    }
  }

  const changeVolume = (percent: number) => {
    audioRef.current && (audioRef.current.volume = percent / 100)
  }

  return (
    <div className="play-control">
      <Progress
        width={percent}
        onProgressChange={onProgressChange}
        onProgressChangeEnd={progressChangeEnd}
      ></Progress>
      <div className="control-content">
        {/* 左侧歌曲封面及歌曲名歌手名 */}
        <div className="control-content--left">
          {(() => {
            let currentSong, singers, albummid
            const tempArr = ['playlist', 'rank', 'singer']
            if (tempArr.includes(store.playType)) {
              currentSong = store.currentSong as PlaylistSong
              singers = currentSong?.singer
              albummid = currentSong?.album.mid
            } else if (store.playType === 'album') {
              currentSong = store.currentSong as AlbumSongDetail
              singers = currentSong?.singer
              albummid = currentSong?.albummid
            }
            return (
              <>
                <img
                  src={`https://y.gtimg.cn/music/photo_new/T002R800x800M000${albummid}.jpg?max_age=2592000`}
                  width="40"
                  height="40"
                  alt=""
                  className="cover-bg"
                />
                <span className="current-name">
                  {store.currentSongName}
                  <span className="current-name--singer">
                    &nbsp;-{' '}
                    {singers && singers.reduce((acc, cur) => acc + ' / ' + cur.name, '').slice(2)}
                  </span>
                </span>
              </>
            )
          })()}
          <span className="control-content--left__operator">
            <img src={require('common/Enum').imgList.bvNotLike} className="operator-icon" alt="" />
            <img
              src={require('common/Enum').imgList.notDownload}
              className="operator-icon"
              alt=""
            />
            <img src={require('common/Enum').imgList.rvMore} className="operator-icon" alt="" />
          </span>
        </div>
        {/* 中间播放暂停上一首下一首及播放模式切换 */}
        <div className="control-content--center">
          <span className="control-icon" onClick={togglePlayMode}>
            {store.playMode === PlayMode.LOOP ? (
              <img src={require('common/Enum').imgList.playModeOrder} alt="" />
            ) : store.playMode === PlayMode.RANDOM ? (
              <img src={require('common/Enum').imgList.playModeRandom} alt="" />
            ) : (
              <img src={require('common/Enum').imgList.playModeSingle} alt="" />
            )}
          </span>
          <span className="control-icon" onClick={playPre}>
            <img src={require('common/Enum').imgList.preSong} alt="" />
          </span>
          <span className="control-icon" onClick={togglePlay}>
            {store.isPlaying ? (
              <img src={require('common/Enum').imgList.pauseSong} alt="" />
            ) : (
              <img src={require('common/Enum').imgList.playSong} alt="" />
            )}
          </span>
          <span className="control-icon" onClick={playNext}>
            <img src={require('common/Enum').imgList.nextSong} alt="" />
          </span>
          {/* <span className="control-icon"> */}
          <VolumeControl onVolumeChange={changeVolume}></VolumeControl>
          {/* </span> */}
        </div>
        {/* 右侧时间显示及列表控制 */}
        <div className="control-content--right">
          <div className="right-wrapper">
            <span className="control-icon">
              <img src={require('common/Enum').imgList.qualityNormal} alt="" width="41" />
            </span>
            <span className="control-icon">
              {store.effect ? (
                <img src={require('common/Enum').imgList.effectOn} alt="" width="41" />
              ) : (
                <img src={require('common/Enum').imgList.effectOff} alt="" width="41" />
              )}
            </span>
          </div>
          <span className="play-time">
            {formatSeconds(currentTime)} / {formatSeconds(duration)}
          </span>
          <span className="control-icon">
            <img src={require('common/Enum').imgList.lyric} alt="" />
          </span>
          <span className="control-icon">
            <img src={require('common/Enum').imgList.playlist} alt="" />
          </span>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={store.currentSongUrl}
        onLoadedMetadata={loadedMetaData}
        onTimeUpdate={onProgress}
        onEnded={onEnded}
      ></audio>
    </div>
  )
})

export default PlayControl
