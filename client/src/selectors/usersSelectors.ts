import { RootState } from '../redux/redux-store'

export const currentUserSelector = (state: RootState) => state.users.currentUser

export const isAuthorizedSelector = (state: RootState) =>
    state.users.isAuthorized
