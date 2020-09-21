import Button from 'components/Common/Button'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { GET_ALBUM_LIST } from 'request/album'
import { AlbumBanner, AlbumContent } from 'request/types/Album'
import './index.scss'

const Albumlist: React.FC = () => {
  const [banner, setBanner] = useState<AlbumBanner[]>([])
  const [albumList, setAlbumList] = useState<AlbumContent[]>([])

  const albumType: { [key: string]: any } = {
    newupload: '最新上架',
    weeksalewell: '本周最热',
    yinyueren: '音乐人专辑',
  }

  useEffect(() => {
    getAlbumlist()
  }, [])

  const getAlbumlist = async () => {
    const albumList = await GET_ALBUM_LIST()
    setAlbumList(albumList.data.content)
    setBanner(albumList.data.banner)
  }

  return (
    <div className="album">
      {albumList.map(albums => (
        <>
          <h3>{albums.title || albumType[albums.type]}</h3>
          <ul className="album-list">
            {albums.albumlist.map(item => (
              <li className="album-list-item">
                <NavLink to={`/album-detail/${item.album_mid}`} className="album-list-nav">
                  <img
                    className="album-list--cover"
                    src={`https://y.qq.com/music/photo_new/T002R300x300M000${item.album_mid}.jpg?max_age=2592000`}
                    alt=""
                    width="100%"
                  />
                  <span className="album--name one-line-ellipsis">{item.album_name}</span>
                  <span className="album--singer one-line-ellipsis">{item.singer_name}</span>
                  <span className="album--price">￥{(item.price / 100).toFixed(2)}</span>
                </NavLink>
                <Button>立即购买</Button>
              </li>
            ))}
          </ul>
        </>
      ))}
    </div>
  )
}

export default Albumlist
