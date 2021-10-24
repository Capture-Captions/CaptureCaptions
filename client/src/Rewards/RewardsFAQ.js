import React from "react";
import {Container, Row, Col} from 'react-bootstrap';
import RewardsFAQOne from "./RewardsFAQOne";
import RewardsFAQTwo from "./RewardsFAQTwo";
import './FAQ.css'

const RewardsFAQ = () =>{
    return (<>
<h1 style={{textAlign: "center"}}>Rewards FAQ</h1>
<div className="box_Accordion">
   <Container>
     <Row>
       <Col>
         <div><RewardsFAQOne /></div>
       </Col>
       <Col>
          <div><RewardsFAQTwo /></div>
       </Col>
      </Row>
   </Container>
</div>
    </>);
};

export default RewardsFAQ;