import React, {Component} from 'react';
import {MySubComponent} from './MySubComponent';

export class MyComponent extends Component {
    render() {
        return (
            <div>
                <MySubComponent name="testing" />
            </div>
        );
    }
}
