import Task from '../components/Tasks/Task/Task'
import cn from 'classnames'
import styles from './../sass/tasks-page.module.sass'
import Paginator from '../components/Tasks/Paginator/Paginator'
import TasksFilter from '../components/Tasks/TasksFilter/TasksFilter'
import { useEffect, useState } from 'react'
import { Button, Spin } from 'antd'
import AddForm from '../components/Tasks/AddForm/AddForm'
import { IFilter, IPaginator, ITask, IUser, setLoadingType } from '../types'
import { AppDispatch } from '../redux/redux-store'
import { useSelector } from 'react-redux'
import {
    filterSelector,
    paginatorSelector,
    tasksSelector,
    totalSelector,
} from '../selectors/tasksSelectors'
import { useDispatch } from 'react-redux'
import { getTasksApiAC } from '../redux/actions/tasksActions/tasksActions'
import { currentUserSelector } from '../selectors/usersSelectors'

type PropsType = {
    isLoading: boolean
    setIsLoading: setLoadingType
}

const TasksPage: React.FC<PropsType> = ({
    isLoading,
    setIsLoading,
}): JSX.Element => {
    const dispatch: AppDispatch = useDispatch()

    const [isAddFormVisible, ChangeIsAddFormVisible] = useState<boolean>(false)

    const tasks: Array<ITask> = useSelector(tasksSelector)
    const total: number = useSelector(totalSelector)
    const paginator: IPaginator = useSelector(paginatorSelector)
    const filter: IFilter = useSelector(filterSelector)

    const user: IUser = useSelector(currentUserSelector)

    useEffect(() => {
        dispatch(
            getTasksApiAC(
                paginator.page,
                paginator.pageSize,
                setIsLoading,
                filter
            )
        )
    }, [paginator, dispatch, filter])

    return (
        <div className={cn('container', styles.container)}>
            <h1>ЕГЭ задания по профильной математике</h1>
            <TasksFilter setIsLoading={setIsLoading} />
            <Spin
                wrapperClassName={cn(styles.spinWrapper)}
                tip={
                    <div className={cn(styles.loaderText)}>
                        <span>Загрузка заданий</span>
                    </div>
                }
                size="large"
                style={{ width: '100%' }}
                spinning={isLoading}
            >
                <div className={cn(styles.mainWrapper)}>
                    <div className={cn(styles.tasks_wrapper)}>
                        {tasks.length === 0 && (
                            <span className={cn(styles.notFoundText)}>
                                Задания не найдены
                            </span>
                        )}
                        {tasks.length !== 0 &&
                            tasks.map((el) => {
                                return (
                                    <Task
                                        isVariant={false}
                                        key={el._id}
                                        id={el._id}
                                        taskNumber={el.taskNumber}
                                        difficulty={el.difficulty}
                                        taskImageSrc={
                                            (process.env
                                                .REACT_APP_API_PATH as string) +
                                            '/' +
                                            el.fileName
                                        }
                                        answer={el.answer}
                                    />
                                )
                            })}
                    </div>
                    {!isAddFormVisible &&
                        user.roles.includes('admin') &&
                        !isLoading && (
                            <Button
                                onClick={() => {
                                    ChangeIsAddFormVisible(true)
                                }}
                                style={{
                                    height: '40px',
                                    width: '100%',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Добавить задание
                            </Button>
                        )}
                    {isAddFormVisible && (
                        <AddForm
                            setIsLoading={setIsLoading}
                            changeIsAddFormVisible={ChangeIsAddFormVisible}
                        />
                    )}
                    <Paginator total={total} />
                </div>
            </Spin>
        </div>
    )
}

export default TasksPage
