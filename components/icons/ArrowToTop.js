import * as React from 'react'

function SvgArrowToTop(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 21 24" fill="none" {...props}>
      <g clipPath="url(#ArrowToTop_svg__clip0)">
        <path
          d="M1.902 13.28L9.83 5.33a.643.643 0 01.911 0l7.929 7.95a.643.643 0 010 .911l-1.05 1.05a.636.636 0 01-.916-.01l-5.025-5.202v13.328c0 .354-.29.643-.643.643h-1.5a.645.645 0 01-.643-.643V10.03l-5.02 5.201a.645.645 0 01-.916.011l-1.05-1.05a.639.639 0 01-.005-.91zM.642 2.786H19.93c.353 0 .642-.29.642-.643v-1.5A.645.645 0 0019.93 0H.643A.645.645 0 000 .643v1.5c0 .353.29.643.643.643z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="ArrowToTop_svg__clip0">
          <path fill="currentColor" d="M0 0h20.571v24H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default SvgArrowToTop
