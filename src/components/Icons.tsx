import React from 'react'

interface BaseProps {
  width?: number | string
  height?: number | string
  fill?: string
}

const defaultProps = {
  width: '1em',
  fill: 'currentColor',
}

const Icons = {
  star(data: BaseProps = defaultProps) {
    return (
      <svg {...data} viewBox="0 0 1024 1024">
        <path d="M337.99705893 686.00294107L8.77812571 500.81729134l321.34630586-170.69285977L500.81729134 8.77812571l185.18564973 329.21893322 329.21893322 185.18564973-321.34630586 170.69285977-170.69285977 321.34630586z" />
      </svg>
    )
  },
}

export default Icons
