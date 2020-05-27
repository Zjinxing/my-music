import React, { useEffect } from 'react'
import './App.scss'
import { GET_RECOMMEND } from './request/recommand'
import Aside from 'components/Aside'
import Container from 'components/Container'

function App() {
  useEffect(() => {
    ;(async () => {
      const rst = await GET_RECOMMEND()
      console.log(rst)
    })()
  }, [])

  return (
    <div className="App">
      <Aside></Aside>
      <Container></Container>
    </div>
  )
}

export default App
