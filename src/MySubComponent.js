import React, {Component, PropTypes} from 'react';

export class MySubComponent extends Component {
    render() {
        return (
            <button onClick={this.props.onClick}>
                {this.props.name}
            </button>
        );
    }
}

MySubComponent.propTypes = {
    onClick: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired
};
