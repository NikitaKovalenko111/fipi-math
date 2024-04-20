import { Button, Input } from 'antd'
import cn from 'classnames'
import styles from './../sass/generator-page.module.sass'
import { AppDispatch } from '../redux/redux-store'
import { useDispatch } from 'react-redux'
import {
    GenerateVariantApi,
    GenerateVariantWithTokenApi,
    ResetVariantAC,
} from '../redux/actions/variantActions/variantActions'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { tokenSelector } from '../selectors/variantSelector'
import { Navigate } from 'react-router-dom'
import { setLoadingType } from '../types'
import SpinLoader from '../components/SpinLoader/SpinLoader'

type PropsType = {
    isLoading: boolean
    setIsLoading: setLoadingType
}

const GeneratorPage: React.FC<PropsType> = ({
    isLoading,
    setIsLoading,
}): JSX.Element => {
    const dispatch: AppDispatch = useDispatch()

    const variantToken: string = useSelector(tokenSelector)

    const [token, changeToken] = useState('')

    if (variantToken) {
        return <Navigate to={'/variant'} />
    }

    return (
        <div className={cn(styles.container, 'container')}>
            <span>
                Введите токен варианта. Если без токена - оставьте поле пустым.
            </span>
            <Input
                disabled={isLoading}
                value={token}
                onChange={(value) => {
                    changeToken(value.currentTarget.value)
                }}
                placeholder="Токен"
                className={cn(styles.tokenInput)}
            />
            <Button
                disabled={isLoading}
                onClick={() => {
                    dispatch(ResetVariantAC())
                    localStorage.removeItem('currentVariant')
                    localStorage.removeItem('timer')
                    localStorage.removeItem('creationTime')
                    if (token) {
                        dispatch(
                            GenerateVariantWithTokenApi(token, setIsLoading)
                        )
                    } else {
                        dispatch(GenerateVariantApi(setIsLoading))
                    }
                }}
                className={cn(styles.generateButton)}
                type="primary"
            >
                Сгенерировать вариант
            </Button>
            {true && (
                <SpinLoader style={{ position: 'absolute', bottom: '35%' }} />
            )}
        </div>
    )
}

export default GeneratorPage
