import React, { useState, useEffect } from 'react'
import MvCover from 'components/Common/MvCover'
import { VideoData } from 'request/types/Recommend'
import './index.scss'

interface Props {
  mvList: VideoData[]
}

const Video: React.FC<Props> = props => {
  const [transX, setTransX] = useState(0)
  const list = props.mvList.map(mv => <MvCover mvData={mv} key={mv.vid} />)
  const MEDIA_WIDTH_MEDIUM = 1190
  const MEDIA_WIDTH_LARGE = 1370

  useEffect(() => {
    const resizeListener = () => {
      let prev = Date.now()
      return () => {
        const now = Date.now()
        if (now - prev > 1000) {
          setTransX(0)
          prev = Date.now()
        }
      }
    }
    window.addEventListener('resize', resizeListener())
    return () => {
      window.removeEventListener('resize', resizeListener())
    }
  }, [])
  const scrollLeft = () => {
    const { length } = list
    const { width: bodyWidth } = document.body.getBoundingClientRect()
    const compareNum =
      bodyWidth <= MEDIA_WIDTH_MEDIUM
        ? Math.ceil(length / 3) - 1
        : bodyWidth <= MEDIA_WIDTH_LARGE
        ? Math.ceil(length / 4) - 1
        : Math.ceil(length / 5) - 1

    if (transX === 0) {
      setTransX(-compareNum * 100)
    } else {
      setTransX(transX + 100)
    }
  }

  const scrollRight = () => {
    const { length } = list
    const { width: bodyWidth } = document.body.getBoundingClientRect()
    const compareNum =
      bodyWidth <= MEDIA_WIDTH_MEDIUM
        ? Math.ceil(length / 3) - 1
        : bodyWidth <= MEDIA_WIDTH_LARGE
        ? Math.ceil(length / 4) - 1
        : Math.ceil(length / 5) - 1
    if (Math.abs(transX / 100) === compareNum) {
      setTransX(0)
    } else {
      setTransX(transX - 100)
    }
  }

  return (
    <section className="rcmdVideo">
      <div className="rcmdVideo-title">
        <h2>推荐视频</h2>
        <span>更多</span>
      </div>
      <div className="rcmdVideo-wrapper">
        <img
          src={require('common/Enum').imgList.leftArrow}
          alt=""
          width="40"
          className="rcmdVideo-list-control--left"
          onClick={scrollLeft}
        />
        <img
          src={require('common/Enum').imgList.leftArrow}
          alt=""
          width="40"
          className="rcmdVideo-list-control--right"
          onClick={scrollRight}
        />
        <div className="rcmdVideo-list">
          <ul style={{ transform: `translateX(${transX}%)` }}>{list}</ul>
        </div>
      </div>
    </section>
  )
}

export default Video
