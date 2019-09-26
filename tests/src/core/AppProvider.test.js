import React from 'react';
import renderer from 'react-test-renderer';
import {withApp} from '../../../src/core/AppProvider.js';

describe('AppProvider', () => {
  describe('withApp HOC', () => {
    it('renders correctly', () => {
      const Com = withApp(React.Fragment);
      const tree = renderer.create(<Com />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
