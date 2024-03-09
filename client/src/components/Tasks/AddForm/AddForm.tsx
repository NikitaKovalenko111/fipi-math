import { Form, Select, Rate, Button, Upload } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form'
import { useFormik } from 'formik'
import {
    difficultyFilterValues,
    taskFilterValues,
} from '../TasksFilter/TasksFilter'
import { InboxOutlined } from '@ant-design/icons'
import styles from './../../../sass/AddForm.module.sass'
import cn from 'classnames'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/redux-store'
import { addTaskApiAC } from '../../../redux/actions/tasksActions/tasksActions'
import { setLoadingType } from '../../../types'
import 'katex/dist/katex.css'
import MDEditor from '@uiw/react-md-editor'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

type PropsType = {
    changeIsAddFormVisible: (value: boolean) => void
    setIsLoading: setLoadingType
}

const taskAvailableValues: Array<number | string> = taskFilterValues.slice(1)
const difficultyAvailableValues: Array<number | string> =
    difficultyFilterValues.slice(1)

const AddForm: React.FC<PropsType> = ({
    changeIsAddFormVisible,
    setIsLoading,
}): JSX.Element => {
    const dispatch: AppDispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            taskNumber: 1,
            difficulty: 1,
            file: null,
            answer: '',
        },

        onSubmit: (values) => {
            if (values.file !== null)
                dispatch(
                    addTaskApiAC(
                        values.taskNumber,
                        values.difficulty,
                        values.file,
                        values.answer,
                        setIsLoading
                    )
                )
        },
    })

    const [form] = useForm()

    return (
        <Form
            style={{
                background: '#edf0ee',
                padding: '10px',
                border: 'solid 1px #e8ebe9',
                borderRadius: '20px',
            }}
            form={form}
            initialValues={formik.initialValues}
        >
            <CloseOutlined
                style={{ float: 'right' }}
                onClick={() => {
                    changeIsAddFormVisible(false)
                }}
            />
            <div className={cn(styles.upWrapper)}>
                <Form.Item
                    labelCol={{ span: 24 }}
                    colon={false}
                    style={{ width: '200px' }}
                    required
                    label="№ Задания:"
                >
                    <Select
                        value={formik.values.taskNumber}
                        onChange={(value) => {
                            formik.setFieldValue('taskNumber', value)
                        }}
                    >
                        {taskAvailableValues.map((el, index) => {
                            return (
                                <Select.Option key={index} value={el}>
                                    {el}
                                </Select.Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    colon={false}
                    labelAlign="right"
                    required
                    htmlFor="difficultyRate"
                    labelCol={{
                        style: {
                            display: 'flex',
                            justifyContent: 'center',
                            textAlign: 'center',
                            width: '100%',
                        },
                    }}
                    wrapperCol={{
                        flex: 'auto',
                        style: {
                            width: '100%',
                            display: 'flex',
                        },
                    }}
                    label={<span>Сложность: </span>}
                >
                    <Rate
                        id="difficultyRate"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        count={difficultyAvailableValues.length}
                        value={formik.values.difficulty}
                        onChange={(value) => {
                            formik.setFieldValue('difficulty', value)
                        }}
                    />
                </Form.Item>
            </div>
            <Form.Item
                style={{ width: '100%' }}
                colon={false}
                label="Ответ:"
                labelCol={{ span: 24 }}
            >
                <MDEditor
                    value={formik.values.answer}
                    onChange={(newValue) =>
                        formik.setFieldValue('answer', newValue!)
                    }
                    textareaProps={{
                        placeholder:
                            'Напишите решение с ответом или только ответ...',
                    }}
                    previewOptions={{
                        remarkPlugins: [[remarkMath]],
                        rehypePlugins: [
                            [
                                //@ts-ignore
                                rehypeKatex,
                                {
                                    displayMode: false,
                                    output: 'mathml',
                                },
                            ],
                        ],
                    }}
                />
                {/*<MathInput
                    style={{ height: 'auto', width: '100%' }}
                    setValue={(value: string) => {
                        formik.setFieldValue('answer', value)
                    }}
                    value={formik.values.answer}
                /> */}
            </Form.Item>
            <Form.Item
                labelCol={{ span: 24 }}
                required
                label="Изображение задания:"
            >
                <Form.Item name="dragger" noStyle>
                    <Upload.Dragger
                        maxCount={1}
                        listType="picture"
                        accept=".png"
                        multiple={false}
                        beforeUpload={(file) => {
                            return new Promise((resolve, reject) => {
                                if (file) {
                                    resolve(false)
                                }
                            })
                        }}
                        name="file"
                        onChange={(file) => {
                            formik.setFieldValue('file', file.file)
                        }}
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Нажмите или перенесите файл на это поле для загрузки
                        </p>
                    </Upload.Dragger>
                </Form.Item>
            </Form.Item>
            <Button
                htmlType="submit"
                onClick={() => {
                    formik.handleSubmit()
                }}
                style={{ width: '100%' }}
            >
                Добавить задание
            </Button>
        </Form>
    )
}

export default AddForm
