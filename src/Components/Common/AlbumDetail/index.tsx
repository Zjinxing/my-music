import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Tabs } from 'antd'
import { observer } from 'mobx-react'
import { useStore } from 'store'
import { AlbumInfo, AlbumSongDetail } from 'request/types/Album'
import { GET_ALBUMINFO } from 'request/album'
import './index.scss'
import Button from '../Button'
import { formatSeconds } from 'common/utils'
import { GET_VKEY } from 'request/playlist'

interface RouteProps {
  id: string
}

const AlbumDetail: React.FC<RouteComponentProps<RouteProps>> = observer(props => {
  const store = useStore()
  const [albumInfo, setAlbumInfo] = useState<AlbumInfo>()

  const { TabPane } = Tabs

  useEffect(() => {
    ;(async () => {
      const albummid = props.match.params.id
      const albumDetail = await GET_ALBUMINFO(albummid)
      setAlbumInfo(albumDetail)
      console.log(albumDetail)
    })()
  }, [props.match.params.id])

  const playSong = (song: AlbumSongDetail) => {
    return async () => {
      store.playlistAlbum = albumInfo!.response.data.list
      store.playType = 'album'
      if (store.isPlaying && store.currentSongmid === song.songmid) {
        // 处理正在播放当前歌曲
        store.isPlaying = false
      } else {
        store.currentSong = song
        const vkeyDetail = await GET_VKEY(song.songmid)
        const songUrl = vkeyDetail.response.playLists[0]
        store.currentSongUrl = songUrl
        store.currentSong = song
        store.currentSongmid = song.songmid
        store.currentSongName = song.songname
      }
    }
  }

  return (
    <div className="album playlist">
      <div className="album-header playlist-header">
        <img
          src={`https://y.qq.com/music/photo_new/T002R300x300M000${props.match.params.id}.jpg?max_age=2592000`}
          alt=""
          width="170"
          className="playlist-header--logo"
        />
        <div className="header-detail">
          <h1>{albumInfo?.response.data.name}</h1>
          <p className="header-info">
            <span className="singer-name">{albumInfo?.response.data.singername}</span>
            <span className="album-aDate">{albumInfo?.response.data.aDate}</span>
            <span className="album-genre">{albumInfo?.response.data.genre}</span>
          </p>
          <div className="header-controls">
            <Button type="primary" className="header-controls-btn">
              <img src={require('common/Enum').imgList.rv_play} className="prefix-icon" alt="" />
              播放全部
            </Button>
            <Button className="header-controls-btn">
              <img src={require('common/Enum').imgList.bvNotLike} className="prefix-icon" alt="" />
              收藏
            </Button>
            <Button className="header-controls-btn more">
              <span className="more-icon"></span>
            </Button>
          </div>
        </div>
      </div>
      <div className="playlist-content">
        <Tabs defaultActiveKey="song">
          <TabPane tab={`歌曲${albumInfo?.response.data.list.length || ''}`} key="song">
            <ul className="songlist">
              <li className="songlist-item list-header">
                <span>歌曲</span>
                <span>歌手</span>
                <span>时长</span>
              </li>
              {albumInfo?.response.data.list.map(song => (
                <li className="songlist-item" key={song.songmid}>
                  <div className="songlist-item--name one-line-ellipsis">
                    <span className="songlist-item--name__text one-line-ellipsis">
                      <span className="icon-wrapper"></span>
                      {song.songname}
                    </span>
                    <div className="songlist-item--icons">
                      {song.pay.payplay ? (
                        <img src={require('common/Enum').imgList.listVIPICon} alt="" />
                      ) : null}
                      {song.sizeape || song.sizeflac ? (
                        <img src={require('common/Enum').imgList.listSQICon} alt="" />
                      ) : null}
                      {song.vid ? (
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
                            store.isPlaying && store.currentSongmid === song.songmid
                              ? require('common/Enum').imgList.rvPause
                              : require('common/Enum').imgList.rv_play
                          }
                          className="icon-inner"
                          alt=""
                        />
                      </span>
                      <span className="controls-icon">
                        <img
                          src={require('common/Enum').imgList.rvAdd}
                          className="icon-inner"
                          alt=""
                        />
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
                  <span className="songlist-item--interval">{formatSeconds(song.interval)}</span>
                </li>
              ))}
            </ul>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
})

export default AlbumDetail
