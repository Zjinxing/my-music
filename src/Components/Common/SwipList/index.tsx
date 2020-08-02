import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useStore } from 'store'
import { Grid } from 'request/types/Recommend'
import './index.scss'

interface PlaylistProps {
  swipList: Grid[]
  type: 'qq' | 'hiper' | 'latest'
}

const Playlist: React.FC<PlaylistProps> = props => {
  const store = useStore()
  const [transClass, setTransClass] = useState('')

  const toggleTransform = () => {
    if (transClass) {
      setTransClass('')
    } else {
      setTransClass('swiped')
    }
  }

  const liItem = props.swipList.map(item => (
    <li className="playlist-cover" key={item.id}>
      <NavLink to={`/playlist-detail/${item.id}`}>
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
      </NavLink>
    </li>
  ))
  return (
    <div className="swip">
      <img
        src={require('common/Enum').imgList.leftArrow}
        alt=""
        width="40"
        className="swip-control--left"
        onClick={toggleTransform}
      />
      <img
        src={require('common/Enum').imgList.leftArrow}
        alt=""
        width="40"
        className="swip-control--right"
        onClick={toggleTransform}
      />
      <div className="swip-content">
        <ul className={`swip_list ${transClass}`}>{liItem}</ul>
      </div>
    </div>
  )
}

export default Playlist
