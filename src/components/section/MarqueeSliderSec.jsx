"use client";

import React from 'react';
import { MarqueeSlides, SwiperSliderComp } from '../ui/common'; // Adjust path to your component
import { SwiperSlide } from 'swiper/react';
import { Container } from 'react-bootstrap';

// If using local assets in a bundler like Vite / Webpack:
import image1 from '../../assets/images/ap-tourism.webp';
import image2 from '../../assets/images/bengal-mahakumbh.jpg';
import image3 from '../../assets/images/delhi-mahakumbh.jpg';
import image4 from '../../assets/images/goa-mahakumbh.jpg';
import image5 from '../../assets/images/google.jpg';
import image6 from '../../assets/images/gujarath-mahakumbh.jpg';
import image7 from '../../assets/images/haryana-mahakumbh.jpg';
import image8 from '../../assets/images/himachal-pradesh-mahakumbh.jpg';
import image9 from '../../assets/images/jharkhand-mahakumbh.jpg';
import image10 from '../../assets/images/jk-mahakumbh.jpg';
import image11 from '../../assets/images/karnataka-mahakumbh.jpg';
import image12 from '../../assets/images/kearala-mahakumbh.jpg';
import image13 from '../../assets/images/ladakh-mahakumbh.jpg';
import image14 from '../../assets/images/lakshadweep-mahakumbh.jpg';
import image15 from '../../assets/images/maharashtra-mahakumbh.jpg';
import image16 from '../../assets/images/mainpur-mahakumbh.jpg';
import image17 from '../../assets/images/meghalaya-mahakumbh.jpg';
import image18 from '../../assets/images/mizoram-mahakumbh.jpg';
import image19 from '../../assets/images/mp-mahakumbh.jpg';
import image20 from '../../assets/images/nagaland-mahakumbh.jpg';
import image21 from '../../assets/images/odisha-mahakumbh.jpg';
import image22 from '../../assets/images/pondicherry-mahakumbh.jpg';
import image23 from '../../assets/images/punjab-mahakumbh.jpg';
import image24 from '../../assets/images/rajasthan-mahakumbh.jpg';
import image25 from '../../assets/images/sikkim-mahakumbh.jpg';
import image26 from '../../assets/images/tamil-mahakumbh.jpg';
import image27 from '../../assets/images/telangna-mahakumbh.jpg';
import image28 from '../../assets/images/tripura-mahakumbh.jpg';
import image29 from '../../assets/images/up-mahakumbh.jpg';
import image30 from '../../assets/images/uttarakhankd-mahakumbh.jpg';

/* export default function MarqueeSliderSec() {
    // 1. Create an array containing your image references
    const myImages = [
        image1.src,
        image2.src,
        image3.src,
        image4.src,
        image5.src,
        image6.src,
        image7.src,
        image8.src,
        image9.src,
        image10.src,
        image11.src,
        image12.src,
        image13.src,
        image14.src,
        image15.src,
        image16.src,
        image17.src,
        image18.src,
        image19.src,
        image20.src,
        image21.src,
        image22.src,
        image23.src,
        image24.src,
        image25.src,
        image26.src,
        image27.src,
        image28.src,
        image29.src,
        image30.src,
    ];

    return (
        <Container>
            <div className='mb-5 trinary-bg marquee-loop-jacket section-padding pt-5'>

                //  <SwiperSliderComp
                //     spaceBetween={20}
                //     className={"py-3 pb-5"}
                //     breakpoints={{
                //         0: {
                //             slidesPerView: 2,
                //         },
                //         576: {
                //             slidesPerView: 5,
                //         },
                //         768: {
                //             slidesPerView: 8,
                //         },
                //         992: {
                //             slidesPerView: 10,
                //         },
                //         1220: {
                //             slidesPerView: 10,
                //         },
                //     }}
                //     navigation={false}
                //     disableAutoplay={false}
                // >
                //     {myImages.map((img, i) => (
                //         <SwiperSlide key={i}>
                //             <img src={img} alt={img} className='img-fluid rounded-2 shadow-sm' />
                //         </SwiperSlide>
                //     ))}
                // </SwiperSliderComp> 

                <MarqueeSlides images={myImages} />
            </div>
        </Container>
    );
}*/

export default function MarqueeSliderSec() {
    // Array containing your image sources (handling both Next.js/Vite object structures or string rollbacks)
    const myImages = [
        image1.src || image1, image2.src || image2, image3.src || image3, image4.src || image4, image5.src || image5,
        image6.src || image6, image7.src || image7, image8.src || image8, image9.src || image9, image10.src || image10,
        image11.src || image11, image12.src || image12, image13.src || image13, image14.src || image14, image15.src || image15,
        image16.src || image16, image17.src || image17, image18.src || image18, image19.src || image19, image20.src || image20,
        image21.src || image21, image22.src || image22, image23.src || image23, image24.src || image24, image25.src || image25,
        image26.src || image26, image27.src || image27, image28.src || image28, image29.src || image29, image30.src || image30
    ];

    return (
        <Container className="px-0">
            <div className="mb-5 trinary-bg marquee-loop-jacket section-padding-2 pt-5">
                <div className="marqueeContainer">
                    <div className="marqueeTrack">
                        {/* First Track Layer */}
                        <div className="marqueeGroup">
                            {myImages.map((img, index) => (
                                <div className="imageWrapper" key={`track1-${index}`}>
                                    <img src={img} alt={`Logo ${index + 1}`} loading="lazy" />
                                </div>
                            ))}
                        </div>

                        {/* Identical Second Track Layer for Perfect Infinite Looping */}
                        <div className="marqueeGroup" aria-hidden="true">
                            {myImages.map((img, index) => (
                                <div className="imageWrapper" key={`track2-${index}`}>
                                    <img src={img} alt={`Logo ${index + 1}`} loading="lazy" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}