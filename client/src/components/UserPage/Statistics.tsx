import cn from 'classnames'
import styles from '../../sass/Statistics.module.sass'
import SolvedVariant from '../Variant/SolvedVariant'
import { IVariantInfo } from '../../types'

type PropsType = {
    solvedVariants: Array<IVariantInfo>
}

const Statistics: React.FC<PropsType> = ({ solvedVariants }): JSX.Element => {
    return (
        <div className={cn(styles.statisticsWrapper)}>
            <div className={cn(styles.variantsWrapper)}>
                <h3>Решенные варианты:</h3>
                {solvedVariants.length !== 0 ? (
                    <div className={cn(styles.variants)}>
                        {solvedVariants &&
                            solvedVariants.map((elem) => {
                                return (
                                    <SolvedVariant
                                        key={new Date(elem.date).getTime()}
                                        variantToken={elem.variantToken}
                                        timer={elem.timer}
                                        primaryPoints={elem.primaryPoints}
                                        secondaryPoints={elem.secondaryPoints}
                                        date={elem.date}
                                    />
                                )
                            })}
                    </div>
                ) : (
                    'Вы еще не решили ни одного варианта'
                )}
            </div>
        </div>
    )
}

export default Statistics
