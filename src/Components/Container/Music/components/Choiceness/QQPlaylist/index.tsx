import React from 'react'
import { useStore } from 'store'
import SwipList from 'components/Common/SwipList'
import './index.scss'

const QQPlaylist: React.FC = () => {
  const store = useStore()
  const qqPlaylist = store.recommend.req_2.data.modules[0].grids
  return (
    <section className="qq-playlist">
      <h2 className="qq-playlist--title">
        官方歌单 <small>官方甄选订阅歌单</small>
      </h2>
      <SwipList swipList={qqPlaylist} type="qq" />
    </section>
  )
}

export default QQPlaylist
