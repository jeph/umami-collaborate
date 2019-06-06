import * as React from 'react'
import '../../css/AboutUs.css'
import rocket from '../../images/Rocket.svg'

export default function aboutUs () {
  return (
    <div className='aboutContainer'>
      <div className='aboutTitle'>
        <h2>ABOUT US</h2>
        <img src={rocket} alt='Rocket icon' className='formatImages'/>
      </div>
      <div className='aboutDescription'>
        <p>Drawing With Friends, headquartered in New York, New York, focuses on providing entertaining while
            simultaneously challenging the creative mind. By offering a safe haven to interact with friends, tools for the imagination to
            run wild, and challenges that test knowledge, Drawing With Friends offers a quality solution for entertainment
            and socialization.
        </p>

        <p>Drawing With Friends was founded in the February of 2019 by a professor of Computer Science. The resulting
            combination brought together a bunch of innovative minds with years of experience in the field of Computer
            Science, forming the best source of entertainment on the web.
        </p>
      </div>
    </div>
  )
}
