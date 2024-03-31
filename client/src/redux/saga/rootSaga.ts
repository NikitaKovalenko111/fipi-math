import { all, fork } from 'redux-saga/effects'
import {
    addTaskSagaWatcher,
    getTaskByIdSagaWatcher,
    getTasksSagaWatcher,
    rateTaskSagaWatcher,
} from './tasksSagas'
import {
    authorizationSagaWatcher,
    changeUsernameSagaWatcher,
    checkAuthSagaWatcher,
    logoutSagaWatcher,
    registerSagaWatcher,
    saveVariantSagaWatcher,
    solveTaskSagaWatcher,
    unsolveTaskSagaWatcher,
} from './usersSagas'
import {
    checkVariantSagaWatcher,
    generateVariantSagaWatcher,
    generateVariantWithTokenSagaWatcher,
    getVariantAnswersSagaWatcher,
} from './variantSagas'

export default function* rootSaga() {
    yield all([
        fork(addTaskSagaWatcher),
        fork(getTasksSagaWatcher),
        fork(getTaskByIdSagaWatcher),
        fork(authorizationSagaWatcher),
        fork(checkAuthSagaWatcher),
        fork(registerSagaWatcher),
        fork(logoutSagaWatcher),
        fork(changeUsernameSagaWatcher),
        fork(generateVariantSagaWatcher),
        fork(checkVariantSagaWatcher),
        fork(getVariantAnswersSagaWatcher),
        fork(saveVariantSagaWatcher),
        fork(generateVariantWithTokenSagaWatcher),
        fork(solveTaskSagaWatcher),
        fork(unsolveTaskSagaWatcher),
        fork(rateTaskSagaWatcher),
    ])
}
