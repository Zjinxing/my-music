import React from 'react'
import { NavLink, Route, useRouteMatch, Switch, Redirect } from 'react-router-dom'
import './index.scss'
import Choiceness from './components/Choiceness'
import Singer from './components/Singer'
import SongList from './components/SongList'
import Voices from './components/Voices'
import Phone from './components/Phone'

const Music: React.FC = () => {
  const { path, url } = useRouteMatch()
  return (
    <div className="music">
      <h1>音乐馆</h1>
      <nav>
        <ul>
          <li>
            <NavLink to={`${url}/choiceness`}>精选</NavLink>
          </li>
          <li>
            <NavLink to={`${url}/rank`}>排行</NavLink>
          </li>
          <li>
            <NavLink to={`${url}/singer`}>歌手</NavLink>
          </li>
          <li>
            <NavLink to={`${url}/type`}>分类歌单</NavLink>
          </li>
          <li>
            <NavLink to={`${url}/voice`}>有声节目</NavLink>
          </li>
          <li>
            <NavLink to={`${url}/phone`}>手机专享</NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path={`${path}/choiceness`}>
          <Choiceness></Choiceness>
        </Route>
        <Route path={`${path}/rank`}>
          <span>排行</span>
        </Route>
        <Route path={`${path}/singer`} component={Singer}></Route>
        <Route path={`${path}/type`} component={SongList}></Route>
        <Route path={`${path}/voice`} component={Voices}></Route>
        <Route path={`${path}/phone`} component={Phone}></Route>
        <Redirect path={path} to={`${path}/choiceness`}></Redirect>
      </Switch>
    </div>
  )
}

export default Music
