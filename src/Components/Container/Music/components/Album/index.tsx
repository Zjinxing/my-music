import React, { useEffect, useState } from 'react'
import Button from 'components/Common/Button'
import Banner from 'components/Common/Banner'
import { NavLink, useHistory } from 'react-router-dom'
import { GET_ALBUM_LIST } from 'request/album'
import { AlbumBanner, AlbumContent } from 'request/types/Album'
import './index.scss'

const Albumlist: React.FC = () => {
  const [banner, setBanner] = useState<AlbumBanner[]>([])
  const [albumList, setAlbumList] = useState<AlbumContent[]>([])
  const history = useHistory()

  const albumType: { [key: string]: any } = {
    newupload: '最新上架',
    weeksalewell: '本周最热',
    yinyueren: '音乐人专辑',
  }

  useEffect(() => {
    getAlbumlist()
  }, []) // eslint-disable-line

  const getAlbumlist = async () => {
    const albumList = await GET_ALBUM_LIST()
    setAlbumList(albumList.data.content)
    setBanner(albumList.data.banner)
    console.log(banner)
  }

  const handleBannerClick = (banner: any) => {
    console.log('点击轮播图', banner)
    const jumpUrl: string = banner.jumpurl
    const albumMid = jumpUrl.match(/(?<=mid=)\w+(?=&)/)
    history.push(`/album-detail/${albumMid}`)
  }

  return (
    <div className="album">
      <Banner imgList={banner} imgClick={handleBannerClick}></Banner>
      {albumList.map((albums, index) => (
        <div key={albums.type + index}>
          {albums.albumlist.length >= 4 && <h3>{albums.title || albumType[albums.type]}</h3>}
          <ul className="album-list">
            {albums.albumlist.length >= 4 &&
              albums.albumlist.map(item => (
                <li key={item.album_id} className="album-list-item">
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
                  <Button className="buy-btn">立即购买</Button>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Albumlist
