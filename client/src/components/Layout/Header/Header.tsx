import cn from 'classnames'
import styles from './../../../sass/Header.module.sass'
import { NavLink, useLocation } from 'react-router-dom'
import { Layout, MenuProps } from 'antd'
import { Menu } from 'antd'
import logo from './../../../images/logo.png'
import UserDropDown from '../../UserDropdown/UserDropdown'
import { useSelector } from 'react-redux'
import { tokenSelector } from '../../../selectors/variantSelector'

const { Header } = Layout

type PropsType = {
    username: string
    userId: string
    isLoading: boolean
}

const HeaderComponent: React.FC<PropsType> = ({
    username,
    userId,
    isLoading,
}): JSX.Element => {
    const location = useLocation()

    const currentKey: string = location.pathname.split('').slice(1).join('')

    const variantToken: string = useSelector(tokenSelector)

    const items: MenuProps['items'] = [
        {
            key: 'tasks',
            label: (
                <NavLink
                    style={{ color: 'white', textTransform: 'uppercase' }}
                    to={'/tasks'}
                >
                    Задания
                </NavLink>
            ),
        },
    ]

    if (!variantToken) {
        items.push({
            key: 'generator',
            label: (
                <NavLink
                    style={{ color: 'white', textTransform: 'uppercase' }}
                    to={'/generator'}
                >
                    Генератор варианта
                </NavLink>
            ),
        })
    }

    if (localStorage.getItem('currentVariant')) {
        items.push({
            key: 'variant',
            label: (
                <NavLink
                    style={{ color: 'white', textTransform: 'uppercase' }}
                    to={'/variant'}
                >
                    Вариант
                </NavLink>
            ),
        })
    }

    return (
        <Header className={cn(styles.header)}>
            <div className={cn('container', styles.container)}>
                <div className={cn(styles.logo)}>
                    <NavLink className={cn(styles.logo)} to={'/'}>
                        <img src={logo} alt="logo" />
                    </NavLink>
                </div>
                <Menu
                    selectedKeys={[currentKey]}
                    style={{
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                    theme="dark"
                    mode="horizontal"
                    items={items}
                />
                <UserDropDown
                    isLoading={isLoading}
                    userId={userId}
                    username={username}
                />
            </div>
        </Header>
    )
}

export default HeaderComponent
