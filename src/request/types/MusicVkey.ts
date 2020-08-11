export interface MusicVkey {
  response: {
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
        midurlinfo: [] // TODO:
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
}
