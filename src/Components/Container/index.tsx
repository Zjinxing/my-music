import React from 'react'
import './index.scss'
import { useStore } from 'store'
import { useObserver, observer } from 'mobx-react'

const Container: React.FC = observer(() => {
  const store = useStore()
  console.log('........', { store })
  return (
    <div className="container">
      <div className="container-header drag">可拖拽区域</div>
      <span>现在的播放状态是：{store.isPlaying ? '正在播放' : '已暂停'}</span>
      {String(store.isPlaying)}
      <button
        onClick={() => {
          store.isPlaying = !store.isPlaying
        }}
      >
        播放控制
      </button>
    </div>
  )
})

export default Container
