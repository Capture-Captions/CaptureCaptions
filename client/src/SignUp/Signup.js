import React, {useState} from "react";

import "./SignUp.css";

const Signup = () => {

    const [userRegistration, setUserRegistration] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [records, setRecords] = useState([]);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        setUserRegistration({ ...userRegistration, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newRecord = { ...userRegistration, id: new Date().getTime().toString() }

        console.log(records);

        setRecords([...records, newRecord]);

        console.log(records);
    }

    return (
        <>
        <div className="login_box">
        <div className="loginForm">
      <h2 style={{ textAlign: "center", color: "#555" }}>Signup Form</h2>
      <div className="container1_login">
      <div className="form_login">
            <form action="" onSubmit={handleSubmit}>

            <div className="container_login">
                <div>
                    <label htmlFor="username">Fullname</label>
                    <input type="text" autoComplete="off"
                    value={userRegistration.username}
                    onChange={handleInput}
                    name="username" id="username" />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" autoComplete="off"
                    value={userRegistration.email}
                    onChange={handleInput}
                    name="email" id="email" />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="text" autoComplete="off"
                    value={userRegistration.password}
                    onChange={handleInput}
                    name="password" id="password" />
                </div>

                <button type="submit">Sign up</button>
                </div>

            </form>
            </div></div></div></div>
        </>
    )
}

export default Signup;