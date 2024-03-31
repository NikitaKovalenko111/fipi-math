import { Popover, Rate, Spin } from 'antd'
import { setLoadingType } from '../../../types'
import { AppDispatch } from '../../../redux/redux-store'
import { useDispatch } from 'react-redux'
import { rateTaskApiAC } from '../../../redux/actions/tasksActions/tasksActions'
import { InfoCircleTwoTone } from '@ant-design/icons'
import cn from 'classnames'
import styles from './../../../sass/TaskRate.module.sass'

type PropsType = {
    difficulty: number
    ratedTasks: Array<string>
    id: string
    isAuthorized: boolean
    isLoading: boolean
    difficultyMarks: Array<number>
    setIsLoading: setLoadingType
}

const popoverContent = (marks: Array<number>): JSX.Element => (
    <div>
        <div>Вы можете оценить сложность задания</div>
        <div>Сейчас оценок: {marks.length}</div>
    </div>
)

const TaskRate: React.FC<PropsType> = ({
    difficulty,
    ratedTasks,
    id,
    setIsLoading,
    isAuthorized,
    difficultyMarks,
    isLoading,
}): JSX.Element => {
    const dispatch: AppDispatch = useDispatch()

    if (isLoading) {
        return <Spin spinning size="small"></Spin>
    }

    return (
        <div className={cn(styles.rateWrapper)}>
            <Rate
                value={difficulty}
                disabled={ratedTasks.includes(id) || !isAuthorized}
                onChange={(value) => {
                    dispatch(rateTaskApiAC(id, value, setIsLoading))
                }}
            />
            {isAuthorized && (
                <Popover
                    trigger="click"
                    content={popoverContent(difficultyMarks)}
                >
                    <InfoCircleTwoTone />
                </Popover>
            )}
        </div>
    )
}

export default TaskRate
