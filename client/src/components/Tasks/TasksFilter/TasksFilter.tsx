import { Form, Select, Button, Checkbox, Row } from 'antd'
import { useFormik } from 'formik'
import { useSearchParams } from 'react-router-dom'
import { changeSearchParams } from '../../../utils'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/redux-store'
import { IFilter } from '../../../types'
import { DownOutlined } from '@ant-design/icons'
import {
    changeFilterValueAC,
    getTasksApiAC,
} from '../../../redux/actions/tasksActions/tasksActions'
import { useSelector } from 'react-redux'
import { filterSelector } from '../../../selectors/tasksSelectors'
import { ReactElement, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './../../../sass/TasksFilter.module.sass'
import { isAuthorizedSelector } from '../../../selectors/usersSelectors'

type PropsType = {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const taskFilterValues: Array<number | string> = [
    'All',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
]
export const difficultyFilterValues: Array<number | string> = [
    'All',
    1,
    2,
    3,
    4,
    5,
]
export const difficultySortFilterValues: Array<string> = ['1', '-1']

const TasksFilter: React.FC<PropsType> = ({ setIsLoading }): JSX.Element => {
    const [form] = Form.useForm()
    const [expand, setExpand] = useState(false)

    const dispatch: AppDispatch = useDispatch()

    const filter: IFilter = useSelector(filterSelector)
    const isAuthorized: boolean = useSelector(isAuthorizedSelector)

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        dispatch(
            changeFilterValueAC({
                difficulty:
                    searchParams.has('difficulty') &&
                    searchParams.get('difficulty') !== 'All'
                        ? Number(searchParams.get('difficulty'))
                        : undefined,
                difficultySort: searchParams.has('difficultySort')
                    ? String(searchParams.get('difficultySort'))
                    : '1',
                taskNumber:
                    searchParams.has('taskNumber') &&
                    searchParams.get('taskNumber') !== 'All'
                        ? Number(searchParams.get('taskNumber'))
                        : undefined,
                isAnswer: searchParams.has('isAnswer')
                    ? Number(searchParams.get('isAnswer'))
                    : 0,
                isSolved: searchParams.has('isSolved')
                    ? Number(searchParams.get('isSolved'))
                    : 0,
                isUnsolved: searchParams.has('isUnsolved')
                    ? Number(searchParams.get('isUnsolved'))
                    : 0,
            })
        )
    }, [])

    const formik = useFormik({
        initialValues: {
            difficulty: difficultyFilterValues[0],
            taskNumber: taskFilterValues[0],
            difficultySort: difficultySortFilterValues[0],
            isAnswer: 0,
            isSolved: 0,
            isUnsolved: 0,
        },
        onSubmit: (values) => {
            formik.setSubmitting(true)

            changeSearchParams(values, searchParams, setSearchParams)

            const filter: IFilter = {
                taskNumber:
                    values.taskNumber === 'All'
                        ? undefined
                        : (values.taskNumber as number),
                difficulty:
                    values.difficulty === 'All'
                        ? undefined
                        : (values.difficulty as number),
                difficultySort: values.difficultySort as string,
                isAnswer: values.isAnswer,
                isSolved: values.isSolved,
                isUnsolved: values.isUnsolved,
            }

            dispatch(changeFilterValueAC(filter))

            formik.setSubmitting(false)
        },
        onReset: (values) => {
            Object.keys(values).forEach((el, index, array) => {
                searchParams.delete(el)

                if (index === array.length - 1) setSearchParams(searchParams)
            })

            form.resetFields()

            dispatch(
                changeFilterValueAC({
                    difficulty: undefined,
                    difficultySort: '1',
                    taskNumber: undefined,
                    isAnswer: 0,
                    isSolved: 0,
                    isUnsolved: 0,
                })
            )

            dispatch(
                getTasksApiAC(
                    1,
                    Number(searchParams.get('pageSize')),
                    setIsLoading,
                    filter
                )
            )
        },
    })

    useEffect(() => {
        formik.setValues({
            difficulty:
                filter.difficulty !== undefined
                    ? String(filter.difficulty)
                    : difficultyFilterValues[0],
            difficultySort:
                filter.difficultySort !== undefined
                    ? String(filter.difficultySort)
                    : difficultySortFilterValues[0],
            taskNumber:
                filter.taskNumber !== undefined
                    ? String(filter.taskNumber)
                    : taskFilterValues[0],
            isAnswer:
                filter.isAnswer !== undefined ? Number(filter.isAnswer) : 0,
            isSolved:
                filter.isSolved !== undefined ? Number(filter.isSolved) : 0,
            isUnsolved:
                filter.isUnsolved !== undefined ? Number(filter.isUnsolved) : 0,
        })

        form.setFieldsValue({
            difficulty: filter.difficulty
                ? filter.difficulty
                : difficultyFilterValues[0],
            difficultySort: filter.difficultySort
                ? filter.difficultySort
                : difficultySortFilterValues[0],
            taskNumber: filter.taskNumber
                ? filter.taskNumber
                : taskFilterValues[0],
            isAnswer:
                filter.isAnswer !== undefined ? Number(filter.isAnswer) : 0,
            isSolved:
                filter.isSolved !== undefined ? Number(filter.isSolved) : 0,
            isUnsolved:
                filter.isUnsolved !== undefined ? Number(filter.isUnsolved) : 0,
        })
    }, [filter])

    const children: Array<ReactElement> = [
        <Form.Item
            key={654}
            style={{
                maxWidth: '200px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
            }}
            initialValue={formik.initialValues.taskNumber}
            label="№ Задания:"
            name="taskNumber"
        >
            <Select
                value={String(formik.values.taskNumber)}
                onChange={(value: string) =>
                    formik.setFieldValue('taskNumber', value)
                }
            >
                {taskFilterValues.map((elem, index) => {
                    return (
                        <Select.Option key={elem} value={elem}>
                            {index === 0 ? 'Все' : elem}
                        </Select.Option>
                    )
                })}
            </Select>
        </Form.Item>,
        <Form.Item
            key={653643}
            initialValue={formik.initialValues.difficulty}
            style={{
                maxWidth: '200px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
            }}
            label="Сложность:"
            name="difficulty"
        >
            <Select
                value={String(formik.values.difficulty)}
                onChange={(value: string) =>
                    formik.setFieldValue('difficulty', value)
                }
            >
                {difficultyFilterValues.map((elem, index) => {
                    return (
                        <Select.Option key={elem} value={elem}>
                            {index === 0 ? 'Все' : elem}
                        </Select.Option>
                    )
                })}
            </Select>
        </Form.Item>,
        <Form.Item
            key={1264}
            initialValue={formik.initialValues.difficultySort}
            style={{
                maxWidth: '350px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
            }}
            label="Сортировка:"
            name="difficultySort"
        >
            <Select
                value={formik.values.difficultySort}
                onChange={(value: string) =>
                    formik.setFieldValue('difficultySort', value)
                }
            >
                {difficultySortFilterValues.map((elem, index) => {
                    switch (elem) {
                        case '1':
                            return (
                                <Select.Option key={index} value={elem}>
                                    От легкого к сложному
                                </Select.Option>
                            )

                        case '-1':
                            return (
                                <Select.Option key={index} value={elem}>
                                    От сложного к легкому
                                </Select.Option>
                            )

                        default:
                            return false
                    }
                })}
            </Select>
        </Form.Item>,
        <Form.Item
            key={12654}
            style={{
                maxWidth: '150px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                textAlign: 'center',
            }}
            label="Есть ответ:"
            initialValue={Boolean(formik.initialValues.isAnswer)}
        >
            <Checkbox
                onChange={(value) => {
                    formik.setFieldValue(
                        'isAnswer',
                        Number(value.target.checked)
                    )
                }}
                checked={Boolean(formik.values.isAnswer)}
            />
        </Form.Item>,
    ]

    const childerUncollapsed: Array<ReactElement> = [
        <Form.Item
            key={65464}
            style={{
                maxWidth: '200px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                textAlign: 'center',
            }}
            label="Решенные задания:"
        >
            <Checkbox
                disabled={Boolean(formik.values.isUnsolved)}
                onChange={(value) => {
                    formik.setFieldValue(
                        'isSolved',
                        Number(value.target.checked)
                    )
                }}
                checked={Boolean(formik.values.isSolved)}
            />
        </Form.Item>,
        <Form.Item
            key={66564}
            style={{
                maxWidth: '220px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                textAlign: 'center',
            }}
            label="Нерешенные задания:"
        >
            <Checkbox
                disabled={Boolean(formik.values.isSolved)}
                onChange={(value) => {
                    formik.setFieldValue(
                        'isUnsolved',
                        Number(value.target.checked)
                    )
                }}
                checked={Boolean(formik.values.isUnsolved)}
            />
        </Form.Item>,
    ]

    return (
        <Form
            form={form}
            name="advanced_search"
            layout="vertical"
            style={{
                borderBottom: '1px solid #cccfcd',
                borderTop: '1px solid #cccfcd',
                padding: '15px 5px',
                boxShadow: '10px 5px 5px #d9dedb',
            }}
            onFinish={formik.handleSubmit}
        >
            <Row className={cn(styles.row)} justify={'space-evenly'}>
                {children}
            </Row>
            {expand && isAuthorized && (
                <Row justify={'space-evenly'}>{childerUncollapsed}</Row>
            )}
            <div className={cn(styles.buttonWrapper)}>
                {isAuthorized && (
                    <span
                        className={cn(styles.collapseButton)}
                        onClick={() => {
                            setExpand(!expand)
                        }}
                    >
                        <DownOutlined rotate={expand ? 180 : 0} />{' '}
                        {expand ? 'Свернуть' : 'Развернуть'}
                    </span>
                )}
                <Button
                    htmlType="reset"
                    style={{ textTransform: 'uppercase' }}
                    onClick={formik.handleReset}
                >
                    Сбросить
                </Button>
                <Button
                    htmlType="submit"
                    style={{ textTransform: 'uppercase' }}
                >
                    Поиск
                </Button>
            </div>
        </Form>
    )
}

export default TasksFilter
