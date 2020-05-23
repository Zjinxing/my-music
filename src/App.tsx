import React, { useEffect } from 'react'
import './App.css'
import { GET_RECOMMEND } from './request/recommand'
import Aside from './Components/Aside'
import Container from './Components/Container'

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
