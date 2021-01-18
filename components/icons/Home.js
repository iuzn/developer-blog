import * as React from 'react'

function SvgHome(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 27 24" fill="none" {...props}>
      <g clipPath="url(#Home_svg__clip0)">
        <path
          d="M26.73 10.098L15.181.609a2.625 2.625 0 00-3.363 0L.27 10.098a.75.75 0 00-.094 1.056l.48.577a.75.75 0 001.056.094L3 10.768V13.5h-.015v9.75a.756.756 0 00.755.75h19.51a.75.75 0 00.75-.75V10.768l1.29 1.059a.75.75 0 001.055-.094l.481-.577a.75.75 0 00-.096-1.058zm-4.98.402h-.01v11.25H16.5V15a1.5 1.5 0 00-1.5-1.5h-3a1.5 1.5 0 00-1.5 1.5v6.75H5.235V9.116l.015-.011v-.188L13.5 2.14l8.25 6.779V10.5z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="Home_svg__clip0">
          <path fill="currentColor" d="M0 0h27v24H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default SvgHome
