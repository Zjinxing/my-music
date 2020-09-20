interface MidurlInfo {
  common_downfromtag: number
  errtype: string
  filename: string
  flowfromtag: string
  flowurl: string
  hisbuy: number
  hisdown: number
  isbuy: number
  isonly: number
  onecan: number
  opi128kurl: string
  opi192koggurl: string
  opi192kurl: string
  opi30surl: string
  opi48kurl: string
  opi96kurl: string
  opiflackurl: string
  p2pfromtag: number
  pdl: number
  pneed: number
  pneedbuy: number
  premain: number
  purl: string
  qmdlfromtag: number
  result: number
  songmid: string
  tips: string
  uiAlert: number
  vip_downfromtag: number
  vkey: string
  wififromtag: string
  wifiurl: string
}

export interface MusicVkey {
  req: {
    data: {
      expiration: number
      freeflowsip: string[]
      keepalivefile: string
      msg: string
      retcode: number
      servercheck: string
      sip: string[]
      testfile2g: string
      testfilewifi: string
      uin: string
      userip: string
      vkey: string
    }
    code: number
  }
  req_0: {
    data: {
      expiration: number
      login_key: string
      midurlinfo: MidurlInfo[]
      msg: string
      retcode: number
      servercheck: string
      sip: string[]
      testfile2g: string
      testfilewifi: string
      thirdip: string[]
      uin: string
      verify_type: number
    }
    code: number
  }
  code: number
  ts: number
  playLists: string[]
}
