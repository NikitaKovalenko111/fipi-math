import { useParams } from 'react-router-dom'
import Task from '../components/Tasks/Task/Task'
import { useSelector } from 'react-redux'
import { AppDispatch } from '../redux/redux-store'
import { ITask, setLoadingType } from '../types'
import { taskSelector } from '../selectors/tasksSelectors'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getTaskByIdApiAC } from '../redux/actions/tasksActions/tasksActions'
import cn from 'classnames'
import styles from './../sass/task-page.module.sass'
import SpinLoader from '../components/SpinLoader/SpinLoader'

type PropsType = {
    isLoading: boolean
    setIsLoading: setLoadingType
}

const TaskPage: React.FC<PropsType> = ({
    isLoading,
    setIsLoading,
}): JSX.Element => {
    const { id } = useParams()

    const dispatch: AppDispatch = useDispatch()

    const task: ITask = useSelector(taskSelector)

    useEffect(() => {
        dispatch(getTaskByIdApiAC(id as string, setIsLoading))
    }, [])

    if (isLoading) {
        return (
            <div className={cn(styles.loaderWrapper)}>
                <SpinLoader size="large" />
                <span>Загрузка задания</span>
            </div>
        )
    }

    return (
        <div className={cn(styles.wrapper)}>
            <Task
                difficultyMarks={task.difficultyMarks}
                isVariant={false}
                id={id as string}
                difficulty={task.difficulty}
                answer={task.answer}
                taskNumber={task.taskNumber}
                taskImageSrc={
                    process.env.REACT_APP_API_PATH + '/' + task.fileName
                }
            />
        </div>
    )
}

export default React.memo(TaskPage)
