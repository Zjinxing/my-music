import { AlbumDetail, AlbumTag } from './Recommend'

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
  new_album: {
    code: number
    data: {
      albums: AlbumDetail[]
      ret_msg: string
      total: number
    }
  }
  new_album_tag: {
    code: number
    data: AlbumTag
  }
  ts: number
}
