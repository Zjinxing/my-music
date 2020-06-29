import React from 'react'
import { VideoData } from 'request/types/Recommend'
import './index.scss'

interface MvProps {
  mvData: VideoData
}

const MvCover: React.FC<MvProps> = props => {
  // TODO: 打开新窗口
  return (
    <li className="video-list-item">
      <div className="video-cover">
        <img src={props.mvData.picurl} alt="" width="100%" className="video-cover--bg" />
        <span className="video-cover--control">
          <img src={require('common/Enum').imgList.play} alt="" />
        </span>
        <span className="playcnt">
          <img src={require('common/Enum').imgList.mv} alt="" width="16" className="icon" />
          {(props.mvData.playcnt / 10000).toFixed(1)}万
        </span>
      </div>
      <span className="video-list-item--title">{props.mvData.title}</span>
      <span className="video-list-item--author">{props.mvData.singers[0].name}</span>
    </li>
  )
}

export default MvCover
