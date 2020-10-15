import React, { useEffect, useRef, useState } from 'react'
import './index.scss'

interface Props {
  imgList: {
    picurl: string
    [key: string]: any
  }[]
  showDot?: boolean
  imgClick?: (banner: any) => any
}

const Banner: React.FC<Props> = props => {
  const [curDot, setCurDot] = useState(0)
  const [dotArr, setDotArr] = useState<number[]>([0])
  const ulEl = useRef<HTMLUListElement>(null)
  const MEDIA_MAX_WIDTH = 1610

  // 添加缩放监听事件，缩放重新渲染
  useEffect(() => {
    const resetCurDot = () => {
      const bodyWidth = document.body.getBoundingClientRect().width
      const visibleImgCount = bodyWidth >= MEDIA_MAX_WIDTH ? 3 : 2
      let dotCount = Math.ceil(props.imgList.length / visibleImgCount)
      const arr: number[] = []
      while (dotCount--) arr.unshift(dotCount)
      setDotArr(arr)
      setCurDot(0)
      ulEl.current?.scrollTo({ left: 0 })
    }
    resetCurDot()
    window.addEventListener('resize', resetCurDot)
    return () => {
      window.removeEventListener('resize', resetCurDot)
    }
  }, [props.imgList.length])

  const scrollLeft = () => {
    const bodyWidth = document.body.getBoundingClientRect().width
    const wrapperWidth = ulEl.current?.getBoundingClientRect().width || 0
    const wrapperScrollWidth = ulEl.current?.scrollWidth || 0
    const visibleImgCount = bodyWidth >= MEDIA_MAX_WIDTH ? 3 : 2
    const MARGIN_WIDTH = bodyWidth >= MEDIA_MAX_WIDTH ? 40 : 20
    const dotCount = Math.ceil(props.imgList.length / visibleImgCount)
    console.log({ wrapperWidth })
    if (curDot === 0) {
      const finalLeft = wrapperScrollWidth - wrapperWidth
      ulEl.current?.scrollTo({ left: finalLeft, behavior: 'auto' })
      setCurDot(dotCount - 1)
    } else {
      ulEl.current?.scrollTo({
        left: ulEl.current.scrollLeft - wrapperWidth - MARGIN_WIDTH,
        behavior: 'auto',
      })
      setCurDot(curDot - 1)
    }
  }

  const scrollRight = () => {
    const bodyWidth = document.body.getBoundingClientRect().width
    const wrapperWidth = ulEl.current?.getBoundingClientRect().width || 0
    const visibleImgCount = bodyWidth >= MEDIA_MAX_WIDTH ? 3 : 2
    const MARGIN_WIDTH = bodyWidth >= MEDIA_MAX_WIDTH ? 40 : 20
    const dotCount = Math.ceil(props.imgList.length / visibleImgCount)
    if (curDot === dotCount - 1) {
      ulEl.current?.scrollTo({ left: 0, behavior: 'auto' })
      setCurDot(0)
    } else {
      ulEl.current?.scrollTo({
        left: ulEl.current.scrollLeft + wrapperWidth + MARGIN_WIDTH,
        behavior: 'auto',
      })
      setCurDot(curDot + 1)
    }
  }

  const BannerDot = () => {
    return (
      <ul className="banner-dot">
        {dotArr.map(item => (
          <li className={`banner-dot-item ${item === curDot ? 'highlight' : ''}`} key={item}></li>
        ))}
      </ul>
    )
  }
  return (
    <div className="banner-wrapper">
      <span className="banner-arrow arrow--left" onClick={scrollLeft}>
        <img src={require('common/Enum').imgList.leftArrow} alt="" width="40" />
      </span>
      <span className="banner-arrow arrow--right" onClick={scrollRight}>
        <img src={require('common/Enum').imgList.leftArrow} alt="" width="40" />
      </span>
      <ul ref={ulEl} className="banner">
        {props.imgList?.map(item => (
          <li
            key={item.picurl}
            className="banner-item"
            onClick={() => props.imgClick && props.imgClick(item)}
          >
            <img src={item.picurl} alt="" width="100%" />
          </li>
        ))}
      </ul>
      {BannerDot()}
    </div>
  )
}

Banner.defaultProps = {
  imgList: [],
  showDot: false,
}

export default Banner
