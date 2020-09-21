import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Tabs } from 'antd'
import { observer } from 'mobx-react'
import { useStore } from 'store'
import { GetAlbumDetail } from 'request/types/Album'
import { GET_ALBUM_DETAIL } from 'request/album'
import './index.scss'
import Button from '../Button'
import { formatSeconds } from 'common/utils'
import { GET_VKEY } from 'request/playlist'
import { SongHome } from 'request/types/Recommend'

interface RouteProps {
  id: string
}

const AlbumDetail: React.FC<RouteComponentProps<RouteProps>> = observer(props => {
  const store = useStore()
  const [albumInfo, setAlbumInfo] = useState<GetAlbumDetail>()
  const [albumSonglist, setAlbumSonglist] = useState<SongHome[]>([])

  const { TabPane } = Tabs

  useEffect(() => {
    ;(async () => {
      const albummid = props.match.params.id
      const albumDetail = await GET_ALBUM_DETAIL(albummid)
      const songlist = albumDetail.req_2.data.songList.map(item => item.songInfo)
      setAlbumInfo(albumDetail)
      setAlbumSonglist(songlist)
    })()
  }, [props.match.params.id])

  const playSong = (song: SongHome) => {
    return async () => {
      store.playlistAlbum = albumSonglist
      store.playType = 'album'
      if (store.isPlaying && store.currentSongmid === song.mid) {
        // 处理正在播放当前歌曲
        store.isPlaying = false
      } else {
        store.currentSong = song
        const vkeyDetail = await GET_VKEY(song.mid)
        const songUrl = vkeyDetail.playLists[0]
        store.currentSongUrl = songUrl
        store.currentSong = song
        store.currentSongmid = song.mid
        store.currentSongName = song.name
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
          <h1>{albumInfo?.req_1.data.basicInfo.albumName}</h1>
          <p className="header-info">
            <span className="singer-name">
              {albumInfo?.req_1.data.singer.singerList.map(singer => singer.name).join(' / ')}
            </span>
            <span className="album-aDate">{albumInfo?.req_1.data.basicInfo.publishDate}</span>
            <span className="album-genre">{albumInfo?.req_1.data.basicInfo.genre}</span>
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
          <TabPane tab={`歌曲${albumInfo?.req_2.data.totalNum || ''}`} key="song">
            <ul className="songlist">
              <li className="songlist-item list-header">
                <span>歌曲</span>
                <span>歌手</span>
                <span>时长</span>
              </li>
              {albumSonglist.map(song => (
                <li className="songlist-item" key={song.mid}>
                  <div className="songlist-item--name one-line-ellipsis">
                    <span className="songlist-item--name__text one-line-ellipsis">
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
            {/* TODO: 其他专辑 */}
          </TabPane>
          {/* TODO: 专辑信息 评论 */}
        </Tabs>
      </div>
    </div>
  )
})

export default AlbumDetail
