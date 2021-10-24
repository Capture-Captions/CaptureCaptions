import React from "react";
import "./Home.css";

import {Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import {Container, Row, Col} from 'react-bootstrap';

function HomeImageThree() {
  return (
      <>
    <div className="img_container1">
        <img className='img3' src= "https://media.istockphoto.com/photos/white-studio-background-picture-id1040250650?k=20&m=1040250650&s=612x612&w=0&h=lEWpioJ3jet0QIZVBoU2Ygaua8YMHFfHN1mvT28xRZ4=" alt="Snow" />
        <div className="img_text_centered_block_four">

            <h1>How You Can Help</h1><br/>

            <Container>
          <Row>
            <Col>
                <p className="container_heading_font_size"><b>Send Donation</b></p>
                <p className="container_font_size">
Giving online has never been more secure, convenient or hassle-free with our one-click donation system using PayPal. We also do accept standard cash and check donations at all of our locations.
            </p>
            </Col>
            <Col>
                <p className="container_heading_font_size"><b>Become a Volunteer</b></p>
                <p className="container_font_size" style={{textAlign: "center"}}>
                You can get involved today by becoming a Volunteer. Sign up and you will be joining a group of change-makers, you can provide us random images with captions for them, this will help us collect data to train our model, so we can make it even stronger.
                </p>
            </Col>
          </Row>
        </Container>
            
            <div class="container">
               <div class="row">
                   <div class="col-sm-5 col-md-6">
                       <Link to='/startselling/overview'><button type="button" class="btn btn-primary btn-sm">Send Donation</button></Link>
                    </div>
                   <div class="col-sm-5 offset-sm-2 col-md-6 offset-md-0">
                       <Link to='/startselling/overview'><button type="button" class="btn btn-primary btn-sm">Become a Volunteer</button></Link>
                    </div>
                </div>
            </div>

        </div>
    </div>
    </>
  );
}

export default HomeImageThree;

{/* <Button variant="success" type="submit">Send Donation</Button> */}
{/* <Button variant="success" type="submit">Become a Volunteer</Button> */}