import buttonReducer from '../buttonReducer';

describe('BUTTON REDUCER TEST', () => {
  test('button reducer should change the state with an on action', () => {
    const initialState = {
      button: {
        status: false
      }
    };
    const newState = {
      button: {
        status: true
      }
    };
    expect(
      buttonReducer(initialState.button,
        {
          type: 'ON_BUTTON',
          payload: {
            status: true
          }
        })
    )
      .toEqual(newState.button);
  });
  test(`button reducer should change the state button status to false
   with an off action`, () => {
    const initialState = {
      button: {
        status: true
      }
    };
    const newState = {
      button: {
        status: false
      }
    };
    expect(
      buttonReducer(initialState.button,
        {
          type: 'OFF_BUTTON',
          payload: {
            status: false
          }
        })
    )
      .toEqual(newState.button);
  });

  test(`button reducer should change the state button status to false
   with an off action`, () => {
    const initialState = {
      button: {
        status: true
      }
    };
    const newState = {
      button: {
        status: true
      }
    };
    expect(
      buttonReducer(initialState.button,
        {
          type: 'FAKE_ACTION',
          payload: {
            status: true
          }
        })
    )
      .toEqual(newState.button);
  });
});
