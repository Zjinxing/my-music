interface VoiceAlbum {
  Falbum_c_id: string
  Falbum_id: string
  Falbum_mid: string
  Falbum_name: string
  Fape_size: string
  Fape_type: string
  Farea: string
  Fattribute_1: string
  Fattribute_2: string
  Fattribute_3: string
  Fattribute_4: string
  Fattribute_5: string
  Fcd_index: string
  Fclass: string
  Fcompany_id: string
  Fcondition: string
  Fcue_size: string
  Fgenre: string
  Findex: string
  Flanguage: string
  Fmodify_time: string
  Fmovie: string
  Fother_name: string
  Fphoto: string
  Fprice: string
  Fpublic_time: string
  Fsinger_all: string
  Fsinger_id1: string
  Fsinger_id2: string
  Fsinger_id3: string
  Fsinger_id4: string
  Fstatus: string
  Ftopic_id: string
  Ftype: string
  Fupc: string
  Fupload_time: string
}

interface VoiceSong {
  Fplay_cnt?: string
  action: {
    alert: number
    icons: number
    msgdown: number
    msgfav: number
    msgid: number
    msgpay: number
    msgshare: number
    switch: number
  }
  album: {
    id: number
    mid: string
    name: string
    subtitle: string
    title: string
  }
  bpm: number
  file: {
    media_mid: string
    size_128: number
    size_128mp3: number
    size_192aac: number
    size_192ogg: number
    size_24aac: number
    size_320: number
    size_320mp3: number
    size_48aac: number
    size_96aac: number
    size_aac: number
    size_ape: number
    size_dts: number
    size_flac: number
    size_ogg: number
    size_try: number
    try_begin: number
    try_end: number
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
  mv: {
    id: number
    vid: string
  }
  name: string
  pay: {
    pay_down: number
    pay_month: number
    pay_play: number
    pay_status: number
    price_album: number
    price_track: number
    time_free: number
  }
  singer: [
    {
      id: number
      mid: string
      name: string
      title: string
      type: number
      uin: number
    }
  ]
  status: number
  subtitle: string
  time_public: string
  title: string
  type: number
  url: string
  volume: {
    gain: number
    lra: number
    peak: number
  }
}

interface VoiceSingerInfo {
  singerinfo: {
    Farea: string
    Fattribute_1: string
    Fattribute_2: string
    Fattribute_3: string
    Fattribute_4: string
    Fattribute_5: string
    Fcompany_id: string
    Fcondition: string
    Fgenre: string
    Fgrade: string
    Findex: string
    Fmodify_time: string
    Fname_spell: string
    Forigin: string
    Fother_name: string
    Fphoto: string
    Fsinger_id: string
    Fsinger_mid: string
    Fsinger_name: string
    Fstatus: string
    Ftype: string
    Fupload_time: string
  }
  song_count: number
}

export interface VoicesHome {
  code: number
  data: {
    rec_albums: VoiceAlbum[]
    rec_songs: VoiceSong[]
    show_list: VoiceSong[]
    tags: { id: string; name: string; pic: string }[]
    top_singers: VoiceSingerInfo[]
    total_albums: number
    total_singers: number
  }
  message: string
  subcode: number
}
