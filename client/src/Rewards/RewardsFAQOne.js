import React from "react";
import Accordion from "../Components/Accordion/index";

function RewardsFAQOne() {
    return(
        <div className= "App">
            <Accordion
                 title= "What can I sell?"
                 content= "Be creative! You can offer any service you wish as long as it's legal and complies with our terms. There are over 200 categories you can browse to get ideas."
            />
            <Accordion
                 title= "How much money can I make?"
                 content= "It's totally up to you. You can work as much as you want. Many sellers work on ShowSkills full time and some keep their 9-5 job while using ShowSkills to make extra money."
            />
            <Accordion
                 title= "How much does it cost"
                 content= "It's free to join ShowSkills. There is no subscription required or fees to list your services. You keep 80% of each transaction."
            />
        </div>
    );
}

export default RewardsFAQOne;