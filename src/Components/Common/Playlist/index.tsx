import React from 'react'
import './index.scss'
import { useStore } from 'store'

interface PlaylistProps {
  listeners: number
  picurl: string
  title: string
  id: number
}

const Playlist: React.FC<PlaylistProps> = props => {
  const listenCount = props.listeners / 10000
  const store = useStore()
  return (
    <li className="playlist-cover">
      <div className="playlist-cover-content">
        <img src={props.picurl} alt="" className="playlist-cover-content--bg" />
        <span className="playlist-cover-content--control">
          <img
            src={
              store.currentPlaylistId === props.id
                ? require('common/Enum').imgList.pause
                : require('common/Enum').imgList.play
            }
            alt=""
          />
        </span>
        <span className="listeners">
          <img src={require('common/Enum').imgList.listen} alt="" width="16" className="icon" />
          {listenCount.toFixed(1)}万
        </span>
      </div>
      <span>{props.title}</span>
    </li>
  )
}

export default Playlist
