import { SongHome } from './Recommend'
import SingerAlbum from 'components/Container/Music/components/SingerSong/components/Album'

export interface SingerBase {
  id: number
  mid: string
  name: string
}

export interface AlbumSongDetail {
  albumdesc: string
  albumid: number
  albummid: string
  albumname: string
  alertid: number
  belongCD: number
  cdInx: number
  interval: number
  isonly: number
  label: string
  msgid: number
  pay: {
    payalbum: number
    payalbumprice: number
    paydownload: number
    payinfo: number
    payplay: number
    paytrackmouth: number
    paytrackprice: number
    timefree: number
  }
  preview: {
    trybegin: number
    tryend: number
    trysize: number
  }
  rate: number
  singer: SingerBase[]
  size128: number
  size320: number
  size5_1: number
  sizeape: number
  sizeflac: number
  sizeogg: number
  songid: number
  songmid: string
  songname: string
  songorig: string
  songtype: number
  strMediaMid: string
  stream: number
  switch: number
  type: number
  vid: string
}

export interface AlbumInfo {
  response: {
    code: number
    message: string
    subcode: number
    data: {
      aDate: string
      albumTips: string
      color: number
      company: string
      company_new: {
        brief: string
        headPic: string
        id: number
        is_show: number
        name: string
      }
      cur_song_num: number
      desc: string
      genre: string
      id: number
      lan: string
      list: AlbumSongDetail[]
      mid: string
      name: string
      radio_anchor: number
      singerid: number
      singermblog: string
      singermid: string
      singername: string
      song_begin: number
      total: number
      total_song_num: number
    }
  }
}

export interface NewAlbum {
  code: number
  ts: number
  start_ts: number
  new_song: {
    code: number
    data: {
      lan: string
      lanlist: {
        lan: string
        name: string
        tjreport: string
        type: number
      }[]
      ret_msg: string
      songlist: SongHome[]
      type: number
    }
  }
}

export interface SingerAlbum {
  Fattribute_5: string
  Ftype: string
  albumID: string
  albumMID: string
  albumName: string
  albumtype: string
  company: string
  desc: string
  lan: string
  latest_song: {
    song_count: number
    songid: number
    track_name: string
  }
  listen_count: string
  pubTime: string
  score: string
  shoufa: number
  singerID: string
  singerMID: string
  singerName: string
  singers: { singer_id: string; singer_mid: string; singer_name: string }[]
  type: number
}

export interface SingerAlbumList {
  code: number
  data: {
    list: SingerAlbum[]
    singer_id: number
    singer_mid: string
    singer_name: string
    total: number
  }
  message: string
  subcode: number
}
