import React from 'react'
import './index.scss'

interface Props {
  imgUrl: string
  count: number
}

const ListCover: React.FC<Props> = props => {
  return (
    <div className="playlist-cover-content rank-cover">
      <img src={props.imgUrl} alt="" className="playlist-cover-content--bg" width="100%" />
      <span className="playlist-cover-content--control">
        <img src={require('common/Enum').imgList.play} alt="" />
      </span>
      <span className="listeners">
        <img src={require('common/Enum').imgList.listen} alt="" width="16" className="icon" />
        {(props.count / 10000).toFixed(1)}万
      </span>
    </div>
  )
}

export default ListCover
