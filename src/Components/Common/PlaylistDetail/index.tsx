import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { GET_LIST_DETAIL } from 'request/playlist'

interface RouteProps {
  id: string
}

const PlaylistDetail: React.FC<RouteComponentProps<RouteProps>> = props => {
  useEffect(() => {
    ;(async () => {
      const res = await GET_LIST_DETAIL(props.match.params.id)
      console.log(res)
    })()
  })

  console.log('ID', props.match.params.id)
  return <div>歌单列表详情页</div>
}

export default PlaylistDetail
