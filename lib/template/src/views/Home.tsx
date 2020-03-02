import React from 'react';
import demoImg from '../assets/images/demo.gif';

namespace Home {
    export interface Props {
        path: string;
    }

    export interface State {
        title: string;
    }
}

class Home extends React.Component<Home.Props, Home.State> {
    constructor(props) {
        super(props);
        this.state = {
            title: '首页'
        };
    }

    render() {
        let {title} = this.state;
        return (
            <div className="home">
                <h2>{title}</h2>
                <img src={demoImg} alt="demo"/>
            </div>
        );
    }
}

export default Home;
