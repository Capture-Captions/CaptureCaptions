import React from "react";
import { Button,Navbar,Nav, Container} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import'./menu.css'

const Menu = () => {
    return (
        <>
            <Navbar bg="light" expand="xl" className="header">
            <Container>
            <Nav.Link as={Link} to="/"><h1 className="siteTitle" >CC</h1></Nav.Link>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">

            <Nav className='navLink'>
                <Nav.Link className="mr-lg-3 mr-md-2" as={Link} to="/">Home</Nav.Link>
                <Nav.Link className="mr-lg-3 mr-md-2"  as={Link} to="/volunteer">Volunteer</Nav.Link>
                <Nav.Link className="mr-lg-3 mr-md-2"  as={Link} to="/rewards">Rewards</Nav.Link>
                <Nav.Link className="mr-lg-3 mr-md-2"  as={Link} to="/aboutus">About Us</Nav.Link>
                <Nav.Link className="mr-lg-3 mr-md-2"  as={Link} to="/contactus">Contact Us</Nav.Link>
                <Nav.Link as={Link} to="/login"> Login </Nav.Link>
            </Nav>
    
            </Navbar.Collapse>
            </Container>
            </Navbar>
        </>
    )
};

export default Menu;