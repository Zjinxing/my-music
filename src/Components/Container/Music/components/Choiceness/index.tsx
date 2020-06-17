import React, { useEffect } from 'react'
import { useStore } from 'store'
import Banner from './Banner'
import QQPlaylist from './QQPlaylist'

const Choiceness: React.FC = () => {
  const store = useStore()
  useEffect(() => {
    console.log(store.recommend.code)
  })

  return (
    <div className="choiceness">
      <Banner></Banner>
      <QQPlaylist />
    </div>
  )
}

export default Choiceness
