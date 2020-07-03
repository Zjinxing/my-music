import React from 'react'
import './index.scss'
import { SongHome } from 'request/types/Recommend'

interface Props {
  data: {
    lan: string
    lanlist: { lan: string; name: string; tjreport: string; type: number }[]
    songlist: SongHome[]
  }
}

const Newest: React.FC<Props> = props => {
  const scrollLeft = () => {}

  const scrollRight = () => {}

  const li = props.data.songlist.slice(0, 16).map(item => {
    const singers = item.singer.map((singer, index) => (
      <span key={singer.id}>
        <span className="singer-name">{singer.name}</span>
        {index === item.singer.length - 1 ? '' : <span> / </span>}
      </span>
    ))
    return (
      <li className="newest-cover cover-item" key={item.id}>
        <div className="newest-cover--bg cover-item--bg">
          <img
            src={`https://y.qq.com/music/photo_new/T002R300x300M000${item.album.pmid}.jpg?max_age=2592000`}
            alt=""
          />
          <span className="cover-play--control">
            <img src={require('common/Enum').imgList.play} alt="" />
          </span>
        </div>
        <span className="cover-title">{item.album.title}</span>
        <span className="cover-authors">{singers}</span>
        <span className="cover-createdAt">{item.album.time_public}</span>
      </li>
    )
  })

  return (
    <div className="newest">
      <div className="newest-title">
        <h2>最新发行</h2>
        <span>更多</span>
      </div>
      <div className="newest-swipe swipe">
        <img
          src={require('common/Enum').imgList.leftArrow}
          alt=""
          width="40"
          className="swipe-control--left"
          onClick={scrollLeft}
        />
        <img
          src={require('common/Enum').imgList.leftArrow}
          alt=""
          width="40"
          className="swipe-control--right"
          onClick={scrollRight}
        />
        <div className="newest-swipe-list">
          <ul>{li}</ul>
        </div>
      </div>
    </div>
  )
}

export default Newest
