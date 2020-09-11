import React, { useEffect, useState, useRef } from 'react'
import {
  RouteComponentProps,
  useRouteMatch,
  NavLink,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { GET_SINGER_DETAIL } from 'request/singer'
import Button from 'components/Common/Button'
import './index.scss'
import SingerChoiceness from './components/Choiceness'
import SingerSongs from './components/Songs'
import SingerAlbum from './components/Album'
import SingerVideo from './components/Video'
import SingerDetail from './components/Detail'
import { SongHome } from 'request/types/Recommend'
import { useStore } from 'store'
import { GET_VKEY } from 'request/playlist'

interface RouteProps {
  singerid: string
}

const SingerSong: React.FC<RouteComponentProps<RouteProps>> = props => {
  const [singerMid, setSingerMid] = useState<string>('')
  const [singerName, setSingerName] = useState('')
  const [songlist, setSonglist] = useState<SongHome[]>([])
  const [mvIds, setMvIds] = useState<number[]>([])
  const { path, url } = useRouteMatch()
  const store = useStore()

  const singerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const result = await GET_SINGER_DETAIL(props.match.params.singerid)
        console.log(result)
        const { Fsinger_mid, Fsinger_name } = result.getSingerInfo
        setSingerMid(Fsinger_mid)
        setSingerName(Fsinger_name)
        setSonglist(result.getSongInfo)
        setMvIds(result.getMvids)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [props.match.params.singerid])

  const scrollToTop = () => {
    const parentEl = singerRef.current?.parentElement as HTMLDivElement
    parentEl.scrollTop = 0
  }

  const playSong = (song: SongHome, songlist: SongHome[]) => {
    return async () => {
      store.playlistRank = songlist
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

  return (
    <div ref={singerRef} className="singerDetail">
      <div className="singer-header">
        {singerMid && (
          <img
            src={`https://y.gtimg.cn/music/photo_new/T001R300x300M000${singerMid}.jpg?max_age=2592000`}
            alt=""
            className="singer-header__cover"
            width="170"
          />
        )}
        <div className="singer-intro">
          <h2>{singerName}</h2>
          <p>这里是简介，找不到从哪获取，假装这就是简介了。。。</p>
          <p className="singer-fans">粉丝数：183.3万</p>
          <Button type="primary" className="singer-intro-btn">
            +关注
          </Button>
          <Button className="singer-intro-btn">+歌手电台</Button>
          <Button className="more">
            <span className="more-icon"></span>
          </Button>
        </div>
      </div>
      <ul className="singer-nav">
        <li className="singer-nav__item">
          <NavLink to={`${url}/choiceness`} activeClassName="singer-active">
            精选
          </NavLink>
        </li>
        <li className="singer-nav__item">
          <NavLink to={`${url}/songs`} activeClassName="singer-active">
            歌曲
          </NavLink>
        </li>
        <li className="singer-nav__item">
          <NavLink to={`${url}/album`} activeClassName="singer-active">
            专辑
          </NavLink>
        </li>
        <li className="singer-nav__item">
          <NavLink to={`${url}/singer-video`} activeClassName="singer-active">
            视频
          </NavLink>
        </li>
        <li className="singer-nav__item">
          <NavLink to={`${url}/detail`} activeClassName="singer-active">
            详情
          </NavLink>
        </li>
      </ul>
      <div className="singer-content">
        <Switch>
          <Route path={`${path}/choiceness`}>
            <SingerChoiceness
              mvIds={mvIds}
              songlist={songlist}
              singerMid={singerMid}
              scrollToTop={scrollToTop}
              playSong={playSong}
            ></SingerChoiceness>
          </Route>
          <Route path={`${path}/songs`}>
            <SingerSongs
              singermid={singerMid}
              playSong={playSong}
              observerWrapper={singerRef.current?.parentElement as HTMLDivElement}
            ></SingerSongs>
          </Route>
          <Route path={`${path}/album`} component={SingerAlbum}></Route>
          <Route path={`${path}/singer-video`} component={SingerVideo}></Route>
          <Route path={`${path}/detail`} component={SingerDetail}></Route>
          <Redirect path={path} to={{ pathname: `${path}/choiceness` }}></Redirect>
        </Switch>
      </div>
    </div>
  )
}

export default SingerSong
