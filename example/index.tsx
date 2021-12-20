import React from 'react'
import ReactDOM from 'react-dom'
import { ImageVerify } from '../src'

const list = [
  {
    backgroundImage:
      'https://cdn.linghemedia.com.cn/ihost/kxef/7buqnt5bkxefel12uro7kmt25fk.jpg',
    sliderImage:
      'https://cdn.linghemedia.com.cn/ihost/kxef/j5fhfuawkxeffw96nu3xx3ksu4.png',
    pointY: 97,
  },
]

function App() {
  return <ImageVerify {...list[0]} width={300} height={170} />
}

ReactDOM.render(<App />, document.getElementById('root'))
