import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getToplist } from 'request/topList'
import { ToplistGroup } from 'request/types/Toplist'
import './index.scss'
import ListCover from './ListCover'

const Rank: React.FC = () => {
  const [code, setCode] = useState(-1)
  const [list, setList] = useState<ToplistGroup[]>([])
  useEffect(() => {
    ;(async () => {
      const list = await getToplist()
      const { code, req_0 } = list
      setCode(code)
      if (code === 0) {
        setList(req_0.data.group)
      }
    })()
  }, [])

  return (
    <div>
      {code !== 0 && !list?.length ? (
        'loading...'
      ) : (
        <>
          {list.map((item, index) => {
            if (index === 0) {
              return (
                <div className="toplist-top" key={item.groupId}>
                  {item.toplist.map(toplist => (
                    <NavLink
                      to={`/toplist-detail/${toplist.topId}`}
                      className="toplist-top--item"
                      key={toplist.topId}
                    >
                      <ListCover imgUrl={toplist.frontPicUrl} count={toplist.listenNum}></ListCover>
                      <div className="toplist-top--list">
                        <h3>{toplist.title}</h3>
                        <ul>
                          {toplist.song.map((song, idx) => (
                            <li className="one-line-ellipsis" key={song.title}>
                              {`${idx + 1} ${song.title} - ${song.singerName}`}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </NavLink>
                  ))}
                </div>
              )
            }
            return (
              <div className="toplist-other" key={item.groupId}>
                <h2>{item.groupName}</h2>
                <div className="toplist-other--items">
                  {item.toplist.map(toplist => (
                    <NavLink to={`/toplist-detail/${toplist.topId}`} key={toplist.topId}>
                      <ListCover
                        imgUrl={toplist.frontPicUrl}
                        count={toplist.listenNum}
                        key={toplist.topId}
                      />
                    </NavLink>
                  ))}
                </div>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}

export default Rank
