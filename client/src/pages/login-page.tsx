import cn from 'classnames'
import styles from './../sass/LoginPage.module.sass'
import { Form, Input, Checkbox, Button, Alert, Spin } from 'antd'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/redux-store'
import { AuthorizationApiAC } from '../redux/actions/usersActions/usersActions'
import { NavLink, Navigate } from 'react-router-dom'
import { IUser } from '../types'
import { useSelector } from 'react-redux'
import { currentUserSelector } from '../selectors/usersSelectors'

type PropsType = {}

const Login: React.FC<PropsType> = (): JSX.Element => {
    const dispatch: AppDispatch = useDispatch()
    const user: IUser = useSelector(currentUserSelector)

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            rememberMe: false,
        },
        onSubmit(values, { setStatus, setSubmitting }) {
            dispatch(AuthorizationApiAC(values, setStatus, setSubmitting))
        },
        initialStatus: {
            statusCode: null,
            message: '',
        },
    })

    if (formik.status.statusCode === 201 && user) {
        return <Navigate to={`/profile/${user.id}`} />
    }

    return (
        <div className={cn(styles.wrapper)}>
            <div className={cn(styles.top)}>
                <h1>Авторизация</h1>
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
                    rememberMe: formik.initialValues.rememberMe,
                }}
            >
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'Имя пользователя обязательно!',
                        },
                        {
                            min: 6,
                            message:
                                'Имя пользователя должно быть больше 5 символов!',
                        },
                        {
                            max: 15,
                            message:
                                'Имя пользователя должно быть меньше 16 символов!',
                        },
                    ]}
                    name="username"
                >
                    <Input
                        disabled={formik.isSubmitting}
                        maxLength={15}
                        placeholder="Имя пользователя"
                        onChange={(e) => {
                            formik.setFieldValue('username', e.target.value)
                        }}
                        value={formik.values.username}
                    />
                </Form.Item>
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'Пароль обязателен!',
                        },
                        {
                            pattern: /[^[\W]/,
                            message: 'Неверный пароль!',
                        },
                        {
                            min: 6,
                            message: 'Пароль должен быть больше 5 символов',
                        },
                        {
                            max: 30,
                            message: 'Пароль должен быть меньше 31 символа',
                        },
                    ]}
                    name="password"
                >
                    <Input.Password
                        disabled={formik.isSubmitting}
                        type="password"
                        maxLength={30}
                        placeholder="Пароль"
                        value={formik.values.password}
                        onChange={(e) => {
                            formik.setFieldValue('password', e.target.value)
                        }}
                    />
                </Form.Item>
                <Form.Item name="rememberMe">
                    <Checkbox
                        disabled={formik.isSubmitting}
                        value={formik.values.rememberMe}
                        className={cn(styles.checkbox)}
                        onChange={(e) => {
                            formik.setFieldValue('rememberMe', e.target.checked)
                        }}
                    >
                        Запомнить меня
                    </Checkbox>
                </Form.Item>
                <Form.Item>
                    <span className={cn(styles.span)}>
                        Не зарегистрированы? {''}
                        {<NavLink to="/register">Зарегистрироваться</NavLink>}
                    </span>
                </Form.Item>
                <Form.Item>
                    <Button
                        disabled={formik.isSubmitting}
                        htmlType="submit"
                        type="primary"
                        className={cn(styles.submitButton)}
                    >
                        Авторизоваться
                    </Button>
                </Form.Item>
                {formik.status.statusCode !== null && (
                    <Form.Item>
                        <Alert
                            type="error"
                            message="Ошибка"
                            description={formik.status.message}
                            showIcon
                        />
                    </Form.Item>
                )}
            </Form>
        </div>
    )
}

export default Login
