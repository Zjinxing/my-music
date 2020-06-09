import React from 'react'
import { useObserver } from 'mobx-react'
import { NavLink, useLocation } from 'react-router-dom'
import './index.scss'

const Aside: React.FC = () => {
  const { pathname } = useLocation()
  const pathArr = pathname.split('/')

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
            <NavLink exact to="/music" className={pathArr.includes('music') ? 'active' : ''}>
              音乐馆
            </NavLink>
          </li>
          <li className="aside-nav__link">
            <NavLink to="/video" className={pathArr.includes('video') ? 'active' : ''}>
              视频
            </NavLink>
          </li>
          <li className="aside-nav__link">
            <NavLink to="/radio" className={pathArr.includes('radio') ? 'active' : ''}>
              电台
            </NavLink>
          </li>
        </ul>
        <ul className="aside-nav local">
          <span>我的音乐</span>
          <li className="aside-nav__link">
            <NavLink to="/favorite" className={pathArr.includes('favorite') ? 'active' : ''}>
              我喜欢
            </NavLink>
          </li>
          <li className="aside-nav__link">
            <NavLink to="/local" className={pathArr.includes('local') ? 'active' : ''}>
              本地歌曲
            </NavLink>
          </li>
          <li className="aside-nav__link">
            <NavLink to="/download" className={pathArr.includes('download') ? 'active' : ''}>
              下载歌曲
            </NavLink>
          </li>
          <li className="aside-nav__link">
            <NavLink to="/playHistory" className={pathArr.includes('playHistory') ? 'active' : ''}>
              播放历史
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  ))
}

export default Aside
