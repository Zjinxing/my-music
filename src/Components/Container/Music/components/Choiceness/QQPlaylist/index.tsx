import React from 'react'
import { useStore } from 'store'
import Playlist from 'components/Common/Playlist'
import './index.scss'

const QQPlaylist: React.FC = () => {
  const store = useStore()
  const qqPlaylist = store.recommend.req_2.data.modules[0].grids
  const List = qqPlaylist.map(item => (
    <Playlist
      picurl={item.picurl}
      id={item.id}
      title={item.title}
      listeners={item.listeners}
      key={item.id}
    />
  ))
  return (
    <section className="qq-playlist">
      <h2 className="qq-playlist--title">
        官方歌单 <small>官方甄选订阅歌单</small>
      </h2>
      <ul className="qq-playlist--list">{List}</ul>
    </section>
  )
}

export default QQPlaylist
