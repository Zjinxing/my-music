import React, { useEffect, useState } from 'react'
import {
  RouteComponentProps,
  useRouteMatch,
  NavLink,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { GET_SINGERSONG } from 'request/singer'
import Button from 'components/Common/Button'
import './index.scss'
import SingerChoiceness from './components/Choiceness'
import SingerSongs from './components/Songs'
import SingerAlbum from './components/Album'
import SingerVideo from './components/Video'
import SingerDetail from './components/Detail'
import { SongHome } from 'request/types/Recommend'

interface RouteProps {
  singerid: string
}

const SingerSong: React.FC<RouteComponentProps<RouteProps>> = props => {
  const [singerMid, setSingerMid] = useState<string>('')
  const [singerName, setSingerName] = useState('')
  const [songlist, setSonglist] = useState<SongHome[]>([])
  const [mvIds, setMvIds] = useState<number[]>([])
  const { path, url } = useRouteMatch()

  useEffect(() => {
    ;(async () => {
      try {
        const result = await GET_SINGERSONG(props.match.params.singerid)
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
  return (
    <div className="singerDetail">
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
            <SingerChoiceness mvIds={mvIds} songlist={songlist}></SingerChoiceness>
          </Route>
          <Route path={`${path}/songs`}>
            <SingerSongs songlist={songlist}></SingerSongs>
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
