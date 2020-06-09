import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react'
import Music from './Music'
import './index.scss'
import Video from './Video'
import Radio from './Radio'
import Favorite from './Favorite'
import Local from './Local'
import DownLoad from './Download'
import PlayHistory from './PlayHistory'

const Container: React.FC = observer(() => {
  return (
    <div className="container">
      <div className="container-header drag">可拖拽区域</div>
      <div className="container-body">
        <Route path="/music" component={Music}></Route>
        <Route path="/video" component={Video}></Route>
        <Route path="/radio" component={Radio}></Route>
        <Route path="/favorite" component={Favorite}></Route>
        <Route path="/local" component={Local}></Route>
        <Route path="/download" component={DownLoad}></Route>
        <Route path="/playHistory" component={PlayHistory}></Route>
        <Redirect path="/" to={{ pathname: '/music' }}></Redirect>
      </div>
      <div className="container-footer">底部播放控制</div>
    </div>
  )
})

export default Container
