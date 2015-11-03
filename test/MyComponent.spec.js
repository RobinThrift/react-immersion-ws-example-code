import {expect} from 'chai';
import {MyComponent} from '../dist/MyComponent';
import {MySubComponent} from '../dist/MySubComponent';
import React from 'react';
import {
    isElement,
    createRenderer,
    isElementOfType,
    renderIntoDocument,
    Simulate,
    findRenderedDOMComponentWithTag,
    findRenderedComponentWithType
} from 'react-addons-test-utils';

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
        expect(isElementOfType(output.props.children, MySubComponent)).to.be.true;
    });
    
    test('simulate click', () => {
        let node = renderIntoDocument(<MyComponent />);
        expect(findRenderedComponentWithType(node, MySubComponent)).to.be.defined;
        Simulate.click(findRenderedDOMComponentWithTag(node, 'button'));
        expect(findRenderedDOMComponentWithTag(node, 'div')).to.be.defined;
        expect(findRenderedDOMComponentWithTag.bind(undefined, node, 'button')).to.throw(Error);
        expect(findRenderedComponentWithType.bind(undefined, node, MySubComponent)).to.throw(Error);
    });
});
