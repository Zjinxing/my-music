import React from 'react'
import { SongHome } from 'request/types/Recommend'

interface Props {
  songlist: SongHome[] | []
}

const SingerSongs: React.FC<Props> = props => {
  return <div className="singer-songs">歌手歌曲</div>
}

export default SingerSongs
