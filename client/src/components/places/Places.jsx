import React from 'react'
import   image1 from  '../../assets/pexels-lina-kivaka-3639542 (1).jpg'
import image2 from  '../../assets/pexels-skitterphoto-12619.jpg'
import image3 from '../../assets/pexels-godless-humanist-1587947.jpg'

const places = () => {
  return (
    <>
    <section className="grid">
      <h3>we are currently in 24 Tunisian regions</h3>
      <div className="grid-items">
        <div>
          <img src={image1} alt="" />
          <h4>Check the latest rentals</h4>
          <p>Feel free to choose what is convenient for your situation</p>
        </div>
        <div>
          <img src={image2} alt="" />
          <h4>Choose the best appartements prices for your budget</h4>
          <p>Feel free to choose what is convenient for your financials</p>
        </div>
        <div>
          <img src={image3} alt="" />
          <h4>Check the best, newest and safest Blocks </h4>
          <p>Feel free to choose the place that you feel safe</p>
        </div>
      </div>
      </section>
      </>
  )
}

export default places