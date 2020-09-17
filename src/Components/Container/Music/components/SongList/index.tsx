import React, { useEffect, useState } from 'react'
import { GET_PLAYLIST_BY_TAG } from 'request/playlist'
import { Vitem, Vplaylist } from 'request/types/Playlist'
import './index.scss'
import { NavLink } from 'react-router-dom'

const SongList: React.FC = () => {
  const [playlistTabs, setPlaylistTabs] = useState<Vitem[]>()
  const [playlist, setPlaylist] = useState<Vplaylist[]>()
  const [order, setOrder] = useState(5)
  useEffect(() => {
    getPlaylist()
  }, [])

  const getPlaylist = async (order: number = 5, id?: number) => {
    setOrder(order)
    const res = await GET_PLAYLIST_BY_TAG(order, id)
    setPlaylistTabs(res.req_1.data.v_item)
    setPlaylist(res.req_0.data.v_playlist)
  }

  return (
    <div className="playlist">
      <ul className="playlist-tabs">
        {playlistTabs?.map(item => (
          // TODO：选择分类跳转页面
          <li key={item.id} className="playlist-tabs-item">
            {item.name}
          </li>
        ))}
        <li className="playlist-tabs-item">全部</li>
      </ul>
      <div className="playlist-content">
        <div className="playlist-content--title">
          <h3>精选歌单</h3>
          <ul className="playlist-content--title__order">
            <li className={order === 5 ? 'active-order' : ''} onClick={() => getPlaylist(5)}>
              最新
            </li>
            <li className={order === 2 ? 'active-order' : ''} onClick={() => getPlaylist(2)}>
              最热
            </li>
          </ul>
        </div>
        <ul className="playlist-content-list">
          {playlist?.map(item => (
            <li className="playlist-content-list-item playlist-cover">
              <NavLink to={`/playlist-detail/${item.tid}`}>
                <div className="playlist-cover-content">
                  <img
                    src={item.cover_url_medium}
                    alt=""
                    className="playlist-cover-content--bg"
                    width="100%"
                  />
                  <span className="playlist-cover-content--control">
                    <img src={require('common/Enum').imgList.play} alt="" />
                  </span>
                  <span className="listeners">
                    <img
                      src={require('common/Enum').imgList.listen}
                      alt=""
                      width="16"
                      className="icon"
                    />
                    {(item.access_num / 10000).toFixed(1)}万
                  </span>
                </div>
                <span className="playlist-cover--title">{item.title}</span>
                <span className="playlist-cover--creator">{item.creator_info.nick}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SongList
