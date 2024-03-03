import cn from 'classnames'
import styles from './../sass/variant-page.module.sass'
import { ITask, IUser, IVariantCheckResults, setLoadingType } from '../types'
import { useSelector } from 'react-redux'
import {
    creationTimeSelector,
    isVariantSavedSelector,
    tokenSelector,
    variantCheckResultsSelector,
    variantSelector,
    variantTimerSelector,
} from '../selectors/variantSelector'
import { Button, Typography, Statistic } from 'antd'
import { useEffect, useState } from 'react'
import { AppDispatch } from '../redux/redux-store'
import { useDispatch } from 'react-redux'
import {
    CheckVariantApiAC,
    GenerateVariantWithTokenApi,
    GetVariantAnswersApiAC,
    ResetVariantAC,
    SaveCurrentTimerAC,
    SaveVariantAC,
    SetCheckResultsAC,
} from '../redux/actions/variantActions/variantActions'
import { Navigate, useLocation } from 'react-router-dom'
import VariantTasks from '../components/Variant/VariantTasks'
import ModalComponent from '../components/Variant/ModalComponent'
import {
    currentUserSelector,
    isAuthorizedSelector,
} from '../selectors/usersSelectors'
import SpinLoader from '../components/SpinLoader/SpinLoader'

const { Countdown } = Statistic

type PropsType = {
    isLoading: boolean
    setIsLoading: setLoadingType
}

