import React, { useState, FormEvent } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react'
import Music from './Music'
import './index.scss'
import Video from './Video'
import Radio from './Radio'
import Favorite from './Favorite'
import Local from './Local'
import DownLoad from './Download'
import PlayHistory from './PlayHistory'

const Container: React.FC = observer(() => {
  const [searchBgClass, setSearchBgClass] = useState('')
  const [searchValue, setSearchValue] = useState('')

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

  return (
    <div className="container">
      <div className="container-header drag">
        <div className="container-header--left">
          <span className="nav-action">
            <img src={require('common/Enum').imgList.backAction} width="22" alt="" />
            <img src={require('common/Enum').imgList.nextAction} width="22" alt="" />
          </span>
          <div className="search-input">
            <span className={`search-input--bg ${searchBgClass}`}>
              <img src={require('common/Enum').imgList.searchIcon} width="12" alt="" />
              搜索音乐
            </span>
            <input
              value={searchValue}
              type="text"
              className="search-input__inner"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleInput}
            />
          </div>
        </div>
      </div>
      <div className="container-body">
        <Route path="/music" component={Music}></Route>
        <Route path="/video" component={Video}></Route>
        <Route path="/radio" component={Radio}></Route>
        <Route path="/favorite" component={Favorite}></Route>
        <Route path="/local" component={Local}></Route>
        <Route path="/download" component={DownLoad}></Route>
        <Route path="/playHistory" component={PlayHistory}></Route>
        <Redirect path="/" to={{ pathname: '/music' }}></Redirect>
      </div>
      <div className="container-footer">底部播放控制</div>
    </div>
  )
})

export default Container
