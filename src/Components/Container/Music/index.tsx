import React from 'react'
import { NavLink, Route, useRouteMatch, Switch, Redirect } from 'react-router-dom'
import './index.scss'
import Choiceness from './components/Choiceness'
import Singer from './components/Singer'
import SongList from './components/SongList'
import Toplist from './components/Toplist'
import Albumlist from './components/Album'
import Voices from './components/Voices'
import Phone from './components/Phone'

const Music: React.FC = () => {
  const { path, url } = useRouteMatch()
  return (
    <div className="music">
      <h1 className="music-title">音乐馆</h1>
      <nav className="music-nav">
        <ul className="music-nav-list">
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
            <NavLink to={`${url}/album`}>数字专辑</NavLink>
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
        <Route path={`${path}/rank`} component={Toplist}></Route>
        <Route path={`${path}/singer`} component={Singer}></Route>
        <Route path={`${path}/type`} component={SongList}></Route>
        <Route path={`${path}/album`} component={Albumlist}></Route>
        <Route path={`${path}/voice`} component={Voices}></Route>
        <Route path={`${path}/phone`} component={Phone}></Route>
        <Redirect path={path} to={`${path}/choiceness`}></Redirect>
      </Switch>
    </div>
  )
}

export default Music
