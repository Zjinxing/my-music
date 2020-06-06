import { SingerBase } from './Album'

export interface HotSinger {
  country: string
  singer_id: number
  singer_mid: string
  singer_name: string
  singer_pic: string
}

export interface SingerArea {
  id: number
  name: string
}

export interface HotSingerRes {
  code: number
  ts: number
  singerList: {
    code: number
    data: {
      area: number
      genre: number
      index: number
      sex: number
      singerlist: HotSinger[]
      tags: {
        area: SingerArea[]
        genre: { id: number; name: string }[]
        index: { id: number; name: string }[]
        sex: { id: number; name: string }[]
      }
      total: number
    }
  }
}

interface Singer extends SingerBase {
  title: string
  type: number
  uin: number
}

export interface SongInfo {
  songInfo: {
    action: {
      switch: number
      msgid: number
      alert: number
      icons: number
      msgshare: number
      msgfav: number
      msgdown: number
      msgpay: number
    }
    aid: number
    album: {
      id: number
      mid: string
      name: string
      pmid: string
      subtitle: string
      time_public: string
      title: string
    }
    bpm: number
    data_type: number
    es: string
    file: {
      b_30s: number
      e_30s: number
      hires_bitdepth: number
      hires_sample: number
      media_mid: string
      size_24aac: number
      size_48aac: number
      size_96aac: number
      size_192aac: number
      size_192ogg: number
      size_128mp3: number
      size_320mp3: number
      size_ogg: number
      size_128: number
      size_320: number
      size_ape: number
      size_flac: number
      size_dts: number
      url: string
    }
    fnote: number
    genre: number
    id: number
    index_album: number
    index_cd: number
    interval: number
    isonly: number
    ksong: {
      id: number
      mid: string
    }
    label: string
    language: number
    mid: string
    modify_stamp: number
    mv: {
      id: number
      vid: string
      name: string
      title: string
      vt: number
    }
    name: string
    ov: number
    pay: {
      pay_month: number
      price_track: number
      price_album: number
      pay_play: number
      pay_down: number
      pay_status: number
      time_free: number
    }
    pingpong: string
    ppurl: string
    sa: number
    singer: Singer[]
    status: number
    subtitle: string
    tid: number
    time_public: string
    title: string
    trace: string
    type: number
    url: string
    version: number
    volume: {
      gain: number
      peak: number
      lra: number
    }
  }
}

export interface SingerSong {
  code: number
  ts: number
  singerSongList: {
    code: number
    data: {
      singerMid: string
      songList: SongInfo[]
      totalNum: number
    }
  }
}

export interface SingerDesc {
  result: {
    code: number
    data: {
      info: {
        basic: {
          item: { key: string; value: string }[]
        }
        id: number
        desc: string
        other: {
          item: { key: string; value: string }[]
        }
      }
    }
    default: number
    message: string
    subcode: number
  }
}

export interface SingerDetail {
  getMvids: number[]
  getShowIDs: string[]
  getSingerDesc: boolean
  getSingerExtern: null
  getSingerInfo: {
    Farea: string
    Fattribute_4: string
    Fother_name: string
    Fsinger_id: string
    Fsinger_mid: string
    Fsinger_name: string
  }
  getSingerRadio: boolean
  getSingerUin: boolean
  getSongInfo: []
}
