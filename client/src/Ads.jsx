import React from 'react'

const Ads = () => {
    //  process.env.NODE_ENV === 'dev' &&
    const ads =  <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" /> ;
  return (
    <div>
          <ins className='adsbygoogle'
                    style={{ display: 'block' }}
                    data-ad-client= '5779452638'
                    data-ad-format= 'auto'
                    data-full-width-responsive="true"
                >
                </ins>
    </div>
  )
}

export default Ads