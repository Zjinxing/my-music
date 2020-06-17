import React from 'react'
import './index.scss'

interface PlaylistProps {
  listeners: number
  picurl: string
  title: string
  id: number
}

const Playlist: React.FC<PlaylistProps> = props => {
  return (
    <li className="playlist-cover">
      <img src={props.picurl} alt="" className="playlist-cover--bg" />
      <span className="listeners">{props.listeners}</span>
      <span>{props.title}</span>
    </li>
  )
}

export default Playlist
