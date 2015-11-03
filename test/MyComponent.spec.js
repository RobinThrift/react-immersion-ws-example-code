import {expect} from 'chai';
import {isElement, createRenderer, isElementOfType} from 'react-addons-test-utils';
import {MyComponent} from '../dist/MyComponent';
import React from 'react';


suite('React Immersion Workshop - MyComponent', () => {
    let shallowRenderer;
    setup(() => {
        shallowRenderer = createRenderer();
    });

    test('existence', () => {
        expect(isElement(<MyComponent />)).to.be.true;
        expect(isElementOfType(<MyComponent />, MyComponent)).to.be.true;
    });
});
