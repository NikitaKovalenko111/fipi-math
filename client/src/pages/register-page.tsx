import cn from 'classnames'
import styles from './../sass/LoginPage.module.sass'
import { Form, Input, Button, Alert, Spin } from 'antd'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/redux-store'
import { NavLink } from 'react-router-dom'
import { RegisterAC } from '../redux/actions/usersActions/usersActions'

type PropsType = {}

const Register: React.FC<PropsType> = (): JSX.Element => {
    const dispatch: AppDispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            email: '',
        },
        onSubmit(values, { setSubmitting, setStatus }) {
            dispatch(RegisterAC(values, setStatus, setSubmitting))
        },
        enableReinitialize: true,
        initialStatus: {
            statusCode: null,
            message: '',
        },
    })

    return (
        <div className={cn(styles.wrapper)}>
            <div className={cn(styles.top)}>
                <h1>Регистрация</h1>
                <Spin
                    className={cn(styles.spin)}
                    size="default"
                    spinning={formik.isSubmitting}
                ></Spin>
            </div>
            <Form
                className={cn(styles.form)}
                onFinish={formik.handleSubmit}
                initialValues={{
                    username: formik.initialValues.username,
                    password: formik.initialValues.password,
                    email: formik.initialValues.email,
                }}
            >
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'Введите имя пользователя',
                        },
                        {
                            min: 6,
                            message:
                                'Имя пользователя должно быть больше 6 символов',
                        },
                        {
                            max: 15,
                            message:
                                'Имя пользователя должно быть не больше 15 символов',
                        },
                    ]}
                    name="username"
                >
                    <Input
                        disabled={formik.isSubmitting}
                        maxLength={16}
                        placeholder="Имя пользователя"
                        onChange={(e) => {
                            formik.setFieldValue('username', e.target.value)
                        }}
                        value={formik.values.username}
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Введите номер электронной почты',
                        },
                        {
                            pattern: /^[a-z]\w{4,}@\w{2,}\.\w{2,}/,
                            message: 'Неверный номер электронной почты',
                        },
                    ]}
                >
                    <Input
                        disabled={formik.isSubmitting}
                        placeholder="Электронная почта"
                        value={formik.values.email}
                        onChange={(e) => {
                            formik.setFieldValue('email', e.target.value)
                        }}
                    />
                </Form.Item>
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'Введите пароль',
                        },
                        {
                            pattern: /[^[\W]/,
                            message: 'Неверный пароль',
                        },
                        {
                            min: 6,
                            message: 'Пароль должен быть больше 6 символов',
                        },
                        {
                            max: 30,
                            message: 'Пароль должен быть меньше 30 символов',
                        },
                    ]}
                    name="password"
                >
                    <Input.Password
                        disabled={formik.isSubmitting}
                        type="password"
                        placeholder="Пароль"
                        value={formik.values.password}
                        onChange={(e) => {
                            formik.setFieldValue('password', e.target.value)
                        }}
                    />
                </Form.Item>
                <Form.Item>
                    <span className={cn(styles.span)}>
                        Уже зарегистрированы? {''}
                        {<NavLink to="/auth">Войти</NavLink>}
                    </span>
                </Form.Item>
                <Form.Item>
                    <Button
                        htmlType="submit"
                        type="primary"
                        className={cn(styles.submitButton)}
                    >
                        Зарегистрироваться
                    </Button>
                </Form.Item>
                {formik.status.statusCode === 201 && (
                    <Form.Item>
                        <Alert
                            type="success"
                            showIcon
                            message="Пользователь зарегистрирован"
                            description={
                                <NavLink to="/auth">Войдите в аккаунт</NavLink>
                            }
                        />
                    </Form.Item>
                )}
                {formik.status.statusCode !== null &&
                    formik.status.statusCode !== 201 && (
                        <Form.Item>
                            <Alert
                                type="error"
                                showIcon
                                message="Ошибка"
                                description={formik.status.message}
                            />
                        </Form.Item>
                    )}
            </Form>
        </div>
    )
}

export default Register
