import React, { useRef, useState } from 'react'
import './index.scss'
import { useStore } from 'store'

const Banner: React.FC = () => {
  const store = useStore()
  const [transX, setTransX] = useState(0)
  const focus = store.recommend.focus.data.content
  console.log({ focus })

  const imgList = focus.map((item) => (
    <li className="banner-content-list-item" key={item.id}>
      <img src={item.pic_info.url} alt="" />
    </li>
  ))

  const scrollRight = () => {
    const bodyWidth = document.body.getBoundingClientRect().width
    const MEDIA_MAX_WIDTH = 1610 // css 媒体查询宽度，超过此宽度显示3张轮播图
    const visibleImgCount = bodyWidth >= MEDIA_MAX_WIDTH ? 3 : 2
    const compareNum = (visibleImgCount / focus.length) * 100
    if (100 + transX === compareNum) {
      setTransX(0)
    } else if (transX - 2 * compareNum < -100) {
      setTransX(compareNum - 100)
    } else {
      setTransX(transX - compareNum)
    }
  }

  const scrollLeft = () => {
    const bodyWidth = document.body.getBoundingClientRect().width
    const MEDIA_MAX_WIDTH = 1610 // css 媒体查询宽度，超过此宽度显示3张轮播图
    const visibleImgCount = bodyWidth >= MEDIA_MAX_WIDTH ? 3 : 2
    const compareNum = (visibleImgCount / focus.length) * 100
    if (transX === 0) {
      setTransX(compareNum - 100)
    } else if (0 - transX < compareNum) {
      setTransX(0)
    } else {
      setTransX(transX + compareNum)
    }
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
      </div>
      <div className="banner-dot"></div>
    </div>
  )
}

export default Banner
