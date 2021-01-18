import React from 'react'

import Footer from './footer'

function FooterBox({ flat = false }) {
  return (
    <div>
      {!flat && <Footer />}
      {flat && ''}
    </div>
  )
}
export default FooterBox
