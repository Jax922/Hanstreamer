import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { storage } from "../../firebase";
import { Swiper, SwiperSlide } from 'swiper/react';
import MyChart from './MyChart'

import 'swiper/css';
import 'swiper/css/effect-creative';
import { EffectCreative } from 'swiper/modules';

export default function SlideShow() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('userId');
    const slideName = queryParams.get('slide');
    const slideTitle = queryParams.get('title');

    const storageRef = storage.ref();
    const filePath = `slides/${userId}/${slideName}`;

    const [slide, setSlide] = useState(null);

    useEffect(() => {
        storageRef.child(filePath).getDownloadURL().then((url) => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.pages.length === 0) {
                        const newPage = {
                            active: true,
                            type:'',
                            data:'',
                            settings: [],
                            img: '',
                            index: 0,
                        }
                        data.pages.push(newPage);
                    }
                    console.log(data);
                    setSlide(data);
                })
                .catch(error => console.error("Error fetching chart data:", error));
        }).catch((error) => {
            console.error("Error fetching file:", error);
        });
    }, []);



  return (
    <>
      <Swiper
        grabCursor={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        modules={[EffectCreative]}
        className="mySwiper"
      > 
        {
            slide && slide.pages.map((page, index) => {
                return (
                    <SwiperSlide key={index}>
                        <MyChart container={`slideshow_${index}`} data={JSON.parse(page.data)} />
                    </SwiperSlide>
                )
            })
        }
        {/* <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
      </Swiper>
    </>
  );
}
