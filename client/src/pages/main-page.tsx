import cn from 'classnames'
import styles from './../sass/main-page.module.sass'
import { NavLink } from 'react-router-dom'

type PropsType = {}

const MainPage: React.FC<PropsType> = (): JSX.Element => {
    return (
        <div className={cn(styles.wrapper)}>
            <h1 className={cn(styles.headerText)}>
                Сайт для подготовки к егэ по профильной математике
            </h1>
            <div className={cn(styles.blocks)}>
                <div className={cn(styles.textBlock)}>
                    <h2 className={cn(styles.subheaderText)}>
                        Общая информация
                    </h2>
                    <p className={cn(styles.text)}>
                        Это сайт для подготовки к{' '}
                        <strong>ЕГЭ по профильной математике</strong>. Все
                        задания взяты с{' '}
                        <a
                            target="__blank"
                            href="https://ege.fipi.ru/bank/index.php?proj=AC437B34557F88EA4115D2F374B0A07B"
                        >
                            официального сайта ФИПИ
                        </a>{' '}
                        за <strong>2024 год</strong>. Оценка сложности заданий
                        проводилась по <strong>субъективным ощущениям</strong>.
                    </p>
                </div>
                <div className={cn(styles.textBlock)}>
                    <h2 className={cn(styles.subheaderText)}>
                        Правила решения вариантов
                    </h2>
                    <p className={cn(styles.text)}>
                        Вариант решается на протяжении{' '}
                        <strong>3 часов 55 минут</strong>. При решении варианта{' '}
                        <strong>рекомендуется</strong> не обновлять страницу и
                        не переходить на другие ссылки. <br />В первой части
                        варианта требуется написать ответ. Ответ должен быть{' '}
                        <strong>
                            целым положительным или отрицательным числом
                        </strong>
                        . <br />
                        Вторую часть пользователь оценивает самостоятельно,
                        выставляя баллы в соответствии{' '}
                        <a
                            target="__blank"
                            href="https://v-insayte.ru/perevodballovegematematika"
                        >
                            с критериями оценивания заданий
                        </a>
                        . После решения, вариант сохраняется{' '}
                        <strong>в профиле</strong>.
                    </p>
                    <p className={cn(styles.text)}>
                        При генерации варианта генерируется токен варианта. Этим
                        токеном можно делиться, если хочется поделиться
                        вариантом.
                    </p>
                </div>
                <div className={cn(styles.textBlock)}>
                    <h2 className={cn(styles.subheaderText)}>
                        Регистрация / Авторизация
                    </h2>
                    <p className={cn(styles.text)}>
                        Для <NavLink to={'/register'}>регистрации</NavLink>{' '}
                        требуется указать{' '}
                        <strong>
                            имя пользователя, почту и придумать пароль
                        </strong>
                        .{' '}
                        <strong>
                            После регистрации пароль пока что поменять нельзя!
                        </strong>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MainPage
