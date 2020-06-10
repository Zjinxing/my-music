import React, { useEffect } from 'react'
import './App.scss'
import { GET_RECOMMEND } from './request/recommand'
import Aside from 'components/Aside'
import Container from 'components/Container'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { useStore } from 'store'

function App() {
  const store = useStore()
  useEffect(() => {
    ;(async () => {
      const recommend = await GET_RECOMMEND()
      store.recommend = recommend
    })()
  })

  return (
    <div className="App">
      <Router>
        <Aside></Aside>
        <Switch>
          <Container></Container>
        </Switch>
      </Router>
    </div>
  )
}

export default App
