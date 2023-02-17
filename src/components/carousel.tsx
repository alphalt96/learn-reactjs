import React, { useState } from 'react';

import classes from './carousel.module.css';

export interface ICarouselOptions {
  children: React.ReactNode;
  width: number;
  height: number;
}

const Carousel = (props: ICarouselOptions) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const changeCarouselIndex = (increament: number) => {
    const childrenLength = React.Children.count(props.children);
    let amount = increament;
    if (increament > 0 && currentIndex === childrenLength - 1) {
      amount = -1 * (childrenLength - 1);
    } else if (increament < 0 && currentIndex === 0) {
      amount = childrenLength - 1;
    }

    setCurrentIndex(currentIndex + amount);
  }

  return (
    <div className={`overflow-hidden w-${props.width} h-${props.height} relative`}>
      {/* carousel wrap div will move to display the item */}
      <div className="flex flex-row transition duration-700 ease-in" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {React.Children.map(props.children, (child, index) => (
          <div className={`shrink-0 w-${props.width} h-${props.height} ${classes.carouselItem}`}>
            {child}
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
