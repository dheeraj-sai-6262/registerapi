import React, {Component} from 'react'

class Banner extends Component{
    render(){
        return(
            <div className="jumbotron p-3 p-md-5 text-black rounded bg-light">
                <div className="col-md-6 px-0">
                    <h1 className="display-4 font-italic">Example</h1>
                </div>
            </div>
        )
    }
}

export default Banner;