import React from 'react'
import { SongHome } from 'request/types/Recommend'
import Button from 'components/Common/Button'
import './index.scss'
import { formatSeconds } from 'common/utils'
import { useStore } from 'store'
import { GET_VKEY } from 'request/playlist'
import { useObserver } from 'mobx-react'

interface Props {
  songlist: SongHome[]
  mvIds: number[]
}

const SingerChoiceness: React.FC<Props> = props => {
  const store = useStore()

  const playSong = (song: SongHome) => {
    return async () => {
      store.playlistRank = props.songlist
      store.playType = 'singer'
      if (store.isPlaying && store.currentSongmid === song.mid) {
        // 处理正在播放当前歌曲
        store.isPlaying = false
      } else {
        store.currentSong = song
        const vkeyDetail = await GET_VKEY(song.mid)
        const songUrl = vkeyDetail.response.playLists[0]
        store.currentSongUrl = songUrl
        store.currentSong = song
        store.currentSongmid = song.mid
        store.currentSongName = song.name
      }
    }
  }

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

  return useObserver(() => (
    <div className="singer-choiceness">
      <div className="singer-choiceness__header">{/* 两个专辑 */}</div>
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
                <span className="controls-icon" onClick={playSong(song)}>
                  <img
                    src={
                      store.isPlaying && store.currentSongmid === song.mid
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
    </div>
  ))
}

export default SingerChoiceness
