import React, { useEffect, useState } from 'react'
import { GET_PLAYLIST_BY_TAG } from 'request/playlist'
import { Vitem } from 'request/types/Playlist'
import './index.scss'

const SongList: React.FC = () => {
  const [playlistTabs, setPlaylistTabs] = useState<Vitem[]>()
  useEffect(() => {
    ;(async () => {
      const res = await GET_PLAYLIST_BY_TAG()
      console.log(res)
      setPlaylistTabs(res.req_1.data.v_item)
    })()
  }, [])
  return (
    <div className="playlist">
      <ul className="playlist-tabs">
        {playlistTabs?.map(item => (
          <li key={item.id} className="playlist-tabs-item">
            {item.name}
          </li>
        ))}
        <li className="playlist-tabs-item">全部</li>
      </ul>
      <div className="playlist-content">
        <div className="playlist-content--title">
          <h3>精选歌单</h3>
          <ul>
            <li>最热</li>
            <li>最新</li>
          </ul>
        </div>
        <ul className="playlist-content-list"></ul>
      </div>
    </div>
  )
}

export default SongList
