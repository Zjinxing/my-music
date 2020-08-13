import React, { useState, useRef, SyntheticEvent } from 'react'
import { observer } from 'mobx-react'
import Progress, { TargetInfo, MousePos } from 'components/Common/Progress'
import { useStore } from 'store'
import { PlayMode } from 'common/Enum'
import './index.scss'
import { formatSeconds } from 'common/utils'

const PlayControl: React.FC = observer(() => {
  const store = useStore()
  const [currentTime, setCurrentTime] = useState(0) // 当前歌曲播放时间
  const [duration, setDuration] = useState(0) // 当前歌曲总时长
  const [percent, setPercent] = useState(0) // 播放进度
  const [isDragging, setIsDragging] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

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

  const togglePlay = () => {
    if (store.isPlaying) {
      audioRef.current?.pause()
      store.isPlaying = false
    } else {
      audioRef.current?.play()
      store.isPlaying = true
    }
  }

  // 播放更新进度条
  const onProgress = (e: SyntheticEvent<HTMLAudioElement>) => {
    const target = e.target as HTMLAudioElement
    const current = target.currentTime
    const percent = duration && (current / duration) * 100
    percent && !isDragging && setPercent(percent)
    setCurrentTime(current)
  }

  return (
    <div className="play-control">
      <Progress width={percent} onProgressChange={onProgressChange}></Progress>
      <div className="control-content">
        <div className="control-content--left">
          <img
            src={`https://y.gtimg.cn/music/photo_new/T002R800x800M000${store.currentSong?.album.mid}.jpg?max_age=2592000`}
            width="40"
            height="40"
            alt=""
            className="cover-bg"
          />
          <span className="current-name">
            {store.currentSong?.title}
            <span className="current-name--singer">
              &nbsp;-{' '}
              {store.currentSong?.singer.reduce((acc, cur) => acc + ' / ' + cur.name, '').slice(2)}
            </span>
          </span>
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
        <div className="control-content--center">
          <span className="control-icon">
            {store.playMode === PlayMode.LOOP ? (
              <img src={require('common/Enum').imgList.playModeOrder} alt="" />
            ) : store.playMode === PlayMode.RANDOM ? (
              <img src={require('common/Enum').imgList.playModeRandom} alt="" />
            ) : (
              <img src={require('common/Enum').imgList.playModeSingle} alt="" />
            )}
          </span>
          <span className="control-icon">
            <img src={require('common/Enum').imgList.preSong} alt="" />
          </span>
          <span className="control-icon" onClick={togglePlay}>
            {store.isPlaying ? (
              <img src={require('common/Enum').imgList.pauseSong} alt="" />
            ) : (
              <img src={require('common/Enum').imgList.playSong} alt="" />
            )}
          </span>
          <span className="control-icon">
            <img src={require('common/Enum').imgList.nextSong} alt="" />
          </span>
          <span className="control-icon">
            <img src={require('common/Enum').imgList.volume} alt="" />
          </span>
        </div>
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
      ></audio>
    </div>
  )
})

export default PlayControl
