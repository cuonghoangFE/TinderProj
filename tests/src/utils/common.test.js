import commonUtils from '../../../src/utils/common.js';

jest.useFakeTimers();

describe('commonUtils', () => {
  describe('capitalizeLetter method', () => {
    it('will Capitalize first letter in each words from string', () => {
      const givenString = 'abu daha appa test';
      const expectedString = 'Abu Daha Appa Test';
      expect(commonUtils.capitalizeLetter(givenString)).toEqual(expectedString);
    });
  });

  describe('debounce method', () => {
    it('will wait for 500ms before implement callback func', () => {
      const test = {
        apply: jest.fn(),
      };
      const debounced = commonUtils.debounce(test, 1000);

      debounced();
      debounced();

      jest.runOnlyPendingTimers();

      expect(test.apply).toHaveBeenCalledTimes(1);
    });
  });
});
