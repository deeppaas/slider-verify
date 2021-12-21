# Slider Verify

## ImageVerify

> 非纯前端组件，需要接口配合 [demo](https://deeppaas.github.io/slider-verify/)

```tsx
// 示例代码，直接粘贴不一定能执行成功（😈
import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'
import { ImageVerify } from '@deeppaas/slider-verify'
import type {
  ImageVerifyMoveSuccessCallBackType,
  ImageVerifyMoveType,
} from '@deeppaas/slider-verify/dist/ImageVerify/ImageVerifyType'

function App() {
  // 存储图片信息
  const [sliderData, setSliderData] = React.useState<{
    backgroundImage: string
    sliderImage: string
    pointY: number
  }>()

  const searchRef = React.useRef(async () => {
    const resp = await axios.get('http://127.0.0.1:8080/api')
    const { data } = resp.data.data
    setSliderData(data)
  })

  React.useEffect(() => {
    searchRef.current()
  }, [])

  function onMoveEnd(data: ImageVerifyMoveType, cb: ImageVerifyMoveSuccessCallBackType) {
    // left 小图距离左侧像素
    // ratio 背景图实际宽 / 背景图显示宽
    console.log(data) // -> { left: 10, ratio: 3 }
    setTimeout(() => {
      // cb({ result: 'success', message: '校验成功' })
      // or
      cb({ result: 'error', message: '校验失败' })
    }, 2000)
  }

  function onRefresh() {
    searchRef.current()
  }

  return (
    <ImageVerify
      {...sliderData}
      // 宽高=组件图片显示大小
      // 宽高比一定要同接口返回背景图片宽高比！！
      width={300}
      height={169}
      // 滑块滑动结束事件
      onMoveEnd={onMoveEnd}
      // 刷新事件
      // cb返回error 或者 点击刷新 调用
      onRefresh={onRefresh}
      // 以上必填
      // 颜色配置 选填（如果感觉默认太丑的话
      // theme="unset"
      theme={{
        'primary-color': 'red',
        'primary-light': 'yellow',
        'success-color': 'blue',
        'error-color': 'black'
      }}
    />
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```