import type { CSSProperties } from 'react'

export interface ImageVerifyMoveType {
  left: number
  ratio: number
}

export type ImageVerifyMoveSuccessCallBackType = (data: {
  result: 'success' | 'error'
  message: string | undefined
}) => void

interface BaseProps {
  // 背景图片宽高，宽高比一定要同 backgroundImage
  width: number
  height: number
  backgroundImage: string
  sliderImage: string
  pointY: number
  onMoveEnd(
    data: ImageVerifyMoveType,
    cb: ImageVerifyMoveSuccessCallBackType
  ): void
  onRefresh(): void
}

export interface ImageVerifyProps extends BaseProps {
  sliderTips?: string
}

export interface ImageVerifyHooksProps extends BaseProps {}

export interface SliderStyle extends Omit<CSSProperties, 'width' | 'height'> {
  width?: number
  height?: number
}

export interface VerifyType {
  type: 'slider' | 'verifying' | 'end'
  result: 'success' | 'error' | undefined
  message: string | undefined
}
