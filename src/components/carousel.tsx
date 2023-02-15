import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import temporaryImage1 from '../assets/1.jpeg';
import temporaryImage2 from '../assets/2.jpg';
import temporaryImage3 from '../assets/3.jpg';

const data = [
  {
    destination: '/lives',
    img: temporaryImage1
  },
  {
    destination: '/profile',
    img: temporaryImage2
  },
  {
    destination: '/analysis',
    img: temporaryImage3
  }
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const changeCarouselIndex = (increament: number) => {
    let amount = increament;
    if (increament > 0 && currentIndex === data.length - 1) {
      amount = -1 * (data.length - 1);
    } else if (increament < 0 && currentIndex === 0) {
      amount = data.length - 1;
    }

    setCurrentIndex(currentIndex + amount);
  }

  return (
    <div className="overflow-hidden w-300 relative">
      {/* carousel wrap div will move to display the item */}
      <div className="flex flex-row transition duration-700 ease-in" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {data.map(item => (
          <div className="shrink-0 w-300">
          <Link to={item.destination}>
            <img className="w-300 h-300" src={item.img} alt="photo" />
          </Link>
        </div>
        ))}
      </div>
      <button
        onClick={_ => changeCarouselIndex(-1)}
        className="absolute top-1/2 left-0 text-red-600"
      >left</button>
      <button 
        onClick={_ => changeCarouselIndex(1)}
        className="absolute top-1/2 right-0 text-red-600"
      >right</button>
    </div>
  )
}

export default Carousel;
