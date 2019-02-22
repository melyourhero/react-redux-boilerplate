import { handleActions } from '../../store/ReduxHelpers';

import { APPLY_NAME } from './Actions';

export interface GeneralState {
  name: string;
}

const initialState: GeneralState = {
  name: 'test',
};

const reducerMap = {
  [APPLY_NAME]: (state: GeneralState) => {
    state.name = 'test2';
  },
};

export default handleActions(reducerMap, initialState);
