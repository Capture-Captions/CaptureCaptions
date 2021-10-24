import React from "react";
import "./Home.css";

import {Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

function HomeImageOne() {
  return (
    <div className="img_container1">
        <img className='img1' src= "https://media.istockphoto.com/photos/the-setup-for-success-picture-id1165916723?k=6&m=1165916723&s=612x612&w=0&h=jk4D-OaGU9laTNFlLdPrYd-dJYuJPhKr1DVYixQ0N3s=" alt="Snow" />
        <div className="img_text_centered">

            <h1>Capture Captions</h1><br/>

            <h3 style={{color:'#fff'}}>Using Artificial Intelligence to make this world a better place…</h3><br/>
            
            {/* <div class="container">
               <div class="row">
                   <div class="col-sm-5 col-md-6"> */}
                       <Link to='/addphoto'><Button variant="success" type="submit">Anomaly Detection</Button></Link>
                    {/* </div> */}
                   {/* <div class="col-sm-5 offset-sm-2 col-md-6 offset-md-0">
                       <Link to='/addphoto'><Button variant="success" type="submit">Image to Speech</Button></Link>
                    </div> */}
                {/* </div>
            </div> */}

        </div>
    </div>
  );
}

export default HomeImageOne;