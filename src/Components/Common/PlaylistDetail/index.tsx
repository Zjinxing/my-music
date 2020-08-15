import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { observer } from 'mobx-react'
import { GET_LIST_DETAIL, GET_VKEY } from 'request/playlist'
import { Cdlist, PlaylistSong } from 'request/types/Playlist'
import Button from 'components/Common/Button'
import { Tabs } from 'antd'
import 'antd/lib/tabs/style/index.css'
import { formatSeconds } from 'common/utils'
import './index.scss'
import { useStore } from 'store'

interface RouteProps {
  id: string
}

const PlaylistDetail: React.FC<RouteComponentProps<RouteProps>> = observer(props => {
  const store = useStore()
  const [listDetail, setListDetail] = useState<Cdlist>()
  useEffect(() => {
    ;(async () => {
      const res = await GET_LIST_DETAIL(props.match.params.id)
      console.log(res)
      setListDetail(res.response.cdlist[0])
    })()
  }, [props.match.params.id])

  console.log('ID', props.match.params.id)
  const { TabPane } = Tabs

  // 播放全部
  const playAll = async () => {
    if (!listDetail) return
    store.playlist = listDetail.songlist
    const currentSong = store.playlist[0]
    const vkeyDetail = await GET_VKEY(currentSong.mid)
    const songUrl = vkeyDetail.response.playLists[0]
    store.currentSongUrl = songUrl
    store.currentSong = currentSong
    store.currentSongmid = currentSong.mid
    store.currentSongName = currentSong.name
  }

  const playSong = (song: PlaylistSong) => {
    return async () => {
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
    <div className="playlist">
      <div className="playlist-header">
        <img src={listDetail?.logo} alt="" width="170" className="playlist-header--logo" />
        <div className="header-detail">
          <h1>{listDetail?.dissname}</h1>
          <p className="header-info">
            <img src={listDetail?.headurl} alt="" width="24" className="header-info--avatar" />
            <span className="header-info--nick">{listDetail?.nickname}</span>
            {listDetail?.tags.map(tag => (
              <span className="header-info--tags" key={tag.id}>
                #{tag.name}
              </span>
            ))}
          </p>
          <p className="header-desc one-line-ellipsis">{listDetail?.desc}</p>
          <div className="header-controls">
            <Button type="primary" className="header-controls-btn" onClick={playAll}>
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
          <TabPane tab={`歌曲${listDetail?.songlist.length || ''}`} key="song">
            <ul className="songlist">
              {listDetail?.songlist.map(song => (
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
                  <span className="songlist-item--album one-line-ellipsis">{song.album.name}</span>
                  <span className="songlist-item--interval">{formatSeconds(song.interval)}</span>
                </li>
              ))}
            </ul>
          </TabPane>
          <TabPane tab="评论" key="comment">
            评论列表
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
})

export default PlaylistDetail
