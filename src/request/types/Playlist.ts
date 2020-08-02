export interface SongDetailCommon {
  id: number
  type: number
  songtype: number
  mid: string
  name: string
  title: string
  subtitle: string
  interval: number
  isonly: number
  language: number
  genre: number
  index_cd: number
  index_album: number
  status: number
  fnote: number
  url: string
  time_public: string
  mv: {
    id: number
    vid: string
  }
  ksong: {
    id: number
    mid: string
  }
  file: {
    media_mid: string
    size_try: number
    b_30s: number
    e_30s: number
    try_begin: number
    try_end: number
    size_24aac: number
    size_48aac: number
    size_96aac: number
    size_192aac: number
    size_192ogg: number
    size_128mp3: number
    size_320mp3: number
    size_aac: number
    size_ogg: number
    size_128: number
    size_320: number
    size_ape: number
    size_flac: number
    size_dts: number
  }
  volume: {
    gain: number
    peak: number
    lra: number
  }
  pay: {
    pay_month: number
    price_track: number
    price_album: number
    pay_play: number
    pay_down: number
    pay_status: number
    time_free: number
  }
  action: {
    switch: number
    msgid: number
    msgpay: number
    alert: number
    icons: number
  }
}

export interface PlaylistSong {
  id: number
  type: number
  songtype: number
  version: number
  trace: string
  mid: string
  name: string
  label: string
  title: string
  subtitle: string
  interval: number
  isonly: number
  language: number
  genre: number
  index_cd: number
  index_album: number
  status: number
  fnote: number
  url: string
  time_public: string
  singer: [
    {
      id: number
      mid: string
      name: string
      title: string
    }
  ]
  album: {
    id: number
    mid: string
    name: string
    title: string
    pmid: string
  }
  mv: {
    id: number
    vid: string
    vt: number
  }
  ksong: {
    id: number
    mid: string
  }
  file: {
    media_mid: string
    size_try: number
    try_begin: number
    try_end: number
    size_24aac: number
    size_48aac: number
    size_96aac: number
    size_128mp3: number
    size_192ogg: number
    size_192aac: number
    size_320mp3: number
    size_flac: number
    size_ape: number
    size_dts: number
    size_hires: number
    hires_sample: number
    hires_bitdepth: number
    b_30s: number
    e_30s: number
    size_96ogg: number
  }
  volume: {
    gain: number
    peak: number
    lra: number
  }
  pay: {
    pay_month: number
    price_track: number
    price_album: number
    pay_play: number
    pay_down: number
    pay_status: number
    time_free: number
  }
  action: {
    switch: number
    switches: number
    msgid: number
    alert: number
    msgshare: number
    msgfav: number
    msgdown: number
    msgpay: number
    icons: number
  }
  new_icon: number
  tid: number
  ov: number
  sa: number
  es: string
  data_type: number
  pingpong: string
}

export interface Playlist {
  code: number
  ts: number
  start_ts: number
  req_0: {
    code: number
    data: {
      code: number
      subcode: number
      msg: string
      from_gedan_plaza: number
      accessed_plaza_cache: number
      accessed_byfav: number
      optype: number
      filter_song_num: number
      dirinfo: {
        id: number
        host_uin: number
        dirid: number
        title: string
        picurl: string
        picid: number
        desc: string
        vec_tagid: number[]
        vec_tagname: []
        ctime: number
        mtime: number
        listennum: number
        ordernum: number
        picmid: string
        dirtype: number
        host_nick: string
        songnum: number
        ordertime: number
        show: number
        picurl2: string
        song_update_time: number
        song_update_num: number
        disstype: number
        ai_uin: number
        dv2: number
        dir_show: number
        encrypt_uin: string
        encrypt_ai_uin: string
        owndir: number
        headurl: string
        tag: { id: number; name: string }[]

        creator: {
          musicid: number
          type: number
          singerid: number
          nick: string
          headurl: string
          ifpicurl: string
          encrypt_uin: string
          isVip: number
          ai_uin: number
          encrypt_ai_uin: string
        }
        status: number
        edge_mark: string
      }
      songlist_size: number
      songlist: PlaylistSong[]
      login_uin: number
      invalid_song: []
      filtered_song: []
      ad_list: []
      total_song_num: number
      encrypt_login: string
      ct: number
      cv: number
      ip: string
      orderlist: []
      cmtURL_bykey: {
        url_key: string
        url_params: string
      }
      srf_ip: string
      referer: string
      namedflag: number
      isAd: number
      adTitle: string
      adUrl: string
    }
  }
}
