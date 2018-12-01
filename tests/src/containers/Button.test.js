import { mapDispatchToProps, mapStateToProps } from '../../../src/containers/Button';

describe('Testing mapDispatchToProps function', () => {
  const dispatch = jest.fn();
  it('turnOn props in dispatch should trigger button on action', () => {
    mapDispatchToProps(dispatch).turnOn();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'ON_BUTTON',
      payload: { status: true }
    });
  });
});
describe('Testing mapDispatchToProps function', () => {
  const dispatch = jest.fn();
  it('turnOff props in dispatch should trigger button off action', () => {
    mapDispatchToProps(dispatch).turnOff();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'OFF_BUTTON',
      payload: { status: false }
    });
  });
});
describe('Testing mapStatesToProps function', () => {
  const initialState = {
    buttonReducer: false
  };
  it('initial state in props should be false', () => {
    expect(mapStateToProps(initialState)).toEqual({ status: false });
  });
});
