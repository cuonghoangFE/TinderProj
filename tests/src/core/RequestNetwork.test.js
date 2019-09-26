import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import withRequestNetwork from '../../../src/core/RequestNetwork.js';
import apiInstance from '../../../src/utils/API.js';

describe('RequestNetwork', () => {
  let Com;
  beforeEach(() => {
    Com = withRequestNetwork(React.Fragment);
  });

  describe('withRequestNetwork HOC', () => {
    it('renders correctly', () => {
      const tree = renderer.create(<Com />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('componentWillUnmount', () => {
      apiInstance.interceptors.request.eject = jest.fn();
      const wrapper = shallow(<Com />);
      wrapper.unmount();
      expect(apiInstance.interceptors.request.eject).toBeCalled();
    });
  });
});
