export const changeSearchParams = (
    objectOfParams: Object,
    searchParams: URLSearchParams,
    setSearchParams: (searchParams: URLSearchParams) => void
): void => {
    Object.keys(objectOfParams).forEach((el, index, array) => {
        const value: string =
            Object.values(objectOfParams)[index] === 'undefined'
                ? 'All'
                : String(Object.values(objectOfParams)[index])

        searchParams.set(el, value)

        if (index === array.length - 1) setSearchParams(searchParams)
    })
}
