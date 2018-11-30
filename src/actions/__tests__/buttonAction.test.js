import { toggleButtonOn, toggleButtonOff } from '../buttonAction';

describe('BUTTON ACTIONS TEST', () => {
  test('toggleButtonOn action should emit the on state with payload', () => {
    const desiredAction = {
      type: 'ON_BUTTON',
      payload: {
        status: true
      }
    };
    expect(toggleButtonOn(true)).toEqual(desiredAction);
  });
  test('toggleButtonOff action should emit the off state with payload', () => {
    const desiredAction = {
      type: 'OFF_BUTTON',
      payload: {
        status: false
      }
    };
    expect(toggleButtonOff(false)).toEqual(desiredAction);
  });
});
