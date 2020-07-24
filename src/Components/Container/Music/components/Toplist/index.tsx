import React, { useEffect, useState } from 'react'
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
                <div className="toplist-top">
                  {item.toplist.map(toplist => (
                    <div className="toplist-top--item">
                      <ListCover imgUrl={toplist.frontPicUrl} count={toplist.listenNum}></ListCover>
                      <div className="toplist-top--list">
                        <h3>{toplist.title}</h3>
                        <ul>
                          {toplist.song.map((song, idx) => (
                            <li className="one-line-ellipsis">{`${idx + 1} ${song.title} - ${
                              song.singerName
                            }`}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          })}
          <div>地区榜</div>
          <div>特色榜</div>
          <div>全球榜</div>
        </>
      )}
    </div>
  )
}

export default Rank
