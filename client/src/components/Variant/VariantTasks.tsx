import { useSelector } from 'react-redux'
import { variantSelector } from '../../selectors/variantSelector'
import { ITask, IVariantCheckResults } from '../../types'
import cn from 'classnames'
import styles from './../../sass/VariantTasks.module.sass'
import Task from '../Tasks/Task/Task'

type PropsType = {
    partOfCheck: number
    answersArray: Array<number | ''>
    setAnswers: (answersArray: Array<number | ''>) => void
    variantCheckResults: IVariantCheckResults | null
    isTimeUp: boolean
    valueChangerContainer: (
        setAnswersArray: (answers: Array<number | ''>) => void,
        answersArray: Array<number | ''>
    ) => (taskNumber: number, value: number | '') => void
}

const VariantTasks: React.FC<PropsType> = ({
    partOfCheck,
    answersArray,
    setAnswers,
    variantCheckResults,
    valueChangerContainer,
    isTimeUp,
}): JSX.Element => {
    const variant: ITask[] = useSelector(variantSelector)

    return (
        <div className={cn(styles.tasksWrapper)}>
            {(partOfCheck === 1 ||
                partOfCheck === 4 ||
                (partOfCheck === 5 && variantCheckResults)) &&
                variant.map((el, index) => {
                    return (
                        <Task
                            difficultyMarks={el.difficultyMarks}
                            key={el._id}
                            isVariant={true}
                            taskNumber={el.taskNumber}
                            id={el._id}
                            difficulty={el.difficulty}
                            partOfCheck={partOfCheck}
                            answer={el.answer}
                            isAnswerCorrect={
                                variantCheckResults?.answersResult[index]
                            }
                            taskImageSrc={
                                (process.env.REACT_APP_API_PATH as string) +
                                '/' +
                                el.fileName
                            }
                            valueChanger={valueChangerContainer(
                                setAnswers,
                                answersArray
                            )}
                            value={answersArray[el.taskNumber - 1]}
                            isTimeUp={isTimeUp}
                        />
                    )
                })}
            {partOfCheck === 2 &&
                variant.map((el) => {
                    if (el.taskNumber >= 13) {
                        return (
                            <Task
                                difficultyMarks={el.difficultyMarks}
                                key={el._id}
                                isVariant={true}
                                taskNumber={el.taskNumber}
                                id={el._id}
                                difficulty={el.difficulty}
                                answer={el.answer}
                                partOfCheck={2}
                                taskImageSrc={
                                    (process.env.REACT_APP_API_PATH as string) +
                                    '/' +
                                    el.fileName
                                }
                                valueChanger={valueChangerContainer(
                                    setAnswers,
                                    answersArray
                                )}
                                value={answersArray[el.taskNumber - 1]}
                            />
                        )
                    }
                })}
        </div>
    )
}

export default VariantTasks
