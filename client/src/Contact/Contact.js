import React from "react";

import "./Contact.css";

import { Link } from "react-router-dom";

import { Container, Row, Col } from 'react-bootstrap';

function Contact() {
    return (
        <>
            <div className="img_container1">
                <img className='contact_img' src="https://cdn.mos.cms.futurecdn.net/BDgBYzF32hJSyeayqyvfBj.jpg" alt="Snow" />
                <div className="img_text_centered">

                    <h1>Get in Touch!</h1><br />

                    <p style={{fontSize: "20px"}}>"At Choice You Always Talk to a Human !"<br/><br/>

Whether You have a Question About features, trials, need any help our team is ready to answer all your question</p>

                    <Container>
                        <Row>
                            <Col style={{ backgroundColor: "white", color: "black", padding: "5px 65px", margin: "20px" }}>
                            <img style={{height:"50px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmDYqcHqTDb9Hi739uffN8pq9oVhyie_qZejmCv2-GEceTvrCvaby8rX0XrNKfravoYcA&usqp=CAU" alt="Snow" />
                                <br/><br/><h5>Email:</h5>
                                <h5 style={{ margin: "40px 0px" }}>
                                <Link to='#'>support@company.com</Link>
                                    <br />
                                </h5>
                            </Col>
                            <Col style={{ backgroundColor: "white", color: "black", padding: "5px 110px", margin: "20px" }}>
                            <img style={{height:"70px"}} src="https://media.istockphoto.com/vectors/blue-phone-icon-symbol-in-trendy-flat-style-isolated-on-white-logo-vector-id1218149116?k=20&m=1218149116&s=170667a&w=0&h=wyBX1uKxL8WSRg8nGyAG9YHq9tLKimwDpJk6HrWVzNg=" alt="Snow" />
                                <br/><br/><h5>Call Us:</h5>
                                <h5 style={{ margin: "40px 0px" }}>
                                <Link to='#'>0172-1234XX</Link>
                                    <br />
                                </h5>
                            </Col>
                        </Row>
                    </Container>

                </div>
            </div>
        </>
    );
}

export default Contact;