const VariantPage: React.FC<PropsType> = ({
    isLoading,
    setIsLoading,
}): JSX.Element => {
    const dispatch: AppDispatch = useDispatch()
    const location = useLocation()

    const creationTime: number = useSelector(creationTimeSelector)
    const timer: number = useSelector(variantTimerSelector)

    const deadline: number = creationTime + timer

    const variant: ITask[] = useSelector(variantSelector)
    const isVariantSaved: boolean = useSelector(isVariantSavedSelector)
    const user: IUser = useSelector(currentUserSelector)
    const isAuthorized: boolean = useSelector(isAuthorizedSelector)
    const variantToken: string = useSelector(tokenSelector)
    const isVariantSolved: boolean =
        user.solvedVariants.filter((elem) => elem.variantToken === variantToken)
            .length === 1
    const variantCheckResults: IVariantCheckResults | null = useSelector(
        variantCheckResultsSelector
    )

    const [answersArray, setAnswers] = useState<Array<number | ''>>([])
    const [partOfCheck, setPart] = useState<number>(1)
    const [isTimeUp, setIsTimeUp] = useState<boolean>(false)
    const [timerValue, setTimerValue] = useState<number>(timer)

    const valueChangerContainer = (
        setAnswersArray: (answers: Array<number | ''>) => void,
        answersArray: Array<number | ''>
    ) => {
        const setAnswers = setAnswersArray
        const answers = answersArray

        return function valueChanger(taskNumber: number, value: number | '') {
            answers[taskNumber - 1] = value

            setAnswers(answers)
        }
    }

    const onBeforeUnloadHandler = (event: BeforeUnloadEvent) => {
        event.preventDefault()

        if (isTimeUp) {
            localStorage.setItem('timer', '0')
        } else {
            localStorage.setItem('timer', String(timerValue))
        }
    }

    useEffect(() => {
        if (variantCheckResults && !isVariantSaved) {
            if (isAuthorized) {
                dispatch(
                    SaveVariantAC({
                        variantToken: variantToken,
                        timer: timerValue,
                        date: new Date(),
                        primaryPoints: variantCheckResults.primaryPoints,
                        secondaryPoints: variantCheckResults.secondaryPoints,
                        answers: variantCheckResults.answersResult,
                    })
                )
            }
        }
        if (variantCheckResults && isVariantSaved) {
            setPart(5)
        }
    }, [variantCheckResults])

    useEffect(() => {
        if (timerValue !== 0 && !isVariantSolved) {
            localStorage.setItem('timer', String(timerValue))
        }
        if (timerValue === 0 && timer) {
            localStorage.setItem('timer', String(0))
        }
    }, [location])

    useEffect(() => {
        if (isTimeUp) {
            localStorage.setItem('timer', '0')
            setTimerValue(0)
            dispatch(SaveCurrentTimerAC(0))
        }
    }, [isTimeUp])

    useEffect(() => {
        window.addEventListener('beforeunload', onBeforeUnloadHandler)
        if (localStorage.getItem('currentVariant')) {
            dispatch(
                GenerateVariantWithTokenApi(
                    localStorage.getItem('currentVariant') as string,
                    setIsLoading
                )
            )
        }
        if (localStorage.getItem('timer') && !isVariantSolved) {
            setTimerValue(Number(localStorage.getItem('timer')))
        }
        if (variantToken) {
            localStorage.setItem('currentVariant', variantToken)
        }
        if (variantCheckResults) {
            setPart(5)
        }
        if (Number(localStorage.getItem('timer')) === 0) {
            setIsTimeUp(true)
        }
        if (isVariantSolved && user) {
            const solvedVariant = user.solvedVariants.filter(
                (elem) => elem.variantToken === variantToken
            )[0]

            const checkResults: IVariantCheckResults = {
                primaryPoints: solvedVariant.primaryPoints,
                secondaryPoints: solvedVariant.secondaryPoints,
                answersResult: solvedVariant.answers,
            }

            localStorage.setItem('timer', String(solvedVariant.timer))

            dispatch(SetCheckResultsAC(checkResults))
            dispatch(SaveCurrentTimerAC(solvedVariant.timer))
            setTimerValue(solvedVariant.timer)
        }

        return () => {
            window.removeEventListener('beforeunload', onBeforeUnloadHandler)
        }
    }, [])

    if (!variantToken) {
        return <Navigate to={'/generator'} />
    }

    return (
        <section style={{ height: '100%' }}>
            <main className={cn('container', styles.container)}>
                <h1 className={cn(styles.headerText)}>Вариант</h1>
                <Typography.Paragraph
                    className={cn(styles.tokenText)}
                    copyable={{ text: variantToken }}
                >
                    Токен
                </Typography.Paragraph>
                {partOfCheck !== 5 && partOfCheck !== 4 ? (
                    <Countdown
                        title="Осталось времени:"
                        onChange={(value) => {
                            setTimerValue(value as number)
                        }}
                        onFinish={() => {
                            setPart(2)
                            setIsTimeUp(true)
                            dispatch(
                                GetVariantAnswersApiAC(
                                    variantToken,
                                    setIsLoading
                                )
                            )
                            window.scrollTo({
                                top: 0,
                            })
                        }}
                        value={deadline}
                    />
                ) : (
                    <div className={cn(styles.timerWrapper)}>
                        <span className={cn(styles.timerText)}>
                            Осталось времени:
                        </span>
                        <span className={cn(styles.timer)}>
                            {new Date(timer).toISOString().slice(11, 19)}
                        </span>
                    </div>
                )}
                {isLoading && (
                    <SpinLoader size="large" style={{ height: '100%' }} />
                )}
                {!isLoading && (
                    <>
                        <VariantTasks
                            isTimeUp={isTimeUp}
                            valueChangerContainer={valueChangerContainer}
                            variantCheckResults={variantCheckResults}
                            partOfCheck={partOfCheck}
                            answersArray={answersArray}
                            setAnswers={setAnswers}
                        />
                        {partOfCheck === 1 && variantCheckResults == null && (
                            <Button
                                onClick={() => {
                                    setPart(2)
                                    dispatch(
                                        GetVariantAnswersApiAC(
                                            variantToken,
                                            setIsLoading
                                        )
                                    )
                                    window.scrollTo({
                                        top: 0,
                                    })
                                }}
                                className={cn(styles.checkButton)}
                                type="primary"
                            >
                                Проверить вторую часть
                            </Button>
                        )}
                        {partOfCheck === 2 && variantCheckResults == null && (
                            <div>
                                <Button
                                    className={cn(styles.checkButton)}
                                    onClick={() => {
                                        setPart(1)
                                    }}
                                >
                                    Вернуться к первой части
                                </Button>
                                <Button
                                    onClick={() => {
                                        dispatch(
                                            CheckVariantApiAC(
                                                variant,
                                                answersArray,
                                                setIsLoading
                                            )
                                        )
                                        setPart(4)
                                        dispatch(SaveCurrentTimerAC(timerValue))
                                    }}
                                    className={cn(styles.checkButton)}
                                    type="primary"
                                >
                                    Проверить ответы
                                </Button>
                            </div>
                        )}
                        {(partOfCheck === 5 || partOfCheck === 4) &&
                            variantCheckResults && (
                                <div>
                                    <Button
                                        type="primary"
                                        style={{
                                            borderRadius: '0px',
                                        }}
                                        onClick={() => {
                                            setPart(4)
                                        }}
                                        className={cn(styles.checkButton)}
                                    >
                                        Посмотреть результаты
                                    </Button>
                                </div>
                            )}
                        <Button
                            type="primary"
                            danger
                            style={{
                                borderRadius: '0px',
                            }}
                            onClick={() => {
                                localStorage.removeItem('currentVariant')
                                localStorage.removeItem('timer')
                                localStorage.removeItem('creationTime')
                                dispatch(ResetVariantAC())
                            }}
                            className={cn(styles.checkButton)}
                        >
                            Выйти из варианта
                        </Button>
                    </>
                )}
                <ModalComponent
                    timer={timer}
                    partOfCheck={partOfCheck}
                    setPart={setPart}
                    variantCheckResults={variantCheckResults}
                />
            </main>
        </section>
    )
}

export default VariantPage
