import React, { useEffect } from 'react'
import { useStore } from 'store'
import Banner from './Banner'
import QQPlaylist from './QQPlaylist'
import HipsterList from './HipsterList'

const Choiceness: React.FC = () => {
  const store = useStore()
  useEffect(() => {
    console.log(store.recommend.code)
  })

  return (
    <div className="choiceness">
      <Banner></Banner>
      <QQPlaylist />
      <HipsterList />
    </div>
  )
}

export default Choiceness
