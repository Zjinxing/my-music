import React, { useEffect, useState, useRef } from 'react'
import { SongHome } from 'request/types/Recommend'
import { GET_SINGER_SONG } from 'request/singer'
import { SongInfo } from 'request/types/Singer'
import Button from 'components/Common/Button'
import './index.scss'
import { useStore } from 'store'
import { formatSeconds } from 'common/utils'
import { useObserver } from 'mobx-react'

interface Props {
  playSong: (song: SongHome, songlist: SongHome[]) => any
  observerWrapper: HTMLDivElement
}

const SingerSongs: React.FC<Props> = props => {
  const [songlist, setSonglist] = useState<SongHome[]>([])
  const store = useStore()
  const observerEl = useRef<HTMLLIElement>(null)
  const songlistRef = useRef<SongHome[]>([])

  useEffect(() => {
    observer.observe(observerEl.current as HTMLElement)
    return () => {
      observer.unobserve(observerEl.current as HTMLElement)
    }
  }, []) // eslint-disable-line

  const getSingerSongs = async (begin: number = 0, num: number = 30) => {
    try {
      const res = await GET_SINGER_SONG(begin, num)
      const songs = res.data.list.map(item => (item.musicData as any) as SongHome)
      setSonglist(preSonglist => {
        const newList = [...preSonglist, ...songs]
        songlistRef.current = newList
        return newList
      })
    } catch (err) {
      console.log(err)
    }
  }

  const loadMoreSongs = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    const { intersectionRatio } = entry
    console.log({ intersectionRatio, entry })
    const begin = songlistRef.current.length
    getSingerSongs(begin)
  }

  const observer = new IntersectionObserver(loadMoreSongs, {
    root: props.observerWrapper,
    rootMargin: '50px',
    threshold: 0,
  })

  return useObserver(() => (
    <div className="singer-songs">
      <div className="singer-songs-header">
        <Button>
          <img src={require('common/Enum').imgList.rv_play} className="play-icon" alt="" />
          播放全部
        </Button>
        <Button>下载</Button>
        <Button>批量操作</Button>
      </div>
      <ul className="songlist">
        <li className="songlist-item list-header">
          <span>歌曲</span>
          <span>专辑</span>
          <span>时长</span>
        </li>
        {songlist?.map(song => (
          <li
            key={song.id}
            className={`songlist-item ${
              song.mid === store.currentSongmid && store.playType === 'singer' ? 'active-song' : ''
            }`}
            onDoubleClick={props.playSong(song, songlist)}
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
                <span
                  className="controls-icon"
                  onClick={props.playSong(
                    (song as any) as SongHome,
                    (songlist as unknown) as SongHome[]
                  )}
                >
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
        <li ref={observerEl} className="observer-el"></li>
      </ul>
    </div>
  ))
}

export default SingerSongs
