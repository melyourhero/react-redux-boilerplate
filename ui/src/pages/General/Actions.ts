import { ActionFunction0 } from 'redux-actions';

import { createAction } from '../../store/ReduxHelpers';

export const APPLY_NAME = Symbol('APPLY_NAME');
export const applyName: ActionFunction0<void> = createAction(APPLY_NAME);
