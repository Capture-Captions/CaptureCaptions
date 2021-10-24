import React from "react";
import Accordion from "../Components/Accordion/index";

function RewardsFAQTwo() {
    return(
        <div className= "App">
            <Accordion
                 title= "How much time will I need to invest?"
                 content= "It's very flexible. You need to put in some time and effort in the beginning to learn the marketplace and then you can decide for yourself what amount of work you want to do."
            />
            <Accordion
                 title= "How do I price my service?"
                 content= "With Gig Packages, you set your pricing anywhere from Rs 350 - Rs 1,00,000 and offer three versions of your service at three different prices."
            />
            <Accordion
                 title= "How do I get paid?"
                 content= "Once you complete a buyer's order, the money is transferred to your account. No need to chase clients for payments and wait 60 or 90 days for a check."
            />
        </div>
    );
}

export default RewardsFAQTwo;