import React, { useEffect, useState, MouseEvent } from 'react'
import { SongHome } from 'request/types/Recommend'
import Button from 'components/Common/Button'
import './index.scss'
import { formatSeconds } from 'common/utils'
import { useStore } from 'store'
import { GET_VKEY } from 'request/playlist'
import { useObserver } from 'mobx-react'
import { GET_SINGER_ALBUM, GET_SIM_SINGERS } from 'request/singer'
import { SingerAlbum } from 'request/types/Album'
import { NavLink } from 'react-router-dom'
import { GET_ALBUM_DETAIL } from 'request/album'
import { SimSinger } from 'request/types/Singer'

interface Props {
  songlist: SongHome[]
  mvIds: number[]
  singerMid: string
  scrollToTop?: () => void
  playSong: (song: SongHome, songlist: SongHome[]) => any
}

const SingerChoiceness: React.FC<Props> = props => {
  const store = useStore()
  const [albumlist, setAlbumList] = useState<SingerAlbum[]>()
  const [simSingers, setSimSingers] = useState<SimSinger[]>()

  useEffect(() => {
    ;(async () => {
      if (!props.singerMid) return
      try {
        const [singerDetail, simSingers] = await Promise.all([
          GET_SINGER_ALBUM(props.singerMid),
          GET_SIM_SINGERS(props.singerMid),
        ])
        setAlbumList(singerDetail.data.list)
        setSimSingers(simSingers.singers.items)
        props.scrollToTop?.()
      } catch (err) {
        console.log(err)
      }
    })()
  }, [props.singerMid]) // eslint-disable-line

  const playAll = async () => {
    store.playlistRank = props.songlist
    store.playType = 'singer'
    store.currentSong = props.songlist[0]
    const vkeyDetail = await GET_VKEY(props.songlist[0].mid)
    const songUrl = vkeyDetail.response.playLists[0]
    store.currentSongUrl = songUrl
    store.currentSong = props.songlist[0]
    store.currentSongmid = props.songlist[0].mid
    store.currentSongName = props.songlist[0].name
  }

  const playAlbumlist = async (e: MouseEvent, id: string) => {
    e.preventDefault()
    const result = await GET_ALBUM_DETAIL(id)
    console.log({ result })
    store.playType = 'album'
    store.playlistAlbum = result.req_2.data.songList.map(item => item.songInfo)
    store.currentSong = store.playlistAlbum[0]
    store.currentSongmid = store.currentSong.mid
    store.currentSongName = store.currentSong.name
    const vkeyDetail = await GET_VKEY(store.currentSongmid)
    const songUrl = vkeyDetail.response.playLists[0]
    store.currentSongUrl = songUrl
    store.isPlaying = true
  }

  return useObserver(() => (
    <div className="singer-choiceness">
      <div className="singer-choiceness__header">
        {albumlist?.slice(0, 2).map(album => (
          <NavLink to={`/album-detail/${album.albumMID}`} key={album.albumID}>
            <div className="singer-choiceness__header--album">
              <img
                src={`https://y.gtimg.cn/music/photo_new/T002R800x800M000${album.albumMID}.jpg?max_age=2592000`}
                alt=""
                width="60"
              />
              <span>{album.pubTime}</span>
              <span>{album.albumName}</span>
            </div>
          </NavLink>
        ))}
      </div>
      <div className="singer-choiceness__tittle">
        <h3>热门歌曲</h3>
        <Button onClick={playAll}>
          <img src={require('common/Enum').imgList.rv_play} className="play-icon" alt="" />
          播放全部
        </Button>
      </div>
      <ul className="songlist">
        <li className="songlist-item list-header">
          <span>歌曲</span>
          <span>专辑</span>
          <span>时长</span>
        </li>
        {props.songlist.map(song => (
          <li
            key={song.id}
            className={`songlist-item ${
              song.mid === store.currentSongmid && store.playType === 'singer' ? 'active-song' : ''
            }`}
            onDoubleClick={props.playSong(song, props.songlist)}
          >
            <div className="songlist-item--name one-line-ellipsis">
              <span className="songlist-item--name__text one-line-ellipsis">
                <span className="icon-wrapper"></span>
                {song.name}
              </span>
              <div className="songlist-item--icons">
                {song.pay.pay_play ? (
                  <img src={require('common/Enum').imgList.listVIPICon} alt="" />
                ) : null}
                {song.file.size_ape || song.file.size_flac ? (
                  <img src={require('common/Enum').imgList.listSQICon} alt="" />
                ) : null}
                {song.mv.id ? (
                  <img src={require('common/Enum').imgList.listMVICon} className="mv-icon" alt="" />
                ) : (
                  ''
                )}
              </div>
              <div className="songlist-item--controls">
                <span className="controls-icon" onClick={props.playSong(song, props.songlist)}>
                  <img
                    src={
                      store.isPlaying &&
                      store.currentSongmid === song.mid &&
                      store.playType === 'singer'
                        ? require('common/Enum').imgList.rvPause
                        : require('common/Enum').imgList.rv_play
                    }
                    className="icon-inner"
                    alt=""
                  />
                </span>
                <span className="controls-icon">
                  <img src={require('common/Enum').imgList.rvAdd} className="icon-inner" alt="" />
                </span>
                <span className="controls-icon">
                  <img
                    src={require('common/Enum').imgList.notDownload}
                    className="icon-inner"
                    alt=""
                  />
                </span>
                <span className="controls-icon">
                  <img src={require('common/Enum').imgList.rvMore} className="icon-inner" alt="" />
                </span>
              </div>
            </div>
            <span>{song.album.name}</span>
            <span>{formatSeconds(song.interval)}</span>
          </li>
        ))}
      </ul>
      <div className="hot-albums">
        <h2>热门专辑</h2>
        <ul className="hot-albums-list">
          {albumlist?.slice(2).map(item => (
            <li className="newest-cover cover-item" key={item.albumMID}>
              <NavLink to={`/album-detail/${item.albumMID}`}>
                <div className="newest-cover--bg cover-item--bg">
                  <img
                    src={`https://y.qq.com/music/photo_new/T002R300x300M000${item.albumMID}.jpg?max_age=2592000`}
                    alt=""
                  />
                  <span
                    className="cover-play--control"
                    onClick={event => playAlbumlist(event, item.albumMID)}
                  >
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
      <div className="similar-singers">
        <h2>相似歌手</h2>
        <ul className="singers-list">
          {simSingers?.map((singer, idx) => (
            <li className="singers-list__item" key={singer.id}>
              <NavLink to={`/singer-song/${singer.id}`}>
                <img src={singer.pic} className="singers-list__pic" alt={singer.name} />
              </NavLink>
              <h3 className="singers-list__name">
                {idx <= 2 ? (
                  <div className="singers-list__number top">
                    <span className="singers-list__number_bg icon_skin c_bg_skin"></span>
                    <span className={`singers-list__number_txt icon_skin txt_${idx + 1}`}></span>
                  </div>
                ) : (
                  ''
                )}
                <NavLink to={`/singer-song/${singer.id}`} className="one-line-ellipsis">
                  {singer.name}
                </NavLink>
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ))
}

export default SingerChoiceness
