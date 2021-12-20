interface BaseProps {
  // 背景图片宽高，宽高比一定要同 backgroundImage
  width: number
  height: number
  backgroundImage: string
  sliderImage: string
  pointY: number
}

export interface ImageVerifyProps extends BaseProps {}

export interface ImageVerifyHooksProps extends BaseProps {}
