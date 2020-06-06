import React from 'react'
import { Route } from 'react-router-dom'
import { useStore } from 'store'
import { observer } from 'mobx-react'
import Music from './Music'
import './index.scss'
import Video from './Video'
import Radio from './Radio'

const Container: React.FC = observer(() => {
  const store = useStore()
  console.log('........', { store })
  return (
    <div className="container">
      <div className="container-header drag">可拖拽区域</div>
      <Route path="/" exact component={Music}></Route>
      <Route path="/video" component={Video}></Route>
      <Route path="/radio" component={Radio}></Route>
    </div>
  )
})

export default Container
