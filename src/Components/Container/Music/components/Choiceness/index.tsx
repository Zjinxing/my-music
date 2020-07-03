import React, { useEffect } from 'react'
import { useStore } from 'store'
import Banner from './Banner'
import QQPlaylist from './QQPlaylist'
import HipsterList from './HipsterList'
import RcmdVideo from 'components/Container/Music/components/Choiceness/RcmdVideo'
import Newest from './Newest'

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
      <RcmdVideo mvList={store.recommend.req_0.data.list} />
      <Newest data={store.recommend.req_3.data} />
    </div>
  )
}

export default Choiceness
