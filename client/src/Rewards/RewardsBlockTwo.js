import React from "react";

import {Container, Row, Col} from 'react-bootstrap';

function RewardsBlockTwo() {
  return (
    <div style= {{padding: "120px 120px 0px 120px", margin: "40px 0px 0px 0px"}}>
       <Container>
          <Row>
            <Col>
                <img className='img1' src= "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2iKTK?ver=9f8c" alt="Snow" />
            </Col>
            <Col>
                <h1 style={{textAlign: "center"}}>Meet the rewards</h1>
                <h5 style={{textAlign: "center", margin: "80px 0px 0px 0px"}}>
                Redeem your points for gift cards, sweepstakes entries, nonprofit donations, and more. It’s the easiest way to get rewarded for doing what you already love to do.
                </h5>
            </Col>
          </Row>
        </Container>
    </div>
  );
}

export default RewardsBlockTwo;