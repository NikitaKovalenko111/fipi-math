import cn from 'classnames'
import styles from './../../sass/SolvedVariant.module.sass'
import { Typography } from 'antd'

type PropsType = {
    variantToken: string
    timer: number
    primaryPoints: number
    secondaryPoints: number
    date: Date
}

const SolvedVariant: React.FC<PropsType> = ({
    variantToken,
    timer,
    primaryPoints,
    secondaryPoints,
    date,
}): JSX.Element => {
    return (
        <div className={cn(styles.wrapper)}>
            <div>
                <Typography.Text
                    copyable={{
                        text: variantToken,
                    }}
                    className={cn(styles.userInfo)}
                >
                    Токен
                </Typography.Text>
            </div>
            <div>
                Осталось времени:{' '}
                <span>{new Date(timer).toISOString().slice(11, 19)}</span>
            </div>
            <div>
                Дата завершения:
                <span>{new Date(date).toISOString().split('T')[0]}</span>
            </div>
            <div className={cn(styles.points)}>
                <div>
                    Первичные баллы: <span>{primaryPoints}</span>
                </div>
                <div>
                    Тестовые баллы: <span>{secondaryPoints}</span>
                </div>
            </div>
        </div>
    )
}

export default SolvedVariant
