import cn from 'classnames'
import styles from './../sass/not-found-page.module.sass'

type PropsType = {}

const NotFoundPage: React.FC<PropsType> = (): JSX.Element => {
    return (
        <div className={cn(styles.wrapper)}>
            <span className={cn(styles.statusCode)}>404</span>
            <span className={cn(styles.statusMessage)}>
                Такой страницы не существует...
            </span>
        </div>
    )
}

export default NotFoundPage
