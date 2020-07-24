export interface TopInnerSong {
  rank: number
  rankType: number
  rankValue: string
  recType: number
  songId: number
  vid: string
  albumMid: string
  title: string
  singerName: string
  singerMid: string
  songType: number
  uuidCnt: number
}

export interface ToplistInner {
  topId: number
  recType: number
  topType: number
  updateType: number
  title: string
  titleDetail: string
  titleShare: string
  titleSub: string
  intro: string
  cornerMark: number
  period: string
  updateTime: string
  history: {
    year: number[]
    subPeriod: Array<number>[]
  }
  listenNum: number
  totalNum: number
  song: TopInnerSong[]
  headPicUrl: string
  frontPicUrl: string
  mbFrontPicUrl: string
  mbHeadPicUrl: string
  pcSubTopIds: number[]
  pcSubTopTitles: string[]
  subTopIds: number[]
  adJumpUrl: string
  h5JumpUrl: string
  url_key: string
  url_params: string
  tjreport: string
  rt: number
  updateTips: string
  bannerText: string
  AdShareContent: string
  abt: string
  cityId: number
  provId: number
  sinceCV: number
  musichallTitle: string
  musichallSubtitle: string
  musichallPicUrl: string
}

export interface ToplistGroup {
  groupId: number
  groupName: string
  toplist: ToplistInner[]
  type: number
}

export interface Toplist {
  code: number
  ts: number
  start_ts: number
  req_0: {
    code: number
    data: {
      refreshInterval: number
      abt: string
      group: ToplistGroup[]
    }
  }
}
