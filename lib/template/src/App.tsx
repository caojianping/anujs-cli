import React from 'react';
import {Router, Link} from 'reach-router';
import Home from './views/Home';
import Test from './views/Test';

import './less/reset.less';
import './less/common.less';

namespace App {
    export interface Props {
    }

    export interface State {
        title: string;
    }
}

class App extends React.Component<App.Props, App.State> {
    constructor(props: App.Props, context?: any) {
        super(props, context);
        this.state = {
            title: '标题App'
        };
    }

    render() {
        return (
            <div className="app">
                <nav>
                    <Link to="/home">首页</Link>
                    <span> | </span>
                    <Link to="/test/123?id=1&name=cjp">测试</Link>
                </nav>

                <Router mode="hash">
                    <Home path="/home"/>
                    <Test path="/test/:type"/>
                </Router>
            </div>
        );
    }
}

export default App;
