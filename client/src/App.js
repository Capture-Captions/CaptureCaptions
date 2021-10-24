import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import Menu from "./Menu/Menu";
import Home from "./Home/Home";
import About from "./About/About";
import Rewards from "./Rewards/Rewards";
import Contact from "./Contact/Contact";
import AddPhoto from "./Components/AddPhoto/AddPhoto"
import Volunteer from "./Volunteer/Volunteer";
import Login from "./Login/Login";
import Signup from "./SignUp/Signup";
import Error from "./Error/Error";

import RewardsFAQ from "./Rewards/RewardsFAQ";

const App = () => {
    
    return (
        <>
        <Menu />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/aboutus" component={About} />
                <Route path="/rewards" component={Rewards} />
                <Route path="/volunteer" component={Volunteer} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/contactus" component={Contact} />
                <Route path="/rewardsfaq" component={RewardsFAQ} />
                <Route path="/addphoto" component={AddPhoto} />
                <Route component={Error} />
            </Switch>
        </>
    );
};

export default App;
