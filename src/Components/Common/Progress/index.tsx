import React, { MouseEvent } from 'react'
import './index.scss'

interface Props {
  width: number
  onProgressChange?: (targetInfo: TargetInfo, pos: MousePos) => void
  onProgressChangeEnd?: (target: TargetInfo, pos: MousePos) => void
}

export interface TargetInfo {
  width: number
  height: number
  top: number
  left: number
}

export interface MousePos {
  pageX: number
  pageY: number
}

const Progress: React.FC<Props> = props => {
  let timer: ReturnType<typeof setTimeout> | null

  const handleMouseDown = (event: MouseEvent<HTMLElement>) => {
    document.removeEventListener('mouseup', dragEnded)
    const target = event.target as HTMLElement
    const [rect] = target.getClientRects() as DOMRectList
    const { left, top, width, height } = rect
    const targetInfo = { width, height, left, top }
    console.log(targetInfo)
    localStorage.setItem('targetInfo', JSON.stringify(targetInfo))
    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', dragEnded)
  }

  const dragEnded = (e: Event) => {
    console.log(props)
    timer = null
    const { pageX, pageY } = (e as unknown) as MouseEvent
    const targetInfo = JSON.parse(localStorage.getItem('targetInfo') || '{}') as TargetInfo
    props.onProgressChangeEnd && props.onProgressChangeEnd(targetInfo, { pageX, pageY })
    localStorage.removeItem('targetInfo')
    document.removeEventListener('mousemove', mouseMove)
    document.removeEventListener('mouseup', dragEnded)
  }

  const mouseMove = (e: Event) => {
    if (timer) {
      return
    } else {
      timer = setTimeout(() => {
        const targetInfo = JSON.parse(localStorage.getItem('targetInfo') || '{}') as TargetInfo
        const { top, height, width } = targetInfo
        const { pageX, pageY } = (e as unknown) as MouseEvent
        const pos = { pageX, pageY }
        if (height && top) {
          props.onProgressChange && props.onProgressChange(targetInfo, pos)
        }
        timer && clearTimeout(timer)
        timer = null
      }, 30)
    }
  }

  return (
    <div className="progress-wrapper">
      <div className="progress-background"></div>
      <div style={{ width: `${props.width}%` }} className="progress-cover"></div>
      <div onMouseDown={handleMouseDown} className="progress-drag"></div>
      <div style={{ left: `${props.width}%` }} className="progress-truck"></div>
    </div>
  )
}

export default Progress
