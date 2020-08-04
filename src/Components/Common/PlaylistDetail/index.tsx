import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { GET_LIST_DETAIL } from 'request/playlist'
import { Cdlist } from 'request/types/Playlist'
import Button from 'components/Common/Button'
import './index.scss'

interface RouteProps {
  id: string
}

const PlaylistDetail: React.FC<RouteComponentProps<RouteProps>> = props => {
  const [listDetail, setListDetail] = useState<Cdlist>()
  useEffect(() => {
    ;(async () => {
      const res = await GET_LIST_DETAIL(props.match.params.id)
      console.log(res)
      setListDetail(res.response.cdlist[0])
    })()
  }, [props.match.params.id])

  console.log('ID', props.match.params.id)
  return (
    <div className="playlist">
      <div className="playlist-header">
        <img src={listDetail?.logo} alt="" width="170" className="playlist-header--logo" />
        <div className="header-detail">
          <h1>{listDetail?.dissname}</h1>
          <p className="header-info">
            <img src={listDetail?.headurl} alt="" width="24" className="header-info--avatar" />
            <span className="header-info--nick">{listDetail?.nickname}</span>
            {listDetail?.tags.map(tag => (
              <span className="header-info--tags">#{tag.name}</span>
            ))}
          </p>
          <p className="header-desc one-line-ellipsis">{listDetail?.desc}</p>
          <div className="header-controls">
            <Button type="primary" className="header-controls-btn">
              <img src={require('common/Enum').imgList.rv_play} className="prefix-icon" alt="" />
              播放全部
            </Button>
            <Button className="header-controls-btn">
              <img src={require('common/Enum').imgList.bvNotLike} className="prefix-icon" alt="" />
              收藏
            </Button>
            <Button className="header-controls-btn more">
              <span className="more-icon"></span>
            </Button>
          </div>
        </div>
      </div>
      <div className="playlist-content">CONTENT</div>
    </div>
  )
}

export default PlaylistDetail
