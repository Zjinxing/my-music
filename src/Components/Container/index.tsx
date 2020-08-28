import React, { useState, FormEvent, KeyboardEvent } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react'
import PlaylistDetail from 'components/Common/PlaylistDetail'
import AlbumDetail from 'components/Common/AlbumDetail'
import Music from './Music'
import './index.scss'
import Video from './Video'
import Radio from './Radio'
import Favorite from './Favorite'
import Local from './Local'
import DownLoad from './Download'
import PlayHistory from './PlayHistory'
import PlayControl from './PlayControl'
import ToplistDetail from './ToplistDetail'
import SingerSong from './Music/components/SingerSong'

interface Props {
  code: number
}

const Container: React.FC<Props> = observer(({ code }) => {
  const [searchBgClass, setSearchBgClass] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const history = useHistory()

  const handleFocus = () => {
    setSearchBgClass('focus')
  }

  const handleBlur = () => {
    setSearchBgClass('')
    setSearchValue('')
  }

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    const { value = '' } = event.target as HTMLInputElement
    setSearchValue(value)
  }

  const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      console.log({ searchValue })
    }
  }

  return (
    <div className="container">
      <div className="container-header drag">
        <div className="container-header--left">
          <span className="nav-action">
            <img
              src={require('common/Enum').imgList.backAction}
              onClick={() => {
                history.go(-1)
              }}
              width="22"
              alt=""
            />
            <img src={require('common/Enum').imgList.nextAction} width="22" alt="" />
          </span>
          <div className="search-input">
            <span className={`search-input--bg ${searchBgClass}`}>
              <img src={require('common/Enum').imgList.searchIcon} width="16" alt="" />
              搜索音乐
            </span>
            <input
              value={searchValue}
              type="text"
              className="search-input__inner"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleInput}
              onKeyUp={handleSearch}
            />
          </div>
        </div>
        <div className="container-header--right">
          <span className="login">
            <img
              src={require('common/Enum').imgList.defaultUser}
              alt=""
              width="28"
              className="defaultUser"
            />
            点击登录
          </span>
          <img src={require('common/Enum').imgList.commentNormal} alt="" className="comment" />
          <img src={require('common/Enum').imgList.skin} alt="" className="skin" />
          <img src={require('common/Enum').imgList.setting} alt="" className="setting" />
          <img src={require('common/Enum').imgList.toMini} alt="" className="toMini" width="18" />
        </div>
      </div>
      {code === 0 ? (
        <div className="container-body">
          <Route path="/music" component={Music}></Route>
          <Route path="/video" component={Video}></Route>
          <Route path="/radio" component={Radio}></Route>
          <Route path="/favorite" component={Favorite}></Route>
          <Route path="/local" component={Local}></Route>
          <Route path="/download" component={DownLoad}></Route>
          <Route path="/playHistory" component={PlayHistory}></Route>
          <Route path="/playlist-detail/:id" component={PlaylistDetail}></Route>
          <Route path="/album-detail/:id" component={AlbumDetail}></Route>
          <Route path="/toplist-detail/:topId" component={ToplistDetail}></Route>
          <Route path="/singer-song/:singerId" component={SingerSong}></Route>
          <Redirect path="/" to={{ pathname: '/music' }}></Redirect>
        </div>
      ) : (
        'loading...'
      )}
      <PlayControl></PlayControl>
    </div>
  )
})

export default Container
