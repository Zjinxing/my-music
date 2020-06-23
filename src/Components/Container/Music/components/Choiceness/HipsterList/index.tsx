import React from 'react'
import SwipList from 'components/Common/SwipList'
import './index.scss'
import { useStore } from 'store'

const HipsterList: React.FC = () => {
  const store = useStore()
  const list = store.recommend.req_2.data.modules[1].grids
  return (
    <section className="hipster-list">
      <h2 className="hipster-list--title">
        达人歌单 <small>官方甄选订阅歌单</small>
      </h2>
      <SwipList swipList={list} type="hiper" />
    </section>
  )
}

export default HipsterList
