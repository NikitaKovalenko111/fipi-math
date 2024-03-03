import { RootState } from '../redux/redux-store'

export const variantSelector = (state: RootState) =>
    state.variant.currentVariant

export const tokenSelector = (state: RootState) => state.variant.variantToken

export const variantCheckResultsSelector = (state: RootState) =>
    state.variant.checkResults

export const variantTimerSelector = (state: RootState) => state.variant.timer

export const isVariantSavedSelector = (state: RootState) =>
    state.variant.isVariantSaved

export const creationTimeSelector = (state: RootState) =>
    state.variant.creationTime
