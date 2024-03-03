import { RootState } from '../redux/redux-store'

export const paginatorSelector = (state: RootState) => state.tasks.paginator

export const tasksSelector = (state: RootState) => state.tasks.tasks

export const filterSelector = (state: RootState) => state.tasks.filter

export const totalSelector = (state: RootState) => state.tasks.total

export const taskSelector = (state: RootState) => state.tasks.currentTask
