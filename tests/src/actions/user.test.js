// tests/src/actions/user.test.js
import {renderHook} from '@testing-library/react-hooks';
import {act} from 'react-test-renderer';
import ApiInstance from '../../../src/utils/API';
import userActions from '../../../src/actions/user.js';

describe('user actions', () => {
  describe('userStore method', () => {
    it('return state with array[1] is function', () => {
      const {result} = renderHook(() => userActions.userStore(''));

      act(() => {
        result.current[1]({
          name: {
            firstName: 'test',
          },
        });
      });

      expect(result.current[1]).toBeInstanceOf(Function);
    });
  });

  test('getUser method', async () => {
    ApiInstance.get = jest.fn().mockResolvedValue({
      data: {
        results: {},
      },
    });
    const returnValue = await userActions.getUser();
    expect(returnValue).toEqual({});
  });
});
