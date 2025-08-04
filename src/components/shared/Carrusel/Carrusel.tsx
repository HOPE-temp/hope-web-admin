'use client';
import React, { useState } from 'react';

export interface SlideActions {
  prevSlide: () => void;
  setSlide: (count: number) => void;
}

type renderSlide<T> = (
  index: number,
  sliceActions: SlideActions,
  context: T
) => React.ReactNode;

interface CarouselDinamicProps<T> {
  renders: renderSlide<T>[];
  context: T;
}

export const CarouselDinamic = <T,>({
  renders,
  context,
}: CarouselDinamicProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const slidesCount = renders.length;

  const prevSlide = () => {
    setPrevIndex(currentIndex);
    setCurrentIndex(prevIndex);
  };
  const setSlide = (count: number) => {
    setPrevIndex(currentIndex);
    setCurrentIndex(count % slidesCount);
  };

  // Generamos un array de índices para renderizar cada slide
  const indices = Array.from({ length: slidesCount }, (_, i) => i);

  return (
    <div className="relative w-full mx-auto overflow-y-scroll max-h-[80vh]">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {indices.map(index => (
          <div key={index} className="flex-shrink-0 w-full h-full sm:p-2 ">
            <div className=" flex flex-col items-center justify-center">
              {renders[index](index, { prevSlide, setSlide }, context)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
