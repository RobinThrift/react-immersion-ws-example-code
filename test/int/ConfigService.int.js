import {expect} from 'chai';
import React from 'react-native';
let {AppRegistry, Text, AsyncStorage, Component} = React;
import {TestModule} from 'NativeModules';
import {Config} from '../dist/config';

let values = {
    foo: 'bar',
    bar: {
        baz: 'boo'
    }
}
let config = new Config(values, 'ConfigTestInstance');
let runTest = async (done) => {
    expect(config.get('foo')).to.equal('bar');
    await config.set('bar.baz', 'blub', true);
    let newValue = await AsyncStorage.getItem('ConfigTestInstance');
    expect(JSON.parse(newValue).bar.baz).to.equal('blub');
    done();
}

class TestComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            done: false
        }
    }
    componentDidMount() {
        let done = () => {
            this.setState({done: true}, TestModule.markTestCompleted);
        }
        AsyncStorage.clear(() => {
            runTest(done);
        });
    }
    render() {
        return (<Text>{this.state.done}</Text>);
    }
}

AppRegistry.registerComponent('ConfigServiceTest', () => { return TestComp });
