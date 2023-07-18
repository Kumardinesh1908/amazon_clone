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
        // Add more image URLs here
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
        <div className='relative'>
            <img src={previous} onClick={handlePrevious} alt="previous"
                className='w-12 h-24 absolute top-[25%] hover:text-black hover:opacity-50 hover:border-2 hover:border-gray-500 transition-opacity duration-300'/>
            <img src={images[currentImageIndex]} alt="Slider" className='w-full h-screen' />
            <img src={next} onClick={handleNext} alt="next"
                className='w-12 h-24 absolute top-[25%] left-[96%] hover:text-black hover:opacity-50 hover:border-2 hover:border-gray-500 transition-opacity duration-300'/>
        </div>
    );
};

export default Slider;