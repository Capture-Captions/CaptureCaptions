import React from 'react';

import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import RewardsBlockOne from "./RewardsBlockOne";
import RewardsBlockTwo from "./RewardsBlockTwo";
import RewardsBlockThree from "./RewardsBlockThree";
import RewardsBlockFour from "./RewardsBlockFour";

import "bootstrap/dist/css/bootstrap.min.css";

import "./Rewards.css";
const Rewards = () => {
  return (
    <>
      <div style={{ padding: "7px", textAlign: "center", backgroundColor: "#F8F8F8" }} className="header_points">
        <div style={{ textAlign: "right", padding: "15px" }}>
          <b>Your points: 5678</b>
          <img style={{ height: "30px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFGray7tsj3_UTfC1UVrB7RQMG0bcrgOx9udFqBnBAdXeTldHNHDyQ5AyRO4rjDFwRX3E&usqp=CAU" alt="Snow" />
        </div>
      </div>

      <RewardsBlockOne />
      <RewardsBlockTwo />
      <RewardsBlockThree />

      <div style={{ padding: "120px", textAlign: "center", backgroundColor: "beige", margin: "60px 120px 150px 120px" }}>
        <h1>Let the fun and games begin with<br />CC Rewards today.</h1>
        <div class="container">
          <div class="row">
            <div class="col-sm-5 col-md-6">
              <Link to='/startselling/overview'><Button variant="success" type="submit">START EARNING NOW</Button></Link>
            </div>
            <div class="col-sm-5 offset-sm-2 col-md-6 offset-md-0">
              <Link to='/rewardsfaq'><Button variant="success" type="submit">VISIT THE FAQ</Button></Link>
            </div>
          </div>
        </div>
      </div>

      <RewardsBlockFour />
    </>
  )
};

export default Rewards;