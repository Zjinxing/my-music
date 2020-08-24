import React, { useEffect, useState } from 'react'
import { GET_RANK_DETAIL, GET_VKEY } from 'request/playlist'
import { RouteComponentProps } from 'react-router-dom'
import './index.scss'
import { SongHome } from 'request/types/Recommend'
import Button from 'components/Common/Button'
import { useStore } from 'store'
import { formatSeconds, formatIndex } from 'common/utils'

interface RouteProps {
  topId: string
}
const ToplistDetail: React.FC<RouteComponentProps<RouteProps>> = props => {
  const [songlist, setSonglist] = useState<SongHome[]>([])
  const [headUrl, setHeadUrl] = useState('')
  const [title, setTitle] = useState('')
  const [updateTime, setUpdateTime] = useState('')
  const [intro, setIntro] = useState('')

  const store = useStore()

  useEffect(() => {
    ;(async () => {
      const result = await GET_RANK_DETAIL(Number(props.match.params.topId))
      console.log(result)
      setSonglist(result.detail.data.songInfoList)
      setHeadUrl(result.detail.data.data.headPicUrl)
      setTitle(result.detail.data.data.title)
      setUpdateTime(result.detail.data.data.updateTime)
      setIntro(result.detail.data.data.intro)
    })()
  }, [props.match.params.topId])

  const playSong = (song: SongHome) => {
    return async () => {
      store.playlistRank = songlist
      store.playType = 'rank'
      if (store.isPlaying && store.currentSongmid === song.mid) {
        // 处理正在播放当前歌曲
        store.isPlaying = false
      } else {
        store.currentSong = song
        const vkeyDetail = await GET_VKEY(song.mid)
        const songUrl = vkeyDetail.response.playLists[0]
        store.currentSongUrl = songUrl
        store.currentSong = song
        store.currentSongmid = song.mid
        store.currentSongName = song.name
      }
    }
  }

  return (
    <div className="toplist-detail">
      <div className="toplist-detail__header">
        <img
          src={headUrl}
          alt=""
          className="toplist-detail__header--pic"
          width="170"
          height="170"
        />
        <div className="toplist-detail__header--info">
          <h2>{title}</h2>
          <span>更新时间：{updateTime}</span>
          <div className="control-btns">
            <Button type="primary">
              <img src={require('common/Enum').imgList.rv_play} className="prefix-icon" alt="" />
              播放全部
            </Button>
            <Button type="primary">
              <img
                src={require('common/Enum').imgList.notDownload}
                className="prefix-icon"
                alt=""
              />
              下载
            </Button>
            <Button type="primary">
              <img src={require('common/Enum').imgList.rvBatch} className="prefix-icon" alt="" />
              批量操作
            </Button>
          </div>
        </div>
      </div>
      <div className="toplist-detail__list">
        <ul className="songlist">
          <li className="songlist-item list-header">
            <span>歌曲</span>
            <span>歌手</span>
            <span>专辑</span>
            <span>时长</span>
          </li>
          {songlist.map((song, idx) => (
            <li className="songlist-item" key={song.mid}>
              <div className="songlist-item--name one-line-ellipsis">
                <span className="songlist-item--name__text one-line-ellipsis">
                  <span>{formatIndex(idx + 1)}</span>
                  <span className="icon-wrapper"></span>
                  {song.name}
                </span>
                <div className="songlist-item--icons">
                  {song.pay.pay_play ? (
                    <img src={require('common/Enum').imgList.listVIPICon} alt="" />
                  ) : null}
                  {song.file.size_ape || song.file.size_flac ? (
                    <img src={require('common/Enum').imgList.listSQICon} alt="" />
                  ) : null}
                  {song.mv.id ? (
                    <img
                      src={require('common/Enum').imgList.listMVICon}
                      className="mv-icon"
                      alt=""
                    />
                  ) : (
                    ''
                  )}
                </div>
                <div className="songlist-item--controls">
                  <span className="controls-icon" onClick={playSong(song)}>
                    <img
                      src={
                        store.isPlaying && store.currentSongmid === song.mid
                          ? require('common/Enum').imgList.rvPause
                          : require('common/Enum').imgList.rv_play
                      }
                      className="icon-inner"
                      alt=""
                    />
                  </span>
                  <span className="controls-icon">
                    <img src={require('common/Enum').imgList.rvAdd} className="icon-inner" alt="" />
                  </span>
                  <span className="controls-icon">
                    <img
                      src={require('common/Enum').imgList.notDownload}
                      className="icon-inner"
                      alt=""
                    />
                  </span>
                  <span className="controls-icon">
                    <img
                      src={require('common/Enum').imgList.rvMore}
                      className="icon-inner"
                      alt=""
                    />
                  </span>
                </div>
              </div>
              <span className="songlist-item--singer one-line-ellipsis">
                {song.singer.reduce((acc, cur) => acc + '/' + cur.name, '').slice(1)}
              </span>
              <span className="songlist-item--album one-line-ellipsis">{song.album.name}</span>
              <span className="songlist-item--interval">{formatSeconds(song.interval)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ToplistDetail
