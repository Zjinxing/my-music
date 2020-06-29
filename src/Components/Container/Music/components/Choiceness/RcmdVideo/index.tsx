import React from 'react'
import MvCover from 'components/Common/MvCover'
import { VideoData } from 'request/types/Recommend'
import './index.scss'

interface Props {
  mvList: VideoData[]
}

const Video: React.FC<Props> = props => {
  const list = props.mvList.map(mv => <MvCover mvData={mv} key={mv.vid} />)
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
        />
        <img
          src={require('common/Enum').imgList.leftArrow}
          alt=""
          width="40"
          className="rcmdVideo-list-control--right"
        />
        <div className="rcmdVideo-list">
          <ul>{list}</ul>
        </div>
      </div>
    </section>
  )
}

export default Video
