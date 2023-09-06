import React, { useState, useEffect } from 'react';
import { bannerImgOne, bannerImgTwo, bannerImgThree, bannerImgFour, bannerImgFive } from "../../assets"
import { previous, next } from '../../assets';

const Slider = () => {
    const images = [
        bannerImgOne,
        bannerImgTwo,
        bannerImgThree,
        bannerImgFour,
        bannerImgFive
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Automatically change images every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    const handlePrevious = () => {
        setCurrentImageIndex((prevIndex) => {
            if (prevIndex === 0) {
                return images.length - 1;
            }
            return prevIndex - 1;
        });
    };

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div className='relative z-0'>
            <img src={previous} onClick={handlePrevious} alt="previous"
                className='w-10 h-10 absolute top-[135px] left-[15px] text-black active:border-2 active:border-black' />

            <img src={images[currentImageIndex]} alt="Slider" className='w-full h-screen' />

            <img src={next} onClick={handleNext} alt="next"
                className='w-10 h-10 absolute top-[135px] left-[96%] text-black active:border-2 active:border-black' />

        </div>
    );
};

export default Slider;