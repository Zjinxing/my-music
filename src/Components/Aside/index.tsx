import React from 'react'
import { useStore } from 'store'
import { useObserver } from 'mobx-react'
import './index.scss'

const Aside: React.FC = () => {
  const store = useStore()
  return useObserver(() => (
    <div className="aside">
      <div className="aside-header drag">可拖拽区域</div>
      <span>{store.isPlaying ? '正在播放' : '开始播放'}</span>
    </div>
  ))
}

export default Aside
