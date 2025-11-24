import React from 'react'
import { navIcons, navLinks } from '#constants/index.js'
import dayjs from 'dayjs'

const Navbar = () => {
  return (
    <nav>
        <div>
            <img src='/images/logo.svg'></img>
            <p className='font-bold'>Alankar's Portfolio</p>

            <ul>
                {navLinks.map((items) => (
                    <li key={items.id} >{items.name}</li>
                ))}
            </ul>
        </div>
        <div>
            <ul>
                {navIcons.map(({id,img}) => (
                    <li key={id}> 
                    <img src={img} alt={`img-${id}`}></img></li>
                ))}
            </ul>
            <time>{dayjs().format("ddd MMM D h:mm A")}</time>
        </div>

    </nav>
  )
  
}

export default Navbar