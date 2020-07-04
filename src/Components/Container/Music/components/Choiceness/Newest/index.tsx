import React, { useState } from 'react'
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
  const [transX, setTransX] = useState(0)
  const MEDIA_WIDTH_MEDIUM = 1190
  const MEDIA_WIDTH_LARGE = 1370
  const LENGTH = props.data.songlist.slice(0, 20).length

  const scrollLeft = () => {
    const { width: bodyWidth } = document.body.getBoundingClientRect()
    const compareNum =
      bodyWidth <= MEDIA_WIDTH_MEDIUM
        ? Math.ceil(LENGTH / 4) - 1
        : bodyWidth <= MEDIA_WIDTH_LARGE
        ? Math.ceil(LENGTH / 5) - 1
        : Math.ceil(LENGTH / 6) - 1
    if (transX === 0) {
      setTransX(-compareNum * 100)
    } else {
      setTransX(transX + 100)
    }
  }

  const scrollRight = () => {
    const { width: bodyWidth } = document.body.getBoundingClientRect()
    const compareNum =
      bodyWidth <= MEDIA_WIDTH_MEDIUM
        ? Math.ceil(LENGTH / 4) - 1
        : bodyWidth <= MEDIA_WIDTH_LARGE
        ? Math.ceil(LENGTH / 5) - 1
        : Math.ceil(LENGTH / 6) - 1
    if (Math.abs(transX / 100) === compareNum) {
      setTransX(0)
    } else {
      setTransX(transX - 100)
    }
  }

  const lanlist = props.data.lanlist.map(item => (
    <li className={item.lan === props.data.lan ? 'current' : ''} key={item.name}>
      {item.lan}
    </li>
  ))

  const li = props.data.songlist.slice(0, 20).map(item => {
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
        <span className="cover-title">{item.name}</span>
        <span className="cover-authors">{singers}</span>
        <span className="cover-createdAt">{item.album.time_public}</span>
      </li>
    )
  })

  return (
    <div className="newest">
      <div className="newest-title">
        <h2>最新发行</h2>
        <ul className="newest-title--lanlist">{lanlist}</ul>
        <span className="newest-title--more">
          更多
          <img
            src={require('common/Enum').imgList.nextAction}
            width="20"
            className="more-right-icon"
            alt=""
          />
        </span>
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
          <ul style={{ transform: `translateX(${transX}%)` }}>{li}</ul>
        </div>
      </div>
    </div>
  )
}

export default Newest
