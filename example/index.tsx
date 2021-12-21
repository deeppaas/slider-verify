import React from 'react'
import ReactDOM from 'react-dom'
import { ImageVerify } from '../src'
import {
  ImageVerifyMoveSuccessCallBackType,
  ImageVerifyMoveType,
} from '../src/ImageVerify/ImageVerifyType'

import { list } from './constants'

function App() {
  const [imageData, setImageData] = React.useState(
    list[Math.floor(Math.random() * list.length)]
  )

  function onRefresh() {
    setImageData(list[Math.floor(Math.random() * list.length)])
  }

  function onMoveEnd(
    data: ImageVerifyMoveType,
    cb: ImageVerifyMoveSuccessCallBackType
  ) {
    console.log('move end', data)
    setTimeout(() => {
      if (Math.random() < 0.5) {
        cb({ result: 'success', message: '成功' })
      } else {
        cb({ result: 'error', message: '失败' })
      }
    }, 2000)
  }

  return (
    <ImageVerify
      {...imageData}
      width={300}
      height={169}
      onMoveEnd={onMoveEnd}
      onRefresh={onRefresh}
    />
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
