import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


function ImagePopupCarousel({ hotel }) {
    const [isOpen, setIsOpen] = useState(false);
    const [curr, setCurr] = useState(0);

    const prev = () => {
        setCurr((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const next = () => {
        setCurr((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const slides = hotel.images.map((image, index) => (
        <img
            key={index}
            src={image}
            alt={hotel.name}
            className="w-full h-auto"
            style={{ display: curr === index ? 'block' : 'none' }}
        />
    ));

    return (
        <>
            <img
                src={hotel.image}
                alt={hotel.name}
                width={100}
                height={100}
                style={{ marginRight: '20px', borderRadius: '5px', cursor: 'pointer' }}
                onClick={() => setIsOpen(true)}
            />
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <Box sx={{ width: 400, bgcolor: 'background.paper', p: 2 }}>
                <ModalBody>
                    <div className="overflow-hidden relative">
                        <div
                            className="flex transition-transform ease-out duration-500"
                            style={{ transform: `translateX(-${curr * 100}%)` }}
                        >
                            {slides}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-between p-4">
                            <button
                                onClick={prev}
                                className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                            >
                                <ChevronLeft size={40} />
                            </button>
                            <button
                                onClick={next}
                                className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                            >
                                <ChevronRight size={40} />
                            </button>
                        </div>
                    </div>
                </ModalBody>
                </Box>
            </Modal>
        </>
    );
}

export default ImagePopupCarousel;
