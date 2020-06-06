import React, { useEffect } from 'react'
import './App.scss'
import { GET_RECOMMEND } from './request/recommand'
import Aside from 'components/Aside'
import Container from 'components/Container'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

function App() {
  useEffect(() => {
    ;(async () => {
      const rst = await GET_RECOMMEND()
      console.log(rst)
    })()
  }, [])

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
