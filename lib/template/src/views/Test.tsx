import React from 'react';

namespace Test {
    export interface Props {
        path: string;
    }

    export interface State {
        title: string;
        value: string;
    }
}

class Test extends React.Component<Test.Props, Test.State> {
    constructor(props) {
        super(props);
        this.state = {
            title: '测试',
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    componentWillMount() {
        console.log('this.props:', this.props);
    }

    componentDidMount() {
    }

    render() {
        let {title, value} = this.state;
        return (
            <div className="test">
                <h2>{title}</h2>
                <input type="text" value={value} onChange={this.handleChange}/>
            </div>
        );
    }
}

export default Test;
