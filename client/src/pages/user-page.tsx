import { useSelector } from 'react-redux'
import { IUser, setLoadingType } from '../types'
import { currentUserSelector } from '../selectors/usersSelectors'
import { Params, useNavigate, useParams } from 'react-router-dom'
import { Button, Space, Typography } from 'antd'
import cn from 'classnames'
import styles from './../sass/user-page.module.sass'
import {
    ChangeUsernameApiAC,
    LogoutAC,
} from '../redux/actions/usersActions/usersActions'
import { AppDispatch } from '../redux/redux-store'
import { useDispatch } from 'react-redux'
import Statistics from '../components/UserPage/Statistics'
import SpinLoader from '../components/SpinLoader/SpinLoader'

type PropsType = {
    isLoading: boolean
    setIsLoading: setLoadingType
}

const UserPage: React.FC<PropsType> = ({
    isLoading,
    setIsLoading,
}): JSX.Element => {
    const dispatch: AppDispatch = useDispatch()

    const navigate = useNavigate()

    const authUser: IUser = useSelector(currentUserSelector)
    const { email, username, solvedVariants } = authUser

    const params: Params = useParams<string>()
    const { userId } = params

    if (isLoading) {
        return (
            <div className={cn(styles.loaderWrapper)}>
                <SpinLoader />
                <span>Загрузка профиля</span>
            </div>
        )
    }

    return (
        <div className={cn(styles.wrapper, 'container')}>
            <div className={cn(styles.userInfo)}>
                <Space
                    className={cn(styles.wrapper__inner)}
                    size="middle"
                    direction="vertical"
                >
                    <div className={cn(styles.info)}>
                        Имя пользователя:
                        <br />
                        <Typography.Text
                            copyable
                            editable={{
                                onChange(value) {
                                    dispatch(
                                        ChangeUsernameApiAC(value, setIsLoading)
                                    )
                                },
                            }}
                            className={cn(
                                styles.userInfo,
                                styles.userChangeInput
                            )}
                        >
                            {username}
                        </Typography.Text>
                    </div>
                    <div className={cn(styles.info)}>
                        Электронная почта:
                        <br />
                        <Typography.Text
                            copyable
                            className={cn(styles.userInfo)}
                        >
                            {email}
                        </Typography.Text>
                    </div>
                    <div className={cn(styles.info)}>
                        Id пользователя:
                        <br />
                        <Typography.Text
                            copyable
                            className={cn(styles.userInfo)}
                        >
                            {userId}
                        </Typography.Text>
                    </div>
                    <Button
                        onClick={() => {
                            dispatch(LogoutAC())
                            navigate('/')
                        }}
                        className={cn(styles.logout)}
                        danger
                        type="primary"
                    >
                        Выйти
                    </Button>
                </Space>
            </div>
            <Statistics solvedVariants={solvedVariants} />
        </div>
    )
}

export default UserPage
