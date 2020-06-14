import React, { useEffect } from 'react'
import { useStore } from 'store'
import Banner from './Banner'

const Choiceness: React.FC = () => {
  const store = useStore()
  useEffect(() => {
    console.log(store.recommend.code)
  })

  return (
    <div className="choiceness">
      <Banner></Banner>
    </div>
  )
}

export default Choiceness
