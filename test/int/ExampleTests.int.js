import {expect} from 'chai';
import React from 'react-native';
let {AppRegistry, View, Component} = React;
import {TestModule} from 'NativeModules';

class TestComp extends Component {
    render() {
        TestModule.markTestCompleted();
        return (<View></View>);
    }
}

AppRegistry.registerComponent('ExampleTests', () => { return TestComp });
