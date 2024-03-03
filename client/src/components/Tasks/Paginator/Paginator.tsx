import { Pagination } from 'antd'
import { useSelector } from 'react-redux'
import { AppDispatch } from '../../../redux/redux-store'
import { IPaginator } from '../../../types'
import { paginatorSelector } from '../../../selectors/tasksSelectors'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { changePaginatorValueAC } from '../../../redux/actions/tasksActions/tasksActions'
import { changeSearchParams } from '../../../utils'

type PropsType = {
    total: number
}

const Paginator: React.FC<PropsType> = ({ total }): JSX.Element => {
    const paginator: IPaginator = useSelector(paginatorSelector)
    const dispatch: AppDispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        if (!searchParams.has('page')) {
            changeSearchParams(paginator, searchParams, setSearchParams)
        } else {
            dispatch(
                changePaginatorValueAC({
                    page: Number(searchParams.get('page')),
                    pageSize: Number(searchParams.get('pageSize')),
                })
            )
        }
    }, [])

    const handleChange = (page: number, pageSize: number) => {
        dispatch(
            changePaginatorValueAC({
                page: page,
                pageSize: pageSize,
            })
        )

        changeSearchParams(
            { page: page, pageSize: pageSize },
            searchParams,
            setSearchParams
        )

        window.scrollTo({
            top: 0,
        })
    }

    return (
        <Pagination
            current={paginator.page}
            pageSize={paginator.pageSize}
            onChange={handleChange}
            total={total}
            hideOnSinglePage
        />
    )
}

export default Paginator
