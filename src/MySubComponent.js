
import React, {Component} from 'react';

export class MySubComponent extends Component {
    render() {
        return (
            <button onClick={this.props.onClick}>
                {this.props.name}
            </button>
        );
    }
}
