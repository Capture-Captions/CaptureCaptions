import React from "react";
import "./Home.css";

import {Container, Row, Col} from 'react-bootstrap';

function HomeImageTwo() {
  return (
    <div className="box_style">
       <Container>
          <Row>
            <Col>
                <img className='img2' src= "https://media.istockphoto.com/photos/the-setup-for-success-picture-id1165916723?k=6&m=1165916723&s=612x612&w=0&h=jk4D-OaGU9laTNFlLdPrYd-dJYuJPhKr1DVYixQ0N3s=" alt="Snow" />
            </Col>
            <Col>
                <h1 style={{textAlign: "center"}}><b>Our Believes</b></h1>
                <p className="HomeBlockTwoText">
                    We are a non-profit organization, we believe in a world where the power of Artificial Intelligence can be used to make the world a better and more secure place. Our models can also be implemented for many other tasks related to image processing. We believe that there should be open source alternatives for such important, life changing applications, and that we shouldn’t be dependent on major tech giants of the world for these, going open source also helps us continuously improve the model without costing much money, so we can support the project for years.
                </p>
            </Col>
          </Row>
        </Container>
    </div>
  );
}

export default HomeImageTwo;