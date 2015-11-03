import {expect} from 'chai';
import {isElement, createRenderer, isElementOfType} from 'react-addons-test-utils';
import {MyComponent} from '../dist/MyComponent';
import {MySubComponent} from '../dist/MySubComponent';
import React from 'react';


suite('React Immersion Workshop - MyComponent', () => {
    let shallowRenderer;
    setup(() => {
        shallowRenderer = createRenderer();
    });

    test('existence', () => {
        expect(isElement(<MyComponent />)).to.be.true;
        expect(isElementOfType(<MyComponent/>, MyComponent)).to.be.true;
    });

    test('ensure correct sub components', () => {
        shallowRenderer.render(<MyComponent />)
        let output = shallowRenderer.getRenderOutput();
        expect(output.props.children).to.eql(
            <MySubComponent name="testing" />
        );
    });
});
