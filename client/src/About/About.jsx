import React from 'react';
import HomeImageTwo from "../Home/HomeImageTwo";

import "bootstrap/dist/css/bootstrap.min.css";
import "./about.css";

import {Carousel} from 'react-bootstrap';

const About = () =>{
    return (
        <>

         <Carousel>
                  <Carousel.Item interval={2000}>
                     <img
                        className="carousel"
                        src="https://www.pixelstalk.net/wp-content/uploads/2016/07/Free-Download-Laptop-Image.png"
                        alt="First slide"
                    />
                  <Carousel.Caption className="caption">
                     <h3><u className="u"><b>Raman Ailawadhi</b>    (Full Stack Developer)</u></h3>
                  </Carousel.Caption>

            </Carousel.Item>
            <Carousel.Item interval={2000}>
            <img
                        className="carousel"
                        src="https://www.pixelstalk.net/wp-content/uploads/2016/07/Free-Download-Laptop-Image.png"
                        alt="First slide"
                    />
                  <Carousel.Caption className="caption">
                     <h3><u className="u"><b>Mayank</b>    (Full Stack Developer)</u></h3>
                  </Carousel.Caption>

            </Carousel.Item>

            <Carousel.Item interval={2000}>
            <img
                        className="carousel"
                        src="https://www.pixelstalk.net/wp-content/uploads/2016/07/Free-Download-Laptop-Image.png"
                        alt="First slide"
                    />
                  <Carousel.Caption className="caption">
                     <h3><u className="u"><b>Rahul Jindal</b>    (Backend Developer)</u></h3>
                  </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item interval={2000}>
            <img
                        className="carousel"
                        src="https://www.pixelstalk.net/wp-content/uploads/2016/07/Free-Download-Laptop-Image.png"
                        alt="First slide"
                    />
                  <Carousel.Caption className="caption">
                     <h3><u className="u"><b>Aayush Singla</b>    (Frontend Developer)</u></h3>
                  </Carousel.Caption>
            </Carousel.Item>
         </Carousel>

         <HomeImageTwo/ >
        </>
    )
};

export default About;