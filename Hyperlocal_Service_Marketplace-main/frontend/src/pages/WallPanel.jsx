import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const WallPanelPage = () => {
    const scrollRefs = [useRef(null), useRef(null), useRef(null)];
    const [showLeftButtons, setShowLeftButtons] = useState([false, false, false]);
    const [showRightButtons, setShowRightButtons] = useState([true, true, true]);

    const checkScrollPosition = (index) => {
        const slider = scrollRefs[index].current;
        if (!slider) return;

        const newShowLeftButtons = [...showLeftButtons];
        const newShowRightButtons = [...showRightButtons];

        newShowLeftButtons[index] = slider.scrollLeft > 0;
        newShowRightButtons[index] = slider.scrollLeft < slider.scrollWidth - slider.clientWidth - 1;

        setShowLeftButtons(newShowLeftButtons);
        setShowRightButtons(newShowRightButtons);
    };

    const scrollLeft = (index) => {
        if (scrollRefs[index].current) {
            scrollRefs[index].current.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = (index) => {
        if (scrollRefs[index].current) {
            scrollRefs[index].current.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        }
    };

    const sections = [
        {
            title: "Explore by space",
            items: [
                {
                    image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_394,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1742816548801-847ac6.jpeg",
                    alt: "Wall Panel Design 1"
                },
                {
                    image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_394,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1742816532968-ff25f1.jpeg",
                    alt: "Wall Panel Design 2"
                },
                {
                    image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_394,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1742816552478-6d272b.jpeg",
                    alt: "Wall Panel Design 3"
                },
                {
                    image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_394,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1742816540807-68138c.jpeg",
                    alt: "Wall Panel Design 4",
                    link: "/wall-makeover"
                }
            ]
        },
        {
            title: "Beautiful walls, any occasion",
            items: [
                {
                    image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_394,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1739273514500-d737aa.jpeg",
                    alt: "Wall Panel Design 1"
                },
                {
                    image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_394,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1739273505094-907913.jpeg",
                    alt: "Wall Panel Design 2"
                },
                {
                    image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_394,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1739273493553-75792f.jpeg",
                    alt: "Wall Panel Design 3"
                },
                {
                    image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_394,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1744287821046-d55efe.jpeg",
                    alt: "Wall Panel Design 4",
                    link: "/wall-makeover"
                }
            ]
        },
        {
            title: "For every decor style",
            items: [
                {
                    image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_394,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1739273511309-ba7840.jpeg",
                    alt: "Wall Panel Design 1"
                },
                {
                    image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_394,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1739273502111-b81a69.jpeg",
                    alt: "Wall Panel Design 2"
                },
                {
                    image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_394,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1739273490349-affaf7.jpeg",
                    alt: "Wall Panel Design 3"
                },
                {
                    image: "https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template/w_394,dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1744287821046-d55efe.jpeg",
                    alt: "Wall Panel Design 4",
                    link: "/wall-makeover"
                }
            ]
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            {sections.map((section, index) => (
                <div key={index} className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{section.title}</h2>
                        </div>

                        <div className="relative">
                            {showLeftButtons[index] && (
                                <button
                                    onClick={() => scrollLeft(index)}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
                                    aria-label="Scroll left"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                            )}

                            <div
                                ref={scrollRefs[index]}
                                onScroll={() => checkScrollPosition(index)}
                                className="flex overflow-x-auto gap-4 sm:gap-11 pb-6 scrollbar-hide"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {section.items.map((item, itemIndex) => (
                                    <div
                                        key={itemIndex}
                                        className="flex-shrink-0 w-[80vw] sm:w-96 h-auto aspect-[3/4] rounded-lg overflow-hidden transition-transform hover:scale-[1.02]"
                                    >
                                        {item.link ? (
                                            <Link to={item.link}>
                                                <img
                                                    src={item.image}
                                                    alt={item.alt}
                                                    className="w-full h-full object-contain"
                                                    loading="lazy"
                                                />
                                            </Link>
                                        ) : (
                                            <img
                                                src={item.image}
                                                alt={item.alt}
                                                className="w-full h-full object-contain"
                                                loading="lazy"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {showRightButtons[index] && (
                                <button
                                    onClick={() => scrollRight(index)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
                                    aria-label="Scroll right"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style> */}
        </div>
    );
};

export default WallPanelPage;