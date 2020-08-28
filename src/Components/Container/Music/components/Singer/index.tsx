import React, { useEffect, useState } from 'react'
import Button from 'components/Common/Button'
import './index.scss'
import { GET_SINGERS } from 'request/singer'
import { SingerArea, HotSinger } from 'request/types/Singer'
import { NavLink } from 'react-router-dom'

// TODO: 无限滚动
const Singer: React.FC = () => {
  const [area, setArea] = useState<SingerArea[]>()
  const [curArea, setCurArea] = useState<number>()
  const [index, setIndex] = useState<SingerArea[]>()
  const [curIndex, setCurIndex] = useState<number>()
  const [genre, setGenre] = useState<SingerArea[]>()
  const [curGenre, setCurGenre] = useState<number>()
  const [sex, setSex] = useState<SingerArea[]>()
  const [curSex, setCurSex] = useState<number>()
  const [singerlist, setSingerlist] = useState<HotSinger[]>()

  useEffect(() => {
    ;(async () => {
      try {
        const res = await GET_SINGERS()
        console.log(res)
        const { area, index, sex, genre } = res.singerList.data.tags
        const {
          area: curArea,
          index: curIndex,
          sex: curSex,
          genre: curGenre,
          singerlist,
        } = res.singerList.data
        setArea(area)
        setCurArea(curArea)
        setIndex(index)
        setCurIndex(curIndex)
        setGenre(genre)
        setCurGenre(curGenre)
        setSex(sex)
        setCurSex(curSex)
        setSingerlist(singerlist)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  return (
    <div className="singers">
      <div className="singers-filter">
        <div className="singers-filter__area">
          {area?.map(item => (
            <Button
              key={item.id}
              type={item.id === curArea ? 'primary' : ''}
              className="singers-btn"
            >
              {item.name}
            </Button>
          ))}
        </div>
        <div className="singers-filter__sex">
          {sex?.map(item => (
            <Button
              key={item.id}
              type={item.id === curSex ? 'primary' : ''}
              className="singers-btn"
            >
              {item.name}
            </Button>
          ))}
        </div>
      </div>
      <div className="singers-content">
        <ul className="singers-list">
          {singerlist?.slice(0, 10).map((singer, idx) => (
            <li className="singers-list__item" key={singer.singer_id}>
              <NavLink to={`/singer-song/${singer.singer_id}`}>
                <img
                  src={singer.singer_pic}
                  className="singers-list__pic"
                  alt={singer.singer_name}
                />
              </NavLink>
              <h3 className={`singers-list__name ${idx >= 10 ? 'only-name' : ''}`}>
                {idx <= 2 ? (
                  <div className="singers-list__number top">
                    <span className="singers-list__number_bg icon_skin c_bg_skin"></span>
                    <span className={`singers-list__number_txt icon_skin txt_${idx + 1}`}></span>
                  </div>
                ) : (
                  ''
                )}
                <NavLink to={`/singer-song/${singer.singer_id}`} className="one-line-ellipsis">
                  {singer.singer_name}
                </NavLink>
              </h3>
            </li>
          ))}
        </ul>
        <ul className="singers-list">
          {singerlist?.slice(10).map(singer => (
            <li className="singers-list__item" key={singer.singer_id}>
              <h3 className="singers-list__name only-name">
                <NavLink to={`/singer-song/${singer.singer_id}`} className="one-line-ellipsis">
                  {singer.singer_name}
                </NavLink>
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Singer
