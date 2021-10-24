import React from "react";

import {Container, Row, Col} from 'react-bootstrap';

import {Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

function RewardsBlockThree() {
  return (
    <div style= {{padding: "120px", margin: "40px 0px 0px 0px"}}>
       <Container>
          <Row>
            <Col>
                <h1 style={{textAlign: "center"}}>Search to earn</h1>
                <h1 style={{textAlign: "center"}}>+ 1 POINT PER IMAGE</h1>
                <h5 style={{textAlign: "center", margin: "80px 0px 0px 0px"}}>
                Sign in to your CC account and search on Bing to keep putting points on the board. When you level up, you’ll earn faster! You can even boost your earning by searching Bing on mobile, on Edge, and in Windows 10.
                </h5>
                <Link to='/startselling/overview'><Button variant="success" type="submit">LEARN MORE</Button></Link>
            </Col>

            <Col>
                <img className='img1' src= "https://media.istockphoto.com/photos/the-setup-for-success-picture-id1165916723?k=6&m=1165916723&s=612x612&w=0&h=jk4D-OaGU9laTNFlLdPrYd-dJYuJPhKr1DVYixQ0N3s=" alt="Snow" />
            </Col>
          </Row>
        </Container>
    </div>
  );
}

export default RewardsBlockThree;