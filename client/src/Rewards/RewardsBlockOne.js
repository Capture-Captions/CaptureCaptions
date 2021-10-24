import React from "react";

import {Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

function RewardsBlockOne() {
  return (
    <div className="img_container1" style={{padding: "70px 0px 0px 0px"}}>
        <img className='img1' src= "https://www.hsbc.com.vn/content/dam/hsbc/hbvn/images/21-9/family-sitting-with-luggage-on-sofa-2-dcm-46169.jpg" alt="Snow" />
        <div className="img_text_centered">

            <h1>Get on board with CC Rewards</h1><br/>

            <h5 style={{color:'#fff'}}>Earning rewards is easy, simple, and fun. Just search, shop, or play with Microsoft and you’ll be on your way to earning more than ever.</h5><br/>
            
            <div class="container">
               <div class="row">
                   <div class="col-sm-5 col-md-6">
                       <Link to='/signup'><Button variant="success" type="submit">SIGN UP FOR FREE</Button></Link>
                    </div>
                   <div class="col-sm-5 offset-sm-2 col-md-6 offset-md-0">
                       <Link to='/login'><Button variant="success" type="submit">SIGN IN</Button></Link>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
}

export default RewardsBlockOne;