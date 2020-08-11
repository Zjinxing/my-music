import React, { useState } from 'react'
import { observer } from 'mobx-react'
import Progress, { TargetInfo, MousePos } from 'components/Common/Progress'
import { useStore } from 'store'
import { PlayMode } from 'common/Enum'
import './index.scss'

const PlayControl: React.FC = observer(() => {
  const store = useStore()
  const [currentTime, setCurrentTime] = useState(0) // 当前歌曲播放时间
  const [duration, setDuration] = useState(0) // 当前歌曲总时长
  const [percent, setPercent] = useState(0) // 播放进度
  const [isDragging, setIsDragging] = useState(false)

  const onProgressChange = (targetInfo: TargetInfo, pos: MousePos) => {
    setIsDragging(true)
    const { left, width } = targetInfo
    const { pageX } = pos
    const compute = ((pageX - left) / width) * 100
    const percent = compute >= 100 ? 100 : compute <= 0 ? 0 : compute
    setPercent(percent)
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
          {store.playMode === PlayMode.LOOP ? (
            <img
              src={require('common/Enum').imgList.playModeOrder}
              alt=""
              className="control-icon "
            />
          ) : store.playMode === PlayMode.RANDOM ? (
            <img
              src={require('common/Enum').imgList.playModeRandom}
              alt=""
              className="control-icon"
            />
          ) : (
            <img
              src={require('common/Enum').imgList.playModeSingle}
              alt=""
              className="control-icon"
            />
          )}
          <img src={require('common/Enum').imgList.preSong} alt="" className="control-icon " />
          <img src={require('common/Enum').imgList.playSong} alt="" className="control-icon" />
          <img src={require('common/Enum').imgList.nextSong} alt="" className="control-icon" />
          <img src={require('common/Enum').imgList.volume} alt="" className="control-icon" />
        </div>
        <div className="control-content--right">
          <img src={require('common/Enum').imgList.qualityNormal} alt="" />
        </div>
      </div>
      <audio src={store.currentSongUrl}></audio>
    </div>
  )
})

export default PlayControl
