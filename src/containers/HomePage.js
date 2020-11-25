import React, {Component} from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Slider from '../components/Slider'
import Banner from '../components/Banner'

class HomePage extends Component{
    render(){
        return(
            <div>
                <Header/>
                <Slider/>
                <Banner/>
                <Footer/>
            </div>
        )
    }
}

export default HomePage;