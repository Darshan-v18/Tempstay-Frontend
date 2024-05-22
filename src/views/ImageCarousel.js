import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

function ImageCarousel({ images }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative">
            <img
                src={images[currentImageIndex]}
                alt={`Image ${currentImageIndex + 1}`}
                className="rounded-lg w-80 h-auto transition-opacity duration-300"
                style={{ opacity: '0.9' }}
            />
            <button
                className="absolute top-1/2 left-0 z-10 p-2 rounded-full bg-white bg-opacity-50 text-gray-700 shadow-md opacity-0 transition-opacity duration-300 hover:opacity-100 focus:outline-none"
                style={{ transform: 'translateY(-50%)' }}
                onClick={prevImage}
            >
                <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
                className="absolute top-1/2 right-0 z-10 p-2 rounded-full bg-white bg-opacity-50 text-gray-700 shadow-md opacity-0 transition-opacity duration-300 hover:opacity-100 focus:outline-none"
                style={{ transform: 'translateY(-50%)' }}
                onClick={nextImage}
            >
                <ChevronRightIcon className="w-6 h-6" />
            </button>
        </div>
    );
}

export default ImageCarousel;
