import cn from 'classnames'
import styles from './../../../sass/Task.module.sass'
import { Collapse, Image, Rate, Select } from 'antd'
import { NavLink } from 'react-router-dom'
import { Input } from 'antd'
import { IUser, setLoadingType } from '../../../types'
import { useSelector } from 'react-redux'
import {
    currentUserSelector,
    isAuthorizedSelector,
} from '../../../selectors/usersSelectors'
import TaskSolveButtons from '../TaskSolveButtons/TaskSolveButtons'
import { BlockMath } from 'react-katex'
import { withLoader } from '../../../hoc/withLoader'
import React, { useEffect } from 'react'
import preview from './../../../images/push-to-see-preview.jpg'

type PropsType = {
    taskImageSrc: string
    answer: string
    id: string
    taskNumber: number
    difficulty: number
    isVariant: boolean
    partOfCheck?: number
    valueChanger?: (taskNumber: number, value: number | '') => void
    value?: number | ''
    isAnswerCorrect?: 'correct' | 'incorrect' | number
    isTimeUp?: boolean
    setIsLoading?: setLoadingType
}

const secondPartPoints = [
    [{ value: 1 }, { value: 2 }],
    [{ value: 1 }, { value: 2 }, { value: 3 }],
    [{ value: 1 }, { value: 2 }],
    [{ value: 1 }, { value: 2 }],
    [{ value: 1 }, { value: 2 }, { value: 3 }],
    [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }],
    [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }],
]

const Task: React.FC<PropsType> = ({
    taskImageSrc,
    answer,
    id,
    taskNumber,
    difficulty,
    isVariant,
    value,
    valueChanger,
    partOfCheck,
    isAnswerCorrect,
    isTimeUp,
}): JSX.Element => {
    const user: IUser = useSelector(currentUserSelector)
    const isAuthorized: boolean = useSelector(isAuthorizedSelector)

    const TaskSolveButtonsWithLoader = withLoader(TaskSolveButtons, false)

    const { innerWidth } = window

    return (
        <div className={cn(styles.taskWrapper)}>
            <div className={cn(styles.mobileBlock)}>
                {innerWidth <= 480 && (
                    <span className={cn(styles.taskNumber)}>
                        Номер задания: <span>{taskNumber}</span>
                    </span>
                )}
                {!isVariant && (
                    <NavLink className={cn(styles.idLink)} to={`/task/${id}`}>
                        {id}
                    </NavLink>
                )}
            </div>
            <div className={cn(styles.info)}>
                {innerWidth > 480 && (
                    <span className={cn(styles.taskNumber)}>
                        Номер задания: <span>{taskNumber}</span>
                    </span>
                )}
                {isAuthorized && !isVariant && (
                    <TaskSolveButtonsWithLoader
                        id={id}
                        solvedTasks={user.solvedTasks}
                    />
                )}
                {(!isVariant ||
                    (isVariant &&
                        (partOfCheck === 5 || partOfCheck === 4))) && (
                    <Rate value={difficulty} disabled />
                )}
            </div>
            <Image
                preview={{
                    src: taskImageSrc,
                }}
                src={innerWidth <= 600 ? preview : taskImageSrc}
                alt="task"
                width="100%"
                height="100%"
            />
            {((answer && !isVariant) ||
                (answer && isVariant && partOfCheck === 2)) && (
                <Collapse
                    size="small"
                    items={[
                        {
                            key: 'answer',
                            label: 'ОТВЕТ',
                            children: <BlockMath math={answer} />,
                        },
                    ]}
                />
            )}
            {partOfCheck === 1 &&
                !isTimeUp &&
                isVariant &&
                taskNumber <= 12 && (
                    <Input
                        placeholder="Ответ"
                        value={value}
                        type="number"
                        onWheel={(event) => {
                            event.preventDefault()
                        }}
                        onChange={(el) => {
                            if (valueChanger) {
                                const value: number | '' =
                                    el.currentTarget.value === ''
                                        ? el.currentTarget.value
                                        : Number(el.currentTarget.value)

                                valueChanger(taskNumber, value)
                            }
                        }}
                    />
                )}
            {answer && isVariant && taskNumber >= 13 && partOfCheck === 2 && (
                <Select
                    value={value}
                    onChange={(el) => {
                        if (el && valueChanger) {
                            valueChanger(taskNumber, Number(el))
                        }
                    }}
                    options={secondPartPoints[taskNumber - 13]}
                />
            )}
            {isVariant &&
                (partOfCheck === 5 || partOfCheck === 4) &&
                taskNumber <= 12 && (
                    <span
                        className={cn(styles.taskResult, {
                            [styles.answerCorrect]:
                                isAnswerCorrect === 'correct',
                            [styles.answerIncorrect]:
                                isAnswerCorrect === 'incorrect',
                        })}
                    >
                        Ответ{' '}
                        {isAnswerCorrect === 'correct'
                            ? 'правильный'
                            : 'неправильный'}
                    </span>
                )}
            {isVariant &&
                (partOfCheck === 5 || partOfCheck === 4) &&
                taskNumber > 12 && (
                    <span className={cn(styles.taskResult)}>
                        Баллов за задание:{' '}
                        <span style={{ fontWeight: 'bold' }}>
                            {isAnswerCorrect ? isAnswerCorrect : 0}
                        </span>
                    </span>
                )}
        </div>
    )
}

export default React.memo(Task)
