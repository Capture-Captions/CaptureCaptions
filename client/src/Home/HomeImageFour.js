import React from "react";
import "./Home.css";

function HomeImageFour() {
  return (
      <>
    <div className="img_container1">
        <img className='img1' src= "https://media.istockphoto.com/photos/white-studio-background-picture-id1040250650?k=20&m=1040250650&s=612x612&w=0&h=lEWpioJ3jet0QIZVBoU2Ygaua8YMHFfHN1mvT28xRZ4=" alt="Snow" />
        <div className="img_text_centered_block_four">

            <h6>Testimonials</h6>

            <h1>What People Say</h1><br/>

            <table>
               <tr>
                  <th>
                      <p className="table_font_size">This program can be implemented in millions of CCTV cameras and other surveillance devices in the coming years.</p>
                      <h6>Jane Doe</h6>
                  </th>
    
                  <th>
                      <p className="table_font_size">Now blind people can observe the world like never before, and that also without breaking the bank.</p>
                      <h6>John Doe</h6>
                  </th>
               </tr>
            </table>

        </div>
    </div>
    </>
  );
}

export default HomeImageFour;