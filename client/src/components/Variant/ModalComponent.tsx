import { Modal, Progress } from 'antd'
import { IVariantCheckResults } from '../../types'
import cn from 'classnames'
import styles from './../../sass/ModalComponent.module.sass'

type PropsType = {
    partOfCheck: number
    variantCheckResults: IVariantCheckResults | null
    setPart: (part: number) => void
    timer: number
}

const ModalComponent: React.FC<PropsType> = ({
    partOfCheck,
    setPart,
    variantCheckResults,
    timer,
}): JSX.Element => {
    return (
        <Modal
            title="Результаты"
            open={partOfCheck === 4 && variantCheckResults !== null}
            closeIcon={false}
            cancelButtonProps={{
                className: cn(styles.cancelButton),
            }}
            onOk={() => {
                setPart(5)
            }}
            centered
        >
            <div className={cn(styles.modalWrapper)}>
                <div>
                    Правильно решенные задания первой части:{' '}
                    <span>
                        {
                            variantCheckResults?.answersResult.filter(
                                (el, index) => el === 'correct' && index <= 12
                            ).length
                        }
                    </span>
                </div>
                <div>
                    Осталось времени:{' '}
                    <span>{new Date(timer).toISOString().slice(11, 19)}</span>
                </div>
                <div className={cn(styles.progressWrapper)}>
                    <div>
                        <Progress
                            className={cn(styles.progressBar)}
                            type="circle"
                            status={
                                (variantCheckResults?.primaryPoints as number) <=
                                6
                                    ? 'exception'
                                    : 'success'
                            }
                            percent={Math.round(
                                ((variantCheckResults?.primaryPoints as number) /
                                    31) *
                                    100
                            )}
                            format={() => variantCheckResults?.primaryPoints}
                        />
                        <div>Первичных баллов</div>
                    </div>
                    <div>
                        <Progress
                            className={cn(styles.progressBar)}
                            type="circle"
                            status={
                                (variantCheckResults?.secondaryPoints as number) <=
                                34
                                    ? 'exception'
                                    : 'success'
                            }
                            percent={Math.round(
                                variantCheckResults?.secondaryPoints as number
                            )}
                            format={() => variantCheckResults?.secondaryPoints}
                        />
                        <div>Тестовых баллов</div>
                    </div>
                </div>
                <div>
                    Минимальный порог для получения аттестата{' '}
                    <span>
                        {variantCheckResults &&
                        variantCheckResults?.primaryPoints >= 5
                            ? 'пройден'
                            : 'не пройден'}
                    </span>
                </div>
                <div>
                    Минимальный порог для поступления в подведомственные вузы
                    Минобрнауки{' '}
                    <span>
                        {variantCheckResults &&
                        variantCheckResults.primaryPoints >= 7
                            ? 'пройден'
                            : 'не пройден'}
                    </span>
                </div>
            </div>
        </Modal>
    )
}

export default ModalComponent
