import React, {Component} from 'react';
import {MySubComponent} from './MySubComponent';

export class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: false
        };
    }

    clickHandler() {
        this.setState({hide: true});
    }

    render() {
        if (this.state.hide) {
            return (
                <div />
            );
        }
        return (
            <div>
                <MySubComponent name="testing" onClick={this.clickHandler.bind(this)} />
            </div>
        );
    }
}
