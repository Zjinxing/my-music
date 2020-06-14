import React, { useState } from 'react'
import './index.scss'
import { useStore } from 'store'

const Banner: React.FC = () => {
  const store = useStore()
  const [transX, setTransX] = useState(0)
  const [curDot, setCurDot] = useState(0)
  const focus = store.recommend.focus.data.content
  const MEDIA_MAX_WIDTH = 1610 // css 媒体查询宽度，超过此宽度显示3张轮播图
  console.log({ focus })

  const scrollRight = () => {
    const bodyWidth = document.body.getBoundingClientRect().width
    const visibleImgCount = bodyWidth >= MEDIA_MAX_WIDTH ? 3 : 2
    const compareNum = (visibleImgCount / focus.length) * 100
    if (100 + transX === compareNum) {
      setTransX(0)
      setCurDot(0)
    } else if (transX - 2 * compareNum < -100) {
      setTransX(compareNum - 100)
      setCurDot(curDot + 1)
    } else {
      setTransX(transX - compareNum)
      setCurDot(curDot + 1)
    }
  }

  const scrollLeft = () => {
    const bodyWidth = document.body.getBoundingClientRect().width
    const visibleImgCount = bodyWidth >= MEDIA_MAX_WIDTH ? 3 : 2
    const compareNum = (visibleImgCount / focus.length) * 100
    if (transX === 0) {
      setTransX(compareNum - 100)
      setCurDot(Math.ceil(focus.length / visibleImgCount))
    } else if (0 - transX < compareNum) {
      setTransX(0)
      setCurDot(curDot - 1)
    } else {
      setTransX(transX + compareNum)
      setCurDot(curDot - 1)
    }
  }

  const imgList = focus.map((item) => (
    <li className="banner-content-list-item" key={item.id}>
      <img src={item.pic_info.url} alt="" />
    </li>
  ))

  const BannerDot = () => {
    const bodyWidth = document.body.getBoundingClientRect().width
    const visibleImgCount = bodyWidth >= MEDIA_MAX_WIDTH ? 3 : 2
    let dotCount = Math.ceil(focus.length / visibleImgCount)
    const arr: number[] = []
    while (dotCount--) arr.unshift(dotCount)
    return arr.map((item) => (
      <li className={`banner-dot-item ${item === curDot ? 'highlight' : ''}`} key={item}></li>
    ))
  }
  return (
    <div className="banner">
      <img
        src={require('common/Enum').imgList.leftArrow}
        alt=""
        width="40"
        className="banner-control--left"
        onClick={scrollLeft}
      />
      <img
        src={require('common/Enum').imgList.leftArrow}
        alt=""
        width="40"
        className="banner-control--right"
        onClick={scrollRight}
      />
      <div className="banner-content">
        <ul
          className="banner-content-list"
          style={{
            transform: `translateX(${transX}%
          )`,
          }}
        >
          {imgList}
        </ul>
        <ul className="banner-dot">{BannerDot()}</ul>
      </div>
    </div>
  )
}

export default Banner
