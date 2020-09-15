import React, { useEffect, useState } from 'react'
import { GET_SINGER_ALBUM } from 'request/singer'
import { SingerAlbum } from 'request/types/Album'
import { NavLink } from 'react-router-dom'
import './index.scss'
import { useObserver } from 'mobx-react'

interface Props {
  singermid: string
}

const SingerAlbumList: React.FC<Props> = props => {
  const [albumList, setAlbumList] = useState<SingerAlbum[]>()
  const [albumType, setAlbumType] = useState('')
  const [order, setOrder] = useState('time')
  const albumTypes = [
    { label: '全部', value: '' },
    { label: '录音室专辑', value: '0' },
    { label: 'EP单曲', value: '11' },
    { label: '现场专辑', value: '1' },
  ]
  useEffect(() => {
    ;(async () => {
      if (props.singermid) {
        const res = await GET_SINGER_ALBUM(props.singermid, 0, 20, 'time')
        setAlbumList(res.data.list)
      }
    })()
  }, [props.singermid])

  const getAlbums = async (type: string = '', order = 'time') => {
    setAlbumType(type)
    setOrder(order)
    try {
      const res = await GET_SINGER_ALBUM(props.singermid, 0, 20, order, type)
      setAlbumList(res.data.list)
    } catch (err) {
      console.log(err)
    }
  }
  return useObserver(() => (
    <div className="singer-album">
      <div className="singer-album-header">
        <ul className="singer-album-classes">
          {albumTypes.map(item => (
            <li
              className={item.value === albumType ? 'active-album' : ''}
              key={item.label}
              onClick={() => getAlbums(item.value, order)}
            >
              {item.label}
            </li>
          ))}
        </ul>
        <ul className="singer-album-classes">
          <li
            className={order === 'time' ? 'active-album' : ''}
            onClick={() => getAlbums(albumType, 'time')}
          >
            最新
          </li>
          <li
            className={order === 'listen' ? 'active-album' : ''}
            onClick={() => getAlbums(albumType, 'listen')}
          >
            最热
          </li>
        </ul>
      </div>
      <ul className="hot-albums-list">
        {albumList?.map(item => (
          <li className="newest-cover cover-item" key={item.albumMID}>
            <NavLink to={`/album-detail/${item.albumMID}`}>
              <div className="newest-cover--bg cover-item--bg">
                <img
                  src={`https://y.qq.com/music/photo_new/T002R300x300M000${item.albumMID}.jpg?max_age=2592000`}
                  alt=""
                />
                <span className="cover-play--control">
                  <img src={require('common/Enum').imgList.play} alt="" />
                </span>
              </div>
              <span className="cover-title">{item.albumName}</span>
              <span className="cover-createdAt">{item.pubTime}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  ))
}

export default SingerAlbumList
