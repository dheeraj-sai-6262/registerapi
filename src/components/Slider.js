import React, {Component} from 'react'
class Slider extends Component{
    render(){
        return(
<slider>

               <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                   <div className="carousel-inner">
                       <div className="carousel-item active">
                           <img className="d-block w-100" src="https://www.czech-inn.com/wp-content/uploads/2015/07/czech_inn_hostel_prague_premium_mixed_dorm_3-800x400_c.jpg"/>" alt="First slide"/>
                       </div>
                       <div className="carousel-item">
                           <img className="d-block w-100" src="https://one80hostels.com/site/assets/files/1441/6betten1.800x400.jpg"/>" alt="Second slide"/>
                       </div>
                   </div>
                   <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                       <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                       <span className="sr-only">Previous</span>
                   </a>
                   <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                       <span className="carousel-control-next-icon" aria-hidden="true"></span>
                       <span className="sr-only">Next</span>
                   </a>
                   </div>
                   </slider>
       )
   }
    }
    

export default Slider;



