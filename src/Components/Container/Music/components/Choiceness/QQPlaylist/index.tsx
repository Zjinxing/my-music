import React from 'react'
import { useStore } from 'store'
import Playlist from 'components/Common/Playlist'
import './index.scss'

const QQPlaylist: React.FC = () => {
  const store = useStore()
  const qqPlaylist = store.recommend.req_2.data.modules[0].grids
  return (
    <section className="qq-playlist">
      <h2>
        官方歌单 <small>官方甄选订阅歌单</small>
      </h2>
    </section>
  )
}

export default QQPlaylist
