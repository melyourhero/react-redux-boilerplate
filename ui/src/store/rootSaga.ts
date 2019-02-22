import { all, delay, takeLatest } from 'redux-saga/effects';

import { APPLY_NAME } from '../pages/General/Actions';

function *logApplyName() {
  yield delay(0);
  console.log('Logging apply action');
}

const logSaga = takeLatest(APPLY_NAME, logApplyName);

export function* rootSaga() {
  yield all([
    logSaga,
  ]);
}
