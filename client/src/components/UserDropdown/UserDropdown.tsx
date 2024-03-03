import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { UserOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps, Space, Spin } from 'antd'
import cn from 'classnames'
import styles from './../../sass/UserDropdown.module.sass'
import { AppDispatch } from '../../redux/redux-store'
import { useDispatch } from 'react-redux'
import { LogoutAC } from '../../redux/actions/usersActions/usersActions'

type PropsType = {
    username: string
    userId: string
    isLoading: boolean
}

const UserDropDown: React.FC<PropsType> = ({
    username,
    userId,
    isLoading,
}): JSX.Element => {
    const dispatch: AppDispatch = useDispatch()

    const { pathname } = useLocation()

    const navigate = useNavigate()

    const items: MenuProps['items'] = [
        {
            key: 'profileButton',
            label: <NavLink to={`/profile/${userId}`}>Профиль</NavLink>,
            icon: <UserOutlined />,
        },
        {
            key: 'logoutButton',
            label: 'Выйти',
            onClick: () => {
                dispatch(LogoutAC())

                if (pathname.split('/')[1] === 'profile') {
                    navigate('/')
                }
            },
            danger: true,
            icon: <LogoutOutlined />,
        },
    ]

    return (
        <div>
            {isLoading && <Spin spinning></Spin>}
            {username && !isLoading && (
                <Dropdown menu={{ items }}>
                    <div className={cn(styles.userInfo)}>
                        <Space>
                            {username}
                            <DownOutlined />
                        </Space>
                    </div>
                </Dropdown>
            )}
            {!username && !isLoading && (
                <NavLink className={cn(styles.userInfo)} to="/auth">
                    Войти
                </NavLink>
            )}
        </div>
    )
}

export default UserDropDown
