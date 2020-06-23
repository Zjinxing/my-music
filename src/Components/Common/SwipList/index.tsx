import React from 'react'
import { useStore } from 'store'
import { Grid } from 'request/types/Recommend'
import './index.scss'

interface PlaylistProps {
  swipList: Grid[]
  type: 'qq' | 'hiper' | 'latest'
}

const Playlist: React.FC<PlaylistProps> = props => {
  const store = useStore()
  const liItem = props.swipList.map(item => (
    <li className="playlist-cover" key={item.id}>
      <div className="playlist-cover-content">
        <img src={item.picurl} alt="" className="playlist-cover-content--bg" />
        <span className="playlist-cover-content--control">
          <img
            src={
              store.currentPlaylistId === item.id
                ? require('common/Enum').imgList.pause
                : require('common/Enum').imgList.play
            }
            alt=""
          />
        </span>
        <span className="listeners">
          <img src={require('common/Enum').imgList.listen} alt="" width="16" className="icon" />
          {(item.listeners / 10000).toFixed(1)}万
        </span>
      </div>
      <span className="playlist-cover--title">{item.title}</span>
      {props.type === 'qq' ? (
        ''
      ) : (
        <span className="playlist-cover--creator">{item.creator.nick}</span>
      )}
    </li>
  ))
  return <ul className="swip_list">{liItem}</ul>
}

export default Playlist
