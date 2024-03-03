import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import {
    SolveTaskApiAC,
    UnsolveTaskApiAC,
} from '../../../redux/actions/usersActions/usersActions'
import { AppDispatch } from '../../../redux/redux-store'
import { useDispatch } from 'react-redux'
import cn from 'classnames'
import { Popover } from 'antd'
import styles from './../../../sass/TaskSolveButtons.module.sass'
import { setLoadingType } from '../../../types'
import SpinLoader from '../../SpinLoader/SpinLoader'

type PropsType = {
    isLoading: boolean
    setIsLoading: setLoadingType
    id: string
    solvedTasks: Array<string>
}

const TaskSolveButtons: React.FC<PropsType> = ({
    id,
    solvedTasks,
    isLoading,
    setIsLoading,
}): JSX.Element => {
    const dispatch: AppDispatch = useDispatch()

    if (isLoading) {
        return <SpinLoader size="default" />
    }

    return (
        <div className={cn(styles.buttonsWrapper)}>
            {solvedTasks && solvedTasks.includes(id) ? (
                <>
                    <span className={cn(styles.taskSolved)}>
                        Задание решено
                    </span>
                    <Popover content="Отметить как не решенное">
                        <CloseOutlined
                            onClick={() => {
                                dispatch(UnsolveTaskApiAC(id, setIsLoading))
                            }}
                            style={{ color: '#f24f46' }}
                        />
                    </Popover>
                </>
            ) : (
                <>
                    <span className={cn(styles.taskNotSolved)}>
                        Задание не решено
                    </span>
                    <Popover content="Отметить как решенное">
                        <CheckOutlined
                            onClick={() => {
                                dispatch(SolveTaskApiAC(id, setIsLoading))
                            }}
                            style={{
                                color: 'green',
                                fontSize: '16px',
                            }}
                        />
                    </Popover>
                </>
            )}
        </div>
    )
}

export default TaskSolveButtons
