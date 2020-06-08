import React from 'react'
import { useObserver } from 'mobx-react'
import { NavLink } from 'react-router-dom'
import './index.scss'

const Aside: React.FC = () => {
  return useObserver(() => (
    <div className="aside">
      <div className="aside-header drag">
        <img src={require('common/Enum').imgList.logo} width="24" alt="logo" className="logo" />
        <img
          src={require('common/Enum').imgList.logoText}
          width="60"
          alt="QQ 音乐"
          className="logo-text"
        />
      </div>
      <nav>
        <ul className="aside-nav online">
          <span>在线音乐</span>
          <li className="aside-nav__link">
            <NavLink exact to="/" activeClassName="active">
              音乐馆
            </NavLink>
          </li>
          <li className="aside-nav__link">
            <NavLink to="/video" activeClassName="active">
              视频
            </NavLink>
          </li>
          <li className="aside-nav__link">
            <NavLink to="/radio" activeClassName="active">
              电台
            </NavLink>
          </li>
        </ul>
        <ul className="aside-nav local">
          <span>我的音乐</span>
          <li className="aside-nav__link">
            <NavLink to="/favorite" activeClassName="active">
              我喜欢
            </NavLink>
          </li>
          <li className="aside-nav__link">
            <NavLink to="/local" activeClassName="active">
              本地歌曲
            </NavLink>
          </li>
          <li className="aside-nav__link">
            <NavLink to="/download" activeClassName="active">
              下载歌曲
            </NavLink>
          </li>
          <li className="aside-nav__link">
            <NavLink to="/playHistory" activeClassName="active">
              播放历史
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  ))
}

export default Aside
