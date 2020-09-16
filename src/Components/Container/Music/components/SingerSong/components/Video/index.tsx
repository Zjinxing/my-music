import React, { useEffect, useState } from 'react'
import { GET_SINGER_MV } from 'request/singer'
import { Mv } from 'request/types/Singer'
import './index.scss'
import { useObserver } from 'mobx-react'

interface Props {
  singermid: string
}
const SingerVideo: React.FC<Props> = props => {
  const [mvlist, setMvlist] = useState<Mv[]>()
  const [order, setOrder] = useState(0)
  const [page, setPage] = useState(0)
  useEffect(() => {
    ;(async () => {
      const res = await GET_SINGER_MV(props.singermid)
      setMvlist(res.req_0.data.list)
    })()
  }, [props.singermid])
  const getSingerMv = async (order = 0) => {
    setOrder(order)
    const res = await GET_SINGER_MV(props.singermid, order)
    setMvlist(res.req_0.data.list)
  }
  return useObserver(() => (
    <div className="singer-video">
      <div className="singer-video--header">
        <ul className="singer-video-order">
          <li className={`${order === 0 ? 'active-order' : ''}`} onClick={() => getSingerMv(0)}>
            最新
          </li>
          <li className={`${order === 1 ? 'active-order' : ''}`} onClick={() => getSingerMv(1)}>
            最热
          </li>
        </ul>
      </div>
      <ul className="singer-video-list">
        {mvlist?.map(mv => (
          <li key={mv.mvid} className="singer-mv-list-item video-list-item">
            <div className="video-cover">
              <img src={mv.picurl} alt="" width="100%" className="video-cover--bg" />
              <span className="video-cover--control">
                <img src={require('common/Enum').imgList.play} alt="" />
              </span>
            </div>
            <span className="list-item--title">{mv.title}</span>
          </li>
        ))}
      </ul>
    </div>
  ))
}

export default SingerVideo
