import React, { useEffect, useState } from 'react'
import './App.scss'
import { GET_RECOMMEND } from './request/recommand'
import Aside from 'components/Aside'
import Container from 'components/Container'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { useStore } from 'store'

function App() {
  const store = useStore()
  const [code, setCode] = useState(1)
  useEffect(() => {
    ;(async () => {
      const recommend = await GET_RECOMMEND()
      console.log(recommend)
      store.recommend = recommend
      setCode(recommend.code)
    })()
  })

  return (
    <div className="App">
      <Router>
        <Aside></Aside>
        <Switch>
          <Container code={code}></Container>
        </Switch>
      </Router>
    </div>
  )
}

export default App
