import React from 'react'
import { useObserver } from 'mobx-react'
import { NavLink } from 'react-router-dom'
import './index.scss'

const Aside: React.FC = () => {
  return useObserver(() => (
    <div className="aside">
      <div className="aside-header drag">可拖拽区域</div>
      <nav>
        <ul>
          <li>
            <NavLink exact to="/">
              音乐馆
            </NavLink>
          </li>
          <li>
            <NavLink to="/video">视频</NavLink>
          </li>
          <li>
            <NavLink to="/radio">电台</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  ))
}

export default Aside
